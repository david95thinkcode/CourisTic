import { GooglePlaceApiResult   }              from '../googleplaceapi-result.model';

//TODO: faire de la classe Hotel un fils de la classe Point
export class Hotel 
{
    id: string;
    raison_sociale: string;
    cout_minimum_nuit: number;
    googleDetails: GooglePlaceApiResult;
}