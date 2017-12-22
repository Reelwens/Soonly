import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

// API
import { Service } from '../../services/soonly.service';

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
  name:     string;
  calendar: any;
  date:     string;
  video:    MediaFile;
  test:     string = '';

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public mediaCapture: MediaCapture,
              public base64: Base64,
              public storage: Storage,

              public apiService: Service) {
    this.calendar = navParams.get('calendar');
    this.date = navParams.get('date');
    this.name = navParams.get('name');
  }

  ngOnInit(): void {
  }

  // Move back
  showBack() : void {
    this.navCtrl.pop();
  }

  // Move to createMessage page
  showCreateMessage() : void {

    this.navCtrl.push(CreateMessagePage, {
      calendar: this.calendar,
      date: this.date
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
      this.storage.get("token").then( key => {
        this.apiService.setApiKey( key );
        this.apiService.createImageAttachement(base64File).subscribe(data => {
          console.log(data)
        })
      })
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
