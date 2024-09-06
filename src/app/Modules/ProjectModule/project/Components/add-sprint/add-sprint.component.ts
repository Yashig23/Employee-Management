import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrl: './add-sprint.component.scss'
})
export class AddSprintComponent implements OnInit {
  public projectData!: {projectId: number};
  public AddSprintForm!: FormGroup;
  public data!: {'sprintId': number};
  public paramId!: number;
  public isEdit!: boolean;
  public projectIdByTask!: {'projectId': number};
  constructor(private projectService: ProjectService, private toaster: ToastService, private dialog: MatDialogRef<AddSprintComponent>,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    console.log(this.projectIdByTask);
    this.AddSprintForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      projectId: new FormControl(this.projectIdByTask ?this.projectIdByTask.projectId: this.projectData.projectId)
    })

    if(this.projectIdByTask.projectId != null && this.data.sprintId !=null){
      console.log("Project Id", this.projectIdByTask.projectId)
      console.log("sprint Id", this.data.sprintId);
      this.isEdit = true;
      this.getSprintIdDetails();
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
     if(this.isEdit == true){
      this.projectService.updateSprint(sprintData, this.data.sprintId).subscribe({
        next: (data)=>{
          console.log(data);
          this.toaster.showSuccess("Sprint updated successfully");
          console.log("Sprint updated successfully");
          this.dialog.close();
        },
        error: (err)=>{
          console.log(err);
          this.toaster.showWarning("Error occured while adding sprint");
        }
      })
     }
     else{
    this.projectService.addSprint(sprintData).subscribe({
      next: (data)=>{
        console.log(data);
        this.toaster.showSuccess("Sprint added successfully");
        this.dialog.close();
      },
      error: (err)=>{
        console.log(err);
        this.toaster.showWarning("Error occured while adding sprint");
      }
    })
  }
    }
  }

  getSprintIdDetails(): void{
    this.projectService.getSprintById(this.data.sprintId).subscribe({
      next: (data)=>{
        console.log(data);
        const Data = data.data;
        if (Data.startDate) {
          Data.startDate = this.formatDate(new Date(Data.startDate));
        }
        if (Data.endDate) {
          Data.endDate = this.formatDate(new Date(Data.endDate));
        }
        this.AddSprintForm.patchValue(Data);
        console.log(Data);
      },
      error: (err)=>{
        console.log("Invalid Id of sprint", err);
      }
    })
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
