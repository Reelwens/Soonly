import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

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
export class CalendarCreationOnePage implements OnInit {

  // variables
  username: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
  }

  ngOnInit(): void {
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
