import { Component, OnInit } from '@angular/core';
import { Teglia } from '../pizza/teglia';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  farinaBase: number = 400;
  idratazione: number = 70;
  lievito: number = 1.6;
  sale: number = 10;
  tipo: string = 'P';
  teglie: Array<Teglia> = [];
  base: any = {farinaBase:400, idratazione:70, lievito: 1.6, sale:10};
  proporzione: any = {farina:400, acqua:0, lievito: 0, sale:0};

  constructor() { }

  ngOnInit(): void {
  }

  public aggiungiTeglia(){
    this.teglie.push({quadrata: true, raggioLato1: 0, lato2: 0, resultFarina: 0, resultAcqua:0, resultLievito:0, resultSale:0});
  }

  public quadrata(t: Teglia, q: Boolean ){
    t.quadrata = q;
  }

  public calcolaImpastoTeglia( t: Teglia ){

    var impastoTotTeglia = 0;


    if(!t.quadrata){
      impastoTotTeglia = t.raggioLato1 * t.raggioLato1 * 3.14 * 0.6;
    }
    else{
      impastoTotTeglia = t.raggioLato1 * t.lato2 * 0.6;
    }

    return impastoTotTeglia;
  }

  public calcoloTotale(){
    var farinaTot = 0;
    var acquaTot = 0;
    var lievitoTot = 0;
    var saleTot = 0;

    this.teglie.forEach(t => {
      var impastoTotTeglia = 0;
      var far = 0;
      var acq = 0;
      var lie = 0;
      var sal = 0;
      if(!t.quadrata){
        impastoTotTeglia = t.raggioLato1 * t.raggioLato1 * 3.14 * 0.6;
      }
      else{
        impastoTotTeglia = t.raggioLato1 * t.lato2 * 0.6;
      }
      far = impastoTotTeglia * 100 / (this.idratazione + 100);
      farinaTot += far;
    });

    acquaTot = farinaTot / 100 * (this.idratazione);
    lievitoTot = this.lievito / 400 * farinaTot;
    saleTot = this.sale / 400 * farinaTot;


    return {farina: farinaTot, acqua: acquaTot, lievito: lievitoTot, sale: saleTot};
  }


  public calcoloProporzioneAcqua(){
    return this.proporzione.farina/100*this.base.idratazione;
  }
  public calcoloProporzioneLievito(){
    return this.proporzione.farina/this.base.farinaBase*this.base.lievito;
  }
  public calcoloProporzioneSale(){
    return this.proporzione.farina/this.base.farinaBase*this.base.sale;
  }

}
