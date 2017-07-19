//core components
import {    Injectable  }                   from    '@angular/core';
import {    Http  }                         from    '@angular/http';
import { Geolocation }                      from    '@ionic-native/geolocation';
import { IonicNativeGeolocation   }         from    '../models/ionicnative-geolocation.model';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class IonicNativeService {

    constructor(private geolocation: Geolocation) {

    }

    /** Charge dans l'objet reçu en paramètre la position actuelle du périphérique
     * @position: objet IonicNativeGeolocation recu 
     */
    public getCurrentLocation(){
        return this.geolocation.getCurrentPosition()
            .then((response) =>  response.coords as IonicNativeGeolocation)
            .catch((error) => console.log("Unable to get location because => " + error));
    }

    /** 
        public watchPosition() {
            
            let watch = this.geolocation.watchPosition();
            watch.subscribe((data) => {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
            });
        }

    */
}