import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminService} from "../../services/AdminService";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatDivider, MatIcon, MatFabButton, MatMiniFabButton],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.scss',
})
export class AdminUserListComponent implements OnInit{
  users: any[] = [];
  constructor(private adminService: AdminService) {
  }
  ngOnInit(){
  this.adminService.getAllUsers().subscribe({
    next: data => {
      this.users = data;
      console.log(data);
    },
    error: error =>{
      console.log(error);
    }
  })
  }
}
