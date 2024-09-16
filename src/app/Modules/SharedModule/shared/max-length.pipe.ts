import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(value: string, maxLength: number = 50): string {
    if (!value) {
      return '';
    }

    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    
    return value;
  }

}
