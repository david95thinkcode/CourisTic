import { Component }                           from '@angular/core';
import { NavController }                       from 'ionic-angular';

//My imports
import { GoogleMapsApiService }                from '../../services/googlemapsapi.service';
import { GooglePlaceApiService }               from '../../services/googleplaceapi.service';
import { GooglePlaceApiGlobal }                from '../../models/googleplaceapi-global.model';
import { GoogleMapsApiGlobal }                 from '../../models/googlemapsapi-global.model';
import { GooglePlaceApiResult   }              from '../../models/googleplaceapi-result.model';
import { GoogleMapsApiElement   }              from '../../models/googlemapsapi-element.model';
import { IonicNativeGeolocation }              from '../../models/ionicnative-geolocation.model';

@Component({
  selector: 'page-estimation',
  templateUrl: 'estimation.html'
})


export class EstimationPage {

  rows: GoogleMapsApiElement[];
  reponse: GoogleMapsApiGlobal = new GoogleMapsApiGlobal();
  userPosition: IonicNativeGeolocation = new IonicNativeGeolocation();
  userDestiation: GooglePlaceApiResult = new GooglePlaceApiResult();
  nombreHotels_proche: number;
  nombreRestaurant_proche: number;
  duree_trajet: string;
  cout_hebergement: number;
  cout_restauration: number;
  cout_transport: number;

/**
 *  
 * @param navCtrl 
 * @param currentLocation Objet IonicNativeGeolocation représentatn la position GPS du téléphone
 * @param destination Objet GooglePlaceApiResult repréentant le Lieu de destination
 */
 
  constructor(public navCtrl: NavController, public googleMapsApiService: GoogleMapsApiService, public currentLocation:IonicNativeGeolocation, public destination: GooglePlaceApiResult ) {
    /*
    this.Initialise();
    
    console.log("Position actuelle recu est:" + this.currentLocation.longitude + ", "+this.currentLocation.latitude);
    
    this.googleMapsApiService.getDistanceMatrix(currentLocation, destination)
    .then(fetched =>
    {
      this.reponse = fetched;
      this.rows = this.reponse.rows;
    })
    .catch(error => console.log('getDistanceMatrix() error :: ' + error));
*/
/*
    console.log("Chargement des Hotels en cours ...");
    //Recupère les hotels proches

    console.log("Chargement des hotels terminé !");
  
    console.log("Chargement des restaurants en cours ...");
    //Recupère les restaurants proches

    console.log("Chargement des restaurants terminé !");
    */
  }

  private Initialise() {

    this.cout_hebergement = 0;
    this.cout_restauration = 0;
    this.cout_transport = 0;
    this.duree_trajet = "Indéterminé";
    this.nombreHotels_proche = 0;
    this.nombreRestaurant_proche = 0;
    this.userPosition = this.currentLocation;
    this.userDestiation = this.destination;
    
  }

/** RENVOIE LE COUT ESTIME DU TRAJET
 * le cout renvoyé est composé de :
 * - cout de transport
 * - cout d'hébergement
 * - cout de restauration
 */
  private getGlobalPrice() {

  }



}
