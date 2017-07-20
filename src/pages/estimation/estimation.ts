import { Component }                           from '@angular/core';
import { NavController, NavParams }            from 'ionic-angular';
import { ToastController, AlertController }    from 'ionic-angular';
import {FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { ListeLieuxProchesPage  }              from '../../pages/listelieuxproches/listelieuxproches';

import { GoogleMapsApiService }                from '../../services/googlemapsapi.service';
import { GooglePlaceApiService }               from '../../services/googleplaceapi.service';
import { IonicNativeService }                  from '../../services/ionicnative.service';

import { GooglePlaceApiGlobal }                from '../../models/googleplaceapi-global.model';
import { GoogleMapsApiGlobal }                 from '../../models/googlemapsapi-global.model';
import { GooglePlaceApiResult   }              from '../../models/googleplaceapi-result.model';
import { GooglePlaceApiPlaceSearchResult   }   from '../../models/googleplaceapi-placesearchresult.model';
import { GoogleMapsApiElement   }              from '../../models/googlemapsapi-element.model';
import { GoogleMapsApiRow   }                  from '../../models/googlemapsapi-row.model';
import { IonicNativeGeolocation }              from '../../models/ionicnative-geolocation.model';
import { GoogleMapsApiDistance   }             from '../../models/googlemapsapi-distance.model';
import { GoogleMapsApiDuration   }             from '../../models/googlemapsapi-duration.model';
import { Trajet }                              from '../../models/app/trajet.model';
import { Hotel }                               from '../../models/app/hotel.model';
import { Restaurant }                          from '../../models/app/restaurant.model';

@Component({
  selector: 'page-estimation',
  templateUrl: 'estimation.html'
})


export class EstimationPage {

  cout_trajet: number;
  nombreHotel: number;
  nombreRestaurant: number;
  trajet: Trajet = new Trajet();
  rows: GoogleMapsApiRow[];
  reponse: GoogleMapsApiGlobal = new GoogleMapsApiGlobal();
  array_Hotel: Array<Hotel>;
  array_restaurant: Array<Restaurant>;
  //Liste de lieux favoris
  favoriteplaces: FirebaseListObservable<any>;
  //favoriteplacesDBURL: string = "https://projet-tutore-1497454700964.firebaseio.com/favoriteplaces";
  
  //Page du segment choisi par défaut
  choice: string = "estimation";

  //Pour l'alert
  alertCtrl: AlertController;

  
 constructor(public toastCtrl: ToastController, af: AngularFireDatabase, private ionicNativeService: IonicNativeService, private navCtrl: NavController, private googlePlaceApiService: GooglePlaceApiService, private googleMapsApiService: GoogleMapsApiService, public navParams: NavParams, alertCtrl: AlertController)
 {
   this.trajet.userDestination = navParams.get('userChoice');
   this.alertCtrl = alertCtrl;
   
   //Ci-dessous on fait le lien entre notre base sur firebase et notre variable favoritesplaces
   this.favoriteplaces = af.list('/favoriteplaces');
   
   this.Initialise();
   this.setDistanceDuration();
   //On décide si l'on doit compter ou pas
   if (this.trajet.itineraire = true ) 
   {
    this.countNearbyPlaces(); 
   }
   this.getGlobalPrice();
 }

  private Initialise() {

    this.trajet.itineraire = false;
    this.trajet.cout_hebergement = 0;
    this.trajet.cout_restauration = 0;
    this.trajet.cout_transport = 0;    
    this.trajet.nombreHotels_proche = 0;
    this.trajet.nombreRestaurant_proche = 0;
    this.trajet.userPosition = new IonicNativeGeolocation();
    this.trajet.distance_trajet = new GoogleMapsApiDistance();
    this.trajet.duree_trajet = new GoogleMapsApiDuration();
    this.trajet.duree_trajet.text = "Indéterminé";
    this.trajet.distance_trajet.text = "Indéterminé";   
    this.nombreHotel = 0;
    this.nombreRestaurant = 0;
    this.array_Hotel = [];
    this.array_restaurant = []; 
    this.cout_trajet = this.trajet.cout_hebergement + this.trajet.cout_restauration + this.trajet.cout_transport;
  }

  /** EFFECTUE DES OPERATIONS POUR ATTRIBUER LA DUREE ET LA DISTANCE
   *  A NOTRE OBJET "trajet"
   *  On lance la requête de recherche d'itinéraire
   *  On vérifie d'abords si un itinéraire a été trouvé
   *  S'il n'a pas été trouvé, on envoie un message à l'utilisateur
   *  S'il a été trouvé, on met à jour l'objet trajet
  */
  private setDistanceDuration() {
    //Avant tout, on récupère à nouveau la position de l'utilisateur...
    //par mesure de sécurité

    this.ionicNativeService.getCurrentLocation()
    //Position bien récupéré
    .then(fetchedLocation => {
      this.trajet.userPosition = fetchedLocation as IonicNativeGeolocation;

      //Destination présente (non null et bien reçue dans le constructeur)
      if (this.trajet.userDestination == null)
      {
        console.log("EstimationPage : Destination non reçue");
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
            console.log(this.trajet.userPosition);
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

    })
    .catch(error => {
      console.log("ERREUR TROUVEE");
    })
    
  }

  /**
   * REMPLI LE TABLEAU CONTENANT LA LISTE DES HOTELS
   */
  private populateHotelArray() {
    let response: GooglePlaceApiPlaceSearchResult = new GooglePlaceApiPlaceSearchResult();
    let results: GooglePlaceApiResult[];

    this.googlePlaceApiService.getNearbyHostels(this.trajet.userDestination, 0)
    .then(fetched => 
    {
      response = fetched;      
      results = response.results;

      results.forEach(result => {
        //On insère un hotel dans le tableau d'hotels
        let un_hotel = new Hotel();
        un_hotel.googleDetails = result;
        un_hotel.designation = un_hotel.googleDetails.name;

        this.array_Hotel.push(un_hotel);        
        this.nombreHotel ++;
      });
      
    })
    .catch(error => console.log('countNearbyPlaces() error : ' + error));
    
  }

  /**
   * REMPLI LE TABLEAU CONTENANT LA LISTE DES RESTAURANTS
   */
  private populateRestaurantArray() {
    let response: GooglePlaceApiPlaceSearchResult = new GooglePlaceApiPlaceSearchResult();
    let results: GooglePlaceApiResult[];

    this.googlePlaceApiService.getNearbyRestaurants(this.trajet.userDestination, 0)
    .then(fetched => 
    {
      response = fetched;      
      results = response.results;
      results.forEach(result => {
        //On insère un restaurant dans le tableau de restaurants
        let un_resto = new Restaurant();
        un_resto.googleDetails = result;
        un_resto.designation = un_resto.googleDetails.name;

        this.array_restaurant.push(un_resto);
        this.nombreRestaurant ++;
      });
    })
    .catch(error => console.log('countNearbyPlaces() error : ' + error));

  }

  /** Compte les lieux a proximité de la destination */
  private countNearbyPlaces() {

    let response: GooglePlaceApiPlaceSearchResult = new GooglePlaceApiPlaceSearchResult();
    let results: GooglePlaceApiResult[];
    let totalplaces : number = 0;

    //récuperer tous les lieux proches    
    this.googlePlaceApiService.getNearbySearchPlaces(this.trajet.userDestination, 0)
    .then(fetched => 
    {
      response = fetched;      
      results = response.results;
      
      //ON COMPTE LE NOMBRE TOTAL TROUVE
      results.forEach(result => {
        totalplaces ++;
      });

    })
    .catch(error => console.log('countNearbyPlaces() error : ' + error));
    
    this.populateHotelArray();
    this.populateRestaurantArray();
  }

  /** RENVOIE LE COUT ESTIME DU TRAJET
   * le cout renvoyé est composé de :
   * - cout de transport
   * - cout d'hébergement
   * - cout de restauration
   */
  private getGlobalPrice() {
    this.cout_trajet = this.trajet.cout_hebergement + this.trajet.cout_restauration + this.trajet.cout_transport;
  }

  public showRestaurant(){
    this.navCtrl.push(ListeLieuxProchesPage, {
      array: this.array_restaurant,
      title: "Restaurants"
    });
  }

  public showHotels() {
    this.navCtrl.push(ListeLieuxProchesPage, {
      array: this.array_Hotel,
      title: "Hotels"
    });
  }

  
  /** ENREGISTRE LE LIEU DANS FIREBASE
   * @param favoritePlace Le lieu à enregistrer
   */
  public addToFavorites(favoritePlace: GooglePlaceApiResult)
  {
    
    /* //Controle doublon
      let theDataToAdd = userName;
      let ref = new Firebase('https://SampleChat.firebaseIO-demo.com/users/' + theDataToAdd);
      this.favoriteplacesDBURL.on('value', function(snapshot) {
        if (snapshot.exists())
            alert ("exist");
        else
            alert ("not exist");
      });
    */
    let successtoastMessage: string = favoritePlace.name + " ajouté aux favoris";
    let failuretoastMessage: string = "Echec d'ajout " + favoritePlace.name + " aux favoris !";
    
    this.favoriteplaces.push({
      placeid: favoritePlace.place_id,
      name: favoritePlace.name,
      picture_URL: favoritePlace.url_to_main_Image            
    });
    
    this.presentToast(successtoastMessage);
  }

/** AJOUTE UN LIEU AU FAVORIS SI INEXISTANT DANS LA LISTE DES FAVORIS ; RETIRE SI EXISTANT */
  public toggleStar(postRef, uid) {
    //Methode pas encore au point
    //TODO: corriger le nécessaire
    postRef.transaction(function(post) {
      if (post) {
        if (post.stars && post.stars[uid]) {
          post.starCount--;
          post.stars[uid] = null;
        } else {
          post.starCount++;
          if (!post.stars) {
            post.stars = {};
          }
          post.stars[uid] = true;
        }
      }
      return post;
    });
  }

  /**
   * Permet d'afficher un toast 
   */
  private presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  /** Pour rafraichir la page */
  public doRefresh(refresher) {
    console.log('Rafraichissement en cours...', refresher);

    setTimeout(() => {
      console.log('Rafraichissement terminé !');
      refresher.complete();
    }, 2000);
  }
}
