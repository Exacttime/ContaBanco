import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {UserDetailsService} from "../../services/UserDetailsService";
import {AccountService} from "../../services/AccountService";
import {ActivatedRoute} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountDetailsComponent} from "../account-details/account-details.component";

@Component({
  selector: 'app-deposit-withdraw-adm',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatDivider, MatIcon, MatMiniFabButton, MatTab, MatTabGroup, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FormsModule, MatCardActions, AccountDetailsComponent],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser implements OnInit  {
  userId!: string;
  user: any = {};
  amount!: number;
  accountNumber!: string;
constructor(private userDetails : UserDetailsService,
            private accountDetails :AccountService,
            private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.userId = params.get('id')!;
    if (this.userId) {
      this.userDetails.getData(this.userId).subscribe({
        next: data => {
          this.user = data;
          this.accountNumber = data.account.number;
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      console.log('User ID is undefined');
    }
  });
}
  submitDeposit(){
  this.accountDetails.deposit(this.accountNumber,this.amount).subscribe({
    next:data=>{
      console.log("Sucesso no deposito");
    },
    error: error =>{
      console.log(error);
    }
  })
  }
  submitWithdraw(){
  this.accountDetails.withdraw(this.accountNumber,this.amount).subscribe({
    next:data=>{
      console.log("Sucesso no saque");
    },
    error: error =>{
      console.log(error);
    }
  })
  }
}
