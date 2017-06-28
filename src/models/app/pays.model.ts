import { GooglePlaceApiResult   }              from '../googleplaceapi-result.model';

//TODO: faire de la classe Pays un fils de la classe Point
export class Pays
{
    id: string;
    libelle: string;
    googleDetails: GooglePlaceApiResult;
}