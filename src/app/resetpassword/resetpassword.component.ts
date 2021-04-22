import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password: any;
  loggedInUser: any;
  changePasswordDto: any;
  loggedInUserId: any;
  userService: any;

  constructor() { }

  ngOnInit(): void {
  }

  checkPassword(passwordForm: NgForm) {
    if (this.password.newPassword != this.password.confirmPassword) {
      //alert("Password is not matching");
      document.getElementById("changePassword").innerHTML="Confirm Password is not matching";
      document.getElementById("oldPassword").innerHTML="";
    }
    else if(this.password.oldPassword!=this.loggedInUser.password){
      //alert("Incorrect old password");
      document.getElementById("changePassword").innerHTML="";
      document.getElementById("oldPassword").innerHTML="Old Password is incorrect";
    }
    else if (passwordForm.valid) {
      document.getElementById("oldPassword").innerHTML="";
      document.getElementById("changePassword").innerHTML="";
      // alert(JSON.stringify(passwordForm.value));
      console.log(this.password); //obj will be sent to server thru Api calls
      this.changePasswordDto.userId=this.loggedInUserId;
      this.changePasswordDto.password=this.password.confirmPassword;
      console.log(this.changePasswordDto);

      this.userService.changePassword(this.changePasswordDto).subscribe(
        fetchedString=>{
          if(fetchedString){
            document.getElementById("resultDiv").innerHTML="Password Changed Successfully";
          }
          else{
            document.getElementById("resultDiv").innerHTML="Could not change the password";
          }
        }
      );


    }
    else {
      alert("Please enter correct information.");
    }

  }

}
