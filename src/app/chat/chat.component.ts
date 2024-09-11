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
  loading: boolean = false;

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


  carica(){
      //this.messaggi.push({owner: 1, message: "test" });

      if(!this.owner){
        this.owner = this.testo.toLowerCase();
      }

      this.loading = true;

      this.chatService.getAllMessages(this.owner.toLowerCase())
      .subscribe( res => {

         this.messaggi = res;
         this.testo = '';
         this.loading = false;
         this.goToEnd();


          });


      this.subscription = interval(10000).subscribe(x =>{
                                this.chatService.getAllMessages(this.owner.toLowerCase())
                                .subscribe( res => {

                                   this.messaggi = res;


                                   });
      });




      // caricamento messaggi iniziali da BE
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
