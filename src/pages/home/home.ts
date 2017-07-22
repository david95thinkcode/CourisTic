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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})

export class HomePage {

  picture_url: string;
  place_to_search: string;
  mainImageIndex: number = 1;  
  _connectedToInternet: boolean = false;
  detail: GooglePlaceApiGlobal = new GooglePlaceApiGlobal();
  result: GooglePlaceApiResult = new GooglePlaceApiResult();
  currentLocation: IonicNativeGeolocation = new IonicNativeGeolocation();
 
  
  constructor(private toastCtrl: ToastController, private network: Network, public loadingCtrl: LoadingController, public geolocation: Geolocation, public navCtrl: NavController, public googlePlaceApiService: GooglePlaceApiService, public ionicNativeService: IonicNativeService)
  {  
    this.checkConnection();

    if (this._connectedToInternet) 
    {
      this.Initialise(); 
    }
    else { console.log("Non connecté à Internet"); }
       
  }

  /** VERIFIE LA CONNEXION INTERNET */
  public checkConnection() {
    /**
     * Contrôler l'état de la connection
     * Si connecté, la variable < _connectedToInternet > est mise à TRUE
     * sinon, elle est maintenue à FALSE
     */
    let networkState = this.network.type;
    if (networkState == 'none') {
      this._connectedToInternet = false;
    }
    else {
      this._connectedToInternet = true;
    }
  }

/**
 * Initialise toutes les variables de la page
*/
  private Initialise() { }

  private loadDefaultPlace(){
    //Nous allons recevoir les détails d'un lieu par défaut
    let picDimension: string = "small";

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
      this.picture_url = this.googlePlaceApiService.getPhotoURL(this.result.reference_to_main_Image, picDimension );
      
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
