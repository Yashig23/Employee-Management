import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './Components/employee/employee/employee.component';
import { EmployeListComponent } from './Components/employe-list/employe-list.component';

const routes: Routes = [
  {path:"", component: EmployeListComponent},
  {path:"employee/add", component: EmployeeComponent},
  {path:"employee/edit/:id", component: EmployeeComponent},
  // {path:"employee-list", component: EmployeListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
