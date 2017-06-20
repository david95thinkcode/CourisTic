import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//My imports
import { NavParams } from 'ionic-angular';
/**
 * import { GooglePlaceApiService }   from '../../services/googleplaceapi.service';
 * import { GooglePlaceApiGlobal }   from '../../models/googleplaceapi-global.model';
 */


@Component({
  selector: 'page-trajetsenregistres',
  templateUrl: 'trajetsenregistres.html'
})

export class TrajetsEnregistresPage {
   

//Constructeur
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    
    console.log("Chargement des trajets enregistrés en cours ...");
    
    this.loadSavedTrips();

    console.log("Chargement des trajets enregistrés terminé !");
  
}

  //TODO: Ecrire le code de la méthode ci-dessous pour charger les trajets enregistrés par l'utilisateur
  private loadSavedTrips() {

  }
}
