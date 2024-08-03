import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './Components/delete-dialog/delete-dialog.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SideBarComponent } from './Components/side-bar/side-bar.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSlideToggle,
    MatDialogModule
  ],
  exports: [
    SideBarComponent
  ]
})
export class SharedModule { }
