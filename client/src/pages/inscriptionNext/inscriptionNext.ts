import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';

@Component({
  selector: 'page-inscriptionNext',
  templateUrl: 'inscriptionNext.html'
})
export class InscriptionNextPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  // Go back
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

  // Move to myCalendarReceived page
  showMyCalendarsReceived(name: string) : void {
    this.navCtrl.push(MyCalendarsReceivedPage);
  }
}
