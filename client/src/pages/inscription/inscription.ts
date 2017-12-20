import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// API
//import { Service } from '../../services/soonly.service';

// Pages
import { InscriptionNextPage } from '../inscriptionNext/inscriptionNext';

@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html'
})
export class InscriptionPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  //Move to inscriptionNext page & send data
  showInscriptionNext(name: string) : void {
    this.navCtrl.push(InscriptionNextPage);
  }
}
