import { Component } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model'

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styles: ['./shopping-list.component.css']
})

export class ShoppingListComponent {
    ingredients: Ingredient[] = [
        new Ingredient('Cocao Powder', 75, "grams"),
        new Ingredient('Coconut Flour', 30, "grams")
    ];

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }
}