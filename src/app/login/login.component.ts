import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Record } from '../record';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


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

  constructor(private recordService: RecordService, private router: Router) {
   }

   login(){
     this.loading = true;
     this.recordService.getAuth(this.username, this.password).subscribe((data: boolean) => {

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
