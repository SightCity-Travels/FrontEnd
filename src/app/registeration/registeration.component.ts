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
  user: User = new User();
  userCPassword: string;
  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(){
    
  }
  
checkPassword() {
  if (this.user.password != this.userCPassword) {
    //alert("Password is not matching");
    document.getElementById("resultDiv").innerHTML="Confirm Password is not matching";
  }
  else {
    //alert("Incorrect old password");
    document.getElementById("resultDiv").innerHTML="";
   
  }}
   
// =======
//   ngOnInit() {

//     // Get the modal
//     var modal = document.getElementById("myModal");

//     // Get the button that opens the modal
//     //var btn1 = document.getElementById("btn1");

//     var btn2 = document.getElementById("myBtn2");
//     var btn3 = document.getElementById("myBtn3");

//     // Get the <span> element that closes the modal
//     var span;
//     span = document.getElementsByClassName("close")[0];

//     // When the user clicks the button, open the modal 

//     btn2.onclick = function () {
//       modal.style.display = "block";
//     }
//     btn3.onclick = function () {
//       modal.style.display = "block";
//     }

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function () {
//       modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function (event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     }



//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function () {
//       modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function (event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     }
// >>>>>>> e85d6fa807797859c24aec6ba8b7be40a2d95e88
//   }
  



  checkRegister(registerationForm: NgForm) {
    // console.log("Hi");
    // if (this.user.password != this.userCPassword) {
    //   document.getElementById("btn3").innerHTML="Password is not matching ";
    // }
     if (registerationForm.valid) {

      // alert(JSON.stringify(registerationForm.value));
      // console.log(this.user); //obj will be sent to server thru Api calls
      // Get the modal
      var modal = document.getElementById("myModal1");


      
        modal.style.display = "block";
      

      // Get the button that opens the modal
      var btn1 = document.getElementById("btn1");
      btn1.onclick = function () {
        modal.style.display = "block";
      }
      this.userservice.registerUser(this.user).subscribe(

        userPersisted => {
          console.log(userPersisted);
        }
      );
      // this.router.navigate(['homeLink']); 
    }
    else {

       document.getElementById("btn2").innerHTML="Please fill the requried details";
    }
  }

}





