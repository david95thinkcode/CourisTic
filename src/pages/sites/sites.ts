import { Component }                                   from '@angular/core';
import { NavController, ToastController }              from 'ionic-angular';
import { NavParams, ModalController, ViewController }  from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { GooglePlaceApiResult   }                      from '../../models/googleplaceapi-result.model';
import { Site }                                        from '../../models/app/site.model';
import { SiteModalPage  }                              from '../../pages/sitemodal/sitemodal';
import { EstimationPage  }                     from '../../pages/estimation/estimation';
@Component({
  selector: 'page-sites',
  templateUrl: 'sites.html'
})

export class SitesPage {

  sites: FirebaseListObservable<any>;  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController, private navParams: NavParams, af: AngularFireDatabase) {

      this.sites = af.list('/sites');
  }

  public showEstimation(choice: any) {
    console.log(choice)
    let place: GooglePlaceApiResult = new GooglePlaceApiResult();
    place.name = choice.name;
    place.place_id = choice.placeid;
    place.url_to_main_Image = choice.picture_URL;
    place.geometry = choice.geometry;
    
    //Destination valide ???
    if (choice == null){
      console.log("Favoris choisi null");
    }
    else {       
      console.log(choice);
      this.navCtrl.push(EstimationPage, {
        userChoice: place
      });
    }    
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
    let siteModal = this.modalCtrl.create(SiteModalPage, site);
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