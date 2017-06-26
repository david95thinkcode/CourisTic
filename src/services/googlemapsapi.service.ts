//core components
import { Injectable  }                      from    '@angular/core';
import { Http  }                            from    '@angular/http';
import { GoogleMapsApiGlobal   }            from    '../models/googlemapsapi-global.model';
import { GooglePlaceApiResult   }           from    '../models/googleplaceapi-result.model';
import { IonicNativeGeolocation }           from    '../models/ionicnative-geolocation.model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class GoogleMapsApiService {

    private baseURLDistanceMatrix: string = "https://maps.googleapis.com/maps/api/distancematrix/";
    private output: string = 'json?';
    private apikey: string = "AIzaSyCLO_avsG1-B2kj5-FDfdE3CMguE2RESiY";

    constructor (private http: Http) {
        
    }

    /**
     * Lance une requête Distance Matrix
     * @param origins Lieu(x) d'origine
     * @param destinations Lieu(x) de destination
     * Renvoie un objet GoogleMapsApiGlobal 
     */
   public getDistanceMatrix(origins: IonicNativeGeolocation, destinations: GooglePlaceApiResult): Promise<GoogleMapsApiGlobal> {
        
        var mode :string = "driving";
        var language: string = "en";
        var origin: string = `origins=${origins.latitude},${origins.longitude}`;
        
        const parameters = `${origin}&destinations=place_id:${destinations.place_id}&mode=${mode}&language=${language}&key=${this.apikey}`;
        const url: string = this.baseURLDistanceMatrix+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GoogleMapsApiGlobal)
        .catch(error => console.log('Distance Matrix error :: ' + error))
    }

}