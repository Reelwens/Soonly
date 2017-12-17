import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { HomePage } from '../home/home';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  // Variables
  username: string;
  age: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Get data from old page
    this.username = navParams.get('username');
    this.age = navParams.get('age');
  }

  // Send data to a new page
  showHome() {
    this.navCtrl.push(HomePage);
  }

}
