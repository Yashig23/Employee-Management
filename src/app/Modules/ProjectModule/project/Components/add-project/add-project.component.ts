import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeServiceService } from '../../../../EmployeModule/employee/Service/employe-service.service';
import { DialogService, Employee, EmployeeResponse } from '../../../../EmployeModule/employee/Models/Employee.model';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { EmployeListComponent } from '../../../../EmployeModule/employee/Components/employe-list/employe-list.component';
import { DialogData } from '../../../../SharedModule/shared/Model/delete.model';
import { EmployeeForProject, EmployeeForProjects, ProjectByIdResponse, projectData } from '../../Models/Project.model';
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
  public projectDataById: projectData[]=[];
  public isEdit!: boolean;
  public disableSubmitBtn!: boolean;

  ngOnInit(): void {
    this.ProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(15)]),
      status: new FormControl(0),
      members: new FormControl([])
    });
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.paramId = Number(paramMap.get('id'));
      if (this.paramId) {
        this.isEdit = true;
      }
    });
  }

  public submit(): void {
    this.disableSubmitBtn = true;
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
            this.disableSubmitBtn = false;
            this.ProjectForm.reset();
            this.toaster.showSuccess("Submitted successfully");
            this.addedMembersList = [];
            // this.dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
            this.disableSubmitBtn = false;
            this.ProjectForm.reset();
            this.addedMembersList = [];
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
  public removeMember(index: number): void {
    this.addedMembersList.splice(index, 1);
  }
}

