import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { ChangePasswordDto } from '../model/ChangePasswordDto';
import { User } from '../model/User';
import { Password } from '../Password';
import { UserService } from '../service/user.service';
import { Status } from '../status.enum';
import { Ticket } from '../Ticket';
import { Wallet } from '../Wallet';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  password: Password = new Password()
  wallet: Wallet = new Wallet();
  bookingDetails: Ticket[];
  date = '1995-12-17';
  isStatusD:boolean;
 tId:number;
  isEditable: boolean = false;
  loggedInUserId: number;
  loggedInUser: User = new User();
  status:Status= Status.BOOKED;
  tickets:Ticket[];
  changePasswordDto:ChangePasswordDto= new ChangePasswordDto();
  isBooked:boolean;
  isStatus:boolean=true;
  cancelTicketId:number;
  isShown: boolean = true;
  isclicked:boolean;
  isCancelled:boolean;
  constructor(private userService: UserService,private router:Router) {

    // this.bookingDetails = [{
    //   ticketId: 101, travelDate: this.date, email: "T@gmail.com", totalAmount: 200, st: Status.cancelled, noOfPassengers: 30

    // }
    // ]
  }


  ngOnInit(): void {
    
    this.loggedInUserId = Number(localStorage.getItem("userId"));
    console.log(this.loggedInUserId+" of current user");
    this.userService.getUserByUserId(this.loggedInUserId).subscribe(
      fetchedUser => {
        this.loggedInUser = fetchedUser;
        console.log(this.loggedInUser);
      }
    );


    this.userService.getTicketsBookedByUserId(this.loggedInUserId).subscribe(
        fetchedTickets=>{
          this.tickets=fetchedTickets;
          console.log(this.tickets);
        }
    );



    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the bookinh tab, and add an "active" class to the link that opened the tab
    document.getElementById("Profile").style.display = "block";

    // var acc = document.getElementsByClassName("accordion");
    // var i;
    // for (i = 0; i < acc.length; i++) {
    //     acc[i].addEventListener("click", function () {
    //         this.classList.toggle("active");
    //         var panel = this.nextElementSibling;
    //         if (panel.style.display === "block") {
    //             panel.style.display = "none";
    //         } else {
    //             panel.style.display = "block";
    //         }
    //     });
    //   }
    // document.getElementById('bookBtn').classList.add("active");

  }


  updateUserInfo() {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      document.getElementById("editUpdateBtn").innerText = "Update";
    }
    else {
      document.getElementById("editUpdateBtn").innerText = "Edit";
    }

    if (!this.isEditable) {
      this.userService.registerUser(this.loggedInUser).subscribe(
        fetchedUser => {
          this.loggedInUser = fetchedUser;
          console.log(this.loggedInUser);
        }
      );
      document.getElementById("msg").innerHTML = "Information Updated";
    }

  }


  rechargeWallet(){
    this.userService.rechargeWallet(this.loggedInUserId,this.wallet.amount).subscribe(
      fetchedUser=>{
        this.loggedInUser=fetchedUser;
        console.log(this.loggedInUser);
      }
    );
    document.getElementById("msgWallet").innerHTML = "Wallet Updated";
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


  openTab(evt: Event, name: string, btnClass: string) {
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";

    //add class to button
    document.getElementById(btnClass).classList.add("active");
  }



  // signOut(){
  //  this.isStatusD=false;
  //  localStorage.setItem("isStatusD",this.isStatusD.toString());
  //  this.router.navigate(['homeLink'])
  //  .then(() => {
  //    window.location.reload();

  // }
  signOut(){
    console.log(this.loggedInUserId);
    // localStorage.removeItem("userId");
    localStorage.clear();
    this.isStatus=false;

    this.router.navigate(['homeLink']);
    
  }

  trackFunction(ticketId){
  // console.log(ticketId);
    
    this.tId=ticketId;
    // this.userService.ticketDetails(ticketId).subscribe(
    //   fetchedTicket=>{
    //     console.log(fetchedTicket.status)
    //     if(fetchedTicket.status == Status.BOOKED){
    //       this.isBooked=false;
    //       localStorage.setItem("ticketId",this.tId.toString());
    //       this.router.navigate(['ticketLink']);
    //     }else{
    //       this.isBooked=true;
    //     }
    //   }
    // );
     localStorage.setItem("ticketId",this.tId.toString());
    //  var modal = document.getElementById("myModal");

    //  // Get the button that opens the modal
    //  var btn1 = document.getElementById("myBtn1");
    
    //  modal.style.display = "block";
    // var span;
    //  span = document.getElementsByClassName("close")[0];
    //  span.onclick = function () {
    //   modal.style.display = "none";
    // }

     
    //  this.router.navigate(['ticketLink']);
    console.log(100);
  }

  cancelFunction(){
    this.cancelTicketId=Number(localStorage.getItem("ticketId"));
    this.isclicked=true;
    
     this.userService.cancelTicket(this.cancelTicketId).subscribe(
       result=>{
         console.log(result);
        //  if(result==true){
        //   this.isShown = ! this.isShown;
        //  }
         document.getElementById("res").innerHTML="Your ticket has been cancelled";
       }
     );
    // document.getElementById("resultDiv").innerHTML="Your ticket has been cancelled";
 
   }
   close(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
   }

}

