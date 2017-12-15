import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

}
