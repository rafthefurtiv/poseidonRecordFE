import { Component, OnInit, Input } from '@angular/core';
import { Macchina } from '../macchina';
import { MacchinaUtente } from '../macchina-utente';
import { Prenotazioni } from '../prenotazioni';
import {CookieService} from 'ngx-cookie-service';
import { MacchineService } from '../macchine.service';

@Component({
  selector: 'app-macchina',
  templateUrl: './macchina.component.html',
  styleUrls: ['./macchina.component.css']
})


export class MacchinaComponent implements OnInit {

  @Input() macchina:  MacchinaUtente = {macchina: {nome: "Macchina test", proprietario:"Test", idProprietario: 1, username: "v", id: 0, auto: true, andata: true,
                                                      ritorno: false, postiAndata: 4, postiRitorno: 5, note: "test"},
                                     macchineUtentiListAndata: ["Raf Barb", "Test test"], macchineUtentiListRitorno: ["Raf Barb", "Test test"]};

  @Input() macchine: MacchinaUtente[] = [];

  @Input() andataPrenotata: boolean = false;
  @Input() ritornoPrenotato: boolean = false;

  @Input() prenotazione: Prenotazioni = {andataP: false, ritornoP: false};



  utente: String = "";

  constructor(private cookieService: CookieService, private macchineService: MacchineService) { }

  ngOnInit(): void {
    this.utente = this.cookieService.get("username");
  }

  public calcolaPrenotazione(){
    this.andataPrenotata = false;
    this.ritornoPrenotato = false;
    this.macchine.forEach(m => {
      if(m.macchineUtentiListAndata.includes(this.utente)){
        this.andataPrenotata = true;
      }
    });
    this.macchine.forEach(m => {
      if(m.macchineUtentiListRitorno.includes(this.utente)){
        this.ritornoPrenotato = true;
      }
    });
  }

  public entra(tragitto: number){
    if(tragitto == 1){
      if(!this.macchina.macchineUtentiListAndata.includes(this.utente)
      && this.macchina.macchineUtentiListAndata.length < this.macchina.macchina.postiAndata){
        this.macchina.macchineUtentiListAndata.push(this.utente);

        this.macchineService.savePasseggero(this.utente.toString(), this.macchina.macchina.id, true, this.prenotazione.andataP).subscribe(
          res => {console.log(res);},
          err => {console.log(err);}
        );

        this.prenotazione.andataP = true;
      }
    }
    else if(tragitto == 2){
      if(!this.macchina.macchineUtentiListRitorno.includes(this.utente)
      && this.macchina.macchineUtentiListRitorno.length < this.macchina.macchina.postiRitorno){
        this.macchina.macchineUtentiListRitorno.push(this.utente);
        this.prenotazione.ritornoP = true;
      }
    }
  }

  public esci(tragitto: number){
    if(tragitto == 1){
      if(this.macchina.macchineUtentiListAndata.includes(this.utente)){
        this.macchina.macchineUtentiListAndata.splice(this.macchina.macchineUtentiListAndata.indexOf(this.utente,1));
        this.prenotazione.andataP = false;
      }
    }
    else if(tragitto == 2){
      if(this.macchina.macchineUtentiListRitorno.includes(this.utente)){
        this.macchina.macchineUtentiListRitorno.splice(this.macchina.macchineUtentiListRitorno.indexOf(this.utente,1));
        this.prenotazione.ritornoP = false;
      }
    }
  }


}
