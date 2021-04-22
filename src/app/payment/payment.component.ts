import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Passenger } from '../passenger';
import { DatePipe } from '@angular/common';
import { Status } from '../status.enum';
import { BookaTicketDto } from '../model/BookaTicketDto';
import { Ticket } from '../Ticket';
import { Wallet } from '../Wallet';

import { BusService } from '../service/bus.service';

import { UserService } from '../service/user.service';




@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})


export class PaymentComponent implements OnInit {
  wallet:Wallet=new Wallet();




cardnumber:number;
mm:number;
yy:number;
cvv:number;

  constructor(public datepipe: DatePipe, private busService:BusService, private userService:UserService) { }


  passengers:Passenger[];
  emailOfPassenger:string;
  busId:number;
  dateOfJourney;
  dateValue:any;
  totalFare:number;
  status:Status=Status.BOOKED;
  fetchedSeatInfo;
  numberOfPassengers:number;
  userId:number;
  bookATicket:BookaTicketDto= new BookaTicketDto();
  ticket:Ticket=new Ticket();
  result:Boolean;

  finalBookedTicket:Ticket;
  isLoggedIn:boolean;


  //list of passenger
  //ticket info

  ngOnInit() {
    this.passengers=JSON.parse(localStorage.getItem("listOfPassenger"));
    this.emailOfPassenger=localStorage.getItem("emailOfPassenger");
    this.busId=Number(localStorage.getItem("selectedBusId"));
    this.dateValue = (localStorage.getItem('dateOfJourney'));
    this.dateOfJourney = String(this.datepipe.transform(this.dateValue, 'yyyy-MM-dd'));
    this.totalFare= Number(localStorage.getItem("totalFare"));
    this.fetchedSeatInfo = JSON.parse(localStorage.getItem("seatsOfPassengers"));
    this.numberOfPassengers = this.fetchedSeatInfo.length;
    this.userId=Number(localStorage.getItem("userId"));
    this.ticket.travelDate=this.dateOfJourney;
    this.ticket.totalAmount=this.totalFare;
    this.ticket.email=this.emailOfPassenger;
    this.ticket.noOfPassengers=this.numberOfPassengers;
    this.ticket.status=this.status;
    this.bookATicket.ticket=this.ticket;
    this.bookATicket.passengers=this.passengers;
   

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
    // Get the modal

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn1 = document.getElementById("myBtn1");
    var btn2 = document.getElementById("myBtn2");
    // var btn3 = document.getElementById("myBtn3");

    // Get the <span> element that closes the modal
    var span;
    span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn1.onclick = function () {
      modal.style.display = "block";
    }
    btn2.onclick = function () {
      modal.style.display = "block";
    }
    // btn3.onclick = function () {
    //   modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }



    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }

  
  checkwallet(){
    if( localStorage.getItem("userId") !== null){
      this.isLoggedIn=true;
      this.userService.payByWallet(this.userId,this.totalFare).subscribe(
        fetchedres=>{
          this.result=fetchedres;
          if (this.result==true){
            this.busService.bookATicket(this.bookATicket,this.userId,this.busId).subscribe(
                fetchedTicket=>{
                  this.finalBookedTicket=fetchedTicket;
                  console.log(JSON.stringify(this.finalBookedTicket));
                  localStorage.setItem("ticketId",this.finalBookedTicket.ticketId.toString());
                }
              );
              var modal = document.getElementById("myModal");
              var btn3 = document.getElementById("myBtn3");
             
                modal.style.display = "block";
          }
          else{
            document.getElementById("resultDiv").innerHTML=" Insufficient balance .Please recharge or try any other payment mode ";
          }
          console.log(JSON.stringify(fetchedres));
        }
  
      );
      // this.busService.bookATicket(this.bookATicket,this.userId,this.busId).subscribe(
      //   fetchedTicket=>{
      //     this.finalBookedTicket=fetchedTicket;
      //     console.log(JSON.stringify(this.finalBookedTicket));
      //     localStorage.setItem("ticketId",this.finalBookedTicket.ticketId.toString());
      //   }
      // );
  
    }
   else{
     this.isLoggedIn=false;
   }
  }



  bookingOfTicket(){
    

    this.busService.bookATicket(this.bookATicket,this.userId,this.busId).subscribe(
      fetchedTicket=>{
        this.finalBookedTicket=fetchedTicket;
        console.log(JSON.stringify(this.finalBookedTicket));
        localStorage.setItem("ticketId",this.finalBookedTicket.ticketId.toString());
      }
    );
  }

}