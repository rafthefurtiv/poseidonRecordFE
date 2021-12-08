import { Gara } from './gara';

export class Record {

  nome: string = "";
  cognome: string = "";
  username: string = "";
  display: boolean = false;
  codiceSesso: string = "";
  gare: Array<Gara> = [];


    constructor(rec: Record) {
    }

}
