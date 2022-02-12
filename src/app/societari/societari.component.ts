import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { RecordSocietario } from '../record-societario';
import {forkJoin} from 'rxjs';
import { Stili } from '../stili';
import { Categorie } from '../categorie';


@Component({
  selector: 'app-societari',
  templateUrl: './societari.component.html',
  styleUrls: ['./societari.component.css']
})
export class SocietariComponent implements OnInit {

  categoria: string = "";
  metri: string = "";
  stile: string = "";
  sesso: string = "";
  vasca: string = "";
  categorie: Array<Categorie> = [];
  stili: Array<Stili> = [];
  metriOption = this.recordService.getMetriList();
  message: string = "";
  gare: Array<RecordSocietario> = [];

  constructor(private recordService: RecordService) {
         //let societariCall = this.recordService.getSocietari();

         this.recordService.getSocietari().subscribe((result) => {
           console.log(result);
           this.gare = result;
         })

   }

  ngOnInit(): void {
        let categorieCall = this.recordService.getCategorieList();
        let stiliCall = this.recordService.getStiliList();
        let metriOption = this.recordService.getMetriList();

        forkJoin(categorieCall, stiliCall).subscribe((result) => {
          console.log(result);
          this.categorie = result[0];
          this.stili = result[1];
        })
  }

  checkVisibility(gara: RecordSocietario){
    let ricerca = false;
    let takeGara = true;

    if(this.metri != null && this.metri != undefined && this.metri != "" ||
      this.stile != null && this.stile != undefined && this.stile != "" ||
      this.categoria != null && this.categoria != undefined && this.categoria != ""
    ){
      ricerca = true;
    }

    if(ricerca){
      if(this.metri != "" && !gara.gara.nomeGara.includes(this.metri)){
        takeGara = false;
      }

      if(this.stile != "" && !gara.gara.nomeGara.includes(this.stile)){
        takeGara = false;
      }

      if(gara.gara.categoria != this.categoria){
        takeGara = false;
      }

        return takeGara;
    }
    else{
      return true;
    }


  }

}
