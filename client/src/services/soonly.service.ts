// Core components
import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// Models
@Injectable()
export class Service {

  // Variables
  private baseUrl: string = 'https://hetic.antoine-dunn.fr/h3/time/web/app_dev.php/api/';
  private apiKey: string = '<API_KEY>';

  constructor(private http: Http) { }

  public getObjects(): Promise<any> {
	  const url = `${this.baseUrl}objects?apiKey=${this.apiKey}`;

    return this.http.get(url)
    .toPromise() // To have a reply
    .then(response => response.json())
    .catch(error => console.log('Une erreur est survenue : ' + error))
  }

}
