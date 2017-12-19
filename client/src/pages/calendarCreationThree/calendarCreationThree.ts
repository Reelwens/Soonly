import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';
import { CalendarCreationTwoPage } from '../calendarCreationTwo/calendarCreationTwo';

@Component({
  selector: 'page-calendarCreationThree',
  templateUrl: 'calendarCreationThree.html'
})
export class CalendarCreationThreePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  // Move to myCalendarReceived page
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

}
