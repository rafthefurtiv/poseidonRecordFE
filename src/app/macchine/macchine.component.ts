import { Component, OnInit } from '@angular/core';
import { Macchina } from '../macchina';
import { Utente } from '../utente';
import { MacchinaUtente } from '../macchina-utente';
import { Prenotazioni } from '../prenotazioni';
import { MacchineService } from '../macchine.service';
import { forkJoin } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ErrordialogComponent } from '../errordialog/errordialog.component';

@Component({
  selector: 'app-macchine',
  templateUrl: './macchine.component.html',
  styleUrls: ['./macchine.component.css']
})
export class MacchineComponent implements OnInit {

  andata: Boolean = true;
  ritorno: Boolean = true;
  loading: Boolean = false;
  macchinaEsistente: Boolean = false;
  macchine: MacchinaUtente[] = [];
  utenteAttivo: Utente = {nome:"", cognome: "", username:""};
  tipo: string = "AUTO";
  macchinaPersonale: Macchina = {nome: "Macchina test3", id: 0, proprietario:"Test", idProprietario: 1, username: "v", auto: "AUTO", andata: true,
                                    ritorno: true, postiAndata: 4, postiRitorno: 5,
                                    note: "test note"};
  prenotazione: Prenotazioni = {andataP: false, ritornoP: false};



  constructor(private macchineService: MacchineService,  private cookieService: CookieService, public dialog: MatDialog) {
    //andata: Boolean;
  }



  ngOnInit(): void {
    this.loading = true;
    var callAllCarUte = this.macchineService.getAllMacchineUtenti();
    var cattUtenteAttivo = this.macchineService.getUtenteByUsername(this.cookieService.get("username"));

    this.macchinaPersonale.username = this.cookieService.get("username");
    //this.macchinaPersonale.auto = "AUTO";

    forkJoin(callAllCarUte, cattUtenteAttivo).subscribe( res => {

      this.macchine = res[0];
      this.utenteAttivo = res[1];

      this.cookieService.set("fullname", String(this.utenteAttivo.nome + " " + this.utenteAttivo.cognome));

      this.getMacchinaPersonale(this.macchine);
      this.loading = false;
      }
    );




/*
    var macchina = {nome: "Macchina test", proprietario:"Test", idProprietario: 1, auto: true, andata: true,
    ritorno: false, postiAndata: 4, postiRitorno: 5, passeggeriAndata: ["Raf Barb", "Test test"], passeggeriRitorno: ["Raf Barb", "Test test"], note: "test"};

    this.macchine.push(macchina);

    macchina = {nome: "Macchina test2", proprietario:"Test", idProprietario: 1, auto: true, andata: true,
    ritorno: true, postiAndata: 4, postiRitorno: 5, passeggeriAndata: ["Raf Barb", "Test test"], passeggeriRitorno: ["Raf Barb", "Test test"], note: ""};

    this.macchine.push(macchina);

    macchina = {nome: "Macchina test3", proprietario:"Test", idProprietario: 1, auto: true, andata: true,
    ritorno: false, postiAndata: 4, postiRitorno: 5, passeggeriAndata: ["Raf Barb", "Test test"], passeggeriRitorno: ["Raf Barb", "Test test"], note: "test"};

    this.macchine.push(macchina);

    */
  }

  openDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(ErrordialogComponent, {
      width: '500px',
      data: errorMessage,
    });
  }

  public getMacchinaPersonale(macchine: MacchinaUtente[]){
    this.macchinaEsistente = false;
    macchine.forEach(mu => {
      if(mu.macchina.username == this.cookieService.get("username")){
        this.macchinaPersonale = mu.macchina;
        this.macchinaEsistente = true;
      }
    });
  }

  public refreshCars(){
    var callAllCarUte = this.macchineService.getAllMacchineUtenti();
    callAllCarUte.subscribe(res => {
      this.macchine = res;
      this.getMacchinaPersonale(this.macchine);
      this.loading = false;
    });

  }


  public salvaMacchina(){
    this.loading = true;

    if(this.macchinaEsistente){
        this.macchinaPersonale.proprietario = this.cookieService.get("username");
        this.macchineService.updateMacchina(this.macchinaPersonale).subscribe(
           res => {
             this.prenotazione.andataP = false;
             this.prenotazione.ritornoP = false;
             this.refreshCars();
             },
          err => {    this.openDialog(err.error); this.refreshCars();}
        );
    }
    else{
        this.macchineService.saveMacchina(this.macchinaPersonale).subscribe(
          res => {
            this.prenotazione.andataP = false;
            this.prenotazione.ritornoP = false;
            this.refreshCars();},
          err => {this.openDialog(err.error); this.refreshCars();}
        );
    }
  }

  public eliminaMacchina(){
    this.loading = true;
    this.macchineService.deleteMacchina(this.cookieService.get("username")).subscribe(
      res => { this.macchinaEsistente = false; this.refreshCars();},
      err => {this.openDialog(err.error); this.refreshCars();}
    );
  }

  public test(){
    console.log(this.macchinaPersonale);
  }

}
