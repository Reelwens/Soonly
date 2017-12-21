import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';
import {Service} from "../../services/soonly.service";


@Component({
  selector: 'page-memories',
  templateUrl: 'memories.html'
})
export class MemoriesPage implements OnInit {
  memories: any;
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public storage: Storage,
              public apiService: Service) {
  }

  ngOnInit(): void {
    const component = this;
    this.storage.get("token").then(key => {
      if (key !== null) {
        this.apiService.setApiKey(key);
        this.apiService.getMemories().subscribe(
          data => {
            component.memories = data.memories;
            console.log(data);

          }
        )
      }
    })
  }

  // Move to myCalendarSend page
  showMyCalendarsSend(name: string) : void {
    this.navCtrl.push(MyCalendarsSendPage,{},{animate:false});
  }

  // Move to myCalendarReceived page
  showMyCalendarsReceived(name: string) : void {
    this.navCtrl.push(MyCalendarsReceivedPage,{},{animate:false});
  }
}
