import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketId=Number


  constructor() { }

  ngOnInit(): void {

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
