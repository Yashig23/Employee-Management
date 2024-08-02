import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './Components/department-list/department-list.component';
import { DepartmentComponent } from './Components/department/department.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SharedModule } from '../../SharedModule/shared/shared.module';

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
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
  ReactiveFormsModule
  ]
})
export class DepartmentModule { }
