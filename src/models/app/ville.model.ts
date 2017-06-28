import { GooglePlaceApiResult   }              from '../googleplaceapi-result.model';

//TODO: faire de la classe Ville un fils de la classe Point
export class Ville
{
    id: string;
    nomVille: string;
    descriptif: string;
    googleDetails: GooglePlaceApiResult;
}
