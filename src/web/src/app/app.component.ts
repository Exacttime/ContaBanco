import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {MatSelectModule} from "@angular/material/select";

@Component({
  standalone: true,
  imports: [LoginFormComponent,NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web';
}
