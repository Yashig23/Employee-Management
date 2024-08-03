import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './Components/employee/employee/employee.component';
import { EmployeListComponent } from './Components/employe-list/employe-list.component';
import { EmployeeViewComponent } from './Components/employee-view/employee-view.component';

const routes: Routes = [
  {path:'', component: EmployeListComponent},
  {path:'add', component: EmployeeComponent},
  {path:"edit/:id", component: EmployeeComponent},
  {path:"view/:id", component: EmployeeViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
