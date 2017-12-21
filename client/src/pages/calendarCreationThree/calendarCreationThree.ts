import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { Storage } from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsSendPage } from '../myCalendarsSend/myCalendarsSend';
import {Service} from "../../services/soonly.service";

@Component({
  selector: 'page-calendarCreationThree',
  templateUrl: 'calendarCreationThree.html'
})
export class CalendarCreationThreePage implements OnInit {

  username: string;
  phone: string;
  dateBegin: any;
  dateEnd: any;
  loading: any;

  today = new Date().toJSON().split('T')[0];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public storage: Storage,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public apiService: Service ) {

    this.username = navParams.get('username');
    this.phone    = navParams.get('phone');
  }

  ngOnInit(): void {
  }

  // Go back
  showBack() : void {
    this.navCtrl.pop();
  }
  errorToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
    });
    toast.present();
  }

  validationLoaderShow() {
    this.loading = this.loadingCtrl.create({
      content: 'Nous vérifions vos données, un instant !'
    });

    this.loading.present();
  }

  validationUpdate(message: string) {
    this.loading.data.content = message;
    setTimeout(() => {
      this.validationLoaderRemove();
    }, 3000);
  }

  validationLoaderRemove() {
    this.loading.dismiss();
  }


  // Move to myCalendarSend page
  showMyCalendarsSend() : void {
    this.validationLoaderShow();
    if (new Date(this.dateEnd) < new Date(this.dateBegin)) {
      this.errorToast("Attention à vos dates ! La date de fin est avant la date de début !");
    } else if ((new Date(this.dateEnd)).getTime() == (new Date(this.dateBegin)).getTime()) {
      this.errorToast("Attention ! Les dates de début et de fin sont les mêmes !");
    } else {
      this.apiService.createCalendar(this.username, this.phone, this.dateBegin, this.dateEnd).subscribe(
        data => {
          console.log(data);
          if (data.error !== undefined) {
            this.validationUpdate("Votre calendrier a bien été créé ! Vous pouvez maintenant créer vos évènements !")
          } else {
            this.validationUpdate("Une erreur a eu lieu pendant le traitenement, veuillez réessayer !")
          }
        }
      );
    }


  }

}
