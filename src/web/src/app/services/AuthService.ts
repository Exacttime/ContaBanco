import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmailValidator} from "@angular/forms";
import {provideRouter, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'http://localhost:8080/api/auth';  // URL para a API de login
    private userUrl = 'http://localhost:8080/api'
    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.authUrl + '/login',  { username, password });
    }

    register(fullName:string,username: string, email: string, role: string[], password: string): Observable<any>{
        return this.http.post<any>(this.authUrl+ '/signup', {fullName, username,email,role, password });
    }
    updateUser(userId: string,fullName:string,username: string, email: string, role: string[], password: string):Observable<any>{
        const token = localStorage.getItem('token');  // Substitua por seu token JWT
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put(this.userUrl+`/user/${userId}`,{fullName, username,email,role, password },{headers})
    }
}