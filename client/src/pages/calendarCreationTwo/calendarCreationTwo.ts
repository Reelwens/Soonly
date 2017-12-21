import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public storage: Storage) {
    this.username = navParams.get('username');
  }

  ngOnInit(): void {
  }

  // Move to CalendarCreationThree page
  showCalendarCreationThree(name: string) : void {
    this.navCtrl.push(CalendarCreationThreePage);
  }

  // Move to myCalendarReceived page
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

}
