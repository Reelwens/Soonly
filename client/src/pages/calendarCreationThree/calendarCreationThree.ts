import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';

@Component({
  selector: 'page-calendarCreationThree',
  templateUrl: 'calendarCreationThree.html'
})
export class CalendarCreationThreePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  // Go back
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

  // Move to myCalendarSend page
  showMyCalendarsSend(name: string) : void {
    this.navCtrl.push(MyCalendarsSendPage);
  }

}
