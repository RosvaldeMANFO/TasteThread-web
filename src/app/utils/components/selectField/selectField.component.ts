import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export interface SelectOption<T = any> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectField),
      multi: true,
    },
  ],
  templateUrl: './selectField.component.html',
})

export class SelectField<T = any> implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: SelectOption<T>[] = [];
  @Input() required = false;
  @Input() multiple = false;
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() compareWith: ((o1: any, o2: any) => boolean) | null = null;

  disabled = false;
  value: T | T | null = null;

  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(val: any) {
    this.value = val;
    this.onChange(val);
  }
}
