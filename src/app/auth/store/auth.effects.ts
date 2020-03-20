import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    LocalId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START), // First step: filtering
        switchMap((authData: AuthActions.LoginStart) => { // Second step: Create a new observable by taking another observable's data
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return of(new AuthActions.LoginSuccess({
                        email: resData.email,
                        userId: resData.LocalId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    }));
                }),
                catchError(error => {
                return of();
            }));
        }),

    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}