import { Route } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {AuthGuard} from "./services/AuthGuard";
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {IndexComponent} from "./components/pages/index/index.component";
import {TransferenceFormComponent} from "./components/transference-form/transference-form.component";

export const appRoutes: Route[] = [
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginFormComponent},
    {path: 'register', component: RegisterFormComponent},
    {path: 'transfer', component: TransferenceFormComponent},
    {path: '', component: IndexComponent}
];
