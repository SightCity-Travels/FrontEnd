import { Component, OnInit } from '@angular/core';
import { Bus } from '../Bus';
import { BusService } from '../service/bus.service';

@Component({
  selector: 'app-searched-bus-list',
  templateUrl: './searched-bus-list.component.html',
  styleUrls: ['./searched-bus-list.component.css']
})
export class SearchedBusListComponent implements OnInit {
  source:string="";
  destination:string="";
  dateOfJourney;
  dateValue:any;
  busList:Bus[];
  selectedBusId:number;
  constructor(private busService:BusService) {
   }


  ngOnInit(): void {
    this.source=String(localStorage.getItem('source'));
    this.destination=String(localStorage.getItem('destination'));
    this.dateValue=Date.parse(localStorage.getItem('dateOfJourney'));
    this.dateOfJourney= new Date(this.dateValue).toLocaleDateString();
  
    this.busService.searchBusList(this.source,this.destination).subscribe(
      fetchedBusList=>{
        this.busList=fetchedBusList;
        console.log(this.busList);
      }
    );
  }


  busSelect(busID){
    // console.log(busID);
    this.selectedBusId=busID;
    localStorage.setItem("selectedBusId",this.selectedBusId.toString());
  }

}
