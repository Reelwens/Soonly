import {Component, OnInit} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage} from "@ionic/storage";

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { InscriptionNextPage } from '../inscriptionNext/inscriptionNext';
import { LoginNextPage } from '../loginNext/loginNext';

@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html'
})
export class InscriptionPage implements OnInit{


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
  }

  ngOnInit(): void {
  }


  //Move to inscriptionNext page & send data
  showInscriptionNext() : void {
    this.navCtrl.push(InscriptionNextPage);
  }

  //Move to loginNext page & send data
  showLoginNext() : void {
    this.navCtrl.push(LoginNextPage);
  }
}
