import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Macchina } from './macchina';
import { MacchinaUtente } from './macchina-utente';
import { Esito } from './esito';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacchineService {
  //categorie: Observable<Array<Categorie>> = new Observable<Array<Categorie>>();
  //local: string = "http://195.20.241.70:8080/poseidonRecord";
  local: string = "http://localhost:8080/poseidonRecord";

  constructor(private http: HttpClient) { }

  getAllMacchine() {
    return this.http.get<Array<Macchina>>(this.local+"/macchine");
  }
  getAllMacchineUtenti() {
    return this.http.get<Array<MacchinaUtente>>(this.local+"/macchine/utenti");
  }

  saveMacchina(macchina:  Macchina) {
    return this.http.post<Array<Macchina>>(this.local+"/macchine/macchina", macchina, {});
  }

  updateMacchina(macchina:  Macchina) {
    return this.http.put<Array<Macchina>>(this.local+"/macchine/macchina", macchina, {});
  }

  savePasseggero(pass: number, macch: number, andata: Boolean, ritorno: Boolean) {
    return this.http.post<Esito>(this.local+"/macchine/passeggero/"+pass+"/macchina/"+macch+"?andata="+andata+"&ritorno="+ritorno, null, {});
  }

  deleteMacchina(prop: number) {
    return this.http.delete<Esito>(this.local+"/macchine/macchina/utente/"+prop, {});
  }

}
