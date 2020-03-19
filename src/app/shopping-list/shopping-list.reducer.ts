import { Action } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';

const initialState = {
    ingredients: [
        new Ingredient('Cocao Powder', 75, "grams"),
        new Ingredient('Coconut Flour', 30, "grams")
    ]
};

export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients: [...state.ingredients, action]
            };
    }
}