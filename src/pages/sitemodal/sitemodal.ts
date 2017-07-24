import { Component }                                      from  '@angular/core';
import { NavController, NavParams, ViewController }       from  'ionic-angular';

@Component({
  selector: 'page-sitemodal',
  templateUrl: 'sitemodal.html'
})

export class SiteModalPage {
   
  site:any;

  constructor(params:NavParams, public navCtrl: NavController, public viewCtrl:ViewController) {
    this.site = params.data;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
