import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes', 
        loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) 
    } // Older syntax instead of the anonymous arrow function: './recipes/recipes.module#RecipesModule'
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}