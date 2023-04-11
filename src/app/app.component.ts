import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'new-collapse';
  data: any[] = [];

  addNewDataOnArray(): void {

    setTimeout(() => {
      let otherArray = ['abacaxi', 'banana', 'laranja', 'abacaxi', 'banana', 'laranja', 'abacaxi', 'banana', 'laranja', 'abacaxi', 'banana', 'laranja', 'abacaxi', 'banana', 'laranja'];
      this.data = otherArray;
    }, 6000);

  }

}
