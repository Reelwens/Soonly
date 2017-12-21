import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { CalendarPage } from '../calendar/calendar';
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import { CalendarCreationOnePage } from '../calendarCreationOne/calendarCreationOne';
import { InscriptionPage } from '../inscription/inscription';
import { MemoriesPage } from '../memories/memories';

@Component({
  selector: 'page-myCalendarsReceived',
  templateUrl: 'myCalendarsReceived.html'
})
export class MyCalendarsReceivedPage implements OnInit {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
  }

  ngOnInit(): void {
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

  // Move to myCalendarReceived page
  showMemories(name: string) : void {
    this.navCtrl.push(MemoriesPage);
  }

  // Move to calendarCreationOne page
  showCalendarCreationOne(name: string) : void {
    this.navCtrl.push(CalendarCreationOnePage);
  }

  // Move to inscription page
  showInscription(name: string) : void {
    this.navCtrl.push(InscriptionPage);
  }
}
