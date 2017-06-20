/**
 * Learn more on about this class structure on :
 * https://developers.google.com/places/web-service/details?hl=fr#PlaceDetailsResults
 */

import  { GooglePlaceApiPhoto   }            from    './googleplaceapi-photo.model';
import  { GooglePlaceApiAdressComponent  }   from    './googleplaceapi-adresscomponent.model';
import  { GooglePlaceApiLocation    }        from    './googleplaceapi-location.model';
import  { GooglePlaceApiGeometry    }        from    './googleplaceapi-geometry.model';

export class GooglePlaceApiResult {

    name: string;
    types: string[];
    
    formatted_address: string;
    formatted_phone_number: string;
    international_phone_number: string;
        
    icon: string;
    scope: string;
    placeid: string;
    rating: string; //normally integer
    price_level: string; //normally integer

    url: string;
    website: string;
    
    //Objects
    geometry : GooglePlaceApiGeometry;
    adress_components: GooglePlaceApiAdressComponent[];
    photos: GooglePlaceApiPhoto[];
}