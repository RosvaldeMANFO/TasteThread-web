import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './custom-button.html',
})
export class CustomButtonComponent {
  @Input() customClass?: string;
  @Input() icon?: string;
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() disabled = false;
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

  getButtonClasses(): string {
    const baseClasses = 'rounded-md flex items-center justify-center gap-2 px-4 py-2';

    const variantClasses = {
      primary: 'bg-primary-light text-on-primary-light',
      secondary: 'bg-gray-200 text-gray-700',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      success: 'bg-green-600 text-white hover:bg-green-700'
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${this.customClass ?? ''}`;
  }
}