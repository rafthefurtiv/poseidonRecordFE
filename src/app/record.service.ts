import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Record } from './record';
import { RecordSocietario } from './record-societario';
import { RecordDto } from './record-dto';
import { Stili } from './stili';
import { Categorie } from './categorie';
import { Atleta } from './atleta';
import { Esito } from './esito';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  metri: Array<number> = [50, 100, 200, 400, 500, 800, 1000];
  stili: Observable<Array<Stili>> = new Observable<Array<Stili>>();
  stiliData: Array<Stili> = [];
  categorie: Observable<Array<Categorie>> = new Observable<Array<Categorie>>();
  records: Array<Record> = [];
  //local: string = "http://195.20.241.70:8080/poseidonRecord";
  local: string = "http://localhost:8080/poseidonRecord";
  stiliCaricati: boolean = false;
  categorieCaricate: boolean = false;
  //record: string = "/record";

  constructor(private http: HttpClient) { }

  getAllRecords() {
    return this.http.get<Array<Record>>(this.local+"/record/records");
  }
  getRecordId(id: number) {
    return this.http.get<Record>(this.local+"/utenti/utente/"+id);
  }
  getAtletiList() {
    return this.http.get<Array<Atleta>>(this.local+"/utenti/utenti");
  }

  getStiliList() {
    return this.http.get<Array<Stili>>(this.local+"/record/stili");
  }

  getAuth(user: String, pass: String) {
     return this.http.get<boolean>(this.local+"/utenti/login?user="+user+"&pass="+pass);
  }

/*
  getStiliList() {
    if(!this.stiliCaricati){
      this.stili = this.http.get<Array<Stili>>(this.local+"/record/stili");
      this.stili.subscribe((data: Array<Stili>) => {
        this.stiliData = data;
        this.stiliCaricati = true;
        return of(this.stiliData);
      });
      //return this.stili;
    }
    else{
      return of(this.stiliData);
    }
  }
*/

  getCategorieList() {
    return this.http.get<Array<Categorie>>(this.local+"/record/categorie");
  }

  getSocietari() {
    return this.http.get<Array<RecordSocietario>>(this.local+"/record/record-societari");
  }

  getMetriList() {
    return   this.metri;
    //return this.http.get<Array<Metri>>(this.local+"/record/metri");
  }

  saveRecord(record:  RecordDto) {
    return this.http.post<Esito>(this.local+"/record/new", record, {});
  }

}
