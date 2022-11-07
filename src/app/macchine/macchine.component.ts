import { Component, OnInit } from '@angular/core';
import { Macchina } from '../macchina';
import { MacchinaUtente } from '../macchina-utente';
import { Prenotazioni } from '../prenotazioni';
import { MacchineService } from '../macchine.service';
import { forkJoin } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

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
  tipo: string = "AUTO";
  macchinaPersonale: Macchina = {nome: "Macchina test3", proprietario:"Test", idProprietario: 1, username: "v", auto: true, andata: true,
                                    ritorno: true, postiAndata: 4, postiRitorno: 5,
                                    note: "test note"};
  prenotazione: Prenotazioni = {andataP: false, ritornoP: false};



  constructor(private macchineService: MacchineService,  private cookieService: CookieService) {
    //andata: Boolean;
  }



  ngOnInit(): void {

    // TODO getMacchine();
    //var callAllCar = this.macchineService.getAllMacchine();
    var callAllCarUte = this.macchineService.getAllMacchineUtenti();

    forkJoin(callAllCarUte).subscribe( res => {
      console.log(res);


      this.macchine = res[0];

      this.getMacchinaPersonale(this.macchine);

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



  public getMacchinaPersonale(macchine: MacchinaUtente[]){
    macchine.forEach(mu => {
      if(mu.macchina.username == this.cookieService.get("username")){
        this.macchinaPersonale = mu.macchina;
        this.macchinaEsistente = true;
      }
    });
  }


  public salvaMacchina(){
    console.log("salvataggio");
    console.log(this.macchinaPersonale);
    if(this.macchinaEsistente){
        this.macchineService.updateMacchina(this.macchinaPersonale).subscribe(
          res => {console.log(res);},
          err => {console.log(err);}
        );
    }
    else{
        this.macchineService.saveMacchina(this.macchinaPersonale).subscribe(
          res => {console.log(res);},
          err => {console.log(err);}
        );
    }
  }

  public eliminaMacchina(){

  }

  public test(){
    console.log(this.macchinaPersonale);
  }

}
