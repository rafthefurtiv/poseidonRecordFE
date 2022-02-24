import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Record } from '../record';
import { Esito } from '../esito';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: String = "";
  username: String = "";
  password: String = "";
  loading: boolean = false;

  constructor(private recordService: RecordService, private router: Router, private cookieService: CookieService) {
   }

   login(){
     this.loading = true;
     this.recordService.getAuth(this.username, this.password).subscribe((data: Esito) => {

      this.recordService.superUser = data.superUser;
      this.cookieService.set("superUser", data.superUser ? 'S' : 'N');
      this.router.navigate(['menu']);
      this.loading = false;

     },
     error => {
      console.log(error);
      this.errorMessage = error.error.message;
      this.loading = false;
     });
   }



  ngOnInit(): void {
  }



}
