import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {MatFabAnchor, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {UserDetailsService} from "../../../services/UserDetailsService";
import {Router, RouterLink} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {AccountDetailsComponent} from "../../account-details/account-details.component";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
const TRANSFER_ICON =
    `
<svg xmlns="http://www.w3.org/2000/svg" 
height="24px" 
viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
<path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z"/>
</svg>
`;
const HISTORY_ICON =
    `
<svg xmlns="http://www.w3.org/2000/svg" 
height="24px" 
viewBox="0 -960 960 960" 
width="24px" 
fill="#e8eaed">
<path d="M320-160q-33 0-56.5-23.5T240-240v-120h120v-90q-35-2-66.5-15.5T236-506v-44h-46L60-680q36-46 89-65t107-19q27 0 52.5 4t51.5 15v-55h480v520q0 50-35 85t-85 35H320Zm120-200h240v80q0 17 11.5 28.5T720-240q17 0 28.5-11.5T760-280v-440H440v24l240 240v56h-56L510-514l-8 8q-14 14-29.5 25T440-464v104ZM224-630h92v86q12 8 25 11t27 3q23 0 41.5-7t36.5-25l8-8-56-56q-29-29-65-43.5T256-684q-20 0-38 3t-36 9l42 42Zm376 350H320v40h286q-3-9-4.5-19t-1.5-21Zm-280 40v-40 40Z"/></svg>
`;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIcon,
    MatMiniFabButton, MatCard, MatCardContent,
    MatCardTitle, MatFabAnchor, RouterLink,
    AccountDetailsComponent, MatDrawerContainer, MatDrawer, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  limit!: number;
  name!: string | null;
  showFiller = false;
  isDrawerVisible: boolean = false;
  isAdminOrMod: boolean = false;
  constructor(private userDetailsService: UserDetailsService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private router: Router) {
      iconRegistry.addSvgIconLiteral('transfer', sanitizer.bypassSecurityTrustHtml(TRANSFER_ICON));
      iconRegistry.addSvgIconLiteral('history', sanitizer.bypassSecurityTrustHtml(HISTORY_ICON));
  }

  toggleDrawer() {
    this.isDrawerVisible = !this.isDrawerVisible;
  }
  ngOnInit(){
    this.name = sessionStorage.getItem('name');
    const roles = localStorage.getItem('roles');
    if (!roles) {
      localStorage.clear();
      this.router.navigate(['login']).then();
    } else {
      const rolesArray = roles.split(','); // Split roles into an array
      this.isAdminOrMod = rolesArray.includes('ROLE_ADMIN') || rolesArray.includes('ROLE_MODERATOR');
    }
  }
  toTransactionList(){
    this.router.navigate(['transaction-list']);
  }
  onFormSubmit() {
    this.router.navigate(['transfer']).then(r => console.log("Deu bom"));
  }
  logout(){
    this.userDetailsService.logout();
  }
}
