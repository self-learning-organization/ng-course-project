import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    LocalId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService  {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7ZUYZ_7lFa4kXm_hYFN2WxoiX4HSp-TM', {
            email: email, 
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.LocalId, 
                    resData.idToken, 
                    +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7ZUYZ_7lFa4kXm_hYFN2WxoiX4HSp-TM', {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.LocalId, 
                    resData.idToken, 
                    +resData.expiresIn);
            })
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(
        email: string, 
        userId: string, 
        token: string, 
        expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // * 1000 because expiresIn comes in seconds and the other is milliseconds
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
        );
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS': 
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND': 
                errorMessage = 'This email does not exist'; 
                break;
            case 'INVALID_PASSWORD': 
                errorMessage = 'This password is incorrect';  
                break;
        }
        return throwError(errorMessage); 
    }
}