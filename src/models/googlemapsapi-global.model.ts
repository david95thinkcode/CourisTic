/**
 * Learn more on about this class structure on :
 * https://developers.google.com/maps/documentation/distance-matrix/?hl=fr
 */

import { GoogleMapsApiRow   }            from      './googlemapsapi-row.model';

/**
 * Représente le résultat d'une requete de Google Maps Api
 */
export class GoogleMapsApiGlobal {

    destination_addresses : string[];
    origin_addresses : string[];
    rows : GoogleMapsApiRow[];
    status : string;
}