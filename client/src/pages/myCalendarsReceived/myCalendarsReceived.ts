import {Component, OnInit} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage }     from '@ionic/storage';

// API
import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import { CalendarCreationOnePage } from '../calendarCreationOne/calendarCreationOne';

@Component({
  selector: 'page-myCalendarsReceived',
  templateUrl: 'myCalendarsReceived.html'

})
export class MyCalendarsReceivedPage implements OnInit {

  calendars: any;
  events: any;

  constructor(public navCtrl:     NavController,
              public alertCtrl:   AlertController,
              public apiService:  Service,
              public storage:     Storage) {
  }

  public ngOnInit() {
    this.storage.get("token").then( key => {
      this.apiService.setApiKey( key );
      this.apiService.getCalendars().subscribe(
        data => {
          this.calendars = data.calendars;
          console.log(data);
        }
      );
      this.apiService.getEvents().subscribe(
        data => {
          this.events = data.calendars;
          console.log(this.events);
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

  // Move to myCalendarSend page
  showMyCalendarsSend(name: string) : void {
    this.navCtrl.push(MyCalendarsSendPage);
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
