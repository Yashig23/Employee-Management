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
@NgModule({
  declarations: [
    EmployeListComponent,
    EmployeeComponent,
    EmployeeViewComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class EmployeeModule { }
