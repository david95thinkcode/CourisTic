import { Component }                      from  '@angular/core';
import { NavController, NavParams }       from  'ionic-angular';

@Component({
  selector: 'page-sitemodal',
  templateUrl: 'sitemodal.html'
})

export class SiteModalPage {
   
  constructor(public navCtrl: NavController) {
    console.log("Modal appelé");
  }
}
