import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    // payload: Ingredient; // Payload isn't a name I have to use. The Action interface only forces to add a "type" property
    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients; 