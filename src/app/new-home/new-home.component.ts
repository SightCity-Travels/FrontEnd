import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css']
})
export class NewHomeComponent implements OnInit {
  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;
  source: String = "";
  destination: String = "";
  constructor() { }
  ngOnInit() {
    var myIndex = 0;
    carousel();

    function carousel() {
      var i;
      var x;
      x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) { myIndex = 1 }
      try {
        x[myIndex - 1].style.display = "block";
      }
      catch {

      }
      finally {
        setTimeout(carousel, 2000); // Change image every 2 seconds
      }
    }
  }



}


