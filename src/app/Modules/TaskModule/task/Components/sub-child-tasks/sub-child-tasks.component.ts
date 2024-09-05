import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-child-tasks',
  templateUrl: './sub-child-tasks.component.html',
  styleUrl: './sub-child-tasks.component.scss'
})
export class SubChildTasksComponent {
  public userStoryType!: number;

  constructor(private dialogRef: MatDialogRef<SubChildTasksComponent>){}

  sendTask(): void {
    this.dialogRef.close(3);
  }

  sendBug(): void {
    this.dialogRef.close(4);
  }
}
