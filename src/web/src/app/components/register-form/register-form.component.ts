import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule,} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {EditRegisterFormComponent} from "../edit-register-form/edit-register-form.component";

@Component({
  selector: 'app-register-form',
  standalone: true,
    imports: [CommonModule, FormsModule,
        MatButton, MatError, MatFormField,
        MatInput, MatLabel, ReactiveFormsModule, MatSelect, MatOption, MatSelectTrigger,EditRegisterFormComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {

}
