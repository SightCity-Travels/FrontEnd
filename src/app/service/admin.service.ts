import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../User';
import { LoginDto } from '../model/LoginDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }


  loginAdmin(loginDto:LoginDto):Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:9090/loginadmin",loginDto);
  }

}
