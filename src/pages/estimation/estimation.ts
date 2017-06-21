import { Component }                from '@angular/core';
import { NavController }            from 'ionic-angular';

//My imports
import { GooglePlaceApiService }    from '../../services/googleplaceapi.service';
import { GooglePlaceApiGlobal }     from '../../models/googleplaceapi-global.model';
import { NavParams }                from 'ionic-angular';


@Component({
  selector: 'page-estimation',
  templateUrl: 'estimation.html'
})

export class EstimationPage {
   
//TODO: Gérer la reception des placeid en paramètre par le constructeur
  //Recoit la place actuelle de l'utiliateur 
  //et la placeid du lieu de destination
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    //userPosition: 
    //destination:

    console.log("Chargement des Hotels en cours ...");
    //Recupère les hotels proches

    console.log("Chargement des hotels terminé !");
  
    console.log("Chargement des restaurants en cours ...");
    //Recupère les restaurants proches

    console.log("Chargement des restaurants terminé !");
  }

}
