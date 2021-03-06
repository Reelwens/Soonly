// Core components
import { Injectable }   from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import { Storage }      from '@ionic/storage';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// Models
@Injectable()
export class Service {

    // Variables
    private baseUrl: string = 'https://hetic.antoine-dunn.fr/h3/time/web/app_dev.php/api/';
    private apiKey: string = '';

    constructor(private http: Http, private storage: Storage) {
        storage.get("token").then((token) => {
            if (token !== "" || token !== null) {
                this.apiKey = token;
            } else {
                this.apiKey = "c98d17a674abbffac2f3c0978cae8f8500d9a9b6f0ce65a214039b177a027d23";
                storage.set("token", "c98d17a674abbffac2f3c0978cae8f8500d9a9b6f0ce65a214039b177a027d23")
                    .then(response => {console.log("token stored in DB" + response)})
                    .catch( error => { console.log("error") });
            }
      });
    }

    public getUser(): Promise<any> {
      const url = `${this.baseUrl}getUser/${this.apiKey}`;

    return this.http.get(url)
    .toPromise() // To have a reply
    .then(response => response.json())
    .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public getCalendars(): Promise<any> {
        const url = `${this.baseUrl}listCalendars/${this.apiKey}`;

        return this.http.get(url)
            .toPromise() // To have a reply
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public createUser(phone: string, surname: string, password: string): Promise<any> {
        const url = `${this.baseUrl}listCalendars/${phone}/${surname}/${password}`;

        return this.http.get(url)
            .toPromise() // To have a reply
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public authenticateUser(phone: string, password: string): Promise<any> {
        const url = `${this.baseUrl}listCalendars/${phone}/${password}`;

        return this.http.get(url)
            .toPromise() // To have a reply
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public inviteUser(phone: string): Promise<any> {
        const url = `${this.baseUrl}inviteUser/${phone}/${this.apiKey}`;

        return this.http.get(url)
            .toPromise() // To have a reply
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public getCalendar(calendar: number): Promise<any> {
        const url = `${this.baseUrl}inviteUser/${this.apiKey}/${calendar}`;

        return this.http.get(url)
            .toPromise() // To have a reply
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public createCalendar(calendarName: string, phoneReceiver: string, timeStart: number, timeEnd: number): Promise<any> {
        const url = `${this.baseUrl}inviteUser/reateCalendar/${this.apiKey}/${calendarName}/${phoneReceiver}/${timeStart}/${timeEnd}`;

        return this.http.get(url)
            .toPromise() // To have a reply
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public setEvent(calendarID: number, eventDate: number, eventNumber: number, attachementID: number): Promise<any> {
        const url = `${this.baseUrl}setEvent/${this.apiKey}/${calendarID}/${eventDate}/${eventNumber}/${attachementID}`;

        return this.http.get(url)
            .toPromise() // To have a reply
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public createMessageAttachement(theme: number, message: string): Promise<any> {
        const url = `${this.baseUrl}createMessageAttachement/${this.apiKey}/${theme}/${message}`;

        return this.http.get(url)
            .toPromise() // To have a reply
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue : ' + error))
    }

    public createImageAttachement(theme: number, image: string): Promise<any> {
        const url = `${this.baseUrl}createImageAttachement/${this.apiKey}`;
        let postParams = {
            image: image
        };

        return this.http.post(url, postParams)
            .toPromise()
            .then(response => response.json)
            .catch(error => console.log('Une erreur est survenue : ' + error))// Error getting the data
    }

}
