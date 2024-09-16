import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';

import { ChatService } from '../chat.service';

import { interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  messaggi : any[] = [];
  testo : string = "";
  owner: string = "";
  subscription: any;
  sub1: any;
  sub2: any;
  loading: boolean = false;
  ultimoId: number = 0;

  elem = document.getElementById("chat");

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {


    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});
    this.messaggi.push({owner: 'r', messaggio: '.'});

    //this.elem = document.getElementById("chat");
    this.goToEnd();
  }


  ricarica(){
   this.chatService.getAllMessages(this.owner.toLowerCase())
   .subscribe( res => {

      this.messaggi = res;

      this.ultimoId = this.getLastMessageID(this.messaggi);

      this.goToEnd();
      });
  }


  goToEnd(){
      let element = document.getElementById("chat");
      console.log(element);
      if(element){
        element.scrollTop = element.scrollHeight;
        console.log(element.scrollHeight);
        console.log(element.scrollTop);
      }
  }

  test(){
    this.messaggi.push({owner: 'r', messaggio: 'X'});
    this.goToEnd();
  }


  getLastMessageID(mess:any){
    if(mess && mess.length > 0){
      return mess[mess.length-1].id;
    }
    return 0;
  }


  carica(){
      //this.messaggi.push({owner: 1, message: "test" });

      if(!this.owner){
        this.owner = this.testo.toLowerCase();
      }

      this.loading = true;

      this.sub1 = this.chatService.getAllMessages(this.owner.toLowerCase())
      .subscribe( res => {

         this.messaggi = res;
         this.testo = '';
         this.loading = false;
         this.goToEnd();
         this.ultimoId = this.getLastMessageID(this.messaggi);

          });


      this.subscription = interval(2000).subscribe(x =>{
                                this.chatService.getNewMessages(this.owner.toLowerCase(), this.ultimoId.toString())
                                .subscribe( res => {

                                   if(res && res.length > 0){
                                    this.messaggi.concat(res);
                                   }

                                   this.ultimoId = this.getLastMessageID(this.messaggi);
                                   if(!this.ultimoId){
                                    this.ultimoId = 0;
                                   }


                                   });
      });




  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  invia(){

    this.chatService.saveMessaggio(this.testo, this.owner.toLowerCase()).subscribe( res => {
       this.testo = '';

                                       this.chatService.getAllMessages(this.owner.toLowerCase())
                                       .subscribe( res => {

                                          this.messaggi = res;
                                          this.testo = '';

                                          this?.goToEnd();
                                          });

       }
     );
  }

}
