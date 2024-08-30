import { Component, Input } from '@angular/core';
import { taskData } from '../../Models/task.model';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrl: './tasks-card.component.scss'
})
export class TasksCardComponent {
  @Input() task!: taskData;
  public assigneeInitials?: string;
  public statusLabel: string = 'New';

  ngOnInit() {
    this.setAssigneeInitials();
    this.setStatusLabel();
  }

  private setAssigneeInitials(): void {
    this.assigneeInitials = this.task.assigneeName?.slice(0, 2).toUpperCase();
  }

  private setStatusLabel(): void {
    switch (this.task.status) {
      case 0:
        this.statusLabel = 'New';
        break;
      case 1:
        this.statusLabel = 'Active';
        break;
      case 2:
        this.statusLabel = 'Completed';
        break;
      default:
        this.statusLabel = 'New';
    }
  }
}
