import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', {static: false}) shoppingListForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select('shoppingList').subscribe(stateData => {
            const index = stateData.editIndex;
            if (index > -1) {
                this.editMode = true;
                this.editedItem = stateData.ingredients[index];
                this.shoppingListForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount,
                    unit: this.editedItem.unit
                });
            } else {
                this.editMode = false;
            }
        });
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount, value.unit);
        if (this.editMode) {
            // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
            this.store.dispatch(
                ShoppingListActions.updateIngredient({ingredient: newIngredient})
            );
        } else {
            // this.shoppingListService.addIngredient(newIngredient);
            this.store.dispatch(ShoppingListActions.addIngredient({ingredient: newIngredient}));
        }
        this.editMode = false;
        form.reset();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(ShoppingListActions.stopEdit());
    }

    onDelete() {
        // this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.store.dispatch(ShoppingListActions.deleteIngredient());
        this.onClear();
    }

    onClear() {
        this.editMode = false;
        this.shoppingListForm.reset();
        this.store.dispatch(ShoppingListActions.stopEdit());
    }
}