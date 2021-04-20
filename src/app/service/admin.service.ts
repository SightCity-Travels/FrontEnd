import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../User';
import { LoginDto } from '../model/LoginDto';
import { Bus } from '../Bus';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }


  loginAdmin(loginDto:LoginDto):Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:9090/loginadmin",loginDto);
  }

  viewAllBuses():Observable<Bus[]>{
    return this.httpClient.get<Bus[]>("http://localhost:9090/viewallbuses");
  }

  // addBus(bus:Bus):Observable<Bus>{
  //   return this.httpClient.post<
  // }

}
