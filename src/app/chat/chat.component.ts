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

  ngOnInit(): void {}

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

    this.chatService.getStorico()
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
        const stickToBottom = this.isAtBottom();
        this.messaggi.push(m);
        if (stickToBottom) {
          setTimeout(() => this.goToEnd(), 0);
        }
      });
  }

  ricarica(): void {
    if (!this.owner) return;
    this.chatService.getStorico()
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
