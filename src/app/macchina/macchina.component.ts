import { Component, OnInit, Input } from '@angular/core';
import { Macchina } from '../macchina';
import { Prenotazioni } from '../prenotazioni';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-macchina',
  templateUrl: './macchina.component.html',
  styleUrls: ['./macchina.component.css']
})


export class MacchinaComponent implements OnInit {

  @Input() macchina:  Macchina = {nome: "Macchina test", proprietario:"Test", auto: true, andata: true,
                                     ritorno: false, postiAndata: 4, postiRitorno: 5,
                                     passeggeriAndata: ["Raf Barb", "Test test"], passeggeriRitorno: ["Raf Barb", "Test test"]};

  @Input() macchine: Macchina[] = [];

  @Input() andataPrenotata: boolean = false;
  @Input() ritornoPrenotato: boolean = false;

  @Input() prenotazione: Prenotazioni = {andataP: false, ritornoP: false};



  utente: String = "";

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.utente = this.cookieService.get("username");
  }

  public calcolaPrenotazione(){
    this.andataPrenotata = false;
    this.ritornoPrenotato = false;
    this.macchine.forEach(m => {
      if(m.passeggeriAndata.includes(this.utente)){
        this.andataPrenotata = true;
      }
    });
    this.macchine.forEach(m => {
      if(m.passeggeriRitorno.includes(this.utente)){
        this.ritornoPrenotato = true;
      }
    });
  }

  public entra(tragitto: number){
    if(tragitto == 1){
      if(!this.macchina.passeggeriAndata.includes(this.utente)
      && this.macchina.passeggeriAndata.length < this.macchina.postiAndata){
        this.macchina.passeggeriAndata.push(this.utente);
        this.prenotazione.andataP = true;
      }
    }
    else if(tragitto == 2){
      if(!this.macchina.passeggeriRitorno.includes(this.utente)
      && this.macchina.passeggeriRitorno.length < this.macchina.postiRitorno){
        this.macchina.passeggeriRitorno.push(this.utente);
        this.prenotazione.ritornoP = true;
      }
    }
  }

  public esci(tragitto: number){
    if(tragitto == 1){
      if(this.macchina.passeggeriAndata.includes(this.utente)){
        this.macchina.passeggeriAndata.splice(this.macchina.passeggeriAndata.indexOf(this.utente,1));
        this.prenotazione.andataP = false;
      }
    }
    else if(tragitto == 2){
      if(this.macchina.passeggeriRitorno.includes(this.utente)){
        this.macchina.passeggeriRitorno.splice(this.macchina.passeggeriRitorno.indexOf(this.utente,1));
        this.prenotazione.ritornoP = false;
      }
    }
  }


}
