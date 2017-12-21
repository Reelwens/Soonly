import {Component, OnInit} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage} from "@ionic/storage";
import { NavParams } from 'ionic-angular';

// API
import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';
import { CalendarCreationOnePage } from '../calendarCreationOne/calendarCreationOne';
import { CreateBoxPage } from '../createBox/createBox';
import { MemoriesPage } from '../memories/memories';

@Component({
  selector: 'page-myCalendarsSend',
  templateUrl: 'myCalendarsSend.html'
})
export class MyCalendarsSendPage implements OnInit {

  calendars: any;
  events: any;
  calendarid: any = 2;
  private fullPath : string = 'assets/imgs/mic.svg';
  private base64 : string = '';

  constructor(public storage: Storage, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,public apiService: Service) {
    this.calendarid = navParams.get('calendar');
    if(navParams.get('img') != null && navParams.get('base64') != null) {
        this.fullPath = navParams.get('img');
        this.base64 = navParams.get('base64');
    }
  }

  ngOnInit(): void {
    const component = this;
    this.storage.get("token").then( key => {
      this.apiService.setApiKey( key );
      this.apiService.getEvents().subscribe(
        data => {
          if ( this.calendarid === undefined ) {
            component.events = data.calendars[Object.keys( data.calendars )[0]];
            component.calendarid = Object.keys( data.calendars )[0];
          } else {
            component.events = data.calendars[component.calendarid];
          }
        }
      );
      this.apiService.getCalendars().subscribe(
        data => {
          component.calendars = data.calendars;
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

  // Move to myCalendarReceived page
  showMemories(name: string) : void {
    this.navCtrl.push(MemoriesPage);
  }

  // Move to calendarCreationOne page
  showCalendarCreationOne(name: string) : void {
    this.navCtrl.push(CalendarCreationOnePage);
  }

  // Move to createBox page
  showCreateBox(name: string) : void {
    this.navCtrl.push(CreateBoxPage);
  }

  showTheCalendar(id: number) {
    this.navCtrl.push(MyCalendarsSendPage, {
      calendar: id
    });
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

  changeDisplayedCalendar(param: number) {

  }
}
