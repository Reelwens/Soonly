import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

// API
//import { Service } from '../../services/soonly.service';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public storage: Storage) {

    this.date = navParams.get('date');
    this.calendar = navParams.get('calendar');
  }

  ngOnInit(): void {
  }

  // Move back
  showBack() : void {
    this.navCtrl.pop();
  }

  // Move to myCalendarSend page
  showMyCalendarsSend(name: string) : void {
    this.navCtrl.push(MyCalendarsSendPage);
  }
}
