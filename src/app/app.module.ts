import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Pages
import { MyCalendarsPage } from '../pages/myCalendars/myCalendars';
import { ReceivedCalendarsPage } from '../pages/receivedCalendars/receivedCalendars';

// API
import { Service } from '../services/soonly.service';

@NgModule({
  declarations: [
    MyApp,
    MyCalendarsPage,
    ReceivedCalendarsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyCalendarsPage,
    ReceivedCalendarsPage
  ],
  providers: [
    Service,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
