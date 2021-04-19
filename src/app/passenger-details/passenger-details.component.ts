import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { passenger } from '../passenger';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {
  emailOfPassenger: string;
  allPassengerList: passenger[] = [];
  fetchedSeatInfo;

  passengerDetail: passenger = new passenger();
  numberOfPassengers: number;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.fetchedSeatInfo = JSON.parse(localStorage.getItem("seatsOfPassengers"));
    this.numberOfPassengers = this.fetchedSeatInfo.length;
    for (let i = 0; i < this.numberOfPassengers; i++) {
      console.log(this.fetchedSeatInfo[i]);
    }

  }

  addPassenger() {
    var pass: passenger = {
      passengerId: null,
      passengerName: this.passengerDetail.passengerName,
      passengerAge: this.passengerDetail.passengerAge,
      gender: this.passengerDetail.gender,
      seatNo: this.fetchedSeatInfo[this.numberOfPassengers - 1]
    }

    this.allPassengerList.push(pass);

    for (let i = 0; i < this.allPassengerList.length; i++) {
      console.log(this.allPassengerList[i]);
    }

    this.numberOfPassengers--;
  }


  proceedToPay(contactForm: NgForm) {
    if (contactForm.valid &&  this.numberOfPassengers<=0) {
      localStorage.setItem("emailOfPassenger", this.emailOfPassenger);
      localStorage.setItem("listOfPassenger", JSON.stringify(this.allPassengerList));
      this.router.navigate(['paymentLink']);
    }
    else {
      alert("Please enter correct information.");
    }


  }



}