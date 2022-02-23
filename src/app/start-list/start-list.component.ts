import { Component, OnInit } from '@angular/core';
import { StartList } from '../start-list';
import { RecordService } from '../record.service';
import {forkJoin} from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-start-list',
  templateUrl: './start-list.component.html',
  styleUrls: ['./start-list.component.css']
})
export class StartListComponent implements OnInit {

  fileList: Array<StartList> = [];
  loading = false;

  constructor(private recordService: RecordService) { }

  ngOnInit(): void {

    let listFileCall = this.recordService.getFileList("/root/startList");

    forkJoin(listFileCall).subscribe((result) => {
      this.fileList = result[0];
    })

  }

  download(fileName: String){
    window.open("http://localhost:8080/poseidonRecord/file/download/"+fileName);
  }

}
