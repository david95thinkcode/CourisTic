/**
 * Learn more on about this class structure on :
 * https://developers.google.com/places/web-service/details?hl=fr#PlaceDetailsResults
 */

import  { GooglePlaceApiPhoto   }            from    './googleplaceapi-photo.model';
import  { GooglePlaceApiAdressComponent  }   from    './googleplaceapi-adresscomponent.model';
import  { GooglePlaceApiLocation    }        from    './googleplaceapi-location.model';
import  { GooglePlaceApiGeometry    }        from    './googleplaceapi-geometry.model';
//import  { GooglePlaceApiService }          from    '../services/googleplaceapi.service';

export class GooglePlaceApiResult {

    name: string;
    types: string[];
    
    vicinity: string;
    formatted_address: string;
    formatted_phone_number: string;
    international_phone_number: string;
        
    icon: string;
    scope: string;
    place_id: string;
    rating: number; 
    price_level: number; 

    url: string;
    website: string;
    
    //Objects
    geometry : GooglePlaceApiGeometry;
    adress_components: GooglePlaceApiAdressComponent[];
    photos: GooglePlaceApiPhoto[];
    
    //The main picture is the first photo on photos array
    reference_to_main_Image: string;
    url_to_main_Image: string;

    /*
    constructor (private googlePlaceApiService?: GooglePlaceApiService) {

        this.initialisePicture();
    }

   
    public initialisePicture() {
        
        const secureIndexForPhoto: number = 0;
          
          //Cas ou l'image nexiste pas (photos[] = null ==> est vide)
          if (this.photos == null) 
          {
            //on utilise une image de notre dossier
            this.url_to_main_Image = "assets/img/no_image.png";
          }

          //Photos[] n'est pas vide
          else {
            this.reference_to_main_Image = this.photos[secureIndexForPhoto].photo_reference;
            this.url_to_main_Image = this.googlePlaceApiService.getPhotoURL(this.reference_to_main_Image);
          }

    }
    */
}