import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';

@Component({
  selector: 'page-inscriptionNext',
  templateUrl: 'inscriptionNext.html'
})
export class InscriptionNextPage implements OnInit {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
  }

  ngOnInit(): void {
  }

  // Go back
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

  // Move to myCalendarReceived page
  showMyCalendarsReceived(name: string) : void {
    this.navCtrl.push(MyCalendarsReceivedPage);
  }
}
