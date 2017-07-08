import { BrowserModule }              from '@angular/platform-browser';
import { ErrorHandler, NgModule }     from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//pages
import { MyApp }                      from './app.component';
import { HomePage }                   from '../pages/home/home';
import { ListPage }                   from '../pages/list/list';
import { ListehotelsPage  }           from  '../pages/listehotels/listehotels';
import { FavorisPage }                from '../pages/favoris/favoris';
import { TrajetsEnregistresPage }     from '../pages/trajetsenregistres/trajetsenregistres';
import { EstimationPage }             from '../pages/estimation/estimation';
import { AidePage }                   from '../pages/aide/aide';
import { RecherchePage }              from '../pages/recherche/recherche';
import { ListeLieuxProchesPage  }     from '../pages/listelieuxproches/listelieuxproches';

//Ionic native
import { StatusBar }                  from '@ionic-native/status-bar';
import { SplashScreen }               from '@ionic-native/splash-screen';
import { Geolocation }                from '@ionic-native/geolocation';

import { HttpModule  }                from "@angular/http";
import {  AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { GooglePlaceApiService }      from "../services/googleplaceapi.service";
import { GoogleMapsApiService }       from "../services/googlemapsapi.service";
import { IonicNativeService }         from "../services/ionicnative.service";
import { ExpandableComponent }        from '../components/expandable/expandable';

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
    ListPage,
    ListehotelsPage,
    FavorisPage,
    TrajetsEnregistresPage,
    EstimationPage,
    AidePage,
    RecherchePage,
    ListeLieuxProchesPage,
    ExpandableComponent
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
    HomePage,
    ListPage,
    ListehotelsPage,
    FavorisPage,
    TrajetsEnregistresPage,
    EstimationPage,
    AidePage,
    RecherchePage,
    ListeLieuxProchesPage
  ],
  providers: [
    GooglePlaceApiService,
    GoogleMapsApiService,
    IonicNativeService,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
