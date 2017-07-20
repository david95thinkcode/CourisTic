import { Component }                            from '@angular/core';

@Component({
  selector: 'page-notfound',
  templateUrl: 'notfound.html'
})

export class NotFoundPage {

  constructor() {

      console.log("Component < Not found > says Hello");
  }

}
