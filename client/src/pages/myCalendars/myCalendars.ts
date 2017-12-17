import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { ReceivedCalendarsPage } from '../receivedCalendars/receivedCalendars';

@Component({
  selector: 'page-myCalendars',
  templateUrl: 'myCalendars.html'
})
export class MyCalendarsPage {

  // Variables
  username: string;
  age: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    console.log("Hey");
  }

  // Send data to a new page
  showReceivedCalendars() {
    this.navCtrl.push(ReceivedCalendarsPage, {
      username: this.username,
      age: this.age
    });
  }

  // Print alert
  alertAction() : void {
    let alert = this.alertCtrl.create({
      title: 'Bravo !',
      subTitle: 'Tu as appuyé sur le bouton !',
      buttons: ['OK']
    });
    alert.present();
  }
}
