import { Component, OnInit } from '@angular/core';

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

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {

  }


  carica(){
      //this.messaggi.push({owner: 1, message: "test" });

      if(!this.owner){
        this.owner = this.testo;
      }

      this.loading = true;

      this.chatService.getAllMessages(this.owner)
      .subscribe( res => {

         this.messaggi = res;
         this.testo = '';
         this.loading = false;
         });


      this.subscription = interval(10000).subscribe(x =>{
                                this.chatService.getAllMessages(this.owner)
                                .subscribe( res => {

                                   this.messaggi = res;
                                   this.testo = '';
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

    this.chatService.saveMessaggio(this.testo, this.owner).subscribe( res => {
       this.testo = '';

                                       this.chatService.getAllMessages(this.owner)
                                       .subscribe( res => {

                                          this.messaggi = res;
                                          this.testo = '';
                                          console.log("ricarica")
                                          });

       }
     );
  }

}
