import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';

@Component({
  selector: 'page-myCalendarsSend',
  templateUrl: 'myCalendarsSend.html'
})
export class MyCalendarsSendPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  // Send data to calendar page
  showCalendar(name: string) : void {
    this.navCtrl.push(CalendarPage, {
      calendarName: name
    });
  }

  // Move to myCalendarReceived page
  showMyCalendarsReceived(name: string) : void {
    this.navCtrl.push(MyCalendarsReceivedPage);
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
