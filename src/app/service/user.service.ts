import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../User';
import { LoginDto } from '../model/LoginDto';
import { Ticket } from '../Ticket';
import { Passenger } from '../passenger';
import { ChangePasswordDto } from '../model/ChangePasswordDto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  // registerUser(user:User):Observable<User>{
  //   return this.httpClient.post<User>("http://localhost:9090/registerorupdateuser",user);

  //   // registerUser(user:User):Observable<User>{
  //   //   return this.httpClient.post<User>("http://localhost:9090/UserRestApp/rest/registeruser",user);

  //   // }
  // }
  
  registerUser(user:User) : Observable<User> {
    let url = 'http://localhost:9090/registerorupdateuser';
    return this.httpClient.post<User>(url, user);
  }

  loginUser(loginDto:LoginDto):Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:9090/login",loginDto);
  }

  ticketDetails(ticketId:number):Observable<Ticket>{
    return this.httpClient.get<Ticket>("http://localhost:9090/ticketDetails?ticketId="+ticketId);
  }

  passengerList(ticketId:number):Observable<Passenger[]>{
    return this.httpClient.get<Passenger[]>("http://localhost:9090/getPassengerList?ticketId="+ticketId);
  }

  
  getUserByUserId(userId:number):Observable<User>{
    return this.httpClient.get<User>("http://localhost:9090/finduserbyid?userId="+userId);
  }

  getTicketsBookedByUserId(userId:number):Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>("http://localhost:9090/viewticketbookedbyuserid?userId="+userId);
  }

  rechargeWallet(userId:number,rechargeAmount:number):Observable<User>{
    return this.httpClient.get<User>("http://localhost:9090/rechargeWallet?userId="+userId+"&rechargeAmount="+rechargeAmount);
  }

  changePassword(changePasswordDto:ChangePasswordDto):Observable<boolean>{
    return this.httpClient.put<boolean>("http://localhost:9090/changepassword",changePasswordDto);
  }
}
