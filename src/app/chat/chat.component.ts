import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';

import { ChatService } from '../chat.service';

import { interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  //@ViewChildren('divToScroll') divToScroll: ElementRef;

  messaggi : any[] = [];
  testo : string = "";
  owner: string = "";
  subscription: any;
  loading: boolean = false;

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {

  }


  ricarica(){
   this.chatService.getAllMessages(this.owner.toLowerCase())
   .subscribe( res => {

      this.messaggi = res;

      let element = document.getElementById("chat");
      if(element){
        element.scrollTop = element.scrollHeight;
      }
      });
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


          let element = document.getElementById("chat");
          console.log(element);
          if(element){
            element.scrollIntoView();
            console.log(element.scrollHeight);
            console.log(element.scrollTop);
          }
         });


      this.subscription = interval(10000).subscribe(x =>{
                                this.chatService.getAllMessages(this.owner.toLowerCase())
                                .subscribe( res => {

                                   this.messaggi = res;
                                    let element = document.getElementById("chat");
                                    if(element){
                                    }
                                   }
                                 );
      }


      );




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

                                          let element = document.getElementById("chat");
                                          if(element){
                                            element.scrollTop = element.scrollHeight;
                                          }
                                          console.log("ricarica")
                                          });

       }
     );
  }

}
