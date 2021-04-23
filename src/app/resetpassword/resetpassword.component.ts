import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePasswordDto } from '../model/ChangePasswordDto';
import { LoginForgetDto } from '../model/LoginForgetDto';
import { Password } from '../Password';
import { UserService } from '../service/user.service';
import { User } from '../User';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password: Password=new Password();
 // loggedInUser: any;
  changePasswordDto: ChangePasswordDto=new ChangePasswordDto();

  //userService: any;
  loginforgetdto:LoginForgetDto=new LoginForgetDto();
//  loggedInUserId1: number;
  loggedInUser1: User = new User();

 loggedInUser=Number(localStorage.getItem("Id"));

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  checkPassword(passwordForm: NgForm) {
    if (this.password.newPassword != this.password.confirmPassword) {
      //alert("Password is not matching");
      document.getElementById("changePassword").innerHTML="Confirm Password is not matching";
    //  document.getElementById("oldPassword").innerHTML="";
    }
    // else if(this.password.oldPassword!=this.loggedInUser.password){
    //   //alert("Incorrect old password");
    //   document.getElementById("changePassword").innerHTML="";
    //   document.getElementById("oldPassword").innerHTML="Old Password is incorrect";
    // }
    else if (passwordForm.valid) {
    //  document.getElementById("oldPassword").innerHTML="";
      document.getElementById("changePassword").innerHTML="";
      // alert(JSON.stringify(passwordForm.value));
      console.log(this.password); //obj will be sent to server thru Api calls
      this.changePasswordDto.userId=this.loggedInUser;
      this.changePasswordDto.password=this.password.confirmPassword;
      console.log(this.changePasswordDto);

      this.userService.changePassword(this.changePasswordDto).subscribe(
        fetchedString=>{
          console.log(fetchedString);
          if(fetchedString){
            document.getElementById("resultDiv").innerHTML="Password Changed Successfully. Please Login with your new password";
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
