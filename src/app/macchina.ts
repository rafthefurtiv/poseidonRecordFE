export class Macchina {

    nome: string = "";
    proprietario: string = "";
    auto: boolean = false;
    andata: boolean = false;
    ritorno: boolean = false;
    postiAndata: number = 0;
    postiRitorno: number = 0;
    note?: string = "";

    passeggeriAndata: Array<String> = [];
    passeggeriRitorno: Array<String> = [];

}
