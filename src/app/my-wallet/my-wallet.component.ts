import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isRechargeWalletHidden:boolean=true;



  // Method related to wallet 
  rechargeWalletBtnClicked(){
    this.isRechargeWalletHidden=false;
  }


  rechargeWallet(){
    this.isRechargeWalletHidden=true;
  }
}
