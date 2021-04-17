import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {
  user:User=new User();
  constructor(private router:Router) { } 
  ngOnInit(): void {
  }
  passengerDetails(passenger:NgForm){
    if(passenger.valid){
   this.router.navigate(['/paymentLink']);
 
    }else{
      alert("Please enter correct information.");
    }
  }

}
