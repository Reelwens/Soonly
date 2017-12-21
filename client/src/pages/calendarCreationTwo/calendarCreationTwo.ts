import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { CalendarCreationThreePage } from '../calendarCreationThree/calendarCreationThree';

@Component({
  selector: 'page-calendarCreationTwo',
  templateUrl: 'calendarCreationTwo.html'
})
export class CalendarCreationTwoPage implements OnInit {

  // variables
  username: string;
  phone: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public storage: Storage,
              public toastCtrl: ToastController ) {
    this.username = navParams.get('username');
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

  // Move to CalendarCreationThree page
  showCalendarCreationThree() : void {
    const regex = /^0[67][0-9]{8}$/;
    if (this.phone == "" || this.phone == undefined ) {
      this.errorToast("Saisissez un numéro de téléphone !");
    } else if ((regex.exec(this.phone)) === null) {
      this.errorToast("Oups ! Votre numéro ne semble pas être un numéro de téléphone !");
    } else {
      this.navCtrl.push(CalendarCreationThreePage, {
        username: this.username,
        phone: this.phone
      })
    }

  }

  // Move to myCalendarReceived page
  showBack() : void {
    this.navCtrl.pop();
  }

}
