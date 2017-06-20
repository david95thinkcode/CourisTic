//core components
import {    Injectable  } from '@angular/core';
import {    Http  } from '@angular/http';

//RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//my models
import { GooglePlaceApiGlobal   }   from    '../models/googleplaceapi-global.model';
import { GooglePlaceApiPlaceSearchResult   }   from    '../models/googleplaceapi-placesearchresult.model';

@Injectable()
export class GooglePlaceApiService {
    private baseURLDetail: string = "https://maps.googleapis.com/maps/api/place/details/";
    private baseURLTextSearch = "https://maps.googleapis.com/maps/api/place/textsearch/";
    private baseURLNearbySearch = "https://maps.googleapis.com/maps/api/place/nearbysearch/";
    private baseURLRadarSearch = "https://maps.googleapis.com/maps/api/place/radarsearch/";

    private output: string = 'json?';
    private placeid: string = "ChIJ1zcFVeRUIxARZ86krdRQJwM";
    private apikey: string = "AIzaSyCLO_avsG1-B2kj5-FDfdE3CMguE2RESiY";

    constructor (private http: Http) {
        
    }

    public getDetails(): Promise<GooglePlaceApiGlobal> {
        const parameters = `placeid=${this.placeid}&key=${this.apikey}`;

        //formation de l'url 
        const url: string = this.baseURLDetail+this.output+parameters;
        
        console.log("URL ==> : " + url);

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiGlobal)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }

    /**
     * Google place API - Text Search
     * This method should receive a string of the place to search
     * ############################## ########
     */
    public getTextSearchPlaces(): Promise<GooglePlaceApiPlaceSearchResult> {
        
        //query: string = "";
        const parameters = `query=${this.query}&key=${this.apikey}`;
        const url: string = this.baseURLTextSearch+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiPlaceSearchResult)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }

    /**
     * Google place API - Nearby Search
     * Parameters :
     * - radius : Définit la distance (en mètres) jusqu'à laquelle renvoyer les résultats de lieu.
     * - location : latitude,longitude.
     * 
     * ### #Facultatives parameters
     * - type : string with which identifies the type of place we want to get
     * - keyword : string 
     * ############################## ########
     */

     //TODO: rechercher comment passer un paramètre string a cette méthode
    public getNearbySearchPlaces(): Promise<GooglePlaceApiPlaceSearchResult> {
        
        const parameters = `query=${this.query}&key=${this.apikey}`;
        const url: string = this.baseURLTextSearch+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiPlaceSearchResult)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }

    //TODO: Créer un methode getNearbySearchPlaces qui recoit les paramètres facultatifs
    /**
     * @Description
     * La première recherchera les lieux proches de type restaurants dans un radius d'au plus 5000m (5km)
     * La seconde recherchera les lieux proches de type hotels dans un radius d'au plus 5000m (5km)
     * La troisième recherchera les lieux proches de type hotels dans un radius d'au plus 5000m (5km)
     */

    //TODO: 
}
