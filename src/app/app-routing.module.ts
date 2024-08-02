import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './Modules/DepartmentModule/department/Components/department-list/department-list.component';
import { EmployeeComponent } from './Modules/EmployeModule/employee/Components/employee/employee/employee.component';
import { EmployeListComponent } from './Modules/EmployeModule/employee/Components/employe-list/employe-list.component';
import { ProjectListComponent } from './Modules/ProjectModule/project/Components/project-list/project-list.component';
import { AddProjectComponent } from './Modules/ProjectModule/project/Components/add-project/add-project.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { SignupComponent } from './Components/Signup/signup.component';
const routes: Routes = [
  {path:'department-list', component:DepartmentListComponent},
  {path: 'employee-list', component: EmployeListComponent},
  {path: 'employee/add', component: EmployeeComponent},
  {path: 'employee/edit/:id', component: EmployeeComponent},
  {path: 'project-list', component: ProjectListComponent},
  {path: 'project/add', component: AddProjectComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'departments',
    loadChildren: () => import('./Modules/DepartmentModule/department/department.module').then(m => m.DepartmentModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./Modules/ProjectModule/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./Modules/TaskModule/task/task.module').then(m => m.TaskModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./Modules/EmployeModule/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: '',
    redirectTo: '/department-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/department-list' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
