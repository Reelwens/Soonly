import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import { Storage } from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { CalendarCreationTwoPage } from '../calendarCreationTwo/calendarCreationTwo';

@Component({
  selector: 'page-calendarCreationOne',
  templateUrl: 'calendarCreationOne.html'
})
export class CalendarCreationOnePage implements OnInit {

  // variables
  username: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage, public toastCtrl: ToastController) {
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

  // Move to CalendarCreationTwo page & send data
  showCalendarCreationTwo() : void {
    if (this.username == "" || this.username == undefined ) {
      this.errorToast("Saisissez un petit surnom !");
    } else {
      this.navCtrl.push(CalendarCreationTwoPage, {
        username: this.username
      });
    }

  }

  // Move to myCalendarReceived page
  showBack() : void {
    this.navCtrl.pop();
  }

}
