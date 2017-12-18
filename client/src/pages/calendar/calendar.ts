import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
  calendarName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.calendarName = navParams.get('calendarName');
  }

  // Send data to a new page
  showMyCalendarsReceived() {
    this.navCtrl.push(MyCalendarsReceivedPage);
  }

}
