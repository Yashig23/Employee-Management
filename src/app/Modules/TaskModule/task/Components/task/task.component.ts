import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeResponse, GetEmployeeResponseById, projectDialogData } from '../../../../EmployeModule/employee/Models/Employee.model';
import { TaskServiceService } from '../../Services/task-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { EmployeeForProjects, Project, ProjectResponse, SprintData2 } from '../../../../ProjectModule/project/Models/Project.model';
import { EmployeServiceService } from '../../../../EmployeModule/employee/Service/employe-service.service';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { TaskType, TaskTypeDialogData } from '../../Models/task.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  public paramId!: number;
  public isEdit!: boolean;
  public taskForm!: FormGroup;
  public progressSpinner!: boolean;
  public projectList: Project[]=[];
  public employeeList: EmployeeForProjects[]=[];
  public data!: projectDialogData;
  public projectId!: number;
  public typeName!: string;
  public sprintList: SprintData2[]=[];
  public taskTypeDialog!: TaskTypeDialogData;
  public disableSubmitBtn!: boolean;
    
  constructor(public activatedRoute: ActivatedRoute, public taskService: TaskServiceService, private toaster: ToastService, public router: Router, 
    private projectService: ProjectService, public employeeService: EmployeServiceService, public dialogRef: MatDialogRef<TaskComponent>,
  ){}

  ngOnInit(): void {
    if(this.data?.projectId){
      this.projectId = this.data.projectId
       this.getProjectMembersById();
       this.getSprintListOfProject(this.projectId);
    }
    else if(this.taskTypeDialog?.projectId){
      this.projectId = this.taskTypeDialog.projectId;
      this.getSprintListOfProject(this.projectId);
    }
    console.log(this.taskTypeDialog);
    this.initializeTaskForm();
    this.getProjectMembersById();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      // this.isEdit = true;
    });
  }

  public initializeTaskForm(): void {
    const taskDialogData = this.taskTypeDialog;
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(15)]),
      assignedTo: new FormControl(null),
      projectId: new FormControl(this.projectId),
      parentId: new FormControl(taskDialogData ? taskDialogData.taskId : null),
      taskType: new FormControl(taskDialogData ? taskDialogData.taskType : this.typeName),
      status: new FormControl(0),
      sprintId: new FormControl(null)
    });

  }

  public getProjectMembersById(): void{
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (data)=>{
        this.employeeList = data.data.members;
        console.log(data);
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  public submit(): void{
    this.disableSubmitBtn = true;
    console.log("submitted");
    debugger;
    console.log(this.taskForm.value)
    if(this.taskForm.valid){
    if (this.taskForm.value.name) {
      const  formValue = this.taskForm.value;
      console.log(formValue);
      const body = {
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        assignedTo: Number(this.taskForm.value.assignedTo),
        projectId: Number(this.projectId),
        parentId: Number(this.taskForm.value.parentId),
        taskType: Number(this.taskForm.value.taskType),
        status: Number(this.taskForm.value.status),
        sprintId: Number(this.taskForm.value.sprintId)
      };
      console.log(this.taskForm.value.taskType);
      if(this.isEdit == true){
        this.taskService.updatedTask(body, this.paramId).subscribe({
          next: (data)=>{
            console.log(data);
            console.log(this.taskForm.value);
            this.disableSubmitBtn = false;
            this.toaster.showSuccess("Task updated successfully");
            this.taskForm.reset();
          },
          error: (err)=>{
            console.log(err);
            this.disableSubmitBtn = false;
            this.toaster.showWarning("Error while updating the Task");
          }
        })
      }
      else{
      this.taskService.addTask(body).subscribe({
        next: (data)=>{
          console.log(data);
          this.disableSubmitBtn = false;
          this.toaster.showSuccess('Task added successfully');
           this.taskForm.reset();
           this.dialogRef.close();
        },
        error: (err)=>{
          console.log(err);
          this.disableSubmitBtn = false;
          this.toaster.showWarning('Error while adding Task')
        }
      })
    }
    }
    }
  }

  public getSprintListOfProject(id: number): void{
    this.projectService.getSprintListsByProject(id).subscribe({
     next: (data)=>{
       console.log(data);
       const Data = data.data;
       this.sprintList = Data;
       console.log(Data);
     },
     error: (err)=>{
       console.log(err);
       this.toaster.showInfo("Erorr occured while fetching the details of sprint list");
     }
    })
  }

}
