import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListehotelsPage  } from '../../pages/listehotels/listehotels';

import { GooglePlaceApiService }   from '../../services/googleplaceapi.service';
import { GooglePlaceApiGlobal }   from '../../models/googleplaceapi-global.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})

export class HomePage {
  ville: string;
  detail: GooglePlaceApiGlobal;

  constructor(public navCtrl: NavController, public googlePlaceApiService: GooglePlaceApiService) 
  {
    this.ville="Cotonou";

    this.googlePlaceApiService.getDetails("")
    .then(lesdetails => {
      this.detail = lesdetails;
      console.log(this.detail);
    });
    
  }

//Test method juste to show ListehotelsPages
  private mapsAPI() {
    console.log(this.ville); 
    this.navCtrl.push(ListehotelsPage, 
    { 
      ville: this.ville 
    });
  }
}
