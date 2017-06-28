import { Component }                from '@angular/core';
import { NavController }            from 'ionic-angular';
import { RecherchePage  }           from '../../pages/recherche/recherche';
import { EstimationPage  }          from '../../pages/estimation/estimation';
import { GooglePlaceApiService }    from '../../services/googleplaceapi.service';
import { GooglePlaceApiGlobal }     from '../../models/googleplaceapi-global.model';
import { GooglePlaceApiResult   }   from '../../models/googleplaceapi-result.model';
import { IonicNativeGeolocation }   from '../../models/ionicnative-geolocation.model';

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

  constructor(public navCtrl: NavController, public googlePlaceApiService: GooglePlaceApiService)
  {
      this.place_to_search = "Abomey";
      this.Initialise();
 
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
  }

  public showEstimation(choice : GooglePlaceApiResult) {
    
    //Destination valide ???
    if (choice == null){
      console.log("Destination choisie null");
    }

    else {
      this.currentLocation.latitude = 6.415745100000001;
      this.currentLocation.longitude = 2.3413236;

      this.navCtrl.push(EstimationPage, {
        currentLocation: this.currentLocation,
        userChoice: choice
      });

    }    
    
  } 
}
