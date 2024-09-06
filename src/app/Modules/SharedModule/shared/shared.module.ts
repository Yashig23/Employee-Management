import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './Components/delete-dialog/delete-dialog.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from './Components/loading/loading.component';
import { PaginationComponent } from './Components/pagination/pagination.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    SideBarComponent,
    LoadingComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSlideToggle,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    SideBarComponent,
    MatIconModule,
    PaginationComponent
    // ProfilePageComponent
  ]
})
export class SharedModule { }
