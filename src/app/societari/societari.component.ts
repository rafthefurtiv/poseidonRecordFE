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
  gareFiltrate: Array<RecordSocietario> = [];

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


  getRicerca(){
      if(this.metri != null && this.metri != undefined && this.metri != "" ||
        this.stile != null && this.stile != undefined && this.stile != "" ||
        this.categoria != null && this.categoria != undefined && this.categoria != "" ||
        this.vasca != null && this.vasca != undefined && this.vasca != "" ||
        this.sesso != null && this.sesso != undefined && this.sesso != ""
      ){
        return true;
      }
      return false;
  }


  checkVisibility(gara: RecordSocietario){
    let ricerca = false;
    let takeGara = true;

    if(this.getRicerca()){
      ricerca = true;
    }

    if(ricerca){
      if(this.metri != "" && gara.gara.metri != this.metri){
        takeGara = false;
      }

      if(this.stile != "" && gara.gara.stile != this.stile){
        takeGara = false;
      }

      if(this.categoria != "" && gara.gara.categoria != this.categoria){
        takeGara = false;
      }

      if(this.vasca != "" && gara.gara.vasca != this.vasca){
        takeGara = false;
      }

      if(this.sesso != "" && gara.codiceSesso != this.sesso){
        takeGara = false;
      }

        return takeGara;
    }
    else{
      return true;
    }
  }



  cambiaGare(){
    console.log("ricalcola");
    this.gareFiltrate = [];
    if(this.getRicerca()){
      this.gareFiltrate = this.gare.filter(g => this.checkVisibility(g));
    }
    else{
      this.gareFiltrate = this.gare;
    }
  }






}
