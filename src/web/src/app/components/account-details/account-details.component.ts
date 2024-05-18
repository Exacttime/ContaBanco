import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {UserDetailsService} from "../../services/UserDetailsService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, MatCardTitle, MatCard, MatCardContent],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
})
export class AccountDetailsComponent implements OnInit{
  saldo!: number;
  limit!: number;
  name!: string;
  userData: any = {};
  accountNumber!:string | null;
  constructor(private userDetailsService: UserDetailsService,private router: Router) {
  }
  ngOnInit(){
    this.userDetailsService.searchData().subscribe(
        (data) => {
          this.userData = data;
          this.limit = data.account.creditLimit;
          this.saldo = data.account.balance;
          this.name = data.name;
          sessionStorage.setItem('account', data.account.number);
          sessionStorage.setItem('name',data.name)
            this.accountNumber = sessionStorage.getItem('account');
          console.log('User Data:', this.userData, this.saldo, this.limit, this.accountNumber);
        },
        (error) => {
          console.error('Erro:', error);
          this.router.navigate(['login']).then();
        }
    );
  }
}
