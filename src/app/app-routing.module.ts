import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { SignupComponent } from './Components/Signup/signup.component';
import { HomepageComponent } from './Components/Homepage/homepage/homepage.component';
import { ProfilePageComponent } from './Components/profile-page/profile-page.component';
import { RoleGuard } from './Modules/SharedModule/shared/RouteGuards/adminguard.guard';
import { PageNotFoundComponent } from './Modules/SharedModule/shared/page-not-found/page-not-found.component';
import { authGuard } from './Modules/SharedModule/shared/RouteGuards/auth-guard.guard';
import { LayoutComponentComponent } from './Modules/layout-module/layout-component/layout-component.component';

// const routes: Routes = [
//   {
//     path: 'departments',
//     loadChildren: () => import('./Modules/DepartmentModule/department/department.module').then(m => m.DepartmentModule)
//   },
//   {
//     path: 'projects',
//     loadChildren: () => import('./Modules/ProjectModule/project/project.module').then(m => m.ProjectModule)
//   },
//   {
//     path: 'tasks',
//     loadChildren: () => import('./Modules/TaskModule/task/task.module').then(m => m.TaskModule)
//   },
//   {
//     path: 'employees',
//     loadChildren: () => import('./Modules/EmployeModule/employee/employee.module').then(m => m.EmployeeModule)
//   },
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
//   { path: 'homepage', component: HomepageComponent },
//   {path: 'profile', component: ProfilePageComponent, canActivate:[roleGuard]},
//   { path: '', redirectTo: '/homepage', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }
// ];

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponentComponent,
    canActivate: [authGuard],
    children: [
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
      { path: 'profile', component: ProfilePageComponent, canActivate:[RoleGuard] },
      // { path: '', redirectTo: 'homepage', pathMatch: 'full' }, 
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
