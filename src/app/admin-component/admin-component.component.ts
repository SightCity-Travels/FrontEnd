import { Component, OnInit } from '@angular/core';
import { NgForm, RadioControlValueAccessor } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { Bus } from '../Bus';
import { AdminService } from '../service/admin.service';
import { BusService } from '../service/bus.service';
import { Status } from '../status.enum';
import { Ticket } from '../Ticket';
import { TicketComponent } from '../ticket/ticket.component';
import { User } from '../User';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {
  st: string = Status[Status.booked];


  isBookinghidden:boolean =true;
  isAddBushidden:boolean =true;
  ispreferredbushidden:boolean=true;
  isupDateRoutehidden:boolean=true;
  iscusthidden:boolean=true;
  isNoBooking:boolean=true;
  bookingDetails:Ticket[];
  busDetails:Bus[];
  updatedbusDetails:Bus[];
  userDetails:User[];

  addBus:Bus=new Bus();
  updateBus:Bus=new Bus();
  bookBus:Bus=new Bus();


  bus:Bus=new Bus();
  ticket:Ticket=new Ticket();
  user:User=new User();
  busadded:Bus=new Bus();
  updateddBus:Bus=new Bus();
  fetchedBus:Bus=new Bus();
  uBus:Bus=new Bus();
  userList:User[];
  userLists:User[];
  mostbus:Number[];
  

  functionCall(){
    this.isAddBushidden=true;
    this.isBookinghidden=false;
    this.ispreferredbushidden=true;
    this.isupDateRoutehidden=true;
    this.iscusthidden=true;
    this.isNoBooking=true;


  }


  functionCall1(){
    this.isAddBushidden=false;
    this.isBookinghidden=true;
    this.ispreferredbushidden=true;
    this.isupDateRoutehidden=true;
    this.iscusthidden=true;
    this.isNoBooking=true;

    this.service.addorUpdateBus(this.addBus).subscribe(
      addedBus=>{
        this.busadded=addedBus;
        console.log(this.busadded);
      }
    );


  }

  functionCall2(){
    this.ispreferredbushidden=false;
    this.isAddBushidden=true;
    this.isBookinghidden=true;
    this.isupDateRoutehidden=true;
    this.iscusthidden=true;
    this.isNoBooking=true;

  }

  functionUpdateBus(){
    this.isupDateRoutehidden=false;
    this.ispreferredbushidden=true;
    this.isAddBushidden=true;
    this.isBookinghidden=true;
    this.iscusthidden=true;
    this.isNoBooking=true;

    // this.service.updateBus(this.updateBus.busId,this.updateBus.source,this.updateBus.destination,this.updateBus.fare).subscribe(
    //   updateBus =>{
    //      this.updateddBus=updateBus;
    //      console.log(this.updateddBus);
    //   }
    // );

     this.busService.getBusById(this.updateBus.busId).subscribe(
       fetchedBus =>{
           this.fetchedBus=fetchedBus;
           localStorage.setItem("fetchedBus", this.fetchedBus.toString());
           console.log(this.fetchedBus);
       }
     );

     this.updateddBus=JSON.parse(localStorage.getItem("fetchedBus"));
     this.updateddBus.source=this.updateBus.source;
     this.updateddBus.destination=this.updateBus.destination;
     this.updateddBus.fare=this.updateBus.fare;

    console.log(this.updateddBus);

     this.service.addorUpdateBus(this.updateddBus).subscribe(
       updatedBus=>{
           this.uBus=updatedBus;
           console.log(this.uBus);
       }
     );

  }

  regCustomer(){
    this.isupDateRoutehidden=true;
    this.ispreferredbushidden=true;
    this.isAddBushidden=true;
    this.isBookinghidden=true;
    this.iscusthidden=false;
    this.isNoBooking=true;

    
     this.service.viewRegisterCustomer().subscribe(
       fetchedUser=>{
         this.userList=fetchedUser;
         console.log(this.userList);
       }
     );
    
  

  }
  noBooking(){
    this.isupDateRoutehidden=true;
    this.ispreferredbushidden=true;
    this.isAddBushidden=true;
    this.isBookinghidden=true;
    this.iscusthidden=true;
    this.isNoBooking=false;

 
    this.service.viewRegisterCustomerWithNoBooking().subscribe(
      fetchedUser=>{
        this.userLists=fetchedUser;
        console.log(this.userLists);
      }
    );
    
  

  }

  date = new Date('1995-12-17');



  constructor(private service:AdminService, private busService:BusService) { 
  //   this.bookingDetails=[{
  //     ticketId:101,travelDate:this.date,email:"aish@gmail.com",totalAmount:200 ,st:Status.cancelled,noOfPassengers:30
  //   },
  //   {
  //     ticketId:101,travelDate:this.date,email:"aish@gmail.com",totalAmount:200 ,st:Status.cancelled,noOfPassengers:30

  //   },
  //   {
  //     ticketId:101,travelDate:this.date,email:"aish@gmail.com",totalAmount:200 ,st:Status.booked,noOfPassengers:30

  //   },
  // ]

  // this.busDetails=[{
  //   busId:101,busName:"Sight City Travels",noOfSeats:24,duration:"3 hrs" ,typeOfBus:"AC",timeOfArrival:"9:03 AM" ,timeOfDeparture:"20:08:10",fare:200,source:"Nashik",destination:"Nagpur"
  // },
  // {
  //   busId:101,busName:"Sight City Travels",noOfSeats:24,duration:"3 hrs" ,typeOfBus:"AC",timeOfArrival:"2:08:10" ,timeOfDeparture:"20:08:10",fare:200,source:"Nashik",destination:"Nagpur"

  // },
  // {
  //   busId:101,busName:"Sight City Travels",noOfSeats:24,duration:"3 hrs" ,typeOfBus:"AC",timeOfArrival:"2:08:10" ,timeOfDeparture:"20:08:10",fare:200,source:"Nashik",destination:"Nagpur"

  // },

  // ]

//   this.updatedbusDetails=[{

//     busId:101,busName:"Sight City Travels",noOfSeats:24,duration:"3 hrs" ,typeOfBus:"AC",timeOfArrival:"9:03 AM" ,timeOfDeparture:"20:08:10",fare:200,source:"Nashik",destination:"Nagpur"
//   },
//   {
//     busId:101,busName:"Sight City Travels",noOfSeats:24,duration:"3 hrs" ,typeOfBus:"AC",timeOfArrival:"9:03 AM" ,timeOfDeparture:"20:08:10",fare:200,source:"Nashik",destination:"Nagpur"

//   },
//   {
//     busId:101,busName:"Sight City Travels",noOfSeats:24,duration:"3 hrs" ,typeOfBus:"AC",timeOfArrival:"9:03 AM" ,timeOfDeparture:"20:08:10",fare:200,source:"Nashik",destination:"Nagpur"

//   },

// ]
this.userDetails=[{

  userId:1,firstName:"Aishwarya",lastName:"Chordia",email:"aishwarya@gmail.com",password:"aish@123",contactNo:"657286745",dateOfBirth:this.date,gender:"Female",wallet:200,address:"4tfhi"
},

{
  userId:1,firstName:"Aishwarya",lastName:"Chordia",email:"aishwarya@gmail.com",password:"aish@123",contactNo:"657286745",dateOfBirth:this.date,gender:"Female",wallet:200,address:"4tfhi"

},

]

}

  adminId = Number(localStorage.getItem("adminId"));
  busList:Bus[];

  ngOnInit(): void {

    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the bookinh tab, and add an "active" class to the link that opened the tab
    document.getElementById("Booking").style.display = "block";
    
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
      }
    document.getElementById('bookBtn').classList.add("active");

    this.service.viewAllBuses().subscribe(
      fetchedbuses=>{
           this.busList=fetchedbuses;
          // console.log(this.busList);
      }
    );

    this.service.mostPerfferedBus().subscribe(
      fetchedBus=>{
        this.mostbus=fetchedBus;

      }
    );
  }


  openTab(evt: Event, name: string,btnClass:string) {
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";

    //add class to button
    document.getElementById(btnClass).classList.add("active");
  }

  //#addbus
  checkBus(form:NgForm){
    if(!form.valid){
      this.isAddBushidden=true;

    }

  }
  changeBus(updateBusForm:NgForm){
    if(!updateBusForm.valid){
      this.isupDateRoutehidden=true;

    }

  }
  bookingBus(bookBusForm:NgForm){
    if(!bookBusForm.valid){
      this.isBookinghidden=true;
    }

    //if(bookBusForm.valid){
      //alert(JSON.stringify(bookBusForm.value))
      //console.log(this.bookBus);
    //}
    //else{
      //this.isBookinghidden=true;
    //}

  }

}
