import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatapp';
  socket: any;
  textToBeTranslated: string = "";
  targetLanguage: string = "";
  translatedText: string = "";
  translatedList: Array<any> = [];
  audio: string = ""
  audioTranslate: string = "";

  constructor() {
    // the clients and the server should communicate using socket.io
    // sends a connection request to the server
    this.socket = io(); // connection event
  }

  ngOnInit() {
    this.getTranslatedList()
  }

  getTranslatedList() {
    this.socket.on("translateResult", (data:any) => {
      // list = the data of the translated list
      this.translatedList = data;
      console.log(this.translatedList)
      for (let i = 0; i < data.length; i++) {
        this.textToBeTranslated = data[i].text;
        console.log(data[i].translation)
        this.translatedText = data[i].translation;
        this.audio = data[i].audioSpeech;
        console.log(this.audio)
        this.audioTranslate = data[i].audioSpeechTranslation;
        console.log(this.audioTranslate)
      }
    })
  }

  onSelectLanguage(item: any) {
    this.targetLanguage = item
    console.log(this.targetLanguage)
  }

  // a client sends a text and the target language to the server via a socket.io event
  submitBtn() {
    let obj = {
      inputText: this.textToBeTranslated,
      newLanguage: this.targetLanguage
    }

    this.socket.emit('translator', obj)

  }


}
