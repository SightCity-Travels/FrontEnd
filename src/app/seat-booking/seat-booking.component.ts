import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Bus } from '../Bus';
import { BusService } from '../service/bus.service';
import { DatePipe } from '@angular/common';
import { passenger } from '../passenger';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit {
  bookedSeats: string[]=[];
  selectedSeatCount: number = 0;
  selectedSeatsList:Set<string> = new Set();
  totalAmount:number=0;
  dateValue:any;
  dateOfJourney;
  busId:number;
  selectedBus:Bus;
  // alreadyBookedPassenger:passenger[];
  constructor(private busService:BusService,public datepipe: DatePipe) { }

  ngOnInit(): void {

    this.busId=Number(localStorage.getItem("selectedBusId"));
    // this.dateValue=Date.parse
   
    this.dateValue=(localStorage.getItem('dateOfJourney'));
    this.dateOfJourney =this.datepipe.transform(this.dateValue, 'yyyy-MM-dd');
    // console.log(this.dateOfJourney);

    this.busService.fetchBookedSeats(this.dateOfJourney,this.busId).subscribe(
      fetchedSeatList=>{
        this.bookedSeats=fetchedSeatList; 
        localStorage.setItem("seatList",JSON.stringify(this.bookedSeats))
      }
    );
  
   
    this.bookedSeats= JSON.parse(localStorage.getItem("seatList"));
    //console.log(this.bookedSeats);

    const disabledSeats = this.bookedSeats.map((element) => {
      const bookedSeat1 = document.getElementById(element);
      bookedSeat1.classList.toggle("occupied");
      return bookedSeat1;
    });


  }

  selectSeat(seat: string) {
    const selectedSeat = document.getElementById(seat);
    if (selectedSeat.classList.contains("selected")) {
      selectedSeat.classList.remove("selected");
      this.selectedSeatCount--;
    }
    else if (selectedSeat.classList.contains("occupied")) {

    }
    else {
      selectedSeat.classList.toggle("selected");
      this.selectedSeatCount++;
    }



    if(selectedSeat.classList.contains("selected")){
       this.selectedSeatsList.add(selectedSeat.id);
    }
    else if(selectedSeat.classList.contains("occupied")){

    }
    else{
      this.selectedSeatsList.delete(selectedSeat.id);
    }

    this.totalAmount=this.selectedSeatsList.size*500;
  }

  //selectSeatsList have the seats selected by the user
  //bookedSeats hace the seats already booked in the bus



  



}
