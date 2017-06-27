import { Component }                           from '@angular/core';
import { NavController, NavParams }                       from 'ionic-angular';

//My imports
import { GoogleMapsApiService }                from '../../services/googlemapsapi.service';
import { GooglePlaceApiService }               from '../../services/googleplaceapi.service';

import { GooglePlaceApiGlobal }                from '../../models/googleplaceapi-global.model';
import { GoogleMapsApiGlobal }                 from '../../models/googlemapsapi-global.model';
import { GooglePlaceApiResult   }              from '../../models/googleplaceapi-result.model';
import { GoogleMapsApiElement   }              from '../../models/googlemapsapi-element.model';
import { GoogleMapsApiRow   }                  from '../../models/googlemapsapi-row.model';
import { IonicNativeGeolocation }              from '../../models/ionicnative-geolocation.model';
import { GoogleMapsApiDistance   }             from '../../models/googlemapsapi-distance.model';
import { GoogleMapsApiDuration   }              from '../../models/googlemapsapi-duration.model';
import { Trajet }                              from '../../models/trajet.model';

@Component({
  selector: 'page-estimation',
  templateUrl: 'estimation.html'
})


export class EstimationPage {

  trajet: Trajet = new Trajet();
  rows: GoogleMapsApiRow[];
  reponse: GoogleMapsApiGlobal = new GoogleMapsApiGlobal();

 constructor(public navCtrl: NavController, public googlePlaceApiService: GooglePlaceApiService, public googleMapsApiService: GoogleMapsApiService, public navParams: NavParams)
 {
   this.trajet.userDestination = navParams.get('userChoice');
   this.trajet.userPosition = navParams.get('currentLocation');
   this.Initialise();
   this.setDistanceDuration();
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
          this.trajet.distance_trajet.text = "Nous ne nouveau pas vous fournir d'information sur cet itinéraire";
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

  /** RENVOIE LE COUT ESTIME DU TRAJET
   * le cout renvoyé est composé de :
   * - cout de transport
   * - cout d'hébergement
   * - cout de restauration
   */
  private getGlobalPrice() {

  }

}
