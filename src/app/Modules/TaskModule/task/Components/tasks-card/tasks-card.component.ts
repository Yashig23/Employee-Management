import { Component, Input } from '@angular/core';
import { taskData } from '../../Models/task.model';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrl: './tasks-card.component.scss'
})
export class TasksCardComponent {
  @Input() task!: taskData;
  public AssigneeName?: string;

  public initailName(): string| undefined{
   return this.AssigneeName = this.task.assigneeName?.slice(0,2).toUpperCase();
  }

  public getStatusLabel(status: number): string {
    switch (status) {
      case 0: return 'New';
      case 1: return 'Active';
      case 2: return 'Completed';
      default: return 'New';
    }
  }
}
