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
    public loadCurrentLocationOn(position: IonicNativeGeolocation){
        
        this.geolocation.getCurrentPosition()
            .then((response) => {
                position.accuracy = response.coords.accuracy;
                position.altitude = response.coords.altitude;
                position.longitude = response.coords.longitude;
                position.latitude = response.coords.latitude;
                position.speed = response.coords.speed;
                position.heading = response.coords.heading;
                position.altitudeAccuracy = response.coords.altitudeAccuracy;
            })
            .catch((error) => {
                console.log('Error getting location ==> ', error);
            });
    }

    /** 
        public getCurrentPosition() {
            
            //Notre objet représentant la position du périphérique
            let currentLocation: IonicNativeGeolocation = new IonicNativeGeolocation;

            this.geolocation.getCurrentPosition()
            .then((response) => {

                currentLocation = response.coords;
                console.log("CurrentPosition : " + currentLocation);

            })
            .catch((error) => {
                console.log('Error getting location ==> ', error);
            });
        }

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