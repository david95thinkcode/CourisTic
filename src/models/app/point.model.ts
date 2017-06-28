import { GooglePlaceApiResult   }              from '../googleplaceapi-result.model';

export class Point 
{
    identifiant: string; //Identifiant personnel délivré par notre app
    googleDetails: GooglePlaceApiResult;
    designation: string;
    description: string;
    favoris: boolean;
}