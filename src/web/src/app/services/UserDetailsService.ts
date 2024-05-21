import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserDetailsService {
    private accountUrl = 'http://localhost:8080/api/user';  // URL para a API de login
    private url = 'http://localhost:8080/api'

    constructor(private http: HttpClient,private router: Router) { }

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
    logout() {
        // Opcional: Chamar endpoint de logout no backend
        this.http.post(`${this.url}/logout`, {}).subscribe({
            next: () => {
                // Limpar o armazenamento local
               localStorage.clear();
                // Redirecionar para a página de índice
                this.router.navigate(['/']);
            },
            error: err => {
                console.error('Error logging out', err);
                // Mesmo em caso de erro, limpar o armazenamento local
                localStorage.clear();
                // Redirecionar para a página de índice
                this.router.navigate(['/']);
            }
        });
    }
}