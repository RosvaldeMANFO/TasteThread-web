import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

import { DescriptionStepComponent } from './steps/descriptionStep.component';
import { AdditionalInfoStepComponent } from './steps/additionalInfoStep.component';
import { IngredientsStepComponent } from './steps/ingredientsStep.component';
import { CookingStepComponent } from './steps/cookingStep.component';
import { PhotoStepComponent } from './steps/photoStep.component';
import { IngredientDTO } from '../../../../core/model/recipe/ingredient.dto';
import { RecipeDTO } from '../../../../core/model/recipe/recipe.dto';
export interface RecipeEditingDialogData { recipe?: any; }

@Component({
  selector: 'app-recipe-editing-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatButtonModule, MatIconModule, MatStepperModule,
    DescriptionStepComponent, AdditionalInfoStepComponent, IngredientsStepComponent, CookingStepComponent, PhotoStepComponent,
],
  templateUrl: './recipeEditingDialog.component.html'
})
export class RecipeEditingDialogComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  descriptionForm: FormGroup;
  additionalForm: FormGroup;
  ingredientsForm: FormGroup;
  stepsForm: FormGroup;
  photoForm: FormGroup;

  photoFile: File | null = null;
  photoPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<RecipeEditingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecipeEditingDialogData
  ) {
    this.descriptionForm = this.fb.group({
      name: ['', Validators.required],
      origin: ['', Validators.required],
      mealType: ['', Validators.required],
    });
    this.additionalForm = this.fb.group({
      description: [''],
      dietaryRestrictions: [[]],
      servings: [1, [Validators.required, Validators.min(1)]],
      cookTime: [0],
    });
    this.ingredientsForm = this.fb.group({ items: this.fb.array([]) });
    this.stepsForm = this.fb.group({ items: this.fb.array<FormControl<string>>([]) });
    this.photoForm = this.fb.group({ image: [null] });

    if (data?.recipe) this.prefill(data.recipe);
  }

  get items(): FormArray<FormGroup> { return this.ingredientsForm.get('items') as FormArray<FormGroup>; }
  addIngredient() {
    this.items.push(this.fb.group({ name: ['', Validators.required], quantity: [0, [Validators.required, Validators.min(0)]], unit: [''] }));
  }
  removeIngredient(i: number) { this.items.removeAt(i); }

  get stepItems(): FormArray<FormControl<string>> { return this.stepsForm.get('items') as FormArray<FormControl<string>>; }
  addStep() { this.stepItems.push(new FormControl<string>('', { nonNullable: true })); }
  removeStep(i: number) { this.stepItems.removeAt(i); }

  onPhotoSelected(file: File | null, preview: string | null) {
    this.photoFile = file;
    this.photoPreview = preview;
    this.photoForm.patchValue({ image: preview });
  }

  save() {
    const dto = new RecipeDTO({
      name: this.descriptionForm.value.name ?? '',
      origin: this.descriptionForm.value.origin ?? '',
      mealType: this.descriptionForm.value.mealType ?? '',
      description: this.additionalForm.value.description ?? '',
      dietaryRestrictions: this.additionalForm.value.dietaryRestrictions ?? [],
      servings: this.additionalForm.value.servings ?? 0,
      cookTime: this.additionalForm.value.cookTime ?? 0,
      ingredients: (this.items.value ?? []).map(i => IngredientDTO.fromJSON(i)),
      instructions: this.stepItems.value ?? [],
      image: this.photoForm.value.image ?? null,
    });
    this.ref.close(dto);
  }
  
  close() { this.ref.close(); }

  private prefill(recipe: any) {
    this.descriptionForm.patchValue({ name: recipe?.name ?? '', origin: recipe?.country ?? '', mealType: recipe?.mealType ?? '' });
    this.additionalForm.patchValue({
      description: recipe?.description ?? '',
      dietaryRestrictions: recipe?.dietaryRestrictions ?? [],
      servings: recipe?.servings ?? 1,
      cookTime: recipe?.cookTime ?? 0,
    });
    (recipe?.ingredients ?? []).forEach((i: any) =>
      this.items.push(this.fb.group({ name: [i?.name ?? '', Validators.required], quantity: [i?.quantity ?? 0, [Validators.required, Validators.min(0)]], unit: [i?.unit ?? ''] }))
    );
    (recipe?.instructions ?? recipe?.steps ?? []).forEach((s: string) =>
      this.stepItems.push(new FormControl<string>(s ?? '', { nonNullable: true }))
    );
    if (recipe?.imageUrl) this.photoPreview = recipe.imageUrl;
  }
}