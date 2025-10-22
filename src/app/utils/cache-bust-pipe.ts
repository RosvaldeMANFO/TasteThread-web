import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cacheBust', standalone: true })
export class CacheBustPipe implements PipeTransform {
  transform(url: string | null | undefined): string {
    if (!url) return '';
    return `${url}?t=${Date.now()}`;
  }
}
