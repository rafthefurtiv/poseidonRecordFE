import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import {CookieService} from 'ngx-cookie-service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private recordService: RecordService, private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  checkSuperUser(){
    if(!this.recordService.superUser){
      this.recordService.superUser = this.cookieService.get("superUser") == 'S' ? true : false;
    }
    return this.recordService.superUser;
  }

}
