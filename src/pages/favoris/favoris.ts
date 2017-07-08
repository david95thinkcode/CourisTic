import { Component }                            from '@angular/core';
import { NavController }                        from 'ionic-angular';

import { NavParams }                            from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})

export class FavorisPage {

  favoriteplaces: FirebaseListObservable<any>; 
   
constructor(public navCtrl: NavController, private navParams: NavParams, af: AngularFireDatabase) {
  
    this.favoriteplaces = af.list('/favoriteplaces');
    this.loadFavorite();   
  
}

  //TODO: Ecrire le code de la méthode
  private loadFavorite() {
    console.log("Chargement des favoris en cours ...");

    console.log("Chargement des favoris terminé !");
  }
}
