import { Component, Input, OnInit} from '@angular/core';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskServiceService } from '../../Services/task-service.service';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { DataForTaskLog, DataPost, Task, TaskList } from '../../Models/task.model';
import { projectDialogData } from '../../../../EmployeModule/employee/Models/Employee.model';
import { TaskComponent } from '../task/task.component';
// import { TaskListUpdateService } from '../../Services/task-list-update.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  @Input() taskId!: number; 
  public logList: DataForTaskLog[]=[];
  public progressSpinner!: boolean;

  constructor(public taskService: TaskServiceService) {}

  ngOnInit(): void {
    if (this.taskId) {
      this.getTaskLogList();
    } else {
      console.error('taskId is undefined');
    }
  }

  public getTaskLogList(): void {
    this.progressSpinner = true;
    this.taskService.getTaskLog(this.taskId).subscribe({
      next: (data) => {
        this.progressSpinner = false;
        const Data = data.data;
        this.logList = Data;
        console.log(data);
      },
      error: (err) => {
        this.progressSpinner = false;
        console.log(err);
      }
    });
  }
}