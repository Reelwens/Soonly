import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Storage }     from '@ionic/storage';

// API
import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import { CalendarCreationOnePage } from '../calendarCreationOne/calendarCreationOne';
import { MemoriesPage } from '../memories/memories';
import { InscriptionPage } from '../inscription/inscription';
import { OpenSurprisePage } from '../openSurprise/openSurprise';

@Component({
  selector: 'page-myCalendarsReceived',
  templateUrl: 'myCalendarsReceived.html'
})
export class MyCalendarsReceivedPage implements OnInit {

  calendars: any;
  events: any;
  calendarid: any = true;

  constructor(public navCtrl:     NavController,
              public alertCtrl:   AlertController,
              public apiService:  Service,
              public storage:     Storage,
              public navParams:   NavParams) {
    const component = this;
    component.calendarid = navParams.get('calendar');

  }

  ngOnInit(): void {
    const component = this;
    this.storage.get("token").then( key => {
      if (key !== null) {
        this.apiService.setApiKey( key );
        this.apiService.getEvents().subscribe(
          data => {
            if (data.calendarsReceiver != null ){
              if ( this.calendarid === undefined ) {
                component.events = data.calendarsReceiver[Object.keys( data.calendarsReceiver )[0]];
                component.calendarid = Object.keys( data.calendars )[0];
              } else {
                component.events = data.calendarsReceiver[component.calendarid];
              }
            }
          }
        );
        this.apiService.getCalendars().subscribe(
          data => {
            this.calendars = data.calendarsReceiver;
          }
        );
      } else {
        this.showInscription();
      }

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
    this.navCtrl.push(MyCalendarsSendPage,{},{animate:false});
  }

  // Move to openSurprise page
  showOpenSurprise(name: string) : void {
    this.navCtrl.push(OpenSurprisePage);
  }

  // Move to myCalendarReceived page
  showMemories(name: string) : void {
    this.navCtrl.push(MemoriesPage,{},{animate:false});
  }

  // Move to calendarCreationOne page
  showCalendarCreationOne(name: string) : void {
    this.navCtrl.push(CalendarCreationOnePage);
  }

  // Move to inscription page
  showInscription() : void {
    this.navCtrl.push(InscriptionPage);
  }

  showTheCalendar(id: number) {
    this.navCtrl.push(MyCalendarsReceivedPage, {
      calendar: id
    });
  }
}
