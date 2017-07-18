//core components
import { Injectable  }                      from    '@angular/core';
import { Http  }                            from    '@angular/http';
import { ApiKey }                           from    '../globalparameters/apikey.model';
import { GoogleMapsApiGlobal   }            from    '../models/googlemapsapi-global.model';
import { GooglePlaceApiResult   }           from    '../models/googleplaceapi-result.model';
import { IonicNativeGeolocation }           from    '../models/ionicnative-geolocation.model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class GoogleMapsApiService {

    private baseURLDistanceMatrix: string = "https://maps.googleapis.com/maps/api/distancematrix/";
    private output: string = 'json?';
    private apikey: string;

    constructor (private http: Http) {
        this.apikey = ApiKey.googleApiKey;
    }

    /**
     * Lance une requête Distance Matrix
     * @param origins Lieu(x) d'origine
     * @param destinations Lieu(x) de destination
     * Renvoie un objet GoogleMapsApiGlobal 
     */
   public getDistanceMatrix(origins: IonicNativeGeolocation, destinations: GooglePlaceApiResult): Promise<GoogleMapsApiGlobal> {
        
        let mode :string = "driving";
        let language: string = "en";
        let origine: IonicNativeGeolocation = new IonicNativeGeolocation();

        //Valeur par défaut car problème de réception de origins
        origine.longitude = 2.3770889 ;
        origine.latitude = 6.3604289;

        //let origin: string = `origins=${origins.latitude},${origins.longitude}`;
        let origin: string = `origins=${origine.latitude},${origine.longitude}`;
        console.log(origin)

        const parameters = `${origin}&destinations=place_id:${destinations.place_id}&mode=${mode}&language=${language}&key=${this.apikey}`;
        const url: string = this.baseURLDistanceMatrix+this.output+parameters;
        //console.log("#####" + url);
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GoogleMapsApiGlobal)
        .catch(error => console.log('Distance Matrix error :: ' + error))
    }

}