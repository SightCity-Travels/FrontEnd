import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isChangePasswordHidden:boolean=true;
  isProfileInfoUpdatable:boolean=true;


  // Methods related to password
  viewChangePasswordDiv(){
    this.isChangePasswordHidden=false;
  }


  cancelPasswordChange(){
    this.isChangePasswordHidden=true;
  }


  updatePassword(){
    this.isChangePasswordHidden=true;
  }


  // method related to Profile info 
  updateProfile(element){
    if(element.textContent==="Update"){
      this.isProfileInfoUpdatable=true;
      element.textContent = "Edit";
    }
    else{
      element.textContent = "Update";
      this.isProfileInfoUpdatable=false;
    }
    
  }
}
