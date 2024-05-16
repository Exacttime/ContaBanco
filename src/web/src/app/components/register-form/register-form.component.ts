import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EmailValidator,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../services/AuthService";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton,MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  username!: string;
  password!: string;
  email!: string;
  role!: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authService: AuthService,private router: Router) { }
  onFormSubmit() {
    this.authService.register(this.username,this.emailFormControl.value!,[this.role], this.password).subscribe(
        (data: { username: string; password: string}) => {
          console.log('Sucesso:', data);
          this.authService.login(data.username, data.password);
        },
        (error: any) => {
          console.error('Erro:', error);
        }
    );
  }
}
