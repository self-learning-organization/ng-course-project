import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Cocao Powder', 75, "grams"),
        new Ingredient('Coconut Flour', 30, "grams")
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default: 
            return state;
    }
}