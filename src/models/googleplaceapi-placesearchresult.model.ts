/**
 * Learn more on about this class structure on :
 * https://developers.google.com/places/web-service/search?hl=fr#PlaceSearchResponses
 */

import { GooglePlaceApiResult   }   from './googleplaceapi-result.model';

export class GooglePlaceApiPlaceSearchResult {
    
    status: string;
    html_attributions: string[];
    results: GooglePlaceApiResult[];
    next_page_token: string;
}