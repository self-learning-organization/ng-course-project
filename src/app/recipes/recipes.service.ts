import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Soya Beancurd',
            'A simple, custard pudding that is light and cooling!',
            'https://cdn.pixabay.com/photo/2016/07/28/00/13/japan-1546767_960_720.jpg',
            [
                new Ingredient('Polleney Soybean Powder', 60, 'grams'), 
                new Ingredient('Unisoy Instant Organic Soya Milk Powder', 30, 'grams'),
                new Ingredient('Nestlé Coffee-Mate', 30, 'grams'),
                new Ingredient('RedMan Instant Jelly Powder', 13, 'grams'),
                new Ingredient('Vanilla Powder', 1, 'tablespoon')
            ]),
        new Recipe(
            'Fudge Brownies',
            'A chocolaty baked treat! Yum!',
            'https://storage.needpix.com/rsynced_images/fudge-brownies-1235430_1280.jpg',
            [
                new Ingredient('Coconut Flour', 0.25, 'cup'), 
                new Ingredient('Unsweetened Cocoa Powder', 0.75, 'cup'),
                new Ingredient('Salt', 0.5, 'teaspoon'),
                new Ingredient('Ground Psyllium Husk', 0.5, 'tablespoon'),
                new Ingredient('Large Eggs', 2, 'unit'),
                new Ingredient('Vanilla Extract', 2, 'teaspoons'),
                new Ingredient('Coconut Oil', 0.33, 'cup'),
                new Ingredient('Honey', 0.25, 'cup')
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {

    }

    getRecipes() {
        return this.recipes.slice(); 
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index]; // Shallow copy: return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}