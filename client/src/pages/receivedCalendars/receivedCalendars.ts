import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { MyCalendarsPage } from '../myCalendars/myCalendars';

@Component({
  selector: 'page-receivedCalendars',
  templateUrl: 'receivedCalendars.html'
})
export class ReceivedCalendarsPage {

  // Variables
  username: string;
  age: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Get data from old page
    this.username = navParams.get('username');
    this.age = navParams.get('age');
  }

  // Send data to a new page
  showMyCalendars() {
    this.navCtrl.push(MyCalendarsPage);
  }

}
