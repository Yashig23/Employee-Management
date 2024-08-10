import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeServiceService } from '../../../../EmployeModule/employee/Service/employe-service.service';
import { DialogService, Employee, EmployeeResponse } from '../../../../EmployeModule/employee/Models/Employee.model';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { EmployeeComponent } from '../../../../EmployeModule/employee/Components/employee/employee/employee.component';
import { EmployeListComponent } from '../../../../EmployeModule/employee/Components/employe-list/employe-list.component';
import { DialogData } from '../../../../SharedModule/shared/Model/delete.model';
import { EmployeeForProjects } from '../../Models/Project.model';
import { redirect } from 'react-router-dom';

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

export class AddProjectComponent implements OnInit {


  constructor(private dialog: MatDialog, private projectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute, private employeService: EmployeServiceService,
    private toaster: ToastService
  ) { }
  // public departmentName!: string;
  // public requesting = true;
  public paramId!: number;
  public ProjectForm!: FormGroup;
  public name = new FormControl('', [Validators.required]);
  public requesting!: boolean;
  public employeeList: Employee[] = [];
  public DialogDataFlag!: boolean;
  public addedMembersList: string[]=[];
  public progressSpinner!: boolean;

  ngOnInit(): void {
    this.ProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      members: new FormControl([])
    });
    this.getEmployeeData();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
    });
  }

  public getEmployeeData(): void {
    this.progressSpinner = true;
    this.employeService.getEmployeeList().subscribe({
      next: (response: EmployeeResponse) => {
        this.progressSpinner = false;
        this.employeeList = response.data;
        console.log(this.employeeList);
        console.log(response);
      },
      error: (err: string) => {
        this.progressSpinner = false;
        console.log('Error occurred', err);
      }
    });
  }

  public submit(): void {
    if (this.ProjectForm.valid) {
      console.log("Submitted");
      const formData = this.ProjectForm.value;
      console.log(formData);
      const body = {
        // id: this.employeeForm.value.id,
        name: this.ProjectForm.value.name,
        description: this.ProjectForm.value.description,
        status: this.ProjectForm.value.role,
        members: this.ProjectForm.value.members
      };
      if (body) {
        this.requesting = true;
        this.projectService.AddProject(body).subscribe({
          next: (response) => {
            console.log(response);
            this.toaster.showSuccess("Submitted successfully");
            // this.dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
            this.toaster.showWarning("Error occured while submitting");
          }
        })
      }
    }
  }

  public addMembers(): void {
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
        if(data === null){
          this.toaster.showInfo("Members required in Project");
          redirect('')
        }
        else{
        const memberIds = data.map(employee => ({ employeeId: employee.employeeId}));
        // const formattedMembers = data.map(employee => ({ employeeId: employee.employeeId }));
        this.addedMembersList = data.map(employee => employee.employeeName);

        this.ProjectForm.controls['members'].setValue(memberIds);
        console.log(data);
        }
      },
      error: (err)=>{
        this.toaster.showWarning("Error occured while getting members list")
        console.log(err);
      }
    })
  }
}

