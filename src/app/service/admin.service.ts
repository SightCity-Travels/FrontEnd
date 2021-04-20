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

  addorUpdateBus(bus:Bus):Observable<Bus>{
    return this.httpClient.post<Bus>("http://localhost:9090/addorupdatebus",bus);
  }

  viewRegisterCustomer():Observable<User[]>{
        return this.httpClient.get<User[]>("http://localhost:9090/viewallregsiteredcustomers");
  }
 
  
  viewRegisterCustomerWithNoBooking():Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:9090/viewcustomerwhoregisteredbutwithnobooking");

}

mostPerfferedBus():Observable<Number[]>{
  return this.httpClient.get<Number[]>("http://localhost:9090/mostpreferredbus");
}

}
