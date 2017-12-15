import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Variables
  username: string;
  age: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    console.log("Hey");
  }

  // Send data to a new page
  private showDetails() {
    this.navCtrl.push(DetailsPage, {
      username: this.username,
      age: this.age
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
}
