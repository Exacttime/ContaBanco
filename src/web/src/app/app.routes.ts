import { Route } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";

export const appRoutes: Route[] = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginFormComponent},
];
