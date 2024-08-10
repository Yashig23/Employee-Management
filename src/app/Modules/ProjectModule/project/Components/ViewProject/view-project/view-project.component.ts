import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Service/project.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectByIdResponse } from '../../../Models/Project.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../../SharedModule/shared/Services/toast.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.scss'
})
export class ViewProjectComponent implements OnInit {
  public paramId!: number;
  public isEdit!: boolean;
  public ProjectData!: FormGroup;
  public progressSpinner!: boolean;

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute, private toaster: ToastService) {
    this.ProjectData = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      members: new FormControl([]),
      createdOn: new FormControl(''),
      createdBy: new FormControl(''),
      updatedOn: new FormControl(''),
      updatedBy: new FormControl(''),
      tasks: new FormControl([])
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if(this.paramId){
        this.isEdit = true;
        this.getDetailsOfProject();
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
          
          // Assuming 'data' contains the project details in the expected format
          this.ProjectData.patchValue({
            name: Data.name,
            description: Data.description,
            members: Data.members,
            createdOn: Data.createdOn,
            createdBy: Data.createdBy,
            updatedOn: Data.updatedOn,
            updatedBy: Data.updatedBy,
            tasks: Data.tasks
          });
        },
        error: (err) => {
          this.progressSpinner = false;
          console.error('Error fetching project details', err);
          this.toaster.showWarning("Error fetching project details");
        }
       })
  }
}
