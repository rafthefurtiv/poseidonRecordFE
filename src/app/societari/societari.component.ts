import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Record } from '../record';


@Component({
  selector: 'app-societari',
  templateUrl: './societari.component.html',
  styleUrls: ['./societari.component.css']
})
export class SocietariComponent implements OnInit {

  message: string = "";
  gare: Array<Record> = [];

  constructor(private recordService: RecordService) {
         //let societariCall = this.recordService.getSocietari();

         this.recordService.getSocietari().subscribe((result) => {
           console.log(result);
           this.gare = result;
         })

   }

  ngOnInit(): void {
  }

}
