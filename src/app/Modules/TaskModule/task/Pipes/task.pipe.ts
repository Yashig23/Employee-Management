import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'task'
})
export class TaskPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Not finalized';
      case 1:
        return 'Active';
      case 2:
        return 'Completed';
      default:
        return 'Not finalized'; 
    }
  }

}
