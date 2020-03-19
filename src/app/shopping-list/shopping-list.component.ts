import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import * as fromShoppingList from './store/shopping-list.reducer'; // "from..."'s a convention for describing an import to your reducer and/or your state for a certain part of your application

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styles: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ingredients: Ingredient[]}>;
    private subscription: Subscription;

    constructor(
        private shoppingListService: ShoppingListService, 
        private loggingService: LoggingService,
        private store: Store<fromShoppingList.AppState>) {
    }

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList');
        // this.ingredients = this.shoppingListService.getIngredients();
        // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
        //     (ingredients: Ingredient[]) => {
        //         this.ingredients = ingredients;
        //     }
        // );
        this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit");
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }
}