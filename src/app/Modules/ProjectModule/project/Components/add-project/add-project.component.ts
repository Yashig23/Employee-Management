import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeServiceService } from '../../../../EmployeModule/employee/Service/employe-service.service';
import { DialogService, Employee, EmployeeAddedList, EmployeeResponse } from '../../../../EmployeModule/employee/Models/Employee.model';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { EmployeListComponent } from '../../../../EmployeModule/employee/Components/employe-list/employe-list.component';
import { DialogData } from '../../../../SharedModule/shared/Model/delete.model';
import { EmployeeForProjects, ProjectByIdResponse, projectData } from '../../Models/Project.model';
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
        this.getProjectDataById();
      }
    });
  }

  public getProjectDataById(): void {
    this.progressSpinner = true;
    this.projectService.getProjectById(this.paramId).subscribe({
      next: (data) => {
        this.progressSpinner = false;
        // console.log(data)
        const Data = data.data;
        this.ProjectForm.patchValue(Data);
      },
      error: (err) => {
        this.progressSpinner = false;
        // console.log(err);
        this.toaster.showInfo("Error occured while fetching project details");
      }
    })
  }

  public submit(): void {
    // console.log("Submitted");
    this.disableSubmitBtn = true;
    const formValue = this.ProjectForm.value;
    const members1 = formValue.members;
    const employeeId = members1.map((item: EmployeeAddedList) => ({ employeeId: item.employeeId }));
    if (this.ProjectForm.valid) {
      const body = {
        name: this.ProjectForm.value.name,
        description: this.ProjectForm.value.description,
        status: this.ProjectForm.value.role,
        members: employeeId,
      };
      if (this.isEdit == true) {
        // console.log(body);
        this.projectService.updateProjectById(body, this.paramId).subscribe({
          next: (data) => {
            // console.log("updated successfully");
            this.toaster.showSuccess("Project updated successfully");
            this.ProjectForm.reset();
            this.router.navigateByUrl(`/projects/view/${this.paramId}`);
          },
          error: (err) => {
            // console.log(err);
            this.toaster.showWarning("Error while updating the Project");
          }
        })
      }
      else {
        this.requesting = true;
        this.projectService.AddProject(body).subscribe({
          next: (response) => {
            // console.log(response);
            this.disableSubmitBtn = false;
            this.ProjectForm.reset();
            this.toaster.showSuccess("Submitted successfully");
            this.addedMembersList = [];
            this.router.navigateByUrl(`/projects`);
          },
          error: (err) => {
            // console.log(err);
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
    const currentMembers = this.ProjectForm.controls['members'].value || [];
    const dialogData: DialogService = { isActive: this.DialogDataFlag };
  
    const dialogRef = this.dialog.open(EmployeListComponent, {
      height: '1000px',
      width: '1200px',
      disableClose: true,
    });
  
    dialogRef.componentInstance.data = dialogData; 
    dialogRef.componentInstance.currentMembersInProject = currentMembers;
    dialogRef.afterClosed().subscribe({
      next: (data: EmployeeForProjects[])=>{
        if (Array.isArray(data) && data.length > 0) {
          const currentMembers = this.ProjectForm.controls['members'].value || [];

          const newMembers = data.filter(newMember => 
            !currentMembers.some((member: { employeeId: number; employeeName: string}) => member.employeeId === newMember.employeeId)
          );

          if(newMembers.length>0){
               this.ProjectForm.controls['members'].setValue([...currentMembers, ...data]);
          this.addedMembersList = [...currentMembers, ...data];
          }
        }
      },
      error: (err)=>{
        this.toaster.showWarning("Error occured while getting members list")
        // console.log(err);
      }
    })
  }

  public removeMember(employeeId: number, employeeName: string): void {
    const currentMembers = this.ProjectForm.controls['members'].value || [];
    const indexToRemove = currentMembers.findIndex(
      (member: EmployeeForProjects) =>
        member.employeeId === employeeId && member.employeeName === employeeName
    );
    if (indexToRemove !== -1) {
      currentMembers.splice(indexToRemove, 1);
      this.ProjectForm.controls['members'].setValue([...currentMembers]);
      this.ProjectForm.controls['members']!.markAsDirty();
    }
  }
}

