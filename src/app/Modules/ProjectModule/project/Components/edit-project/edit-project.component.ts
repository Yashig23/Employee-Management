import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../Service/project.service';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { EmployeeForProjects } from '../../Models/Project.model';
import { EmployeListComponent } from '../../../../EmployeModule/employee/Components/employe-list/employe-list.component';
import { DialogService } from '../../../../EmployeModule/employee/Models/Employee.model';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent implements OnInit{
  public ProjectForm!: FormGroup;
  public paramId!: number;
  public isEdit!: boolean;
  public progressSpinner!: boolean;
  public DialogDataFlag!: boolean;
  public addedMembersList: EmployeeForProjects[]=[];
  // public add

  constructor(public activatedRoute: ActivatedRoute, public projectService: ProjectService, public toaster: ToastService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.ProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      members: new FormControl([]),
      tasks: new FormControl([])
    });
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.paramId = Number(paramMap.get('id'));
      if (this.paramId) {
        this.isEdit = true;
        this.getProjectDataById();
      }
    });
  }

  public getProjectDataById(): void{
    this.progressSpinner = true;
   this.projectService.getProjectById(this.paramId).subscribe({
    next: (data)=>{
      this.progressSpinner = false;
      console.log(data)
      const Data = data.data;
      this.ProjectForm.patchValue(Data);
      console.log("Members Dtaa", this.ProjectForm.controls['members']);
    },
    error: (err)=>{
      this.progressSpinner = false;
      console.log(err);
      this.toaster.showInfo("Error occured while fetching project details");
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
    }
  }
  
  

  // public addMembers(): void {
  //   this.DialogDataFlag = true;
  //   const dialogData: DialogService = { isActive: this.DialogDataFlag };
  
  //   const dialogRef = this.dialog.open(EmployeListComponent, {
  //     height: '1000px',
  //     width: '1200px',
  //     disableClose: true,
  //   });
  
  //   dialogRef.componentInstance.data = dialogData; 
  //   dialogRef.afterClosed().subscribe({
  //     next: (data: EmployeeForProjects[])=>{
  //       if(data === null){
  //         this.toaster.showInfo("Members required in Project");
  //         // redirect('')
  //       }
  //       else{
  //       const memberIds = data.map(employee => ({ employeeId: employee.employeeId}));
  //       // const formattedMembers = data.map(employee => ({ employeeId: employee.employeeId }));
  //       this.addedMembersList = data.map(employee => employee.employeeName);

  //       this.ProjectForm.controls['members'].setValue(memberIds);
  //       console.log(data);
  //       }
  //     },
  //     error: (err)=>{
  //       this.toaster.showWarning("Error occured while getting members list")
  //       console.log(err);
  //     }
  //   })
  // }

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
      next: (data: EmployeeForProjects[] | null) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          const currentMembers = this.ProjectForm.controls['members'].value || [];
          this.ProjectForm.controls['members'].setValue([...currentMembers, ...data]);
          this.addedMembersList = [...currentMembers, ...data];
          
          console.log(this.addedMembersList);
        } else {
          this.toaster.showInfo("No members selected or data is empty");
        }
      },
      error: (err: any) => {
        console.log('Error:', err);
      }
    });
  }
  

  submit(){
    console.log("submitted");
    // console.log(this.ProjectForm.value)
    if(this.ProjectForm.valid){
    if (this.ProjectForm.value.name && this.ProjectForm.value.salary) {
      const  formValue = this.ProjectForm.value;
      console.log(formValue);
      const body = {
        name: this.ProjectForm.value.name,
        description: this.ProjectForm.value.description,
        status: this.ProjectForm.value.status,
        members: this.ProjectForm.value.members,
      };
      console.log(body);
      if(this.isEdit == true){
        this.projectService.updateProjectById(body, this.paramId).subscribe({
          next: (data)=>{
            console.log(data);
            console.log("next functin ke anadr aagya");
            // alert('Employee updated successfully');
            this.toaster.showSuccess("Task updated successfully");
            this.ProjectForm.reset();
          },
          error: (err)=>{
            console.log(err);
            this.toaster.showWarning("Error while updating the Task");
            // window.alert('Error while updating the employee');
          }
        })
      }
  }
}
  }

}
