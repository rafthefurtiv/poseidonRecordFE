import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChatService, ChatMessage } from '../chat.service';
import { ChatRealtimeService } from './chat-realtime.service';
import { RxStompState } from '@stomp/rx-stomp';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('divToScroll') private divToScroll!: ElementRef;

  messaggi: ChatMessage[] = [];
  testo: string = '';
  owner: string = '';
  entered: boolean = false;
  loading: boolean = false;

  showEmoji: boolean = false;
  tableMode: boolean = false;
  emojiList: string[] = [
    '😀','😁','😂','🤣','😃','😄','😅','😊','😍','😘',
    '😎','🤩','🥳','😜','🤔','🤨','😏','😢','😭','😡',
    '🥺','😱','😴','🤤','🤗','🤐','😬','🙄','😇','🤯',
    '👍','👎','👏','🙏','💪','🤝','✌️','👌','🤞','🫶',
    '❤️','🧡','💛','💚','💙','💜','🖤','💔','💯','🔥',
    '🎉','✨','⭐','🌟','💥','💩','🍕','🍺','☕','🚀'
  ];

  connectionState: RxStompState = RxStompState.CLOSED;
  readonly RxStompState = RxStompState;

  private destroy$ = new Subject<void>();

  constructor(
    private chatService: ChatService,
    private realtime: ChatRealtimeService
  ) {}

  ngOnInit(): void {
    try {
      this.tableMode = localStorage.getItem('chat-table-mode') === '1';
    } catch {}
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.realtime.disconnect();
  }

  carica(): void {
    const name = (this.owner || '').trim();
    if (!name) return;
    this.owner = name.toLowerCase();
    this.entered = true;
    this.loading = true;

    this.chatService.getStorico(this.owner)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.messaggi = res || [];
        this.loading = false;
        setTimeout(() => this.goToEnd(), 0);
      });

    this.realtime.connect();

    this.realtime.connectionState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(s => this.connectionState = s);

    this.realtime.stream$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(m => {
        if (m && m.from === '__system__' && m.messaggio === '__cleanup__') {
          this.ricarica();
          return;
        }
        const stickToBottom = this.isAtBottom();
        this.messaggi.push(m);
        if (stickToBottom) {
          setTimeout(() => this.goToEnd(), 0);
        }
      });
  }

  get isAdmin(): boolean {
    return this.owner === 'r';
  }

  pulisci(): void {
    if (!this.isAdmin) return;
    if (!confirm('Cancellare i messaggi vecchi e tenere solo gli ultimi 10?')) return;
    this.chatService.cleanup(this.owner, 10)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  toggleTableMode(): void {
    if (!this.isAdmin) return;
    this.tableMode = !this.tableMode;
    try { localStorage.setItem('chat-table-mode', this.tableMode ? '1' : '0'); } catch {}
  }

  ricarica(): void {
    if (!this.owner) return;
    this.chatService.getStorico(this.owner)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.messaggi = res || []);
  }

  invia(): void {
    const t = (this.testo || '').trim();
    if (!t) return;
    this.realtime.send(this.owner, t);
    this.testo = '';
  }

  toggleEmoji(): void {
    this.showEmoji = !this.showEmoji;
  }

  addEmoji(e: string): void {
    this.testo = (this.testo || '') + e;
  }

  isAtBottom(): boolean {
    const el = this.divToScroll?.nativeElement;
    if (!el) return false;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  private goToEnd(): void {
    const el = this.divToScroll?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
