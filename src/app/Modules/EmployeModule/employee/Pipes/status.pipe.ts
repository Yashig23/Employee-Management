import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Pending';
      case 1:
        return 'Running';
      case 2:
        return 'Completed';
      default:
        return 'Pending'; 
    }
  }

}
