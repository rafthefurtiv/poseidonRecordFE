import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-macchine',
  templateUrl: './macchine.component.html',
  styleUrls: ['./macchine.component.css']
})
export class MacchineComponent implements OnInit {

  andata: Boolean = true;
  ritorno: Boolean = true;
  loading: Boolean = true;
  vett : number[] = [1, 2, 3];



  constructor() {
    //andata: Boolean;
  }



  ngOnInit(): void {
  }

}
