import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountDetailsComponent} from "../account-details/account-details.component";
import {MatButton, MatFabAnchor, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {Router, RouterLink} from "@angular/router";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditRegisterFormComponent} from "../edit-register-form/edit-register-form.component";

@Component({
  selector: 'app-edit-user-list',
  standalone: true,
  imports: [CommonModule, AccountDetailsComponent, MatFabAnchor, MatIcon, MatMenu, MatMenuItem, MatMiniFabButton, RouterLink, MatButton, MatError, MatFormField, MatInput, MatLabel, MatOption, MatSelect, MatSelectTrigger, ReactiveFormsModule, FormsModule, EditRegisterFormComponent],
  templateUrl: './edit-user-list.component.html',
  styleUrl: './edit-user-list.component.scss',
})
export class EditUserListComponent {
  name!: string;
  constructor() {
  }
}
