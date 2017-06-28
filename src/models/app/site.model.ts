import { Point   }              from '../app/point.model';

export class Site extends Point
{
    id: string;
    libelle: string;
    descriptif: string;
    
    constructor() {
        
        super();

    }
}