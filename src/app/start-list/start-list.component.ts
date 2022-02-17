import { Component, OnInit } from '@angular/core';
import { StartList } from '../start-list';

@Component({
  selector: 'app-start-list',
  templateUrl: './start-list.component.html',
  styleUrls: ['./start-list.component.css']
})
export class StartListComponent implements OnInit {

  fileList: Array<StartList> = [];
  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
