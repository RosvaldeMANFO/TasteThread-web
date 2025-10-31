import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomButtonComponent } from '../../../../../utils/components/custom-button/custom-button';

@Component({
  selector: 'app-cooking-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatButtonModule, CustomButtonComponent],
  templateUrl: './cookingStep.component.html'
})
export class CookingStepComponent {
  @Input() items!: FormArray<FormControl<string>>;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();
}