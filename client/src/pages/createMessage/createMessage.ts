import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { CreateBoxPage } from '../createBox/createBox';
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';

@Component({
  selector: 'page-createMessage',
  templateUrl: 'createMessage.html',
  providers: [[Camera], [MediaCapture], [Base64]]
})
export class CreateMessagePage implements OnInit {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
  }

  ngOnInit(): void {
  }

  // Move back
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

  // Move to myCalendarSend page
  showMyCalendarsSend(name: string) : void {
    this.navCtrl.push(MyCalendarsSendPage);
  }
}
