import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private accountUrl = 'http://localhost:8080/api/conta';  // URL para a API de login

    constructor(private http: HttpClient) { }
    makeTransference(destinyAccount:string,value:number): Observable<any> {
        const userAccount = sessionStorage.getItem('account');
        return this.transfer(userAccount!,destinyAccount!, value!);
    }
    getTransactions(userId: string){
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.accountUrl + `/${userId}/transactions`,{headers});
    }
    transfer(userAccount: string, destinyAccount: string, value: number): Observable<any> {
        const url = `${this.accountUrl}/${userAccount}/transfer/${destinyAccount}`;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        let body ={
            amount: value
        }
        return this.http.post<any>(url, body,{ headers }, );
    }
    deposit(userAccount:string,value:number): Observable<any> {
        const url = `${this.accountUrl}/deposit/${userAccount}`;
        const token = localStorage.getItem('token');
        let body={
            amount: value
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<any>(url,body,{ headers } );
    }
    withdraw(userAccount:string,value:number): Observable<any> {
        const url = `${this.accountUrl}/withdraw/${userAccount}`;
        const token = localStorage.getItem('token');
        let body={
            amount: value
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<any>(url,body,{ headers } );
    }
}