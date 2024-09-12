import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

local: string = "http://195.20.241.70:8080/poseidonRecord";
//local: string = "http://localhost:8080/poseidonRecord";

  constructor(private http: HttpClient, private cookieService: CookieService) { }


    getAllMessages(id: string) {
      return this.http.get<Array<string>>(this.local+"/chat/messaggi/"+id);
    }

    getNewMessages(id: string, idMessage: string) {
      return this.http.get<Array<string>>(this.local+"/chat/messaggi/"+ id + "/new/" + idMessage);
    }

    saveMessaggio(m: string, id: string) {
      return this.http.post<Array<string>>(this.local+"/chat/messaggi/"+id, m, {});
    }


}
