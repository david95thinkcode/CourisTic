import { Component, ViewChild }         from '@angular/core';
import { Nav, Platform }                from 'ionic-angular';
import { StatusBar }                    from '@ionic-native/status-bar';
import { SplashScreen }                 from '@ionic-native/splash-screen';

//Pages of the app
import { HomePage }                     from '../pages/home/home';
import { ListehotelsPage }              from '../pages/listehotels/listehotels';
import { FavorisPage }                  from '../pages/favoris/favoris';
import { SitesPage }                    from '../pages/sites/sites';
import { TrajetsEnregistresPage }       from '../pages/trajetsenregistres/trajetsenregistres';
import { AidePage }                     from '../pages/aide/aide';
import { RecherchePage }                from '../pages/recherche/recherche';
import { EstimationPage }               from '../pages/estimation/estimation';
import { ListeLieuxProchesPage  }       from '../pages/listelieuxproches/listelieuxproches';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Sites touristiques', component: SitesPage },
      { title: 'Lieux favoris', component: FavorisPage },
      { title: 'Trajets enregistrés', component: TrajetsEnregistresPage },
      { title: 'A propos', component: AidePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
