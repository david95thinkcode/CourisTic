//core components
import {    Injectable  } from '@angular/core';
import {    Http  } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { ApiKey }                               from    '../globalparameters/apikey.model';
import { GooglePlaceApiResult   }               from    '../models/googleplaceapi-result.model';
import { GooglePlaceApiGlobal   }               from    '../models/googleplaceapi-global.model';
import { GooglePlaceApiPlaceSearchResult   }    from    '../models/googleplaceapi-placesearchresult.model';

@Injectable()

export class GooglePlaceApiService {
    private baseURLDetail: string = "https://maps.googleapis.com/maps/api/place/details/";
    private baseURLTextSearch: string = "https://maps.googleapis.com/maps/api/place/textsearch/";
    private baseURLNearbySearch: string = "https://maps.googleapis.com/maps/api/place/nearbysearch/";
    private baseURLRadarSearch: string = "https://maps.googleapis.com/maps/api/place/radarsearch/";
    private baseURLPlacePhoto: string = "https://maps.googleapis.com/maps/api/place/photo?";

    private output: string = 'json?';
    private apikey: string;
    private radiusParDefaut = 10000;

    constructor (private http: Http) {
        this.apikey = ApiKey.googleApiKey
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
        const parameters = `placeid=${placeid}&key=${this.apikey}`;
        const url: string = this.baseURLDetail+this.output+parameters;
        
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
        .catch(error => console.log('TextSearch error :: ' + error))
    }

    
    /** Retourne tous lieux proches du lieu reçu en paramètre 
     * @param choosenPlace Objet GooglePlaceApiResult représentant le lieu recu en paramètres
     * @param radius Distance en mètres délimitant la zone de recherche
     */
    public getNearbySearchPlaces(choosenPlace: GooglePlaceApiResult, radius: number): Promise<GooglePlaceApiPlaceSearchResult> {
       
       //Un radius par défaut
       if(radius == 0 || radius == null) {
            radius = this.radiusParDefaut;
       }

        const parameters = `location=${choosenPlace.geometry.location.lat},${choosenPlace.geometry.location.lng}&radius=${radius}&key=${this.apikey}`;
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
       const type: string = "lodging";
       let location: string = `location=${choosenPlace.geometry.location.lat},${choosenPlace.geometry.location.lng}`;

       //Un radius par défaut
       if(radius == 0 || radius==null) {
            radius = this.radiusParDefaut;
       }

        const parameters = `${location}&radius=${radius}&type=${type}&key=${this.apikey}`;
        const url: string = this.baseURLNearbySearch+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiPlaceSearchResult)
        .catch(error => console.log('Une erreur est survenue dans getNearbyHostels() ' + error))
    }

    /** Retourne les Restaurants proches du lieu reçu en paramètre 
     * @param choosenPlace Objet GooglePlaceApiResult représentant le lieu recu en paramètres
     * @param radius Distance en mètres délimitant la zone de recherche
    */
    public getNearbyRestaurants(choosenPlace: GooglePlaceApiResult, radius: number): Promise<GooglePlaceApiPlaceSearchResult> {
       const type: string = "restaurant";
       let location: string = `location=${choosenPlace.geometry.location.lat},${choosenPlace.geometry.location.lng}`;
       //Un radius par défaut
       if(radius == 0 || radius==null) {
            radius = this.radiusParDefaut;
       }

        const parameters = `${location}&radius=${radius}&type=${type}&key=${this.apikey}`;
        const url: string = this.baseURLNearbySearch+this.output+parameters;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as GooglePlaceApiPlaceSearchResult)
        .catch(error => console.log('Une erreur est survenue dans getNearbyRestaurants : ' + error))
    
    }
    
    /**Retourne l'URL d'une photo dont la référence a été passé en paramètre
     * Learn more on : https://developers.google.com/places/web-service/photos
     * @param photo_reference Référence de la photo à afficher 
     * @param format Format de la photo
     */
    getPhotoURL(photo_reference: string, format: string ): string  {  
     /** Valeur possibles du paramètre < format >
        * Si format vaut : "small" alors l'url récupéré est celle d'une photo de taille minimale
        * Si format vaut : "medium" alors l'url récupéré est celle d'une photo de taille minimale
        * Si format vaut : "big" alors l'url récupéré est celle d'une photo de taille minimale
     */
    
        var maxWidth : number = 0;
        var maxHeight : number = 0;
        var picture_URL: string;       

        switch (format) {
            case "small":
                maxWidth = 400;
                maxHeight = 300;
                break;
            case "medium":
                maxWidth = 700;
                maxHeight = 600;
                break;
            case "big":
                maxWidth = 900;
                maxHeight = 800;
                break;
            default:
                break;
        }

        if ((photo_reference != null) || (photo_reference != "")) { }
        else  { console.log("Reférence de la photo non reçu"); }
        
        //Formation de l'URL pour la requête de récupération d'image
        const parameters = `maxwidth=${maxWidth}&maxheight=${maxHeight}&photoreference=${photo_reference}&key=${this.apikey}`;
        picture_URL = this.baseURLPlacePhoto+parameters;
        
        return picture_URL;
    }

    
}
