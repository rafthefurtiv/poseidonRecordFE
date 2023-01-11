import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palestra',
  templateUrl: './palestra.component.html',
  styleUrls: ['./palestra.component.css']
})
export class PalestraComponent implements OnInit {

  title: string = "Scheda";
  pdfSource: string = "../assets/scheda.pdf";

  constructor() { }

  ngOnInit(): void {

  }

}
