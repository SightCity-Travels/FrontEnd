import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../User';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})


export class RegisterationComponent implements OnInit {
  control = new FormControl();

  minDate = new Date();

  user: User = new User();
  userCPassword: string;
  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(){
    
  }
  
checkPassword() {
  if (this.user.password != this.userCPassword) {
    //alert("Password is not matching");
    document.getElementById("resultDiv").innerHTML="Confirm Password Is Not Matching";
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
//
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
          if(userPersisted.userId!=0){
            this.userservice.sendMailOnRegistration(userPersisted.userId).subscribe(
              fetchedBoolean=>{
                console.log("Mail Sent"+fetchedBoolean);
              }
            );

          }
          console.log(userPersisted);
          const ticketId= Number(sessionStorage.getItem("ticketId"));
          if(ticketId!=0){
            this.userservice.addTicketToUser(ticketId,userPersisted.userId).subscribe(
              fetchedTicket=>{
                console.log(fetchedTicket);
              }
            );
          }
        }
      );
      // this.router.navigate(['homeLink']); 
    }
    else {

       document.getElementById("btn2").innerHTML="Please fill the requried details";
    }
  }

}





