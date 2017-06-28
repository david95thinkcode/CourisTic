import { GooglePlaceApiResult   }              from './googleplaceapi-result.model';

export class Restaurant {
    id: string;
    raison_sociale: string;
    cout_minimum_plat: number;
    googleDetails: GooglePlaceApiResult;
}