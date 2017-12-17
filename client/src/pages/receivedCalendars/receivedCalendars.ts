import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { MyCalendarsPage } from '../myCalendars/myCalendars';

@Component({
  selector: 'page-receivedCalendars',
  templateUrl: 'receivedCalendars.html'
})
export class ReceivedCalendarsPage {
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = navParams.get('username');
    console.log('test')
    console.log('Salut ' + this.username);
  }

  // Send data to a new page
  showMyCalendars() {
    this.navCtrl.push(MyCalendarsPage);
  }

}
