import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Service/project.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectByIdResponse, EmployeeForProjects, Tasks, projectData, SprintData2 } from '../../../Models/Project.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../../SharedModule/shared/Services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from '../../../../../TaskModule/task/Components/task/task.component';
import { DialogService, Employee, projectDialogData } from '../../../../../EmployeModule/employee/Models/Employee.model';
import { DialogRef } from '@angular/cdk/dialog';
import { EmployeListComponent } from '../../../../../EmployeModule/employee/Components/employe-list/employe-list.component';
import { Data, PaginatedEpicTask, Task, TaskReviewData } from '../../../../../TaskModule/task/Models/task.model';
import { TaskServiceService } from '../../../../../TaskModule/task/Services/task-service.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.scss'
})
export class ViewProjectComponent implements OnInit {
  public paramId!: number;
  public isEdit!: boolean;
  public ProjectData1!: FormGroup;
  public progressSpinner!: boolean;
  public projectName!: string;
  public taskArray: Data[]=[];
  public DialogDataFlag!: boolean;
  public taskList: Tasks[] | null=[];
  public projectId!: number;
  public reviewContent!: string;
  public openReviewBox: boolean = false;
  public taskReviewList: TaskReviewData[]=[];
  public taskArrayLength!: number;
  public sprintList: SprintData2[]=[];
  public addedMembersList: EmployeeForProjects[]=[];
  public EpicTaskData: PaginatedEpicTask = {
    pageIndex: 1,
    pagedItemsCount: 10,
    orderKey: '',
    sortedOrder: 2,
    search: '',
    filters: null
  };
  public ProjectData ={
    name: '',
    description: '',
    members: [] as EmployeeForProjects[]|null,
    createdBy: 1,
    updatedBy: null as string|null, 
    createdOn: '',
    updatedOn: null as string | null ,
    tasks: [] as Tasks[]|null,
    totalTask: null as number|null,
    pendingTask: null as number|null,
    status: 0
  }

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute, private toaster: ToastService,
    public dialog: MatDialog, private taskService: TaskServiceService,
  ) {
    console.log("Param id", this.paramId);
    console.log(this.taskArrayLength);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if(this.paramId){
        this.isEdit = true;
        this.getDetailsOfProject();
        // this.getSprintListOfProject(this.paramId)
        // this.ProjectReviewList();
      }
    });
  }

  public getDetailsOfProject(): void{
    this.progressSpinner = true;
       this.projectService.getProjectById(this.paramId).subscribe({
        next: (data: ProjectByIdResponse) => {
          console.log(data);
          this.progressSpinner = false;
          const Data = data.data
          
          this.ProjectData.name = Data.name,
          this.ProjectData.description = Data.description,
          this.ProjectData.members = Data.members,
          this.ProjectData.createdBy = Data.createdBy,
          this.ProjectData.createdOn = Data.createdOn,
          this.ProjectData.tasks = Data.tasks
          this.projectName = Data.name;
          this.addedMembersList = Data.members;
          this.ProjectData.totalTask = Data.totalTask;
          this.ProjectData.pendingTask = Data.pendingTask;
          this.taskList = Data.tasks;
          this.projectId = this.paramId;
          console.log(Data.tasks);
        },
        error: (err) => {
          this.progressSpinner = false;
          console.error('Error fetching project details', err);
          // this.toaster.showWarning("Error fetching project details");
        }
       })
  }

  public openAddTaskDialog(): void{
    const taskDialog: projectDialogData ={projectName: this.projectName, projectId: this.paramId }
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '1000px',
      height: '600px',
      disableClose: false,

    }); 
    dialogRef.componentInstance.data = taskDialog
    dialogRef.afterClosed().subscribe({
      next: (data)=>{
        // this.getTaskEpicList();
        this.toaster.showSuccess("Task added successfully");
        console.log("Task added successfully");
        this.openReviewBox = !this.openReviewBox;
        // this.taskUpdateService.reloadTaskList == true;
        // this.taskList = data;
        console.log(data)
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  public removeMember(id: number, name: string): void {
    console.log(id);
    console.log(this.ProjectData.members);
    if (this.ProjectData.members && Array.isArray(this.ProjectData.members)) {
      const index = this.ProjectData.members.findIndex(member =>
        member.employeeId === id && member.employeeName === name
      );
      if (index !== -1) {
        this.ProjectData.members.splice(index, 1);
        this.addedMembersList = [...this.ProjectData.members];
        // this.projectService.updateProjectById(this.ProjectData, id)
      }
    }
  }

  public openEmployeeDialog(): void{
    this.DialogDataFlag = true;
    const dialogData: DialogService = { isActive: this.DialogDataFlag };
    const dialogRef = this.dialog.open(EmployeListComponent, {
      height: '1000px',
      width: '1200px',
      disableClose: true,
    });
    dialogRef.componentInstance.data = dialogData; 
    dialogRef.afterClosed().subscribe({
      next: (data: EmployeeForProjects[])=>{
        console.log(data);
        if(data === null){
          this.toaster.showInfo("Members required in Project");
          // redirect('')
        }
        else{
          this.addedMembersList = [...(this.ProjectData.members || []), ...data];
          console.log(this.addedMembersList)
        console.log(data);
        }
      },
      error: (err)=>{
        console.log(err);
      }
    })
  } 

  public ProjectReviewList(): void{
    this.taskService.getTaskReviewList(this.projectId).subscribe({
      next: (data)=>{
        console.log(data);
        const Data = data.data;
        this.taskReviewList = Data;
      },
      error: (err)=>{
        console.log(err);
        this.toaster.showInfo(err);
      }
    })
  }

  // public getTaskEpicList(): void {
  //   this.taskService.paginatedTaskList(this.EpicTaskData, this.projectId).subscribe({
  //     next: (data) => {
  //       this.taskArray = data.data.data;
  //       console.log("Task list reloaded", this.taskArray);
  //     },
  //     error: (err) => {
  //       console.error("Error fetching task list", err);
  //     }
  //   });
  // }
  

  public addReview(){
    console.log("add");
    this.openReviewBox =! this.openReviewBox;
  }

  public handleTaskLength(length: number){
    this.taskArrayLength = length;
    console.log('Length of taskArray:', length);
  }

  // public getSprintListOfProject(id: number): void{
  //    this.projectService.getSprintListsByProject(id).subscribe({
  //     next: (data)=>{
  //       console.log(data);
  //       const Data = data.data;
  //       this.sprintList = Data;
  //     },
  //     error: (err)=>{
  //       console.log(err);
  //       this.toaster.showInfo("Erorr occured while fetching the details of sprint list");
  //     }
  //    })
  // }

}
