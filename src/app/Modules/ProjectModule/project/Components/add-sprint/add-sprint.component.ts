import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrl: './add-sprint.component.scss'
})
export class AddSprintComponent implements OnInit {
  public projectData!: {projectId: number};
  public AddSprintForm!: FormGroup;
  public data!: {'sprintId': number};
  constructor(private projectService: ProjectService, private toaster: ToastService, private dialog: MatDialogRef<AddSprintComponent>){}

  ngOnInit(): void {
    console.log(this.projectData);
    this.AddSprintForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      projectId: new FormControl(this.projectData.projectId)
    })
    if(this.data?.sprintId != null && 0){
      this.getSprintIdDetails();
      console.log(this.data);
    }
  }

  public submit(): void{
    if(this.AddSprintForm.valid){
      const formValue = this.AddSprintForm.value;
      const currentTime = new Date().toISOString().split('T')[1];
      const startDate = new Date(formValue.startDate).toISOString().split('T')[0] + 'T' + currentTime; 
    const endDate = new Date(formValue.endDate).toISOString().split('T')[0] + 'T' + currentTime;
    const sprintData = {
      name: formValue.name,
      startDate: startDate,
      endDate: endDate,
      projectId: formValue.projectId
    };
     console.log(this.AddSprintForm.value);
    this.projectService.addSprint(sprintData).subscribe({
      next: (data)=>{
        console.log(data);
        this.dialog.close();
      },
      error: (err)=>{
        console.log(err);
        this.toaster.showWarning("Error occured while adding sprint");
      }
    })
    }
  }

  getSprintIdDetails(): void{
    this.projectService.getSprintById(this.data.sprintId).subscribe({
      next: (data)=>{
        console.log(data);
        const Data = data.data;
        this.AddSprintForm.patchValue(Data);
      },
      error: (err)=>{
        console.log("Invalid Id of sprint", err);
      }
    })
  }

}
