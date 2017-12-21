import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';

@Component({
  selector: 'page-calendarCreationThree',
  templateUrl: 'calendarCreationThree.html'
})
export class CalendarCreationThreePage {

  dPicker: DatePicker;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public datePicker: DatePicker) {
    this.dPicker = datePicker;
  }

  // Go back
  showBack(name: string) : void {
    this.navCtrl.pop();
  }

  // Move to myCalendarSend page
  showMyCalendarsSend(name: string) : void {
    this.navCtrl.push(MyCalendarsSendPage);
  }

  pickDate() : void {
    this.dPicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.dPicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
