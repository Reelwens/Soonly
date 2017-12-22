import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { DomSanitizer } from '@angular/platform-browser';

// API
import { Service } from '../../services/soonly.service';

// Pages

@Component({
  selector: 'page-openSurprise',
  templateUrl: 'openSurprise.html'
})
export class OpenSurprisePage implements OnInit {
  event: any;
  message: string;
  type: any;
  base64: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public storage: Storage,
              public toastCtrl: ToastController,
              public apiService: Service,
              private domSanitizer: DomSanitizer) {

    this.event = this.navParams.get('event');
  }

  ngOnInit(): void {
    this.storage.get("token").then( key => {
      this.apiService.setApiKey( key );
      this.apiService.getAttachement( this.navParams.get('event') ).subscribe( data => {
        console.log(data);
        if (data.success === true ){
          if (data.exists === true ) {
            if (data.attachement.type === "message") {
              this.type = "message";
              this.message = data.attachement.message;
            } else if (data.attachement.type === "image") {
              this.type = "image";
              this.base64 = data.attachement.base64;
            }
          }
        }
      })
    })
  }


  errorToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
    });
    toast.present();
  }

  // Move back
  showBack() : void {
    this.navCtrl.pop();
  }

}
