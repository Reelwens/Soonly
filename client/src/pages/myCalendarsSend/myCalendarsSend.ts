import {Component, OnInit} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage} from "@ionic/storage";

// API
import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';
import { CalendarCreationOnePage } from '../calendarCreationOne/calendarCreationOne';

@Component({
  selector: 'page-myCalendarsSend',
  templateUrl: 'myCalendarsSend.html'
})
export class MyCalendarsSendPage implements OnInit {

  calendars: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage, public apiService: Service) {
  }

  ngOnInit(): void {

    this.storage.get("token").then( key => {
      this.apiService.setApiKey( key );
      this.apiService.getCalendars( ).subscribe(
        data => {
          this.calendars = data.calendars;
        }
      );
    });
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
