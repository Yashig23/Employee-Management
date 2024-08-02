import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../Model/delete.model';
import { DeleteDialogComponent } from '../Components/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {

  constructor(private dialog: MatDialog) { }

  public openConfirmDialog(msg: string): MatDialogRef<DeleteDialogComponent, any>{
    const dialogData: DialogData = {message: msg};
    return this.dialog.open(DeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: dialogData
    });
  }

}
