import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.css']
})
export class ErrordialogComponent implements OnInit {

  //@Input() error: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public error: string) { }

  ngOnInit(): void {

  }

}
