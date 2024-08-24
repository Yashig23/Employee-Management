import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Employee';
      case 1:
        return 'Admin';
      case 2:
        return 'Super Admin';
      default:
        return 'Employee'; 
    }
  }
}
