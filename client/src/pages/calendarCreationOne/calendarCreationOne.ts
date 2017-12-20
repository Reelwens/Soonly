import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';
import { CalendarCreationTwoPage } from '../calendarCreationTwo/calendarCreationTwo';

@Component({
  selector: 'page-calendarCreationOne',
  templateUrl: 'calendarCreationOne.html'
})
export class CalendarCreationOnePage {

  // variables
  username: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  // Move to CalendarCreationTwo page & send data
  showCalendarCreationTwo(name: string) : void {
    this.navCtrl.push(CalendarCreationTwoPage, {
      username: this.username
    });
  }

  // Move to myCalendarReceived page
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

}
