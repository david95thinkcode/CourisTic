import { Component }                           from '@angular/core';
import { NavController, NavParams }            from 'ionic-angular';
import { GooglePlaceApiService }               from '../../services/googleplaceapi.service';
import { GooglePlaceApiGlobal }                from '../../models/googleplaceapi-global.model';
import { GooglePlaceApiResult   }              from '../../models/googleplaceapi-result.model';
import { GooglePlaceApiPhoto   }               from '../../models/googleplaceapi-photo.model';
import { GooglePlaceApiPlaceSearchResult   }   from '../../models/googleplaceapi-placesearchresult.model';
import { IonicNativeGeolocation }              from '../../models/ionicnative-geolocation.model';

@Component({
  selector: 'page-listelieuxproches',
  templateUrl: 'listelieuxproches.html' 
})

export class ListeLieuxProchesPage {
  
  //currentLocation: IonicNativeGeolocation = new IonicNativeGeolocation();
  response: GooglePlaceApiPlaceSearchResult = new GooglePlaceApiPlaceSearchResult();
  result: GooglePlaceApiResult = new GooglePlaceApiResult();
  results: GooglePlaceApiResult[];
  mainImageIndex: number = 1;
  title: string;  

  constructor(public navCtrl: NavController, public navParams: NavParams, public googlePlaceApiService: GooglePlaceApiService) 
  {
    this.results = navParams.get('array');
    this.title = navParams.get('title');
    this.Initialise(); 
  }

/**
 * Initialise toutes les variables de la page
*/
  private Initialise() {
    
    if (this.results == null) {
      console.log("Aucun " + this.title + " trouvé dans ce lieu !");
    }
    else {
      console.log(this.results)
    }
  }  
}
