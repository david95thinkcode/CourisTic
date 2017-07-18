import { Component }                            from '@angular/core';
import { NavController, ToastController }       from 'ionic-angular';
import { NavParams }                            from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})

export class FavorisPage {

  favoriteplaces: FirebaseListObservable<any>; 
   
constructor(public navCtrl: NavController, public toastCtrl: ToastController, private navParams: NavParams, af: AngularFireDatabase) {

    //On fait la liaison entre firebase et notre variable favoriteplaces
    this.favoriteplaces = af.list('/favoriteplaces');  
}

  /**
   * Retire un lieu des favoris
   */
  public remove(firebasePlaceId: string) 
  {
    let successMessage: string = "Supprimé avec succès ";
    let failureMessage: string = "Echec de suppresion !";
    
    this.favoriteplaces.remove(firebasePlaceId)
    .then( succes => this.presentToast(successMessage))
    .catch( echec => this.presentToast(failureMessage));
  }

  /**
   * Permet d'afficher un toast 
   */
  private presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
