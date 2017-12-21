import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

// Pages
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage implements OnInit {
  calendarName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.calendarName = navParams.get('calendarName');
  }

  ngOnInit(): void {
  }

  // Send data to a new page
  showMyCalendarsReceived() {
    this.navCtrl.push(MyCalendarsReceivedPage);
  }

}
