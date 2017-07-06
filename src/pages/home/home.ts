import { Component }                from '@angular/core';
import { LoadingController }        from 'ionic-angular';
import { NavController }            from 'ionic-angular';
import { RecherchePage  }           from '../../pages/recherche/recherche';
import { EstimationPage  }          from '../../pages/estimation/estimation';
import { GooglePlaceApiService }    from '../../services/googleplaceapi.service';
import { IonicNativeService }       from '../../services/ionicnative.service';
import { GooglePlaceApiGlobal }     from '../../models/googleplaceapi-global.model';
import { GooglePlaceApiResult   }   from '../../models/googleplaceapi-result.model';
import { IonicNativeGeolocation }   from '../../models/ionicnative-geolocation.model';

import { Geolocation }              from    '@ionic-native/geolocation';

//RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})

export class HomePage {

  currentLocation: IonicNativeGeolocation = new IonicNativeGeolocation();
  mainImageIndex: number = 1;  
  detail: GooglePlaceApiGlobal = new GooglePlaceApiGlobal();
  result: GooglePlaceApiResult = new GooglePlaceApiResult();
  picture_url: string;
  place_to_search: string;

  constructor(public loadingCtrl: LoadingController, public geolocation: Geolocation, public navCtrl: NavController, public googlePlaceApiService: GooglePlaceApiService, public ionicNativeService: IonicNativeService)
  {
      
      this.place_to_search = "";
      this.Initialise();
      this.getCurrentPosition();
      //console.log(this.currentLocation);
  }

/**
 * Initialise toutes les variables de la page
*/
  private Initialise() {

    this.googlePlaceApiService.getDetails("")
    .then(lesdetails => 
    {
      this.detail = lesdetails;
      
      //On stocke dans result l'object contenant les détails du lieu
      this.result = this.detail.result;
      //On définit l'index de l'image principale de notre lieu
      this.result.reference_to_main_Image = this.result.photos[this.mainImageIndex].photo_reference;
      //On récupère l'url de l'image principale
      this.picture_url = this.googlePlaceApiService.getPhotoURL(this.result.reference_to_main_Image);
      
    });
  }

  /**Pour lancer une recherche de lieux à partir
   * 
   */
  public searchPlaces() {
    
    this.navCtrl.push(RecherchePage, {
      query: this.place_to_search
    });
    this.presentLoading();
  }

  public showEstimation(choice : GooglePlaceApiResult) {
    
    //Destination valide ???
    if (choice == null){
      console.log("Destination choisie null");
    }

    else {
      
      this.navCtrl.push(EstimationPage, {
        currentLocation: this.currentLocation,
        userChoice: choice
      });

    }    
    
  } 

//Loader
  public presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Recherche en cours...",
      duration: 2000
    });
    loader.present();
  }

  public getCurrentPosition() {        
    this.ionicNativeService.loadCurrentLocationOn(this.currentLocation);
  }

}
