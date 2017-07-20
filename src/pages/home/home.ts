import { Component }                            from '@angular/core';
import { LoadingController,ToastController }    from 'ionic-angular';
import { NavController }                        from 'ionic-angular';
import { RecherchePage  }                       from '../../pages/recherche/recherche';
import { EstimationPage  }                      from '../../pages/estimation/estimation';
import { GooglePlaceApiService }                from '../../services/googleplaceapi.service';
import { IonicNativeService }                   from '../../services/ionicnative.service';
import { GooglePlaceApiGlobal }                 from '../../models/googleplaceapi-global.model';
import { GooglePlaceApiResult   }               from '../../models/googleplaceapi-result.model';
import { IonicNativeGeolocation }               from '../../models/ionicnative-geolocation.model';
import { Network }                              from '@ionic-native/network';
import { Geolocation }                          from '@ionic-native/geolocation';

//RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})

export class HomePage {

  _connectedToInternet: boolean = false;
  currentLocation: IonicNativeGeolocation = new IonicNativeGeolocation();
  mainImageIndex: number = 1;  
  detail: GooglePlaceApiGlobal = new GooglePlaceApiGlobal();
  result: GooglePlaceApiResult = new GooglePlaceApiResult();
  picture_url: string;
  place_to_search: string;
  
  constructor(private toastCtrl: ToastController, private network: Network, public loadingCtrl: LoadingController, public geolocation: Geolocation, public navCtrl: NavController, public googlePlaceApiService: GooglePlaceApiService, public ionicNativeService: IonicNativeService)
  {  
    this._connectedToInternet = true;
    this.Initialise();

    //Contrôler l'état de la connection
    //Si oui, la variable < __connectedToInternet > est mise à TRUE
    //sinon, elle est maintenue à FALSE

      // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
        else{
          console.log("We don't know your network connection")
        }
      }, 1000);
    });
  }

/**
 * Initialise toutes les variables de la page
*/
  private Initialise() {
    this.place_to_search = "";
    this.googlePlaceApiService.getDetails("")
    .then(lesdetails => 
    {
      this.detail = lesdetails;
      
      //On stocke dans result l'object contenant les détails du lieu
      this.result = this.detail.result;
      //On définit l'index de l'image principale de notre lieu
      this.result.reference_to_main_Image = this.result.photos[this.mainImageIndex].photo_reference;
      //On récupère l'url de l'image principale
      this.picture_url = this.googlePlaceApiService.getPhotoURL(this.result.reference_to_main_Image);
      
    });
  }

  /**Lance une recherche de lieux */
  public searchPlaces() {
    //On contrôle si l'utilisateur a tapé un lieu à rechercher
    //Si oui on lance la recherche
    //Si non on lui affiche un toast
    //La variable servant à faire ce contrôle est : place_to_search
    this.place_to_search = this.place_to_search.trim();
    if (this.place_to_search.length != 0 ) {
      this.navCtrl.push(RecherchePage, {
        query: this.place_to_search
      });
      this.presentLoading();
    }
    else {
      let message: string = "Veuillez entrer un lieu à chercher";
      this.presentToast(message);
    }
    
  }

  public showEstimation(choice : GooglePlaceApiResult) {
    
    //Destination valide ???
    if (choice == null){
      console.log("Destination choisie null");
    }

    else {
      
      this.navCtrl.push(EstimationPage, {
        userChoice: choice
      });
    }        
  } 

  //FONCTION RELATIVES A L'UX

  /** AFFICHE LE LOADER */
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Recherche en cours...",
      duration: 2000
    });
    loader.present();
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  
}
