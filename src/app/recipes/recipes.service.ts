import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Soya Beancurd',
            'A simple, custard pudding that is light and cooling!',
            'https://cdn.pixabay.com/photo/2016/07/28/00/13/japan-1546767_960_720.jpg'),
        new Recipe(
            'Fudge Brownies',
            'A chocolaty baked treat! Yum!',
            'https://storage.needpix.com/rsynced_images/fudge-brownies-1235430_1280.jpg')
    ];

    getRecipes() {
        return this.recipes.slice(); 
    }
}