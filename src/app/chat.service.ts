import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ChatMessage {
  id: number;
  from: string;
  messaggio: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getStorico(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.base + '/chat/storico');
  }
}
