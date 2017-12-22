import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import { CreateMessagePage } from '../createMessage/createMessage';

@Component({
  selector: 'page-createBox',
  templateUrl: 'createBox.html',
  providers: [[Camera], [MediaCapture], [Base64]]
})
export class CreateBoxPage implements OnInit {

  // variables
  username: string;
  calendar: any;
  date:     string;
  video:    MediaFile;
  test:     string = '';

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public mediaCapture: MediaCapture,
              public base64: Base64,
              public storage: Storage) {
    this.calendar = navParams.get('calendar');
    this.date = navParams.get('date');
  }

  ngOnInit(): void {
  }

  // Move back
  showBack() : void {
    this.navCtrl.pop();
  }

  // Move to createMessage page
  showCreateMessage(calendar: any, date:string) : void {
    this.navCtrl.push(CreateMessagePage, {
      calendar: calendar,
      date: date
    });
  }

  // Open audio
  openVideo() : void {
    this.mediaCapture.captureVideo()
      .then(
        (data: MediaFile[]) => this.validVideo(data),
        (err: CaptureError) => console.error(err)
      );
  }

  // Open camera photo
  openCamera() : void {
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureImage(options)
      .then(
        (data: MediaFile[]) => this.validImage(data),
        (err: CaptureError) => console.error(err)
      );
  }

  // Create base64File variable (picture taken in base64)
  private validImage(medias : MediaFile[]) : void {
    this.base64.encodeFile(medias[0].fullPath).then((base64File: string) => {
      this.navCtrl.push(MyCalendarsSendPage, {
        img: medias[0].fullPath,
        base64: base64File
      });
    }, (err) => {
      console.log(err);
    });
  }

  // Redirect on new page
  private validVideo(medias : MediaFile[]) : void {
      this.navCtrl.push(MyCalendarsSendPage, {
        video: medias[0].fullPath
      });
  }
}
