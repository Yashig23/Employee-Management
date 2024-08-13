import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeListComponent } from './Components/employe-list/employe-list.component';
import { EmployeeComponent } from './Components/employee/employee/employee.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeViewComponent } from './Components/employee-view/employee-view.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import { RolePipe } from './Pipes/role.pipe';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EmployeeProjectComponent } from './Components/employee-project/employee-project.component';
import { EmployeeTasksComponent } from './Components/employee-tasks/employee-tasks.component';
import { StatusPipe } from './Pipes/status.pipe';

@NgModule({
  declarations: [
    EmployeListComponent,
    EmployeeComponent,
    EmployeeViewComponent,
    RolePipe,
    EmployeeProjectComponent,
    EmployeeTasksComponent,
    StatusPipe
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatSlideToggle,
  MatDialogModule,
  MatButtonModule,
  SharedModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatSortModule,
  MatIconModule
  ]
})
export class EmployeeModule { }
