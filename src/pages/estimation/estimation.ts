import { Component }                           from '@angular/core';
import { NavController, NavParams }                       from 'ionic-angular';

//My imports
import { GoogleMapsApiService }                from '../../services/googlemapsapi.service';
import { GooglePlaceApiService }               from '../../services/googleplaceapi.service';

import { GooglePlaceApiGlobal }                from '../../models/googleplaceapi-global.model';
import { GoogleMapsApiGlobal }                 from '../../models/googlemapsapi-global.model';
import { GooglePlaceApiResult   }              from '../../models/googleplaceapi-result.model';
import { GooglePlaceApiPlaceSearchResult   }   from '../../models/googleplaceapi-placesearchresult.model';
import { GoogleMapsApiElement   }              from '../../models/googlemapsapi-element.model';
import { GoogleMapsApiRow   }                  from '../../models/googlemapsapi-row.model';
import { IonicNativeGeolocation }              from '../../models/ionicnative-geolocation.model';
import { GoogleMapsApiDistance   }             from '../../models/googlemapsapi-distance.model';
import { GoogleMapsApiDuration   }             from '../../models/googlemapsapi-duration.model';
import { Trajet }                              from '../../models/trajet.model';
import { Hotel }                               from '../../models/hotel.model';
import { Restaurant }                          from '../../models/restaurant.model';

@Component({
  selector: 'page-estimation',
  templateUrl: 'estimation.html'
})


export class EstimationPage {

  nombreHotel: number;
  nombreRestaurant: number;
  trajet: Trajet = new Trajet();
  rows: GoogleMapsApiRow[];
  reponse: GoogleMapsApiGlobal = new GoogleMapsApiGlobal();
  array_Hotel: Array<Hotel>;
  array_restaurant: Array<Restaurant>;
  
 constructor(public navCtrl: NavController, public googlePlaceApiService: GooglePlaceApiService, public googleMapsApiService: GoogleMapsApiService, public navParams: NavParams)
 {
   this.trajet.userDestination = navParams.get('userChoice');
   this.trajet.userPosition = navParams.get('currentLocation');
   this.Initialise();
   this.setDistanceDuration();
   this.countNearbyPlaces();
 }


  private Initialise() {

    this.trajet.itineraire = false;
    this.trajet.cout_hebergement = 0;
    this.trajet.cout_restauration = 0;
    this.trajet.cout_transport = 0;    
    this.trajet.nombreHotels_proche = 0;
    this.trajet.nombreRestaurant_proche = 0;
    this.trajet.distance_trajet = new GoogleMapsApiDistance();
    this.trajet.duree_trajet = new GoogleMapsApiDuration();
    this.trajet.duree_trajet.text = "Indéterminé";
    this.trajet.distance_trajet.text = "Indéterminé";   
    this.nombreHotel = 0;
    this.nombreRestaurant = 0;
    
    //TODO/ initialiser les deux tableau ci-dessous
    //this.array_Hotel = 
    //this.array_restaurant = 
  }

  /** EFFECTUE DES OPERATIONS POUR ATTRIBUER LA DUREE ET LA DISTANCE
   *  A NOTRE OBJET "trajet"
   *  On lance la requête de recherche d'itinéraire
   *  On vérifie d'abords si un itinéraire a été trouvé
   *  S'il n'a pas été trouvé, on envoie un message a l'utilisateur
   *  S'il a été trouvé contraire, on met à jour l'objet trajet
  */
  private setDistanceDuration() {

    //Destination présente (non null et bien reçue dans le constructeur)
    if (this.trajet.userDestination == null)
    {
      console.log("DestinationPage : Destination non reçue");
    }
    //Destination absente
    else 
    { 
      this.googleMapsApiService.getDistanceMatrix(this.trajet.userPosition, this.trajet.userDestination)
      .then(fetched =>
      {
        this.reponse = fetched;
        this.rows = this.reponse.rows;
        
        //Aucun itinéraire n'a été trouvé 
        if ( this.rows[0].elements[0].status == "ZERO_RESULTS") {
          this.trajet.itineraire = false ;
        }
        //Itinéraire trouvé
        else 
        {
          this.trajet.itineraire = true;          
          //Récupération et affectation des données "distance" et "durée" au trajet
          this.trajet.distance_trajet = this.rows[0].elements[0].distance;
          this.trajet.duree_trajet = this.rows[0].elements[0].duration;
        }

       /* //OBSERVATION 
        console.log(this.rows);
        console.log(this.rows[0]);
        console.log(this.rows[0].elements);
        console.log(this.rows[0].elements[0]);
        console.log(this.rows[0].elements[0].distance);
        console.log(this.rows[0].elements[0].distance.text);
        console.log("Destination : "+ this.trajet.userDestination);
        */
      })
      .catch(error => console.log('getDistanceMatrix() error :: ' + error));
    }

  }

  
  /** Compte les lieux a proximité de la destination et informe 
   * les variable nombreHotels et nombreRestaurant*/
  private countNearbyPlaces() {

    var response: GooglePlaceApiPlaceSearchResult = new GooglePlaceApiPlaceSearchResult();
    var results: GooglePlaceApiResult[];
    var totalplaces : number = 0;

    //récuperer tous les lieux proches    
    this.googlePlaceApiService.getNearbySearchPlaces(this.trajet.userDestination, 50000)
    .then(fetched => 
    {
      response = fetched;      
      results = response.results;
      
      //ON COMPTE LE NOMBRE
      results.forEach(result => {
        totalplaces ++;
      });

      //Observations
      console.log("Nombre total : " + totalplaces);
      console.log(results);
      
    })
    .catch(error => console.log('countNearbyPlaces() error : ' + error));

    //Hotels 
    this.googlePlaceApiService.getNearbyHostels(this.trajet.userDestination, 0)
    .then(fetched => 
    {
      response = fetched;      
      results = response.results;
      results.forEach(result => {
        //On insère un hotel dans le tableau d'hotels
        var un_hotel = new Hotel();
        un_hotel.googleDetails = result;
        //this.array_Hotel.push(un_hotel);

        this.nombreHotel ++;
        console.log("Hotel : " + this.nombreHotel);
      });
      
    })
    .catch(error => console.log('countNearbyPlaces() error : ' + error));
    
    //Restaurants
    this.googlePlaceApiService.getNearbyRestaurants(this.trajet.userDestination, 0)
    .then(fetched => 
    {
      response = fetched;      
      results = response.results;
      results.forEach(result => {
        //On insère un restaurant dans le tableau de restaurants
        var un_resto = new Restaurant();
        un_resto.googleDetails = result;
        //this.array_restaurant.push(un_resto);

        this.nombreRestaurant ++;
      });
    })
    .catch(error => console.log('countNearbyPlaces() error : ' + error));

  }

  /** RENVOIE LE COUT ESTIME DU TRAJET
   * le cout renvoyé est composé de :
   * - cout de transport
   * - cout d'hébergement
   * - cout de restauration
   */
  private getGlobalPrice() {
    
  }

  //TODO: implémenter la méthode
  public showRestaurant(){

  }

  //TODO: implémenter la méthode
  public showHotels() {

  }



}
