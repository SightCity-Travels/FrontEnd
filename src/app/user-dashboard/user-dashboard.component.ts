import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Password } from '../Password';
import { Status } from '../status.enum';
import { Ticket } from '../Ticket';
import { Wallet } from '../Wallet';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
password:Password=new Password()
wallet:Wallet=new Wallet();
bookingDetails:Ticket[];
date = new Date('1995-12-17');
st: string = Status[Status.booked];
  constructor(){
    this.bookingDetails=[{
      ticketId:101,travelDate:this.date,email:"T@gmail.com",totalAmount:200 ,st:Status.cancelled,noOfPassengers:30
    }
  ]
   }

  ngOnInit(): void {

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

  checkPassword(passwordForm:NgForm){
    if(passwordForm.valid){
      alert(JSON.stringify(passwordForm.value));
    console.log(this.password); //obj will be sent to server thru Api calls
  }
  if(this.password.newPassword!=this.password.confirmPassword){
    alert("Password is not matching");
  }
  else{
    alert("Please enter correct information.");
  }

  }


  openTab(evt: Event, name: string,btnClass:string) {
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

}



// <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
//     <script>
        
//      $(document).ready(function(){

//          $("form input[type=text],form input[type=date],form input[type=radio],form input[type=email],form input[type=tel]").prop("disabled",false);

//          $("input[name=edit]").on("click",function(){

//                  $("input[type=text],form input[type=date],form input[type=radio],form input[type=email],form input[type=tel],select").removeAttr("disabled");
//          })

//          $("input[name=save]").on("click",function(){

//              $("input[type=text],form input[type=date],form input[type=radio],form input[type=email],form input[type=tel],select").prop("disabled",true);
//          })


//      })
//     </script>
