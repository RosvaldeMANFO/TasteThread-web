import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheBustPipe } from '../../../../../utils/cache-bust-pipe';
import { CustomButtonComponent } from '../../../../../utils/components/custom-button/custom-button';

export interface PhotoChangeEvent {
  file: File;
  preview: string;
}

@Component({
  selector: 'app-photo-step',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent, CacheBustPipe],
  templateUrl: './photoStep.component.html'
})
export class PhotoStepComponent {
  @Input() preview?: string;
  @Output() photoChange = new EventEmitter<PhotoChangeEvent>();
  
  fileName = '';

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileName = file.name;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target?.result as string;
        this.photoChange.emit({
          file: file,
          preview: this.preview
        });
      };
      reader.readAsDataURL(file);
    }
  }

  isBase64(url: string | null): boolean {
    if (!url) return false;
    return url.startsWith('data:image');
  }
}