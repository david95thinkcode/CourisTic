import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListehotelsPage  } from '../../pages/listehotels/listehotels';

import { GooglePlaceApiService }    from '../../services/googleplaceapi.service';
import { GooglePlaceApiGlobal }     from '../../models/googleplaceapi-global.model';
import { GooglePlaceApiResult   }   from '../../models/googleplaceapi-result.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})

export class HomePage {
  mainImageIndex: number = 1;
  detail: GooglePlaceApiGlobal = new GooglePlaceApiGlobal();
  result: GooglePlaceApiResult = new GooglePlaceApiResult();
  picture_url: string;

  constructor(public navCtrl: NavController, public googlePlaceApiService: GooglePlaceApiService) 
  {
    
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
}
