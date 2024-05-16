import {inject, Injectable} from '@angular/core';
import {Router, CanActivateFn} from '@angular/router';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);

    const localData =  localStorage.getItem('token');
    if(localData != null) {
        return true;
    } else {
        router.navigateByUrl('/login')
        return false;
    }
};