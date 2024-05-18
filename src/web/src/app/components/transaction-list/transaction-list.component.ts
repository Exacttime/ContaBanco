import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from "../account-details/account-details.component";
import { MatFabAnchor, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { AccountService } from "../../services/AccountService";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
    selector: 'app-transaction-list',
    standalone: true,
    imports: [
        CommonModule, AccountDetailsComponent,
        MatFabAnchor, MatIcon, MatMiniFabButton, RouterLink,
        MatCard, MatCardHeader, MatCardContent, MatDivider, MatCardActions,
        MatCardFooter, MatProgressBar, MatCardSubtitle, MatCardTitle
    ],
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
    userAccount!: string | null;
    transactions: any[] = [];

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.userAccount = sessionStorage.getItem('account');
        if (this.userAccount) {
            this.accountService.getTransactions(this.userAccount).subscribe(
                (data) => {
                    console.log(data);
                    this.transactions = data;
                },
                (error) => {
                    console.error('Erro:', error);
                }
            );
        }
    }
}
