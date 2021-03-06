import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { NavParams } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

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
  private fullPath : string = 'assets/imgs/mic.svg';
  private base64 : string = '';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public storage: Storage) {
    if(navParams.get('img') != null && navParams.get('base64') != null) {
        this.fullPath = navParams.get('img');
        this.base64 = navParams.get('base64');
    }
  }

  ngOnInit(): void {
  }

  // Send data to calendar page
  showCalendar(name: string) : void {
    this.navCtrl.push(CalendarPage, {
      calendarName: name
    });
  }

  // Move to myCalendarReceived page
  showMyCalendarsReceived(name: string) : void {
    this.navCtrl.push(MyCalendarsReceivedPage,{},{animate:false});
  }

  // Move to myCalendarReceived page
  showMemories(name: string) : void {
    this.navCtrl.push(MemoriesPage,{},{animate:false});
  }

  // Move to calendarCreationOne page
  showCalendarCreationOne(name: string) : void {
    this.navCtrl.push(CalendarCreationOnePage);
  }

  // Move to createBox page
  showCreateBox(name: string) : void {
    this.navCtrl.push(CreateBoxPage);
  }
}
