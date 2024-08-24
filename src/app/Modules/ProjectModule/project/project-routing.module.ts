import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './Components/project-list/project-list.component';
import { AddProjectComponent } from './Components/add-project/add-project.component';
import { ViewProjectComponent } from './Components/ViewProject/view-project/view-project.component';
import { EditProjectComponent } from './Components/edit-project/edit-project.component';

const routes: Routes = [
  // // {path:'', component: AddProjectComponent},
  // {path:'project/add', component: AddProjectComponent}
  {path:"", component: ProjectListComponent},
  {path:"add", component: AddProjectComponent},
  { path: 'edit/:id', component: EditProjectComponent},
  {path:"view/:id", component: ViewProjectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
