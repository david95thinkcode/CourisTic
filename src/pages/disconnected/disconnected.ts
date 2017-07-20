import { Component }                            from '@angular/core';

@Component({
  selector: 'page-disconnected',
  templateUrl: 'disconnected.html'
})

export class DisconnectedPage {

  constructor() {

      console.log("Component < Disconnected > says Hello");
  }

}
