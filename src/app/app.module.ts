import { BrowserModule }              from '@angular/platform-browser';
import { ErrorHandler, NgModule }     from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//pages
import { MyApp }                      from './app.component';
import { HomePage }                   from '../pages/home/home';
import { SitesPage }                  from '../pages/sites/sites';
import { ListehotelsPage  }           from  '../pages/listehotels/listehotels';
import { FavorisPage }                from '../pages/favoris/favoris';
import { TrajetsEnregistresPage }     from '../pages/trajetsenregistres/trajetsenregistres';
import { EstimationPage }             from '../pages/estimation/estimation';
import { AidePage }                   from '../pages/aide/aide';
import { RecherchePage }              from '../pages/recherche/recherche';
import { ListeLieuxProchesPage  }     from '../pages/listelieuxproches/listelieuxproches';
import { DisconnectedPage  }          from '../pages/disconnected/disconnected';
import { NotFoundPage  }              from '../pages/notfound/notfound';
import { SiteModalPage  }             from '../pages/sitemodal/sitemodal';
//Ionic native
import { StatusBar }                  from '@ionic-native/status-bar';
import { SplashScreen }               from '@ionic-native/splash-screen';
import { Geolocation }                from '@ionic-native/geolocation';
import { Network }                    from '@ionic-native/network';

import { HttpModule  }                from "@angular/http";
import {  AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth }         from 'angularfire2/auth';

import { GooglePlaceApiService }      from "../services/googleplaceapi.service";
import { GoogleMapsApiService }       from "../services/googlemapsapi.service";
import { IonicNativeService }         from "../services/ionicnative.service";

//AngularFire2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBdn42YyUnmDdA4PQdoSP_gbasG-nh0tjw",
  authDomain: "projet-tutore-1497454700964.firebaseapp.com",
  databaseURL: "https://projet-tutore-1497454700964.firebaseio.com",
  storageBucket: "projet-tutore-1497454700964.appspot.com",
  messagingSenderId: "927618945913"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SitesPage,
    ListehotelsPage,
    FavorisPage,
    TrajetsEnregistresPage,
    EstimationPage,
    AidePage,
    RecherchePage,
    ListeLieuxProchesPage,
    DisconnectedPage,
    NotFoundPage,
    SiteModalPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SitesPage,
    HomePage,
    ListehotelsPage,
    FavorisPage,
    TrajetsEnregistresPage,
    EstimationPage,
    AidePage,
    RecherchePage,
    ListeLieuxProchesPage,
    DisconnectedPage,
    NotFoundPage,
    SiteModalPage
  ],
  providers: [
    GooglePlaceApiService,
    GoogleMapsApiService,
    IonicNativeService,
    Geolocation,
    Network,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
