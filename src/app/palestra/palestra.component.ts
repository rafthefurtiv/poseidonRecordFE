import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palestra',
  templateUrl: './palestra.component.html',
  styleUrls: ['./palestra.component.css']
})
export class PalestraComponent implements OnInit {

  title: string = "SCHEDA PALESTRA";
  pdfSource: string = "../assets/scheda.pdf";

  constructor() { }

  ngOnInit(): void {

  }

  public downloadScheda(){
    window.open(this.pdfSource, '_blank', 'width=1000, height=800');
  }

}
