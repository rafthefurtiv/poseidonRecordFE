import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';

import { ChatService } from '../chat.service';

import { interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('chat') private divToScroll!: ElementRef;

  messaggi : any[] = [];
  testo : string = "";
  owner: string = "";
  subscription: any;
  sub1: any;
  sub2: any;
  loading: boolean = false;
  ultimoId: number = 0;
  semaforo = true;

  elem = document.getElementById("chat");

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {
    //this.elem = document.getElementById("chat");
    this.goToEnd();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
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

  private scrollToBottom(): void {
    try {
      this.divToScroll.nativeElement.scrollTop =
        this.divToScroll.nativeElement.scrollHeight;
    } catch (err) {}
  }


  goToEnd(){
      let element = document.getElementById("chat");
      if(element){
        element.scrollTop = element.scrollHeight;
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


  debugResponse(){
    const debugListMessages = [];

    for (let index = 0; index < 50; index++) {
          debugListMessages.push({
            "id": index,
            "messaggio": "Test ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"+index,
            "owner": index % 2 === 0 ? "r" : "l",
            "timestamp": "2025-12-10T14:29:39.000+00:00"
          });
    }
    return debugListMessages;
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
         //this.messaggi = this.debugResponse();
         this.testo = '';
         this.loading = false;
         this.goToEnd();
         this.scrollToBottom();
         this.ultimoId = this.getLastMessageID(this.messaggi);

        });


      this.subscription = interval(2000).subscribe(x =>{
        this.chatService.getNewMessages(this.owner.toLowerCase(), this.ultimoId.toString())
        .subscribe( res => {

          if(this.semaforo){
              this.semaforo = false;
              if(res && res.length > 0){
                this.messaggi.push(...res);
                this.goToEnd();
              }

              this.ultimoId = this.getLastMessageID(this.messaggi);
              if(!this.ultimoId){
                this.ultimoId = 0;
              }

              this.semaforo = true;
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

                                this.chatService.getNewMessages(this.owner.toLowerCase(), this.ultimoId.toString())
                                .subscribe( res => {


                                   if(this.semaforo){
                                      this.semaforo = false;
                                      if(res && res.length > 0){
                                       this.messaggi.push(...res);
                                      }

                                      this.ultimoId = this.getLastMessageID(this.messaggi);
                                      if(!this.ultimoId){
                                        this.ultimoId = 0;
                                      }

                                      this.semaforo = true;
                                   }






                                });

       }
     );
  }

}
