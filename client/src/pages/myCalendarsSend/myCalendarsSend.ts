import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';
import { CalendarCreationOnePage } from '../calendarCreationOne/calendarCreationOne';
import { CreateBoxPage } from '../createBox/createBox';

@Component({
  selector: 'page-myCalendarsSend',
  templateUrl: 'myCalendarsSend.html'
})
export class MyCalendarsSendPage {
  private fullPath : string = 'assets/imgs/mic.svg';
  private base64 : string = '';
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
    if(navParams.get('img') != null && navParams.get('base64') != null) {
        this.fullPath = navParams.get('img');
        this.base64 = navParams.get('base64');
    }
  }

  // Send data to calendar page
  showCalendar(name: string) : void {
    this.navCtrl.push(CalendarPage, {
      calendarName: name
    });
  }

  // Move to myCalendarReceived page
  showMyCalendarsReceived(name: string) : void {
    this.navCtrl.push(MyCalendarsReceivedPage);
  }

  // Move to calendarCreationOne page
  showCalendarCreationOne(name: string) : void {
    this.navCtrl.push(CalendarCreationOnePage);
  }

  // Move to createBox page
  showCreateBox(name: string) : void {
    this.navCtrl.push(CreateBoxPage);
  }


  // Print alert
  alertAction() : void {
    let alert = this.alertCtrl.create({
      title: 'Bravo !',
      subTitle: 'Tu as appuyé sur le bouton !',
      buttons: ['OK']
    });
    alert.present();
  }
}
