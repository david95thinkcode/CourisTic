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
    console.log(this.results);
    this.title = navParams.get('title');
    this.Initialise(); 
  }

/**
 * Initialise toutes les variables de la page
*/
  private Initialise() 
  {    
    if (this.results == null) 
    {
      console.log("Aucun " + this.title + " trouvé dans ce lieu !");
    }
    else 
    {
      this.loadPictureUrl();
      console.log(this.results);
      /*
      this.results.forEach(result => 
      {
        result.initialisePicture();
      })
      //console.log(this.results)*/
    }
  }

  public loadPictureUrl() {
    /**POUR CHAQUE RESULT
         * On stocke dans result un object contenant les détails d'un lieu trouvé
         * On définit l'index de l'image principale de notre lieu
         * On récupère l'url de l'image principale
    */
        this.results.forEach(result => 
        {
          const secureIndexForPhoto: number = 0;
          
          //Cas ou l'image nexiste pas (photos[] = null ==> est vide)
          if (result.photos == null) 
          {
            //on utilise une image de notre dossier
            result.url_to_main_Image = "assets/img/no_image.png";
          }

          //Photos[] n'est pas vide
          else {
            result.reference_to_main_Image = result.photos[secureIndexForPhoto].photo_reference;
            result.url_to_main_Image = this.googlePlaceApiService.getPhotoURL(result.reference_to_main_Image, "small");
          }
         
        });
  }
}
