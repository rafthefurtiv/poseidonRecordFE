import { Component, OnInit, Input } from '@angular/core';
import { Macchina } from '../macchina';

@Component({
  selector: 'app-macchina',
  templateUrl: './macchina.component.html',
  styleUrls: ['./macchina.component.css']
})
export class MacchinaComponent implements OnInit {

  @Input() macchina:  Macchina = {nome: "Macchina test", proprietario:"Test", auto: true, andata: true,
                                     ritorno: false, postiAndata: 4, postiRitorno: 5, passeggeriAndata: ["Raf Barb", "Test test"], passeggeriRitorno: ["Raf Barb", "Test test"]};


  constructor() { }

  ngOnInit(): void {
  }

}
