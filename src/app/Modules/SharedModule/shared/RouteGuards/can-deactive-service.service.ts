import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { EmployeeComponent } from '../../../EmployeModule/employee/Components/employee/employee/employee.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanDeactiveServiceService implements CanDeactivate<EmployeeComponent> {

  constructor() { }

  canDeactivate(
    component: EmployeeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (component.employeeForm.dirty && !component.employeeForm.pristine) {
      return confirm('You have unsaved changes! Are you sure you want to leave this page?');
    }
    return true;
  }
}
