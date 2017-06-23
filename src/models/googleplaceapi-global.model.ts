/**
 * Learn more on about this class structure on :
 * https://developers.google.com/places/web-service/details#PlaceDetailsResults
 */

import { GooglePlaceApiResult   }   from './googleplaceapi-result.model';

export class GooglePlaceApiGlobal {
    status: string;
    html_attributions: string[];
    result: GooglePlaceApiResult;
}