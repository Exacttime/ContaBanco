import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserDetailsService {
    private accountUrl = 'http://localhost:8080/api/user';  // URL para a API de login

    constructor(private http: HttpClient) { }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUserId(): string | null {
        return localStorage.getItem('userId');
    }

    getRoles(): string[] {
        const roles = localStorage.getItem('roles');
        return roles ? JSON.parse(roles) : [];
    }
    searchData(): Observable<any> {
        const userId = localStorage.getItem('id');  // Substitua por seu token JWT
       // const user
        return this.getData(userId!);
    }

    getData(userId: string): Observable<any> {
        const url = `${this.accountUrl}/${userId}`;
        const token = localStorage.getItem('token');  // Substitua por seu token JWT
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(url, { headers });
    }
}