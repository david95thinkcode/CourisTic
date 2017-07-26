import { Component }                                   from '@angular/core';
import { NavController, ToastController }              from 'ionic-angular';
import { NavParams, ModalController, ViewController }  from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { GooglePlaceApiResult   }                      from '../../../models/googleplaceapi-result.model';
import { Site }                                        from '../../../models/app/site.model';
import { UpdatePlacePage  }                            from '../updateplace/updateplace';

@Component({
  selector: 'page-listplace',
  templateUrl: 'listplace.html'
})

export class ListPlacePage {

  sites: FirebaseListObservable<any>;  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController, private navParams: NavParams, af: AngularFireDatabase) {

      this.sites = af.list('/sites');
  }

  /** Open a modal and send to it send it site data to show */
  presentModal(site:any) {
    /*
      //TODO : Think about that process
      //We create a Site Object
      //We pass to it the data from the received parameter (site)
      //We send site object to modal

      let siteObj: Site = new Site();    
      siteObj.libelle = site.libelle;
      siteObj.descriptif = site.descriptif;
    */
    console.log(site);
    let siteModal = this.modalCtrl.create(UpdatePlacePage, site);
    siteModal.present();
  }
  
  private presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  /**  Retire un site*/
  /*
  public remove(siteId: string) 
  {
    let successMessage: string = "Retiré avec succès ";
    let failureMessage: string = "Impossible à retirer !";
    
    this.sites.remove(siteId)
    .then( succes => this.presentToast(successMessage))
    .catch( echec => this.presentToast(failureMessage));
  }
  */

}