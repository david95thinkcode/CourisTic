import { GooglePlaceApiResult   }              from '../googleplaceapi-result.model';

//TODO: faire de la classe Site un fils de la classe Point
export class Site
{
    id: string;
    libelle: string;
    descriptif: string;
    googleDetails: GooglePlaceApiResult;
}