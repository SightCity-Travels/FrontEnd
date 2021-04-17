import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 
})
export class LoginComponent implements OnInit {
  user:User=new User();
  
  constructor(private router:Router) { } //injected router object

 

  ngOnInit(): void {
  }
  checkLogin(loginForm:NgForm){
    if(loginForm.valid){
      if(this.user.email=="shwetha.m1998@gmail.com" && this.user.password=="Shwetha#123"){
        alert("Login successful"); //redirect to 
      //   this.router.navigate(['/homeLink'])
      // }else if(this.user.email=="ashwin@gmail.com" && this.user.password=="Ashwin@2"){
      //   this.router.navigate(['/adminDashBoardLink'])
      // }
      }

      else{
        alert("Invalid Username or Password");
       //this.router.navigate(['/loginFailedLink'])
      }
    }
    else{
      alert("Please enter all the details");
    }

  }

}
