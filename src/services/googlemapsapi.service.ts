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
        let language: string = "fr";
        let p_origin: string = ''; //contient la paramètre origins formaté utilisé dans < parameters >
        let parameters: string = ''; //rassemble tous les paramètres

        //Il peut y avoir problème de réception de l'objet < origins >
        //Dans ce cas, on utilisera des valeurs par défaut d'un lieu donné
        //Le lieu dont les coordonnées sont utilisées ici est < Cotonou >
        if (origins.latitude == undefined || origins.longitude == undefined) {
            
            //Sur la ligne ci-dessous nous créons l'objet dont les coordonnées seront utilisés par défaut
            let default_origine: IonicNativeGeolocation = new IonicNativeGeolocation();
            default_origine.longitude = 2.3770889 ;
            default_origine.latitude = 6.3604289;

            p_origin = `origins=${default_origine.latitude},${default_origine.longitude}`;
            //console.log("Position par défaut utilisée ");
        }

        //Ci-dessous, le code à exécuter quand il n'y a pas eu de problème avec < origins >
        //On utilise les vrai valeurs de l'objet < origine > reçu comme paramètre
        else {
            p_origin = `origins=${origins.latitude},${origins.longitude}`;
            //console.log("Position réelle utilisée");
        }
        
        parameters = `${p_origin}&destinations=place_id:${destinations.place_id}&mode=${mode}&language=${language}&key=${this.apikey}`;
        const url: string = this.baseURLDistanceMatrix+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GoogleMapsApiGlobal)
        .catch(error => console.log('Distance Matrix error :: ' + error))
    }

}