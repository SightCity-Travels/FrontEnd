import { Component, OnInit } from '@angular/core';
import { LoginDto } from '../model/LoginDto';
import { User } from '../model/User';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor() { }

  loginDto: LoginDto = new LoginDto();
  user:User=new User();

  ngOnInit(): void {
  }

}
