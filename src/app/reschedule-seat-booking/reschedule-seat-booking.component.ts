import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from '../model/Bus';
import { Ticket } from '../model/Ticket';
import { BusService } from '../service/bus.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-reschedule-seat-booking',
  templateUrl: './reschedule-seat-booking.component.html',
  styleUrls: ['./reschedule-seat-booking.component.css']
})
export class RescheduleSeatBookingComponent implements OnInit {

  bookedSeats: string[] = [];
  selectedSeatCount: number = 0;
  isSeatSelected: boolean = true;
  selectedSeatsList: Set<string> = new Set();
  isclicked:boolean;
  totalAmount: number = 0;
  dateValue: any;
  dateOfJourney;
  busId: number;
  selectedBus: Bus;
  rescheduleTicketId: number;
  rescheduleTicket: Ticket;
  noOfPassengers:number;
  // alreadyBookedPassenger:passenger[];

  constructor(private busService: BusService, public datepipe: DatePipe, private router: Router, private userService: UserService) { }


  ngOnInit(): void {
    this.rescheduleTicketId = Number(sessionStorage.getItem("rescheduleTicketId"));

    console.log(this.rescheduleTicketId);
    this.userService.ticketDetails(this.rescheduleTicketId).subscribe(
      fetchedTicket => {
        this.rescheduleTicket = fetchedTicket;
        sessionStorage.setItem("noOfPassengers",this.rescheduleTicket.noOfPassengers.toString());
        console.log(this.rescheduleTicket.noOfPassengers)
      }
    );

    this.noOfPassengers=Number(sessionStorage.getItem("noOfPassengers"));
    // this.selectedSeatCount = this.rescheduleTicket.noOfPassengers;


    // if(Number(sessionStorage.getItem("rescheduleTicketId")) != 0){
    // this.selectedSeatsList.size 
    // }
    this.busId = Number(sessionStorage.getItem("selectedBusId"));
    console.log(this.busId);
    // this.dateValue=Date.parse

    this.dateValue = (sessionStorage.getItem('dateOfJourney'));
    this.dateOfJourney = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    // console.log(this.dateOfJourney);

    this.busService.fetchBookedSeats(this.dateOfJourney, this.busId).subscribe(
      fetchedSeatList => {
        this.bookedSeats = fetchedSeatList;
        sessionStorage.setItem("seatList", JSON.stringify(this.bookedSeats))
      }
    );


    this.bookedSeats = JSON.parse(sessionStorage.getItem("seatList"));
    //console.log(this.bookedSeats);


    const disabledSeats = this.bookedSeats.map((element) => {
      const bookedSeat1 = document.getElementById(element);
      bookedSeat1.classList.toggle("occupied");
      return bookedSeat1;
    });

    // this code is to get bus information by bus id
    this.busService.getBusById(this.busId).subscribe(
      fetchedBus => {
        this.selectedBus = fetchedBus
      });
  }


  selectSeat(seat: string) {

    const selectedSeat = document.getElementById(seat);

    if (selectedSeat.classList.contains("selected")) {
      selectedSeat.classList.remove("selected");
      this.selectedSeatCount--;
 // console.log(this.selectedSeatCount);

    }
    else if (selectedSeat.classList.contains("occupied")) {

    }
    else {
      selectedSeat.classList.toggle("selected");
      this.selectedSeatCount++;
   //    console.log(this.selectedSeatCount);
    }



    if (selectedSeat.classList.contains("selected")) {
      this.selectedSeatsList.add(selectedSeat.id);
      //  console.log(3);

    }
    else if (selectedSeat.classList.contains("occupied")) {

    }
    else {
      this.selectedSeatsList.delete(selectedSeat.id);
      //  console.log(4);
    }



    this.totalAmount = this.selectedSeatsList.size * this.selectedBus.fare;

    console.log(this.totalAmount);

    console.log(this.noOfPassengers);
    console.log(this.selectedSeatCount);
    
    //this code is to disable button until and unless the seat is selected
    if (this.selectedSeatCount == this.noOfPassengers) {
      this.isSeatSelected = false;

    } else {
      this.isSeatSelected = true;
    }

  }

  close(){
    // var modal = document.getElementById("myModal1");
    // modal.style.display = "none";
    this.router.navigate(['homeLink']);
   }

  //selectSeatsList have the seats selected by the user
  //bookedSeats hace the seats already booked in the bus


  //this function is to set passenger number and route to passenger page
  sendDataOfSeats() {

    var modal = document.getElementById("myModal1");
    var btn3 = document.getElementById("myBtn");
   
      modal.style.display = "block";
      var span;
       span = document.getElementsByClassName("close")[0];
       span.onclick = function () {
       modal.style.display = "none";
        
      }
  
     

  }
   rescheduleFunction(){
         
    const selectedSeatsArray = Array.from(this.selectedSeatsList);
    //selectedSeatsArray.length = 3;
    sessionStorage.setItem("seatsOfPassengers", JSON.stringify(selectedSeatsArray));
    sessionStorage.setItem("totalFare", this.totalAmount.toString());
    
   // this.router.navigate(['passengerDetailsLink']);
    this.userService.reschedule(this.rescheduleTicketId,this.dateOfJourney,selectedSeatsArray).subscribe(
     returnedTicket=>{
       console.log(returnedTicket);
       this.router.navigate(['ticketLink']);
     }

    );
   }
  
  // if (ticket.getTravelDate().isBefore(LocalDate.now())) {
  //   return false;
  // } else {

}
