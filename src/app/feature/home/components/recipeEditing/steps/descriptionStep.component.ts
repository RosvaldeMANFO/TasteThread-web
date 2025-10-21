import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MEAL_TYPE_OPTIONS } from '../../../model/mealType.model';
import { ORIGIN_OPTIONS } from '../../../model/origin.model';
import { SelectField } from '../../../../../utils/components/selectField/selectField.component';

@Component({
  selector: 'app-description-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, SelectField],
  templateUrl: './descriptionStep.component.html'
})
export class DescriptionStepComponent {
  @Input() form!: FormGroup;
  readonly mealTypes = MEAL_TYPE_OPTIONS;
  readonly origins = ORIGIN_OPTIONS;
}