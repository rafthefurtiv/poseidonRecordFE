import { Injectable } from '@angular/core';
import { RxStomp, RxStompState } from '@stomp/rx-stomp';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ChatMessage } from '../chat.service';

@Injectable({ providedIn: 'root' })
export class ChatRealtimeService {

  private rxStomp = new RxStomp();
  private connected = false;

  readonly connectionState$: Observable<RxStompState> = this.rxStomp.connectionState$;

  connect(): void {
    if (this.connected) return;
    this.rxStomp.configure({
      brokerURL: environment.wsUrl,
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000
    });
    this.rxStomp.activate();
    this.connected = true;
  }

  disconnect(): void {
    if (!this.connected) return;
    this.rxStomp.deactivate();
    this.connected = false;
  }

  stream$(): Observable<ChatMessage> {
    return this.rxStomp.watch('/topic/chat')
      .pipe(map(frame => JSON.parse(frame.body) as ChatMessage));
  }

  send(from: string, testo: string): void {
    this.rxStomp.publish({
      destination: '/app/chat',
      body: JSON.stringify({
        from: from.toLowerCase(),
        messaggio: testo
      })
    });
  }
}
