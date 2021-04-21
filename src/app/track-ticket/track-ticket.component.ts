import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-ticket',
  templateUrl: './track-ticket.component.html',
  styleUrls: ['./track-ticket.component.css']
})
export class TrackTicketComponent implements OnInit {

  constructor(private router:Router) { }
  ticketId:number;

  ngOnInit(): void {
  }

  trackTicket(){
    localStorage.setItem("ticketId",this.ticketId.toString());
    this.router.navigate(['ticketLink']);
  }

}
