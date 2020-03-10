import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent {
    @Output() ingredientAdded = new EventEmitter<Ingredient>();
    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;
    @ViewChild('unitInput') unitInputRef: ElementRef;

    onAddItem() {
        this.ingredientAdded.emit(
            new Ingredient(
            <string> this.nameInputRef.nativeElement.value, 
            <number> this.amountInputRef.nativeElement.value,
            <string> this.unitInputRef.nativeElement.value)
        )
        // const ingName = this.nameInputRef.nativeElement.value;
        // const ingAmount = this.amountInputRef.nativeElement.value;
        // const ingUnit = this.unitInputRef.nativeElement.value;
        // const newIngredient = new Ingredient(ingName, ingAmount, ingUnit);
        // this.ingredientAdded.emit(newIngredient);
    }
}