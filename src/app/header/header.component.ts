import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    private userSub: Subscription;
    collapsed: boolean = true;

    constructor(
        private dataStorageService: DataStorageService, 
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.userSub = this.store
        .select('auth')
        .pipe(map(appState => appState.user))
        .subscribe(user => {
            this.isAuthenticated = !!user; // A trick for !user ? false : true
            console.log("!user gives " + !user);
            console.log("!!user gives " + this.isAuthenticated);
        });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
    
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}