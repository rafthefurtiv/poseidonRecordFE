import { Component, OnInit } from '@angular/core';
import { Macchina } from '../macchina';
import { Prenotazioni } from '../prenotazioni';
import { MacchineService } from '../macchine.service';

@Component({
  selector: 'app-macchine',
  templateUrl: './macchine.component.html',
  styleUrls: ['./macchine.component.css']
})
export class MacchineComponent implements OnInit {

  andata: Boolean = true;
  ritorno: Boolean = true;
  loading: Boolean = false;
  macchine: Macchina[] = [];
  prenotazione: Prenotazioni = {andataP: false, ritornoP: false};



  constructor(private macchineService: MacchineService) {
    //andata: Boolean;
  }



  ngOnInit(): void {
    var macchina = {nome: "Macchina test", proprietario:"Test", auto: true, andata: true,
    ritorno: false, postiAndata: 4, postiRitorno: 5, passeggeriAndata: ["Raf Barb", "Test test"], passeggeriRitorno: ["Raf Barb", "Test test"]};

    this.macchine.push(macchina);

    var macchina = {nome: "Macchina test2", proprietario:"Test", auto: true, andata: true,
    ritorno: true, postiAndata: 4, postiRitorno: 5, passeggeriAndata: ["Raf Barb", "Test test"], passeggeriRitorno: ["Raf Barb", "Test test"]};

    this.macchine.push(macchina);

    var macchina = {nome: "Macchina test3", proprietario:"Test", auto: true, andata: true,
    ritorno: false, postiAndata: 4, postiRitorno: 5, passeggeriAndata: ["Raf Barb", "Test test"], passeggeriRitorno: ["Raf Barb", "Test test"]};

    this.macchine.push(macchina);
  }



  public salvaMacchina(){
    this.macchineService.saveMacchina();
  }

  public eliminaMacchina(){

  }

}
