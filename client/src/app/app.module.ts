import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

// Pages
import { MyCalendarsReceivedPage } from '../pages/myCalendarsReceived/myCalendarsReceived';
import { MyCalendarsSendPage } from '../pages/myCalendarsSend/myCalendarsSend';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalendarCreationOnePage } from '../pages/calendarCreationOne/calendarCreationOne';
import { CalendarCreationTwoPage } from '../pages/calendarCreationTwo/calendarCreationTwo';
import { CalendarCreationThreePage } from '../pages/calendarCreationThree/calendarCreationThree';
import { CreateBoxPage } from '../pages/createBox/createBox';
import { InscriptionPage } from '../pages/inscription/inscription';
import { InscriptionNextPage } from '../pages/inscriptionNext/inscriptionNext';

// API
import { Service } from '../services/soonly.service';
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    MyCalendarsReceivedPage,
    MyCalendarsSendPage,
    CalendarPage,
    CalendarCreationOnePage,
    CalendarCreationTwoPage,
    CalendarCreationThreePage,
    CreateBoxPage,
    InscriptionPage,
    InscriptionNextPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyCalendarsReceivedPage,
    MyCalendarsSendPage,
    CalendarPage,
    CalendarCreationOnePage,
    CalendarCreationTwoPage,
    CalendarCreationThreePage,
    CreateBoxPage,
    InscriptionPage,
    InscriptionNextPage
  ],
  providers: [
    Service,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
