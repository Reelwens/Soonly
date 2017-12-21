import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { DatePicker } from '@ionic-native/date-picker';

// Pages
import { MyCalendarsReceivedPage } from '../pages/myCalendarsReceived/myCalendarsReceived';
import { MyCalendarsSendPage } from '../pages/myCalendarsSend/myCalendarsSend';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalendarCreationOnePage } from '../pages/calendarCreationOne/calendarCreationOne';
import { CalendarCreationTwoPage } from '../pages/calendarCreationTwo/calendarCreationTwo';
import { CalendarCreationThreePage } from '../pages/calendarCreationThree/calendarCreationThree';
import { CreateBoxPage } from '../pages/createBox/createBox';
import { CreateMessagePage } from '../pages/createMessage/createMessage';
import { InscriptionPage } from '../pages/inscription/inscription';
import { InscriptionNextPage } from '../pages/inscriptionNext/inscriptionNext';
import { MemoriesPage } from '../pages/memories/memories';

// API
import { Service } from '../services/soonly.service';
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";

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
    CreateMessagePage,
    InscriptionPage,
    InscriptionNextPage,
    MemoriesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
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
    CreateMessagePage,
    InscriptionPage,
    InscriptionNextPage,
    MemoriesPage
  ],
  providers: [
    Service,
    StatusBar,
    SplashScreen,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
