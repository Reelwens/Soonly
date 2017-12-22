import { Component } from '@angular/core';
import {Storage} from "@ionic/storage";
import {NavController, AlertController, LoadingController, ToastController} from 'ionic-angular';

// API
import { Service } from '../../services/soonly.service';

// Pages
import { MyCalendarsReceivedPage } from '../myCalendarsReceived/myCalendarsReceived';

@Component({
  selector: 'page-loginNext',
  templateUrl: 'loginNext.html'
})
export class LoginNextPage {
  private loading: any;
  public user = {
    name: "",
    phone: "",
    password: ""
  };

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public storage: Storage,
              public apiService: Service ) {
  }

  ngOnInit(): void {
  }

  // Go back
  showBack() : void {
    this.navCtrl.pop();
  }

  // Move to myCalendarReceived page
  showMyCalendarsReceived() : void {
    this.navCtrl.push(MyCalendarsReceivedPage);
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

  errorToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
    });


    toast.present();
  }

  validateForm() {
    console.log(this.user);
    this.validationLoaderShow();
    let regexPhone = "/^0[67][0-9]{8}$/";
    if (this.user.name == "") {
      this.errorToast("Donnez-nous un petit nom par lequel vous appeler !");
      this.validationLoaderRemove();
    } else if (this.user.phone == ""){
      this.errorToast("Vous êtes sûr que vous n'auriez pas un numéro de portable ?");
     this.validationLoaderRemove();
    } else if (regexPhone.match(this.user.phone)) {
      this.errorToast("Oups ! Votre numéro ne semble pas être un numéro de téléphone !");
      this.validationLoaderRemove();
    } else if (this.user.password == "") {
      this.errorToast("Entrez un mot de passe, pour garder vos données à l'abri !");
      this.validationLoaderRemove();
    } else {
      this.apiService.createUser(this.user.phone, this.user.name, this.user.password).subscribe(
        data => {
          if (data.success !== true ){
            if (data.error === "user.exists") {
              this.validationUpdate("Oops, cet utilisateur existe déjà ! Si vous possédez déjà un compte, connectez-vous.");
              this.errorToast("Oops, cet utilisateur existe déjà ! Si vous possédez déjà un compte, connectez-vous.");
            } else {
              this.validationUpdate("Une erreur à eu lieu lors de l'enregistrement. Vérifiez que vous ne soyez pas hors-ligne.");
            }
          } else {
            console.log(data);

            this.storage.set("token", data.user.token).then(
              success => {
                this.validationUpdate("Vous avez bien été enregistré ! Bienvenue !");
                setTimeout(() => {
                  this.showMyCalendarsReceived();
                }, 3000);
              }
            )

          }
        },
        error2 => {
          this.validationUpdate("Une erreur à eu lieu lors de l'enregistrement. Vérifiez que vous ne soyez pas hors-ligne.");
        }
      );

    }

  }
}
