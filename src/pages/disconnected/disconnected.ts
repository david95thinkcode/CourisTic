import { Component }                            from '@angular/core';

@Component({
  selector: 'page-disconnected',
  templateUrl: 'disconnected.html'
})

export class DisconnectedPage {

  constructor() {

      console.log("Component < Disconnected > says Hello");
  }

  //TODO: Corriger la méthode car elle rechharge l'application entièr de puis la home page
  public reloadCurrentPage() {
    location.reload();
  }

}
