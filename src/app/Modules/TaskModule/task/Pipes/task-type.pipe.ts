import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskType'
})
export class TaskTypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Epic';
      case 1:
        return 'Feature';
      case 2:
        return 'Userstory';
        case 3:
          return 'Task';
          case 4:
            return 'Bug';
      default:  
      return 'Task';      
    }
  }

}
