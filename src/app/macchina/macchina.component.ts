import { Component, OnInit, Input } from '@angular/core';
import { Macchina } from '../macchina';
import { Utente } from '../utente';
import { ErrordialogComponent } from '../errordialog/errordialog.component';
import { MacchinaUtente } from '../macchina-utente';
import { Prenotazioni } from '../prenotazioni';
import {CookieService} from 'ngx-cookie-service';
import { MacchineService } from '../macchine.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-macchina',
  templateUrl: './macchina.component.html',
  styleUrls: ['./macchina.component.css']
})


export class MacchinaComponent implements OnInit {

  @Input() macchina:  MacchinaUtente = {macchina: {nome: "Macchina test", proprietario:"Test", idProprietario: 1, username: "v", id: 0, auto: "AUTO", andata: true,
                                                      ritorno: false, postiAndata: 4, postiRitorno: 5, note: "test"},
                                     macchineUtentiListAndata: ["Raf Barb", "Test test"], macchineUtentiListRitorno: ["Raf Barb", "Test test"]};

  @Input() macchine: MacchinaUtente[] = [];

  @Input() andataPrenotata: boolean = false;
  @Input() ritornoPrenotato: boolean = false;
  @Input() utenteAttivo: Utente = {nome:"", cognome: "", username:""};

  @Input() prenotazione: Prenotazioni = {andataP: false, ritornoP: false};



  utente: String = "";

  constructor(private cookieService: CookieService, private macchineService: MacchineService,
  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.calcolaPrenotazione();
  }

  public calcolaPrenotazione(){
    this.andataPrenotata = false;
    this.ritornoPrenotato = false;
    this.macchine.forEach(m => {
      if(m.macchineUtentiListAndata.includes(this.getFullName())){
        this.andataPrenotata = true;
        this.prenotazione.andataP = true;
      }
    });
    this.macchine.forEach(m => {
      if(m.macchineUtentiListRitorno.includes(this.getFullName())){
        this.ritornoPrenotato = true;
        this.prenotazione.ritornoP = true;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrordialogComponent, {
      width: '250px',
      data: {error:  'test'},
    });

  }

  public entra(tragitto: number){
    if(tragitto == 1){
      if(!this.macchina.macchineUtentiListAndata.includes(this.getFullName())
      && this.macchina.macchineUtentiListAndata.length < this.macchina.macchina.postiAndata){
        this.macchina.macchineUtentiListAndata.push(this.getFullName());

        this.macchineService.savePasseggero(this.getUsername().toString(), this.macchina.macchina.id, true, this.macchina.macchineUtentiListRitorno.includes(this.getFullName())).subscribe(
          res => {console.log(res);},
          err => {console.log(err);}
        );

        this.prenotazione.andataP = true;
      }
    }
    else if(tragitto == 2){
      if(!this.macchina.macchineUtentiListRitorno.includes(this.getFullName())
      && this.macchina.macchineUtentiListRitorno.length < this.macchina.macchina.postiRitorno){
        this.macchina.macchineUtentiListRitorno.push(this.getFullName());

        this.macchineService.savePasseggero(this.getUsername().toString(), this.macchina.macchina.id, this.macchina.macchineUtentiListAndata.includes(this.getFullName()), true).subscribe(
          res => {console.log(res);},
          err => {console.log(err);}
        );

        this.prenotazione.ritornoP = true;
      }
    }
  }

  public esci(tragitto: number){
    if(tragitto == 1){
      if(this.macchina.macchineUtentiListAndata.includes(this.getFullName())){
        this.macchina.macchineUtentiListAndata.splice(this.macchina.macchineUtentiListAndata.indexOf(this.getFullName(),1));

        this.macchineService.savePasseggero(this.getUsername().toString(), this.macchina.macchina.id, false , this.macchina.macchineUtentiListRitorno.includes(this.getFullName())).subscribe(
          res => {console.log(res);},
          err => {console.log(err);}
        );

        this.prenotazione.andataP = false;
      }
    }
    else if(tragitto == 2){
      if(this.macchina.macchineUtentiListRitorno.includes(this.getFullName())){
        this.macchina.macchineUtentiListRitorno.splice(this.macchina.macchineUtentiListRitorno.indexOf(this.getFullName(),1));

        this.macchineService.savePasseggero(this.getUsername().toString(), this.macchina.macchina.id, this.macchina.macchineUtentiListAndata.includes(this.getFullName()), false).subscribe(
          res => {console.log(res);},
          err => {console.log(err);}
        );

        this.prenotazione.ritornoP = false;
      }
    }
  }


  public getFullName(){
    return this.cookieService.get("fullname");
  }
  public getUsername(){
    return this.cookieService.get("username");
  }
  public getIfHasToRide(){
    var se = false;
    this.macchine.forEach(mu => {
      if(mu.macchina.username == this.cookieService.get("username")){
        se = true;
      }
    });
    return se;
  }



}
