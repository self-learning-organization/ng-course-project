import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Soya Beancurd', 
      'A simple, custard pudding that is light and cooling!',
      'https://cdn.pixabay.com/photo/2016/07/28/00/13/japan-1546767_960_720.jpg'),
    new Recipe(
      'Fudge Brownies', 
      'A chocolaty baked treat! Yum!',
      'https://storage.needpix.com/rsynced_images/fudge-brownies-1235430_1280.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
