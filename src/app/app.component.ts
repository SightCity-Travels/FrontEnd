import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from './model/LoginDto';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bus-Reservation';

//  isShown:boolean;
 
 isStatus:Boolean=false;

 
  constructor(private service:UserService, private router:Router) { 
    this.isStatus=Boolean(sessionStorage.getItem("status"));
  }
 
 
 

}
