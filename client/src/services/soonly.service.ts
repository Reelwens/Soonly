// Core components
import { Injectable, OnInit }   from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { Storage }              from '@ionic/storage';
import {Observable} from "rxjs/Observable";

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';



// Models
@Injectable()
export class Service implements OnInit{


  // Variables
  private baseUrl: string = 'https://hetic.antoine-dunn.fr/h3/time/web/app_dev.php/api/';
  private apiKey: string = 'c98d17a674abbffac2f3c0978cae8f8500d9a9b6f0ce65a214039b177a027d23';

  constructor(private http: HttpClient, private storage: Storage) {
  }

  public ngOnInit(): void {

  }

  public setApiKey( key: string ) {
    this.apiKey = key;
    return this;
  }


  public getUser(): Promise<any> {
    return this.storage.get("token")
      .then( token => {
        const url = `${this.baseUrl}getUser/${this.apiKey}`;
        return this.http.get(url)
          .subscribe(data => console.log(JSON.stringify(data)));
      }
    )
  }

  public getCalendars(): any {
    const url = `${this.baseUrl}listCalendars/${this.apiKey}`;
    return this.http.get(url);
  }

  public getEvents(): any {
    const url = `${this.baseUrl}getEvents/${this.apiKey}`;
    return this.http.get(url);
  }

  public createUser(phone: string, surname: string, password: string): Observable<any> {
    const url = `${this.baseUrl}createUser/${phone}/${surname}/${password}`;
    return this.http.get(url);
  }

  public createCalendar(calendarName: string, phoneReceiver: string, timeStart: number, timeEnd: number): Observable<any> {
    const url = `${this.baseUrl}createCalendar/${this.apiKey}/${calendarName}/${phoneReceiver}/${timeStart}/${timeEnd}`;
    return this.http.get(url);
  }

  public authenticateUser(phone: string, password: string): Observable<any> {
    const url = `${this.baseUrl}authenticateUser/${phone}/${password}`;
    return this.http.get(url);
  }

  public inviteUser(phone: string): Promise<any> {
      const url = `${this.baseUrl}inviteUser/${phone}/${this.apiKey}`;

      return this.http.get(url)
          .toPromise() // To have a reply
          .then(response => response )
          .catch(error => console.log('Une erreur est survenue : ' + error))
  }

  public getCalendar(calendar: number): Promise<any> {
    const url = `${this.baseUrl}inviteUser/${this.apiKey}/${calendar}`;

    return this.http.get(url)
      .toPromise() // To have a reply
      .then(response => response )
      .catch(error => console.log('Une erreur est survenue : ' + error))
  }



  public setEvent(calendarID: number, eventDate: number, eventNumber: number, attachementID: number): Promise<any> {
    const url = `${this.baseUrl}setEvent/${this.apiKey}/${calendarID}/${eventDate}/${eventNumber}/${attachementID}`;

    return this.http.get(url)
      .toPromise() // To have a reply
      .then(response => response )
      .catch(error => console.log('Une erreur est survenue : ' + error))
  }

  public createMessageAttachement(theme: number, message: string): Promise<any> {
    const url = `${this.baseUrl}createMessageAttachement/${this.apiKey}/${theme}/${message}`;

    return this.http.get(url)
      .toPromise() // To have a reply
      .then(response => response )
      .catch(error => console.log('Une erreur est survenue : ' + error))
  }

  public createImageAttachement(theme: number, image: string): Promise<any> {
    const url = `${this.baseUrl}createImageAttachement/${this.apiKey}`;
    let postParams = {
      image: image
    };

    return this.http.post(url, postParams)
      .toPromise()
      .then(response => response)
      .catch(error => console.log('Une erreur est survenue : ' + error))// Error getting the data
  }


}
