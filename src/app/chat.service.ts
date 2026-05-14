import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
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

  getStorico(owner: string): Observable<ChatMessage[]> {
    const params = new HttpParams().set('owner', owner);
    return this.http.get<ChatMessage[]>(this.base + '/chat/storico', { params });
  }

  cleanup(owner: string, keep: number = 10): Observable<number> {
    const params = new HttpParams().set('owner', owner).set('keep', keep.toString());
    return this.http.delete<number>(this.base + '/chat/cleanup', { params });
  }
}
