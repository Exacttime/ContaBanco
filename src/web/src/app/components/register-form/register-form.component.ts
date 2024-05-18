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
import {ErrorStateMatcher, MatOption} from "@angular/material/core";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatButton, MatError, MatFormField,
    MatInput, MatLabel, ReactiveFormsModule, MatSelect, MatOption,MatSelectTrigger],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  fullName!: string;
  username!: string;
  password!: string;
  email!: string;
  roles = new FormControl<string[]>([]);
  rolesList: string[] = ['USER', 'MOD', 'ADMIN'];
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authService: AuthService,private router: Router) { }
  onFormSubmit() {

    const selectedRoles = (this.roles.value!).map((role: string) => role.toLowerCase());
    this.authService.register(this.fullName,this.username,this.emailFormControl.value!,selectedRoles, this.password).subscribe(
        (data: { token: string; id: string, roles: string[] }) => {
          console.log('Sucesso:', data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);
          localStorage.setItem('roles', JSON.stringify(data.roles));
          this.router.navigate(['home']).then(r => console.log(data.token));
        },
        (error: any) => {
          console.error('Erro:', error);
        }
    );
  }
}
