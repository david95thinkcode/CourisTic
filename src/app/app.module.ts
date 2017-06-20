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

//component
import { StatusBar }                  from '@ionic-native/status-bar';
import { SplashScreen }               from '@ionic-native/splash-screen';

import { HttpModule  }                from "@angular/http";
import { GooglePlaceApiService }      from "../services/googleplaceapi.service";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListehotelsPage,
    FavorisPage,
    TrajetsEnregistresPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListehotelsPage,
    FavorisPage,
    TrajetsEnregistresPage
  ],
  providers: [
    GooglePlaceApiService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
