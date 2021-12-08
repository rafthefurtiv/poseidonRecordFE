import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Record } from '../record';
import { Stili } from '../stili';
//import { Metri } from '../metri';
import { Categorie } from '../categorie';
import { Atleta } from '../atleta';
import {forkJoin} from 'rxjs';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  categorie: Array<Categorie> = [];
  stili: Array<Stili> = [];
  atleti: Array<Atleta> = [];
  metri = this.recordService.getMetriList();
  record = {idUtente : null, metri: null, idStile: null, idCategoria: null, minuti: null, secondi: null, centesimi: null,
            vasca: null};

  constructor(private recordService: RecordService) { }

  ngOnInit(): void {

      let categorieCall = this.recordService.getCategorieList();
      let stiliCall = this.recordService.getStiliList();
      let atletiCall = this.recordService.getAtletiList();
      let metri = this.recordService.getMetriList();

      forkJoin(categorieCall, stiliCall, atletiCall).subscribe((result) => {
        console.log(result);
        this.categorie = result[0];
        this.stili = result[1];
        this.atleti = result[2];
      })
  }

  salva(){
    console.log(this.record);
  }

}
