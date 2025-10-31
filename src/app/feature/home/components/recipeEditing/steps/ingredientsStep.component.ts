import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UNIT_OPTIONS } from '../../../model/unit.model';
import { SelectField } from '../../../../../utils/components/selectField/selectField.component';
import { CustomButtonComponent } from '../../../../../utils/components/custom-button/custom-button';

@Component({
  selector: 'app-ingredients-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
     MatInputModule, MatIconModule, MatButtonModule, SelectField, CustomButtonComponent],
  templateUrl: './ingredientsStep.component.html'
})
export class IngredientsStepComponent {
  @Input() items!: FormArray<FormGroup>;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();
  readonly unitOptions = UNIT_OPTIONS;
}