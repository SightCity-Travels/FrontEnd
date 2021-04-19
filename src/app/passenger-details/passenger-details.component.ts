import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from '../passenger';
import { User } from '../User';
import { Ticket } from '../Ticket';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {
  user:User=new User();
  allPassengerList:Passenger[]=[];
  fetchedSeatInfo;
 
  
 ticket:Ticket=new Ticket();
  passengerDetail:Passenger= new Passenger();
  numberOfPassengers:number;
  constructor(private router:Router) { 
  } 
  
// travelDate= Date.parse(localStorage.getItem('dateOfJourney'));

  ngOnInit(): void {
    this.fetchedSeatInfo=JSON.parse(localStorage.getItem("seatsOfPassengers"));
    this.numberOfPassengers=this.fetchedSeatInfo.length;
    for(let i=0;i<this.numberOfPassengers;i++){
      console.log(this.fetchedSeatInfo[i]);
    }
 
  }
  
 
  addPassenger(){
    var pass:Passenger={
      passengerId:null,
      passengerName:this.passengerDetail.passengerName,
      passengerAge:this.passengerDetail.passengerAge,
      gender:this.passengerDetail.gender,
      seatNo:this.fetchedSeatInfo[this.numberOfPassengers-1]
    }
    
    this.allPassengerList.push(pass);
 
    for(let i=0;i<this.allPassengerList.length;i++){
    console.log(this.allPassengerList[i]);
    }
 
    this.numberOfPassengers--;
  }
  
 
  displayPassenger(){
    console.log(this.passengerDetail);
  }
 
  passengerDetails(passenger:NgForm){
    if(passenger.valid){
   this.router.navigate(['/paymentLink']);
 
    }else{
      alert("Please enter correct information.");
    }
  }
 


}
