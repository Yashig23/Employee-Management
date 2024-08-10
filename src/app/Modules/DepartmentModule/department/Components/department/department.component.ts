import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../Service/department-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent implements OnInit{

  constructor(private departmentService: DepartmentServiceService, private router: Router, private toaster: ToastService){}
  // public departmentName!: string;
  // public requesting = true;
  public departmentForm! : FormGroup;
  public name = new FormControl('', [Validators.required]);
  public requesting!: boolean;
  public progressSpinner!: boolean;


  ngOnInit(): void {
    this.departmentForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  public submit(): void{
    this.progressSpinner = true;
    console.log("submitted");
    if(this.departmentForm.valid){
      const formData = this.departmentForm.value;
      if(formData){
        this.requesting = true;
        this.departmentService.AddDepartment(formData).subscribe({
          next: (response)=>{
            console.log(response);
            this.progressSpinner = false;
            this.toaster.showSuccess("Submitted successfully");
            // window.alert("Submitted successfully");
            // this.dialogRef.close(true);
          },
          error: (err)=>{
            console.log(err);
            this.progressSpinner = false;
            this.toaster.showWarning("Error occured while submitting");
            // window.alert("Error occured while submitting");
          }
        })
      }
    }
  }
  
  
  
  

}
