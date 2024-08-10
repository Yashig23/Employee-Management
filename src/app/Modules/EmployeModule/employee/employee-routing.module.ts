import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './Components/employee/employee/employee.component';
import { EmployeListComponent } from './Components/employe-list/employe-list.component';
import { EmployeeViewComponent } from './Components/employee-view/employee-view.component';
import { EmployeeTasksComponent } from './Components/employee-tasks/employee-tasks.component';
import { EmployeeProjectComponent } from './Components/employee-project/employee-project.component';

const routes: Routes = [
  {path:'', component: EmployeListComponent},
  {path:'add', component: EmployeeComponent},
  {path:"edit/:id", component: EmployeeComponent},
  { 
    path: 'view/:id', 
    component: EmployeeViewComponent,
    children: [
      { path: 'taskss/:id', component: EmployeeTasksComponent },
      { path: 'projectss/:id', component: EmployeeProjectComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
