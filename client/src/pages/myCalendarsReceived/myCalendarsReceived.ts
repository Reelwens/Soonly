import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';

@Component({
  selector: 'page-myCalendarsReceived',
  templateUrl: 'myCalendarsReceived.html'
})
export class MyCalendarsReceivedPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    console.log("Hey");
  }

  // Send data to a new page
  showCalendar(name: string) : void {
    this.navCtrl.push(CalendarPage, {
      calendarName: name
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
