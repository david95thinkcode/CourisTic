import { Component }                           from '@angular/core';
import { NavController, NavParams }            from 'ionic-angular';

import { EstimationPage  }                     from '../../pages/estimation/estimation';

import { GooglePlaceApiService }               from '../../services/googleplaceapi.service';
import { GooglePlaceApiGlobal }                from '../../models/googleplaceapi-global.model';
import { GooglePlaceApiResult   }              from '../../models/googleplaceapi-result.model';
import { GooglePlaceApiPhoto   }               from '../../models/googleplaceapi-photo.model';
import { GooglePlaceApiPlaceSearchResult   }   from '../../models/googleplaceapi-placesearchresult.model';

@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html' 
})

export class RecherchePage {
  
  response: GooglePlaceApiPlaceSearchResult = new GooglePlaceApiPlaceSearchResult();
  result: GooglePlaceApiResult = new GooglePlaceApiResult();
  results: GooglePlaceApiResult[];
  mainImageIndex: number = 1;
  query: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public googlePlaceApiService: GooglePlaceApiService) 
  {
    this.query = navParams.get('query');
    this.Initialise();
 
  }

/**
 * Initialise toutes les variables de la page
 */
  private Initialise() {
    
    if ((this.query == null) || (this.query == "")) {
      console.log("Aucun lieu à rechercher entré");
    }

    else 
    {
      this.googlePlaceApiService.getTextSearchPlaces(this.query)
      .then(fetched => 
      {
        this.response = fetched;
        this.results = this.response.results;

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
            result.url_to_main_Image = this.googlePlaceApiService.getPhotoURL(result.reference_to_main_Image);
          }
         
        });
                
      });

    }   

  }

  /** Ouvre la page d'estimation de l'application
   * et lui envoie les paramètres nécessaires qui sont :
   * la lieu choisi par l'utilisateur
   * la position actuelle du téléphone (ou de l'utiliateur)
  */
  public showEstimation(choice : GooglePlaceApiResult) {
    
    //Destination valide ???
    if (choice == null){
      console.log("Destination choisie null");
    }

    else {          
      this.navCtrl.push(EstimationPage, {
        userChoice: choice
      });

    }    
    
  } 
}
