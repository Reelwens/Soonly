import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages

@Component({
  selector: 'page-openSurprise',
  templateUrl: 'openSurprise.html'
})
export class OpenSurprisePage implements OnInit {


  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public storage: Storage,
              public toastCtrl: ToastController ) {
  }

  ngOnInit(): void {
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
