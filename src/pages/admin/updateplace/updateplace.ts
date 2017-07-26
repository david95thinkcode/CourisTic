import { Component }                                      from  '@angular/core';
import { NavController, NavParams, ViewController }       from  'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-updateplace',
  templateUrl: 'updateplace.html'
})

export class UpdatePlacePage {
   
  site:any;
  sites: FirebaseListObservable<any>;  
  description: string;

  constructor(af: AngularFireDatabase, params:NavParams, public navCtrl: NavController, public viewCtrl:ViewController) {
    this.site = params.data;
    this.sites = af.list('/sites');
    //copy description in this variable
    this.description = this.site.descriptif    
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  updatesite(siteid: string, description: string) {
    console.log("Description : " + description);
    console.log("Firebase ID : " + siteid);
    console.log("Updating this place ...");
    this.sites.update(siteid, {
      descriptif: description
    })
    .then (success => {
      console.log('Update succed')
      //Close modal after update
      this.closeModal();
    })
    .catch (error => {
      console.log("Update failed")
    })
    
  }
}
