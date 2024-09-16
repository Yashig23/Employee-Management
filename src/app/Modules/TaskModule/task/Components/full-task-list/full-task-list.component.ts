import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  // CdkDrag,
  // CdkDropList,
} from '@angular/cdk/drag-drop';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { TaskServiceService } from '../../Services/task-service.service';
import { taskData } from '../../Models/task.model';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';

@Component({
  selector: 'app-full-task-list',
  templateUrl: './full-task-list.component.html',
  styleUrls: ['./full-task-list.component.scss']
})
export class FullTaskListComponent implements OnInit {
  public paramId!: number;
  public isEdit!: boolean;
  public sprintTaskList: taskData[] = [];
  public NewTasks: taskData[] = [];
  public ActivatedTasks: taskData[] = [];
  public CompletedTasks: taskData[] = [];
  public progressSpinner!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute, 
    public projectService: ProjectService, 
    public taskService: TaskServiceService,
    public toaster: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.paramId = Number(paramMap.get('id'));
      if (this.paramId) {
        this.isEdit = true;
        this.getTaskListOfSprint(this.paramId);
      }
    });
  }

  // drop(event: CdkDragDrop<taskData[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  
  //     const movedTask = event.container.data[event.currentIndex]; 
      

  //     if (event.container.id === 'newList') {
  //       movedTask.status = 0; 
  //     } else if (event.container.id === 'activeList') {
  //       movedTask.status = 1;  // Active Task
  //     } else if (event.container.id === 'completedList') {
  //       movedTask.status = 2;  // Completed Task
  //     }

  //     // console.log(`Task ID: ${movedTask.id}, New Status: ${movedTask.status}`);
  //     this.updateTaskStatus(movedTask.id, movedTask.status);
  //   }
  // }
  drop(event: CdkDragDrop<taskData[]>) {
    // If the task is dropped within the same list, just reorder the items
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // If the task is moved to a different list, transfer it
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
  
      // Get the moved task
      const movedTask = event.container.data[event.currentIndex];

      if (event.container.id === 'newList') {
        movedTask.status = 0; // New Task
      } else if (event.container.id === 'activeList') {
        movedTask.status = 1; // Active Task
      } else if (event.container.id === 'completedList') {
        movedTask.status = 2; // Completed Task
      }
  
      // Call updateTaskStatus() to persist the status update
      this.updateTaskStatus(movedTask.id, movedTask.status);
    }
  }
  
  
  public getTaskListOfSprint(id: number): void {
    this.progressSpinner = true;
    this.taskService.getTaskListOfSprintId(id).subscribe({
      next: (data) => {
        this.progressSpinner = false;
        const Data = data.data;
        this.sprintTaskList = Data;
        // console.log(this.sprintTaskList);
        this.NewTasks = [];
        this.ActivatedTasks = [];
        this.CompletedTasks = [];

        Data.forEach((task) => {
  
          if (task.status === 0) {
            this.NewTasks.push(task);
          } else if (task.status === 1) {
            this.ActivatedTasks.push(task);
          } else if (task.status === 2) {
            this.CompletedTasks.push(task);
          }
        });

        // console.log("Completed Tasks", this.CompletedTasks);
        // console.log("Active Tasks", this.ActivatedTasks);
        // console.log("New Tasks", this.NewTasks);
      },
      error: (err) => {
        this.progressSpinner = false;
        // console.log(err);
        this.toaster.showWarning("Error occured while feteching details of sprint tasks");
      }
    });
  }

  public updateTaskStatus(id: number, status: number): void {
    console.log(id, status);
    this.taskService.taskStatusUpdate(id, status).subscribe({
      next: (data) => {
        // console.log("Task updated successfully", data);
        // this.toaster.showSuccess("Task updated successfully");
        this.getTaskListOfSprint(this.paramId);
      },
      error: (err) => {
        // console.log("Error occurred while updating task", err);
        this.toaster.showWarning("Error occurred while updating task")
      }
    });
  }
}
