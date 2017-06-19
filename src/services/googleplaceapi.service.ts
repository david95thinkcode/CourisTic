//core components
import {    Injectable  } from '@angular/core';
import {    Http  } from '@angular/http';

//RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//my models
import { GooglePlaceApiGlobal   }   from    '../models/googleplaceapi-global.model';

@Injectable()
export class GooglePlaceApiService {
    private baseUrl: string = "https://maps.googleapis.com/maps/api/place/details/";
    private output: string = 'json?';
    private placeid: string = "ChIJ1zcFVeRUIxARZ86krdRQJwM";
    private apikey: string = "AIzaSyCLO_avsG1-B2kj5-FDfdE3CMguE2RESiY";

    constructor (private http: Http) {
        
    }

    public getDetails(): Promise<GooglePlaceApiGlobal> {
        const parameters = `placeid=${this.placeid}&key=${this.apikey}`;

        //const url = `${this.baseUrl}json?placeid=${this.placeid}&key=${this.apikey}`;
        
        //formation de l'url 
        const url: string = this.baseUrl+this.output+parameters;
        
        //console.log("parameters ==> : " + parameters);
        console.log("URL ==> : " + url);

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiGlobal)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }
}
