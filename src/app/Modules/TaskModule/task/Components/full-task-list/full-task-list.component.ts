import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../../Services/task-service.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DataItem, ExampleFlatNode } from '../../Models/task.model';
import { TaskType } from '../../Models/task.model';
import { projectDialogData } from '../../../../EmployeModule/employee/Models/Employee.model';
import { TaskComponent } from '../task/task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-full-task-list',
  templateUrl: './full-task-list.component.html',
  styleUrls: ['./full-task-list.component.scss']
})
export class FullTaskListComponent implements OnInit {
  public taskList: DataItem[] = [];
  public projectName!: string;
  public paramId!: number;

  private _transformer = (node: DataItem, level: number) => {
    return {
      expandable: !!node.subItems && node.subItems.length > 0,
      name: node.name,
      level: level
    };
  }

  public treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  public treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.subItems || []
  );

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public taskService: TaskServiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getEpicTaskList();
  }

  public getTaskStatus(taskType: TaskType): string {
    switch (taskType) {
      case TaskType.Epic: return 'Epic';
      case TaskType.Features: return 'Features';
      case TaskType.Userstory: return 'User Story';
      case TaskType.Task: return 'Task';
      case TaskType.Bug: return 'Bug';
      default: return 'Epic';
    }
  }

  public getEpicTaskList(): void {
    this.taskService.getEpics().subscribe({
      next: (data) => {
        console.log(data);
        const dataItems: DataItem[] = data.data;
        console.log("DataItems", dataItems);
        this.dataSource.data = dataItems; 
        console.log("TaskList", dataItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public openAddTaskDialog(): void{
    const taskDialog: projectDialogData ={projectName: this.projectName, projectId: this.paramId }
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '1000px',
      height: '600px',
      disableClose: false,

    }); 
    dialogRef.componentInstance.projectDialog = taskDialog
    dialogRef.afterClosed().subscribe({
      next: (data)=>{
        console.log("Task added successfully");
        // this.taskList = data;
        console.log(data)
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  getCreatedAt(node: DataItem): string {
    return node.createdOn ? new Date(node.createdOn).toLocaleDateString() : 'N/A';
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
