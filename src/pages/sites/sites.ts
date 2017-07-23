import { Component }                                   from '@angular/core';
import { NavController, ToastController }              from 'ionic-angular';
import { NavParams, ModalController }                  from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { GooglePlaceApiResult   }                      from '../../models/googleplaceapi-result.model';
//import { GooglePlaceApiService }                       from '../../services/googleplaceapi.service';

@Component({
  selector: 'page-sites',
  templateUrl: 'sites.html'
})

export class SitesPage {

  sites: FirebaseListObservable<any>; 
  modalCtrl: ModalController; 

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private navParams: NavParams, af: AngularFireDatabase) {

      this.sites = af.list('/sites');  
      console.log("table crée");
  }

  presentProfileModal() {
   //let siteModal = this.modalCtrl.create(Profile, { userId: 8675309 });
   //siteModal.present();
 }

  /**
   * Retire un site
   */
  public remove(siteId: string) 
  {
    let successMessage: string = "Retiré avec succès ";
    let failureMessage: string = "Impossible à retirer !";
    
    this.sites.remove(siteId)
    .then( succes => this.presentToast(successMessage))
    .catch( echec => this.presentToast(failureMessage));
  }


  /** ENREGISTRE LE SITE DANS FIREBASE
   * @param site Le lieu à enregistrer
   */
  public add(site: GooglePlaceApiResult)
  {    
    
    let successtoastMessage: string = site.name + " ajouté aux sites";
    let failuretoastMessage: string = "Echec d'ajout " + site.name + " aux sites !";
    
    this.sites.push({
      description: "",
      pays: "",
      place_id: site.place_id,
      libelle: site.name,
      types: site.types,
      vinicity: site.vicinity,
      formatted_address: site.formatted_address,
      geometry: site.geometry,
      picture_URL: site.url_to_main_Image,
                
    });
    
    this.presentToast(successtoastMessage);
  }

   private presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}