import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './Components/project-list/project-list.component';
import { AddProjectComponent } from './Components/add-project/add-project.component';

const routes: Routes = [
  // // {path:'', component: AddProjectComponent},
  // {path:'project/add', component: AddProjectComponent}
  {path:"", component: ProjectListComponent},
  {path:"add", component: AddProjectComponent},
  {path:"project/details/:id", component: AddProjectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
