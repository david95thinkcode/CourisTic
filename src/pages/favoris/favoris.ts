import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//My imports
import { NavParams } from 'ionic-angular';
/**
 * import { GooglePlaceApiService }   from '../../services/googleplaceapi.service';
  import { GooglePlaceApiGlobal }   from '../../models/googleplaceapi-global.model';
 */
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})

export class FavorisPage {
   
//Constructeur
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    
    console.log("Chargement des favoris en cours ...");
    
    this.loadFavorite();

    console.log("Chargement des favoris terminé !");
  
}

  //TODO: Ecrire le code de la méthode ci-dessous pour charger les lieux favoris de l'utilisateur
  private loadFavorite() {

  }
}
