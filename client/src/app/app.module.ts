import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Pages
import { MyCalendarsReceivedPage } from '../pages/myCalendarsReceived/myCalendarsReceived';
import { CalendarPage } from '../pages/calendar/calendar';

// API
import { Service } from '../services/soonly.service';

@NgModule({
  declarations: [
    MyApp,
    MyCalendarsReceivedPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyCalendarsReceivedPage,
    CalendarPage
  ],
  providers: [
    Service,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
