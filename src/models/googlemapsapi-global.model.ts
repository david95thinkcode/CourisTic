/**
 * Learn more on about this class structure on :
 * https://developers.google.com/maps/documentation/distance-matrix/?hl=fr
 */

import { GoogleMapsApiElement   }            from      './googlemapsapi-element.model';

/**
 * Représente le résultat d'une requete de Google Maps Api
 */
export class GoogleMapsApiGlobal {

    destination_addresses : string[];
    origin_addresses : string[];
    rows : GoogleMapsApiElement[];
    status : string;
}