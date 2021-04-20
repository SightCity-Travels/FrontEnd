import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { UserService } from '../service/user.service';
import { Passenger } from '../passenger';
import { BusService } from '../service/bus.service';
import { Bus } from '../Bus';
import { Ticket } from '../Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  

//ticketId:number;
ticketId=Number(localStorage.getItem("ticketId"));
ticket:Ticket;
details;
passengerList:Passenger[];
bus:Bus;

  constructor(private service:UserService, private busService:BusService) { }

  ngOnInit(): void {


    this.service.ticketDetails(this.ticketId).subscribe(
      fetchedTicket=>{
        this.ticket=fetchedTicket;
      //  console.log(this.ticket);
 
      }
    );
      
    this.service.passengerList(this.ticketId).subscribe(
      fetchedPassengerList=>{
        this.passengerList=fetchedPassengerList;
        //console.log(this.passengerList);
      }
    );

    this.busService.getBusByticketId(this.ticketId).subscribe(
      fetchedBus=>{
        this.bus=fetchedBus;
        //console.log(this.bus);
      }
    );


  }
  public captureScreen()  
  {  
    var data = document.getElementById('printThisTicket');  
    html2canvas(data, {scrollY: -window.scrollY, scale: 1}).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Ticket.pdf'); // Generated PDF   
    });  
  } 
 

}
