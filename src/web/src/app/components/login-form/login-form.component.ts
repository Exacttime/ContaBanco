import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../services/AuthService";
import {FormsModule} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
import { appRoutes } from '../../app.routes';

@Component({
  selector: 'app-login-form',
  standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButton, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  username!: string;
  password!: string;
  errorMessage!: string;
  constructor(private authService: AuthService, private router: Router) { }

  onFormSubmit() {
    this.authService.login(this.username, this.password).subscribe(
        (data: { token: string; id: string}) => {
          console.log('Sucesso:', data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          this.errorMessage = '';
          this.router.navigate(['home']).then(r => console.log(data.token));
        },
        (error: any) => {
          console.error('Erro:', error);
          this.handleError(error)
        }
    );
  }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
            this.errorMessage = 'An error occurred:' + error.error;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
            this.errorMessage = `Backend returned code ${error.status}, body was: ` + error.error.message;
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
