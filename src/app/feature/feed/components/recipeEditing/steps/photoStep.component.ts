import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photoStep.component.html'
})
export class PhotoStepComponent {
  @Input() preview: string | null = null;
  @Output() change = new EventEmitter<{ file: File | null; preview: string | null }>();

  onFileChange(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) {
      this.change.emit({ file: null, preview: null });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => this.change.emit({ file, preview: reader.result as string });
    reader.readAsDataURL(file);
  }
}