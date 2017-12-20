import {Component, OnInit} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage} from "@ionic/storage";

// API
import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';
import { CalendarCreationOnePage } from '../calendarCreationOne/calendarCreationOne';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-myCalendarsSend',
  templateUrl: 'myCalendarsSend.html'
})
export class MyCalendarsSendPage implements OnInit {

  calendars: any;
  events: any;
  private observqbleEvents: Observable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage, public apiService: Service) {
  }

  ngOnInit(): void {
    this.observqbleEvents = this.apiService.getEvents();
    const component = this;
    this.storage.get("token").then( key => {
      this.apiService.setApiKey( key );
      this.apiService.getEvents().subscribe(
        data => {
          component.events = data.calendars;
          console.log(data);
          component.events = data.calendars['1'];
        }
      );
      this.apiService.getCalendars().subscribe(
        data => {
          this.calendars = data.calendars;
          console.log(data);
        }
      );
    });
  }
fd(){
    console.log(this.events);
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

  hax(variable: any) {
    return Array.from(variable);
  }
}
