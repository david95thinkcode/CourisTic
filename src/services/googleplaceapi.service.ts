//core components
import {    Injectable  } from '@angular/core';
import {    Http  } from '@angular/http';

//RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//my models
import { GooglePlaceApiResult   }               from    '../models/googleplaceapi-result.model';
import { GooglePlaceApiGlobal   }               from    '../models/googleplaceapi-global.model';
import { GooglePlaceApiPlaceSearchResult   }    from    '../models/googleplaceapi-placesearchresult.model';

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

    /** Retourne un objet GooglePlaceApiGlobal représentant un lieu 
     * dont l'id a été passé en paramètre  
     * @param placeid Identifiant Google du lieu 
     */
    public getDetails(placeid: string): Promise<GooglePlaceApiGlobal> {
        
        //Pour les test utilisons ceci par défaut si rien n'est reçu
        if (placeid == null || placeid == "")
        {
            placeid = "ChIJ1zcFVeRUIxARZ86krdRQJwM";
        }

        //formation de l'url 
        const parameters = `placeid=${this.placeid}&key=${this.apikey}`;
        const url: string = this.baseURLDetail+this.output+parameters;
        
        console.log("URL ==> : " + url);

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiGlobal)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }

    /**
     * Google place API - Text Search
     * @param query Chaine représentant le lieu à chercher
     * Renvoie les lieux trouvés
     * ############################## ########
     */
    getTextSearchPlaces(query: string): Promise<GooglePlaceApiPlaceSearchResult> {
                
        const parameters = `query=${query}&key=${this.apikey}`;
        const url: string = this.baseURLTextSearch+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiPlaceSearchResult)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }

    /****Google place API - Nearby Search
     * 
     * Parameters :
     * - radius : Définit la distance (en mètres) délimitant la zone de recherche des lieux proches.
     * - location : latitude,longitude.
     * 
     * ### #Facultatives parameters
     * - type : string with which identifies the type of place we want to get
     * - keyword : string 
     * ############################## ########
     */

/** Retourne tous lieux proches du lieu reçu en paramètre 
 * @param choosenPlace Objet GooglePlaceApiResult représentant le lieu recu en paramètres
 * @param radius Distance en mètres délimitant la zone de recherche
 */
    public getNearbySearchPlaces(choosenPlace: GooglePlaceApiResult, radius: number): Promise<GooglePlaceApiPlaceSearchResult> {
       //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
       
       //Un radius par défaut
       if(radius == 0 || radius==null) {
            radius = 5000;
       }

        const parameters = `location=${choosenPlace.geometry.location.lng},${choosenPlace.geometry.location.lat}&radius=${radius}&key=${this.apikey}`;
        const url: string = this.baseURLNearbySearch+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiPlaceSearchResult)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }

/** Retourne les hotels proches du lieu reçu en paramètre 
 * @param choosenPlace Objet GooglePlaceApiResult représentant le lieu recu en paramètres
 * @param radius Distance en mètres délimitant la zone de recherche
 */
    public getNearbyHostels(choosenPlace: GooglePlaceApiResult, radius: number): Promise<GooglePlaceApiPlaceSearchResult> {
       const type: string = "hostel";

       //Un radius par défaut
       if(radius == 0 || radius==null) {
            radius = 5000;
       }

        const parameters = `location=${choosenPlace.geometry.location.lng},${choosenPlace.geometry.location.lat}&radius=${radius}&type=${type}&key=${this.apikey}`;
        const url: string = this.baseURLNearbySearch+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiPlaceSearchResult)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }

/** Retourne les Restaurants proches du lieu reçu en paramètre 
 * @param choosenPlace Objet GooglePlaceApiResult représentant le lieu recu en paramètres
 * @param radius Distance en mètres délimitant la zone de recherche
 */
    public getNearbyRestaurants(choosenPlace: GooglePlaceApiResult, radius: number): Promise<GooglePlaceApiPlaceSearchResult> {
       const type: string = "restaurant";

       //Un radius par défaut
       if(radius == 0 || radius==null) {
            radius = 5000;
       }

        const parameters = `location=${choosenPlace.geometry.location.lng},${choosenPlace.geometry.location.lat}&radius=${radius}&type=${type}&key=${this.apikey}`;
        const url: string = this.baseURLNearbySearch+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiPlaceSearchResult)
        .catch(error => console.log('Une erreur est survenue dans le service ' + error))
    }
    
}
