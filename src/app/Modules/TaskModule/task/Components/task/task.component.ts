import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeResponse, GetEmployeeResponseById, projectDialogData } from '../../../../EmployeModule/employee/Models/Employee.model';
import { TaskServiceService } from '../../Services/task-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { EmployeeForProjects, Project, ProjectResponse } from '../../../../ProjectModule/project/Models/Project.model';
import { EmployeServiceService } from '../../../../EmployeModule/employee/Service/employe-service.service';
import { HttpClient } from '@angular/common/http';

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
  public projectDialog!: projectDialogData;
  public projectId!: number;
    
  constructor(public activatedRoute: ActivatedRoute, public taskService: TaskServiceService, private toaster: ToastService, public router: Router, 
    private projectService: ProjectService, public employeeService: EmployeServiceService
  ){}

  ngOnInit(): void {
    console.log(this.projectDialog.projectId);
    console.log(this.projectDialog.projectName);
    this.projectId = this.projectDialog.projectId
    this.getProjectDataById();
    this.getProjectData();
    this.getProjectMembersById();
    this.taskForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      assignedTo: new FormControl(null),
      projectId: new FormControl(this.projectId),
      status: new FormControl(0)
    })
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if(this.paramId){
        this.isEdit = true;
        this.getTaskById();
      }
    });
  }

  public getProjectDataById(): void{
    console.log("get")
    this.projectService.getProjectById(this.projectDialog.projectId).subscribe({
      next: (data)=>{
        const Data = data.data.name;
        console.log(Data);
        console.log(data);
        this.taskForm.controls['projectId'].setValue(Data);
      },
      error: (err)=>{
        console.log(err);
        this.toaster.showWarning("Error occured");
      }
    })
  }

  public getTaskById(): void{
    this.taskService.getTaskById(this.paramId).subscribe({
      next: (data)=>{
        console.log(data);
        const Data = data.data;
        this.taskForm.patchValue(Data);
      },
      error: (err)=>{
        console.log(err);
        this.toaster.showWarning("Error while fetching the details of user");
      }
    })
  }

  public getProjectData(): void{
    this.progressSpinner = true;
    this.projectService.getProject().subscribe({
      next: (data: ProjectResponse)=>{
          console.log(data.data);
          this.progressSpinner = false;
          if(data.data == null || data.data == undefined){
            this.toaster.showInfo("No projects found")
            this.projectList = [];
          }
          else{
          this.progressSpinner = false;
          this.projectList = data.data;
          // this.FilterChange();
          }
      }
    })
  }

  public getProjectMembersById(): void{
    this.projectService.getProjectById(this.projectDialog.projectId).subscribe({
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
        projectId: Number(this.taskForm.value.projectId),
        status: Number(this.taskForm.value.status)
      };
      console.log(body);
      if(this.isEdit == true){
        this.taskService.updatedTask(body, this.paramId).subscribe({
          next: (data)=>{
            console.log(data);
            console.log(this.taskForm.value);
            this.toaster.showSuccess("Task updated successfully");
            this.taskForm.reset();
          },
          error: (err)=>{
            console.log(err);
            this.toaster.showWarning("Error while updating the Task");
          }
        })
      }
      else{
      this.taskService.addTask(body).subscribe({
        next: (data)=>{
          console.log("New Datat Dataa")
          console.log(data);
          this.toaster.showSuccess('Task added successfully');
           this.taskForm.reset();
        },
        error: (err)=>{
          console.log(err);
          this.toaster.showWarning('Error while adding Task')
        }
      })
    }
    }
    }
  }


}
