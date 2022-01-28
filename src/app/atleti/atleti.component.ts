import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Record } from '../record';


export interface RecordElement {
  nome: string;
  tempo: number;
}

const ELEMENT_DATA: RecordElement[] = [
  {nome: 'Raffaele Barbato', tempo: 3900},
  {nome: 'Gaetano Cerullo', tempo: 4000},
  {nome: 'Claudia Pezone', tempo: 2100}
];


@Component({
  selector: 'app-atleti',
  templateUrl: './atleti.component.html',
  styleUrls: ['./atleti.component.css']
})
export class AtletiComponent implements OnInit {
  atleti: string[] = ['Raffaele Barbato', 'Gaetano Cerullo', 'Claudia Pezone'];
  displayedColumns: string[] = ['nome', 'tempo'];
  dataSource = ELEMENT_DATA;
  atletiList: Array<Record> = [];
  displayed: string = "none";
  constructor(private recordService: RecordService) {
    //this.atletiList = new Array<>;
   }

  ngOnInit(): void {
    this.recordService.getAllRecords()
        .subscribe((data: Array<Record>) => {
          console.log(data);
          this.atletiList = data;
        });
  }

  calcolaTempo(tempo: number){

    var tempoObj: { [key: string]: number; } = {};

    tempoObj['minuti'] = Math.floor(tempo / 6000);
    tempoObj['secondi']  = Math.floor((tempo - (tempoObj['minuti'] * 6000)) / 100);
    tempoObj['centesimi']  = tempo - (tempoObj['minuti'] * 6000) - (tempoObj['secondi'] * 100);


    return tempoObj['minuti']+"\' "+tempoObj['secondi']+"\" "+tempoObj['centesimi']   ;
  }


}
