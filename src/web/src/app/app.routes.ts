import { Route } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {AuthGuard} from "./services/AuthGuard";
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {IndexComponent} from "./components/pages/index/index.component";
import {TransferenceFormComponent} from "./components/transference-form/transference-form.component";
import {TransactionListComponent} from "./components/transaction-list/transaction-list.component";
import {EditUserListComponent} from "./components/edit-user-list/edit-user-list.component";
import {AdminUserListComponent} from "./components/admin-user-list/admin-user-list.component";

export const appRoutes: Route[] = [
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginFormComponent},
    {path: 'register', component: RegisterFormComponent},
    {path: 'transfer', component: TransferenceFormComponent},
    {path: 'transaction-list', component: TransactionListComponent},
    {path: 'edit', component: EditUserListComponent},
    {path: 'admin-user-list', component: AdminUserListComponent},
    {path: '', component: IndexComponent}
];
