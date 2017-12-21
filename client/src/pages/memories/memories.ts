import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';


@Component({
  selector: 'page-memories',
  templateUrl: 'memories.html'
})
export class MemoriesPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  // Move to myCalendarSend page
  showMyCalendarsSend(name: string) : void {
    this.navCtrl.push(MyCalendarsSendPage);
  }

  // Move to myCalendarReceived page
  showMyCalendarsReceived(name: string) : void {
    this.navCtrl.push(MyCalendarsReceivedPage);
  }
}
