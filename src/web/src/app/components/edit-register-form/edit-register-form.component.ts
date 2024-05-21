import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-register-form',
  standalone: true,
  imports: [CommonModule, MatButton,MatError, MatFormField,
      MatInput, MatLabel, ReactiveFormsModule, MatSelect, MatOption, MatSelectTrigger,
      ReactiveFormsModule, FormsModule],
  templateUrl: './edit-register-form.component.html',
  styleUrl: './edit-register-form.component.scss',
})
export class EditRegisterFormComponent {
    @Input() mode: 'register' | 'update' = 'register';
    name!: string;
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  roles = new FormControl<string[]>([]);
  rolesList: string[] = ['USER', 'MOD', 'ADMIN'];
  fullName!: string;
  username!: string;
  password!: string;
  email!: string;
  constructor(private authService: AuthService,private router: Router) { }

    onFormSubmit() {
        if (this.mode === 'register') {
            this.registerUser();
        } else if (this.mode === 'update') {
            this.updateUser();
        }
    }
    registerUser() {
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
  updateUser(){
      const selectedRoles = (this.roles.value!).map((role: string) => role.toLowerCase());
      const userId = localStorage.getItem('id')
      this.authService.updateUser(userId!,this.fullName,this.username,this.emailFormControl.value!,selectedRoles, this.password).subscribe(
          (data: { token: string; id: string, roles: string[] }) => {
              console.log('Sucesso:', data);
              localStorage.setItem('token', data.token);
              localStorage.setItem('roles', JSON.stringify(data.roles));
              this.router.navigate(['home']).then(r => console.log(data.token));
          },
          (error: any) => {
              console.error('Erro:', error);
          }
      );
  }

}
