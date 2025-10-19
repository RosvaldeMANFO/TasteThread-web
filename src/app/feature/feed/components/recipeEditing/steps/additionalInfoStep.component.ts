import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { DIETARY_RESTRICTION_OPTIONS } from '../../../model/dietaryRestriction.model';
import { SelectField } from '../../../../../utils/components/selectField/selectField.component';

@Component({
  selector: 'app-additional-info-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatSliderModule, SelectField],
  templateUrl: './additionalInfoStep.component.html'
})
export class AdditionalInfoStepComponent {
  @Input() form!: FormGroup;
  readonly dietaryRestrictionOptions = DIETARY_RESTRICTION_OPTIONS;

}