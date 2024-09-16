import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { ProjectDetails, projectDialogData, ProjectListOfEmployee1 } from '../../Models/Employee.model';
import { MatDialog } from '@angular/material/dialog';
import { TasksListComponent } from '../../../../TaskModule/task/Components/tasks-list/tasks-list.component';
import { projectData } from '../../../../ProjectModule/project/Models/Project.model';
import { BaseService } from '../../../../SharedModule/shared/SharedClass/BaseComponentClass';
import { TaskComponent } from '../../../../TaskModule/task/Components/task/task.component';

@Component({
  selector: 'app-employee-project',
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.scss'
})
export class EmployeeProjectComponent extends BaseService implements OnInit {
  @Input() projectId!: number;
  public paramId!: number;
  public isEdit!: boolean;
  public projectName!: string;
  public projectList: ProjectDetails[]=[];
  public progressSpinner!: boolean;
  public assignedTo!: number;

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private projectService: ProjectService, private employeeService: EmployeServiceService
    ,public router: Router, public dialog: MatDialog,
  ){
    super();
    // console.log("Employee Project");
  }

  ngOnInit(): void {
  this.activatedRoute.paramMap.pipe(this.takeUntilDestroy()).subscribe(paramMap => {
    // console.log(paramMap);
    this.paramId = Number(paramMap.get('id'));
    if(this.paramId){
      // console.log(this.paramId);
      this.isEdit = true;
      this.getProjectsListOfEmployee(this.projectId);
      this.assignedTo = Number(localStorage.getItem('userId'));
      // this.getEditData();
    }
  });   
  }

  public getProjectsListOfEmployee(id: number){
    this.progressSpinner = true;
    this.employeeService.getProjectsOfEmployeeById(id).pipe(this.takeUntilDestroy()).subscribe({
      next: (data:  ProjectListOfEmployee1)=>{
        this.progressSpinner = false;
        // console.log(data.data);
        const Data = data.data;
        // this.projectName = data.
        this.projectList = Data;
        // console.log("projectList", this.projectList);
      },
      error: (err)=>{
        this.progressSpinner = false;
      // console.log(err);
      }
    })
  }

  public openAddTaskDialog(id: number, name: string): void{
    const taskDialog: projectDialogData ={projectName: name, projectId: id }
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '1000px',
      height: '700px',
      disableClose: false,

    }); 
    dialogRef.componentInstance.data = taskDialog
    dialogRef.afterClosed().subscribe({
      next: (data)=>{
        // this.getTaskEpicList();
        // this.toaster.showSuccess("Task added successfully");
        // console.log("Task added successfully");
        // this.openReviewBox = !this.openReviewBox;
        // this.taskUpdateService.reloadTaskList == true;
        // this.taskList = data;
        // console.log(data)
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  public openTaskListDialog(id: number):void{
    // console.log(id);
    const TaskData = {projectId: id, assignedTo: [this.assignedTo]}
    const Dialog = this.dialog.open(TasksListComponent);
    Dialog.componentInstance.EmployeeProjectData = TaskData;
  } 
}
