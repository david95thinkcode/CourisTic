import { Component }                            from '@angular/core';
import { NavController, ToastController }       from 'ionic-angular';
import { NavParams }                            from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { GooglePlaceApiResult   }              from '../../models/googleplaceapi-result.model';
import { EstimationPage  }                     from '../../pages/estimation/estimation';

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

  public showEstimation(choice: any) {
    let place: GooglePlaceApiResult = new GooglePlaceApiResult();
    place.name = choice.name;
    place.place_id = choice.placeid;
    place.url_to_main_Image = choice.picture_URL;
    
    //Destination valide ???
    if (choice == null){
      console.log("Favoris choisi null");
    }
    else {       
      console.log(choice);
      this.navCtrl.push(EstimationPage, {
        userChoice: choice
      });
    }    
  } 

  /**
   * Retire un lieu des favoris
   */
  public remove(firebasePlaceId: string) 
  {
    let successMessage: string = "Retiré avec succès ";
    let failureMessage: string = "Impossible à retirer !";
    
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
