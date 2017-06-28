//Représente un trajet comme défini dans l'UML
import { GoogleMapsApiDistance  }              from '../googlemapsapi-distance.model';
import { GoogleMapsApiDuration  }              from '../googlemapsapi-duration.model';
import { GooglePlaceApiResult   }              from '../googleplaceapi-result.model';
import { IonicNativeGeolocation }              from '../ionicnative-geolocation.model';

export class Trajet
{
  nombreHotels_proche: number;
  nombreRestaurant_proche: number;
  cout_hebergement: number;
  cout_restauration: number;
  cout_transport: number;
  itineraire: boolean; //A true si l'itinéraire pour ce trajet a été trouvé

  duree_trajet: GoogleMapsApiDuration;
  distance_trajet: GoogleMapsApiDistance;
  userPosition: IonicNativeGeolocation;
  userDestination: GooglePlaceApiResult;
}