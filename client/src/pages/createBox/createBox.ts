import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';

@Component({
  selector: 'page-createBox',
  templateUrl: 'createBox.html'
})
export class CreateBoxPage {

  // variables
  username: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  // Move back
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

}
