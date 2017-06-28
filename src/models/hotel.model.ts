import { GooglePlaceApiResult   }              from './googleplaceapi-result.model';

export class Hotel {
    id: string;
    raison_sociale: string;
    cout_minimum_nuit: number;
    googleDetails: GooglePlaceApiResult;
}