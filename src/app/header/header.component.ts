import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    private userSub: Subscription;
    collapsed: boolean = true;

    constructor(
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
        this.store.dispatch(RecipeActions.storeRecipes());
    }

    onFetchData() {
        this.store.dispatch(RecipeActions.fetchRecipes())
    }

    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }
    
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}