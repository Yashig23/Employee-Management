import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { TaskComponent } from './Components/task/task.component';
import { TaskViewComponent } from './Components/task-view/task-view.component';
import { FullTaskListComponent } from './Components/full-task-list/full-task-list.component';

const routes: Routes = [
  {path:'', component: TaskListComponent},
  {path:'add', component: TaskComponent},
  {path:"edit/:id", component: TaskComponent},
  {path:"view/:id", component: TaskViewComponent},
  {path:"Ports", component: FullTaskListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
