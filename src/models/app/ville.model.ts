import { Point   }              from '../app/point.model';

export class Ville extends Point
{
    id: string;
    nomVille: string;
    descriptif: string;

    constructor() {
        
        super();

    }
}
