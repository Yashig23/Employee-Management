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

  sendTask(): void{
   this.userStoryType = 3;
   this.dialogRef.close(this.userStoryType);
  }

  sendBug(): void{
   this.userStoryType = 4;
  }
}
