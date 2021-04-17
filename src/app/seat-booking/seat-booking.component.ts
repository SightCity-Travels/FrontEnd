import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit {
  bookedSeats: string[] = ['a1', 'b2', 'c7','b6'];
  selectedSeatCount: number = 0;
  selectedSeatsList:Set<string> = new Set();
  totalAmount:number=0;
  constructor() { }

  ngOnInit(): void {
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
