import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminService} from "../../services/AdminService";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.scss',
})
export class AdminUserListComponent implements OnInit{
  constructor(private adminService: AdminService) {
  }
  ngOnInit(){
  this.adminService.getAllUsers().subscribe({
    next: data => {
      console.log(data);
    },
    error: error =>{
      console.log(error);
    }
  })
  }
}
