import { Ingredient } from '../shared/ingredient.model';

const initialState = {
    ingredients: [
        new Ingredient('Cocao Powder', 75, "grams"),
        new Ingredient('Coconut Flour', 30, "grams")
    ]
};

export function shoppingListReducer(state = initialState, action) {

}