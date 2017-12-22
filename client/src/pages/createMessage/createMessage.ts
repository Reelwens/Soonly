import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, NavParams, ToastController, LoadingController} from 'ionic-angular';
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
  private loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
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

  validationLoaderShow() {
    this.loading = this.loadingCtrl.create({
      content: 'Nous vérifions vos données, un instant !'
    });

    this.loading.present();
  }

  validationUpdate(message: string) {
    this.loading.data.content = message;
    setTimeout(() => {
      this.validationLoaderRemove();
    }, 3000);
  }

  validationLoaderRemove() {
    this.loading.dismiss();
  }

  errorToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
    });
  }

  buildTheEvent() {
    if (this.message !== undefined ) {
      this.validationLoaderShow();
      this.storage.get("token").then( key => {
        this.apiService.setApiKey( key );
        this.apiService.createMessageAttachement(1, this.message).subscribe(
          data => {
            let attachement = data.message.id;
            this.apiService.setEvent(this.calendar, this.date, 1, attachement).subscribe(
              data2 => {
                this.showMyCalendarsSend();
              }
            )
          }
        );
      })
    }
  }
  // Move to myCalendarSend page
  showMyCalendarsSend() : void {
    this.navCtrl.push(MyCalendarsSendPage);
  }
}
