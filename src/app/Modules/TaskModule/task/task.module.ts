import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { TaskComponent } from './Components/task/task.component';
import { TaskViewComponent } from './Components/task-view/task-view.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { TaskPipe } from './Pipes/task.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskViewComponent,
    TaskPipe
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ]
})
export class TaskModule { }
