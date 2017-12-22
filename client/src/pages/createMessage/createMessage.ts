import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

// API
import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';

@Component({
  selector: 'page-createMessage',
  templateUrl: 'createMessage.html',
  providers: [[Camera], [MediaCapture], [Base64]]
})
export class CreateMessagePage implements OnInit {

  date:     string;
  calendar: any;
  message:  string;
  data:     any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public storage: Storage,
              public apiService: Service) {

    this.date = navParams.get('date');
    this.calendar = navParams.get('calendar');

    let tmpDate = this.date.split("/");
    this.date = tmpDate[2] + "-" + tmpDate[1] + "-" + tmpDate[0];
  }

  ngOnInit(): void {
  }

  // Move back
  showBack() : void {
    this.navCtrl.pop();
  }

  buildTheEvent() {
    if (this.message !== undefined ) {
      this.storage.get("token").then( key => {
        this.apiService.setApiKey( key);
        this.apiService.createMessageAttachement(1, this.message).subscribe(
          data => {
            let attachement = data.message.id;

            this.apiService.setEvent(this.calendar, this.date, 1, attachement).subscribe(
              data2 => {
                console.log(data2);
              }
            )
          }
        );
      })
    }
  }

  // Move to myCalendarSend page
  showMyCalendarsSend(name: string) : void {
    this.navCtrl.push(MyCalendarsSendPage);
  }
}
