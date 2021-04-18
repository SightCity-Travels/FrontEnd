import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../Bus';
import { passenger } from '../passenger';

@Injectable({
  providedIn: 'root'
})
export class BusserviceService {

  constructor(private httpClient:HttpClient) { }

  searchBusList(source:string,destination:string):Observable<Bus[]>{
    return this.httpClient.get<Bus[]>("http://localhost:9090/searchbus?source="+source+"&destination="+destination);
  }

  fetchBookedSeats(dateOfJourney:Date,busId:number):Observable<string[]>{
    return this.httpClient.get<string[]>("http://localhost:9090/fetchbookedseats?travelDate="+dateOfJourney+"&busId="+busId);
  }


}
