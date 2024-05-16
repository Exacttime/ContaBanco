import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton, MatFabAnchor, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {UserDetailsService} from "../../services/UserDetailsService";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AccountService} from "../../services/AccountService";
import {AccountDetailsComponent} from "../account-details/account-details.component";

@Component({
  selector: 'app-transference-form',
  standalone: true,
    imports: [CommonModule, MatCard, MatCardContent, MatCardTitle, MatFabAnchor, MatIcon, MatMiniFabButton, RouterLink, FormsModule, MatFormField, MatInput, MatLabel, MatButton, AccountDetailsComponent],
  templateUrl: './transference-form.component.html',
  styleUrl: './transference-form.component.scss',
})
export class TransferenceFormComponent{
  saldo!: number;
  limit!: number;
  name!: string;
  userData: any = {};
  accountDestiny!: string;
  amount!: number;
  constructor(private accountService: AccountService) {
  }
  onFormSubmit(){
    this.accountService.makeTransference(this.accountDestiny,this.amount).subscribe(
        (data) => {
          this.userData = data;
          this.limit = data.account.creditLimit;
          this.saldo = data.account.balance;
          this.name = data.name;
          console.log('User Data:', this.userData, this.saldo, this.limit);
        },
        (error) => {
          console.error('Erro:', error);
        }
    );
  }
}
