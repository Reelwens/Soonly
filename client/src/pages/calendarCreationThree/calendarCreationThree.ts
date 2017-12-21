import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Storage } from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';

@Component({
  selector: 'page-calendarCreationThree',
  templateUrl: 'calendarCreationThree.html'
})
export class CalendarCreationThreePage implements OnInit {

  username: string;
  phone: string;
  dateBegin: any;
  dateEnd: any;

  today = new Date().toJSON().split('T')[0];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public storage: Storage) {

    this.username = navParams.get('username');
    this.phone    = navParams.get('phone');
  }

  ngOnInit(): void {
  }

  // Go back
  showBack() : void {
    this.navCtrl.pop();
  }

  // Move to myCalendarSend page
  showMyCalendarsSend() : void {



  }

}
