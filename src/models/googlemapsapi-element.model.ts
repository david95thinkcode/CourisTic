import { GoogleMapsApiDuration   }            from      './googlemapsapi-duration.model';
import { GoogleMapsApiDistance   }            from      './googlemapsapi-distance.model';

export class GoogleMapsApiElement {
    
    distance: GoogleMapsApiDistance;
    duration : GoogleMapsApiDuration;
    status : string;
}