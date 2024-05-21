import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmailValidator} from "@angular/forms";
import {provideRouter, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private userUrl = 'http://localhost:8080/api'
    constructor(private http: HttpClient, private router: Router) { }

    getAllUsers(): Observable<any> {
        const token = localStorage.getItem('token');  // Substitua por seu token JWT
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.userUrl + '/users' ,{headers});
    }
}