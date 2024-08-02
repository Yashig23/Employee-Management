import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './Components/department-list/department-list.component';
import { DepartmentComponent } from './Components/department/department.component';

const routes: Routes = [
  // {path:'', component:DepartmentListComponent},
  {path:'department/add', component: DepartmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
