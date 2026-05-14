# Modifiche backend Spring richieste per chat real-time

Il frontend è stato migrato a STOMP/WebSocket. Senza queste modifiche al backend la chat non funziona.

## 1. Dipendenza Maven/Gradle

**Maven** (`pom.xml`):
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

**Gradle**:
```
implementation 'org.springframework.boot:spring-boot-starter-websocket'
```

## 2. WebSocketConfig

```java
package com.tuopackage.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
```

L'endpoint finale sarà `ws://195.20.241.70:8080/poseidonRecord/ws` (combina il context path dell'app con `/ws`).

## 3. ChatWsController

Sostituisce / affianca il vecchio `POST /chat/messaggi/{id}`.

```java
package com.tuopackage.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWsController {

    @Autowired private SimpMessagingTemplate broker;
    @Autowired private ChatRepository repo; // il tuo repository esistente

    @MessageMapping("/chat")
    public void onMessage(ChatInbound in) {
        ChatMessage saved = new ChatMessage();
        saved.setFrom(in.getFrom().toLowerCase());
        saved.setTo(in.getTo().toLowerCase());
        saved.setMessaggio(in.getMessaggio());
        saved.setTimestamp(java.time.Instant.now().toString());
        saved = repo.save(saved);

        // Recapita al destinatario
        broker.convertAndSend("/topic/inbox/" + saved.getTo(), saved);
        // Echo al mittente (per la sua tab di chat)
        broker.convertAndSend("/topic/inbox/" + saved.getFrom(), saved);
    }
}

// DTO in ingresso
class ChatInbound {
    private String from;
    private String to;
    private String messaggio;
    // getters/setters
}
```

## 4. Modello dati `ChatMessage`

Il payload che il frontend si aspetta:

```json
{
  "id": 123,
  "from": "mario",
  "to": "luigi",
  "messaggio": "ciao",
  "timestamp": "2026-05-14T18:30:00.000+00:00"
}
```

Se la tua entity attuale ha solo `owner` (mittente) e nessun `to`, devi:
1. Aggiungere colonna `to_user` sulla tabella messaggi (migrazione)
2. Aggiungere campo `to` sull'entity / DTO
3. Eventualmente rinominare `owner` → `from` nel JSON (oppure mappare con `@JsonProperty("from")`)

## 5. Nuovo endpoint REST per lo storico

Il vecchio `GET /chat/messaggi/{id}` (lista per owner) non basta più: serve la conversazione tra due utenti.

```java
@GetMapping("/chat/messaggi")
public List<ChatMessage> history(@RequestParam String me, @RequestParam String peer) {
    return repo.findConversation(me.toLowerCase(), peer.toLowerCase());
}
```

Query repo (esempio JPA):
```java
@Query("SELECT m FROM ChatMessage m " +
       "WHERE (m.from = :a AND m.to = :b) OR (m.from = :b AND m.to = :a) " +
       "ORDER BY m.timestamp ASC")
List<ChatMessage> findConversation(@Param("a") String a, @Param("b") String b);
```

I vecchi endpoint `GET /chat/messaggi/{id}/new/{idMessage}` e `POST /chat/messaggi/{id}` non sono più chiamati dal FE e possono essere rimossi (o lasciati come fallback).

## 6. Smoke test

1. Avvia il backend modificato
2. Apri due tab del FE su `http://localhost:4200/#/c`
   - Tab A: nome=`mario`, con chi=`luigi` → Entra
   - Tab B: nome=`luigi`, con chi=`mario` → Entra
3. Verifica in DevTools → Network → WS che entrambe abbiano fatto l'handshake `/ws` (status 101) e i frame STOMP `SUBSCRIBE` su `/topic/inbox/mario` e `/topic/inbox/luigi`
4. Invia da A: deve apparire su entrambe in <200ms
5. Stop backend → header chat passa a "offline" → riavvio → torna "online" automaticamente (reconnect a 5s di `RxStomp`)

## Note di sicurezza

- `setAllowedOriginPatterns("*")` accetta connessioni da qualunque origin. Per produzione, restringi al dominio frontend.
- Senza autenticazione, chiunque può sottoscriversi a `/topic/inbox/<chiunque>` e leggere i messaggi indirizzati a quell'utente. Per uso personale è OK; per produzione conviene aggiungere Spring Security + `Principal` e usare `/user/queue/messages` con `convertAndSendToUser`.
