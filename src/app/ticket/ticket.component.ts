import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { UserService } from '../service/user.service';
import { Passenger } from '../passenger';
import { BusService } from '../service/bus.service';
import { Bus } from '../Bus';
import { Ticket } from '../Ticket';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketId: number;
  rescheduleTicketId: number;
  //ticketId=Number(sessionStorage.getItem("ticketId"));
  ticket: Ticket;
  details;
  passengerList: Passenger[];
  bus: Bus;
  cTicketId: number;
  isclicked: boolean;
  dateOfReschedule: Date;
  isLoggedIn: boolean;

  //isCancelled:boolean=false;
  // <<<<<<< HEAD
  // dateOfReschedule:Date;
  // =======
  //control = new FormControl()
  // ticketId: number;
  // //ticketId=Number(sessionStorage.getItem("ticketId"));
  // ticket: Ticket;
  // details;
  // passengerList: Passenger[];
  // bus: Bus;
  // cTicketId: number;
  // isclicked: boolean;
  // isLoggedIn: boolean;



  //isCancelled:boolean=false;


  minDate = new Date();


  dateOfJourney: Date;




  constructor(private service: UserService, private busService: BusService, private router: Router) { }


  ngOnInit(): void {

    this.ticketId = Number(sessionStorage.getItem("ticketId"));
    this.rescheduleTicketId = Number(sessionStorage.getItem("ticketId"));
    console.log(this.rescheduleTicketId)
    sessionStorage.setItem("rescheduleTicketId", this.rescheduleTicketId.toString());

    //  this.ticketId = Number(sessionStorage.getItem("ticketId"));



    this.service.ticketDetails(this.ticketId).subscribe(

      fetchedTicket => {
        this.ticket = fetchedTicket;
        console.log(this.ticket);

      }
    );

    this.service.passengerList(this.ticketId).subscribe(
      fetchedPassengerList => {
        this.passengerList = fetchedPassengerList;
        console.log(this.passengerList);
      }
    );

    this.busService.getBusByticketId(this.ticketId).subscribe(
      fetchedBus => {
        this.bus = fetchedBus;
        console.log(this.bus);
      }
    );


  }

  /***************************************************** */


  public captureScreen() {
    var data = document.getElementById('printThisTicket');
    html2canvas(data, { scrollY: -window.scrollY, scale: 1 }).then(canvas => {
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

  cancelTicketId(ticketId) {
    this.cTicketId = ticketId;
    sessionStorage.setItem("cancelTicketId", this.cTicketId.toString());
  }



  cancelfn() {

    var modal = document.getElementById("myModal");
    var btn3 = document.getElementById("myBtn");


    modal.style.display = "block";
    var span;
    span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";

    }


    if (sessionStorage.getItem("userId") !== null) {
      this.isLoggedIn = true;

    } else {
      this.isLoggedIn = false;

    }
  }
  cancelFunction() {
    this.isclicked = true;

    this.service.cancelTicket(this.ticketId).subscribe(
      result => {
        if (result) {
          document.getElementById("resultDiv").innerHTML = "Your ticket has been cancelled.Redirecting to User Dashboard.....";
          setTimeout(() => {
            this.router.navigate(['userDashBoard']);
          }, 4000);
        }
        else {
          document.getElementById("resultDiv").innerHTML = "Your ticket could not be cancelled.Redirecting to User Dashboard.....";
          setTimeout(() => {
            this.router.navigate(['userDashBoard']);
          }, 4000);
        }
      });
    }

    
    
  


  close() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  //  reschedule(){
  //    console.log("shxsa");
  // // <<<<<<< HEAD

  // //   // var modal = document.getElementById("myModal1");
  // //   // modal.style.display = "block";
  // //   // var span;
  // //   // span = document.getElementsByClassName("close")[0];
  // //   // span.onclick = function() {
  // //   //   modal.style.display = "none";
  // //   // }
  // //  // document.getElementById("date");
  // //   sessionStorage.setItem("dateOfJourney",this.dateOfReschedule.toString());
  // //   sessionStorage.setItem("selectedBusId",this.bus.busId.toString());
  // //   this.router.navigate(['rescheduleSeat']);

  // //   // var modal = document.getElementById("myModal1");
  // //   // var btn3 = document.getElementById("rescheduleBtn");

  // //   //   modal.style.display = "block";
  // //   //   var span;
  // //   //    span = document.getElementsByClassName("close")[0];
  // //   //    span.onclick = function () {
  // //   //    modal.style.display = "none";

  // //     }

  // //  // this.dateOfReschedule='2021-04-25';

  // //  }



  // // =======
  //   var modal1 = document.getElementById("myModal1");
  //   modal1.style.display = "block";
  //   console.log("hjsahb");
  //   var span;
  //   span = document.getElementsByClassName("close")[1];
  //   span.onclick = function() {
  //     modal1.style.display = "none";
  //   }

  reschedule() {
    var modal = document.getElementById("myModal1");
    modal.style.display = "block";
    var span;
    span = document.getElementsByClassName("close")[1];
    span.onclick = function () {
      modal.style.display = "none";
    }

  }
  changeSeats() {
    document.getElementById("date");
    sessionStorage.setItem("dateOfJourney", this.dateOfReschedule.toString());
    sessionStorage.setItem("selectedBusId", this.bus.busId.toString());
    this.router.navigate(['rescheduleSeat']).then(() => {
      window.location.reload();
    });
  }
}
// =======
//     );

//   }
//   close() {
//     var modal = document.getElementById("myModal");
//     modal.style.display = "none";
//   }

//   reschedule() {
//     var modal = document.getElementById("myModal1");
//     modal.style.display = "block";
//     var span;
//     span = document.getElementsByClassName("close")[1];
//     span.onclick = function () {
//       modal.style.display = "none";
//     }

//   }
// >>>>>>> 2e65cbb526bc2ca6d13d00526a43c7a910a009ee



