import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resizeImage',
  standalone: true,
})
export class ResizeImagePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('/100x100bb.jpg', '/270x270bb.jpg');
  }
}
