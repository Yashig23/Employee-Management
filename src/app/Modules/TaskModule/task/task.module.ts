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
import { FullTaskListComponent } from './Components/full-task-list/full-task-list.component';
import {MatTreeModule} from '@angular/material/tree';
import { TasksListComponent } from './Components/tasks-list/tasks-list.component';
import { TaskTypePipe } from './Pipes/task-type.pipe';
import { SubChildTasksComponent } from './Components/sub-child-tasks/sub-child-tasks.component';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { TasksCardComponent } from './Components/tasks-card/tasks-card.component';
import { ToastService } from '../../SharedModule/shared/Services/toast.service';
@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskViewComponent,
    TaskPipe,
    FullTaskListComponent,
    TasksListComponent,
    TaskTypePipe,
    SubChildTasksComponent,
    TasksCardComponent,
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
    MatProgressSpinnerModule,
    MatTreeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    CdkDrag,
    CdkDropList

  ],
  exports: [
    TaskComponent,
    TasksListComponent
  ],
  providers: [provideNativeDateAdapter(), ToastService]
})
export class TaskModule { }
