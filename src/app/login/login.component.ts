import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../User';
import { Router } from '@angular/router';
import { LoginDto } from '../model/LoginDto';
import { UserService } from '../service/user.service';

import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  user: User = new User();

  loginDto: LoginDto = new LoginDto();


  constructor(private service: UserService, private router: Router, private serviceAdmin: AdminService) { } //injected router object



  ngOnInit(): void {



  }
  // checkLogin(loginForm:NgForm){
  //   if(loginForm.valid){
  //     if(this.user.email=="shwetha.m1998@gmail.com" && this.user.password=="Shwetha#123"){
  //       alert("Login successful"); //redirect to 
  //     //   this.router.navigate(['/homeLink'])
  //     // }else if(this.user.email=="ashwin@gmail.com" && this.user.password=="Ashwin@2"){
  //     //   this.router.navigate(['/adminDashBoardLink'])
  //     // }
  //     }

  //     else{
  //       alert("Invalid Username or Password");
  //      //this.router.navigate(['/loginFailedLink'])
  //     }
  //   }
  //   else{
  //     alert("Please enter all the details");
  //   }

  // }
  checkLogin(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.service.loginUser(this.loginDto).subscribe(
        loginUser => {
          console.log(loginUser);
          if (loginUser == true) {
            localStorage.setItem("userId", this.loginDto.id.toString());
            localStorage.setItem("status", true.valueOf.toString());
            // this.router.navigate(['homeLink']);
            this.router.navigate(['userDashBoard'])
              .then(() => {
                window.location.reload();
              });
            
          } else if (loginUser == false) {

            this.serviceAdmin.loginAdmin(this.loginDto).subscribe(
              loginAdmin => {
                console.log(loginAdmin);
                if (loginAdmin == true) {
                  localStorage.setItem("adminId", this.loginDto.id.toString());
                  this.router.navigate(['adminDashBoardLink']);
                }
              }
            );
          }
          // else {
          //   document.getElementById("msg").innerHTML = "Invalid UserId/Password";
          // }
        }
      );

    } else {
      document.getElementById("msgLogin").innerHTML = "Invalid UserId/Password";
    }
  }



}
