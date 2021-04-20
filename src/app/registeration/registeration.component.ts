import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../User';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  user:User=new User(); 
userCPassword:string;
  constructor( private userservice:UserService,private router:Router){}
 

  ngOnInit(): void {}
  checkRegister(registerationForm: NgForm) {
    console.log("Hi");
    if (this.user.password != this.userCPassword) {
      alert("Password is not matching")
    }
    else if (registerationForm.valid) {
      alert(JSON.stringify(registerationForm.value));
      console.log(this.user); //obj will be sent to server thru Api calls
      this. userservice.registerUser(this.user).subscribe(
        userPersisted => {
          console.log(userPersisted);
        }
      );
    }
    else {
      alert("Please enter correct information.");
    }
  }
}
 
  // checkRegister(){
  //   console.log(this.user);
  //   this.userservice.registerUser(this.user).subscribe(
  //     userPersisted=>{console.log(userPersisted)});
  // }

  
// checkRegister(registerForm: NgForm) {
//   if (this.user.password != this.userCPassword) {
//     alert("Password is not matching")
//   }
//   else if (registerForm.valid) {
//     else{
//     // alert(JSON.stringify(registerationForm.value));
//     console.log(this.user); //obj will be sent to server thru Api calls
//     this.userservice.registerUser(this.user).subscribe(
//       userPersisted => {
//         console.log(userPersisted)
//       }
//     );
//   }
//   else {
//     alert("Please enter correct information.");
//   }
// }

// }


