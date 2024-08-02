import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeServiceService } from '../../../../EmployeModule/employee/Service/employe-service.service';
import { Employee, EmployeeResponse } from '../../../../EmployeModule/employee/Models/Employee.model';

export enum ProjectStatus {
  Pending = 1,
  Running = 2,
  Completed = 3
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})

export class AddProjectComponent implements OnInit{


  constructor(private projectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute,private employeService: EmployeServiceService){}
  // public departmentName!: string;
  // public requesting = true;
  public paramId!: number;
  public ProjectForm! : FormGroup;
  public name = new FormControl('', [Validators.required]);
  public requesting!: boolean;
  public employeeList: Employee[]=[];

  ngOnInit(): void {
    this.ProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      createdBy: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      members: new FormArray([])
    });
    this.getEmployeeData();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
    });
  }

  public getEmployeeData(): void {
    this.employeService.getEmployeeList().subscribe({
      next: (response: EmployeeResponse) => {
        this.employeeList = response.data;
        console.log(this.employeeList);
        console.log(response);
      },
      error: (err: string) => {
        // window.alert('Error occurred while displaying the department list');
        console.log('Error occurred', err);
      }
    });
  }

  public submit(): void{
    console.log("submitted");
    if(this.ProjectForm.valid){
      const formData = this.ProjectForm.value;
      console.log(formData);
      const body = {
        // id: this.employeeForm.value.id,
        name: this.ProjectForm.value.name,
        description: this.ProjectForm.value.description,
        createdBy: Number(this.ProjectForm.value.createdBy),
        status: Number(this.ProjectForm.value.status),
        members: this.ProjectForm.value.members
      };
      if(body){
        this.requesting = true;
        this.projectService.AddProject(body).subscribe({
          next: (response)=>{
            console.log(response);
            window.alert("Submitted successfully");
            // this.dialogRef.close(true);
          },
          error: (err)=>{
            console.log(err);
            window.alert("Error occured while submitting");
          }
        })
      }
    }
  }
}
