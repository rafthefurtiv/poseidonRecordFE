import { Macchina } from './macchina';

export class MacchinaUtente {


    macchina: Macchina = {nome: "Macchina test", proprietario:"Test", idProprietario: 1, username: "v",  auto: true, andata: true,
                              ritorno: false, postiAndata: 4, postiRitorno: 5, note: "test"};

    macchineUtentiListAndata: Array<String> = [];
    macchineUtentiListRitorno: Array<String> = [];


}
