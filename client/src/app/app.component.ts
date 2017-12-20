import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from "@ionic/storage";

import { MyCalendarsReceivedPage } from '../pages/myCalendarsReceived/myCalendarsReceived';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MyCalendarsReceivedPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      storage.set("token", "c98d17a674abbffac2f3c0978cae8f8500d9a9b6f0ce65a214039b177a027d23");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
