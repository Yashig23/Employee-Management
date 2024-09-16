import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../Service/department-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { BaseService } from '../../../../SharedModule/shared/SharedClass/BaseComponentClass';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent extends BaseService implements OnInit{

  constructor(private departmentService: DepartmentServiceService, private router: Router, private toaster: ToastService){
    super();
  }
  // public departmentName!: string;
  // public requesting = true;
  public departmentForm! : FormGroup;
  public name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public requesting!: boolean;
  public progressSpinner!: boolean;
  public disableSubmitBtn!: boolean;


  ngOnInit(): void {
    this.departmentForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  public submit(): void{
    this.disableSubmitBtn = true;
    // this.progressSpinner = true;
    if(this.departmentForm.valid){
      const formData = this.departmentForm.value;
      if(formData){
        this.requesting = true;
        this.departmentService.AddDepartment(formData).pipe(this.takeUntilDestroy()).subscribe({
          next: (response)=>{
            // console.log(response);
            // this.progressSpinner = false;
            this.toaster.showSuccess("Submitted successfully");
            this.disableSubmitBtn = false;
          },
          error: (err)=>{
            // console.log(err);
            // this.progressSpinner = false;
            this.disableSubmitBtn = false;
            this.toaster.showWarning("Error occured while submitting");
          }
        })
      }
    }
  }
  
  
  
  

}
