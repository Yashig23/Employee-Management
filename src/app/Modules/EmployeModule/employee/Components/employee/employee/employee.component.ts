import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentServiceService } from '../../../../../DepartmentModule/department/Service/department-service.service';
import { Department, DepartmentResponse } from '../../../../../DepartmentModule/department/Models/department.model';
import { EmployeServiceService } from '../../../Service/employe-service.service';
import { ToastService } from '../../../../../SharedModule/shared/Services/toast.service';
import { OnlyEmployeeData } from '../../../Models/Employee.model';

export enum EmployeeRole {
  Admin = 1,
  Employee = 0,
  SuperAdmin = 2
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public employeeForm!: FormGroup;
  public isEdit = false;
  public paramId!: number;
  public progressSpinner!: boolean;
  public showManagerList: boolean = false;
  public departmentName!: string | null;
  public departmentList: Department[]=[];
  public adminNameList: OnlyEmployeeData[]=[];
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private departmentService: DepartmentServiceService, private employeeService: EmployeServiceService,
    public toaster: ToastService,
  ) {}

  ngOnInit(): void {
    this.getDepartmentData();
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      salary: new FormControl(null, [Validators.required, Validators.min(1)]),
      departmentId: new FormControl(''),
      managerId: new FormControl(''),
      role: new FormControl(null)
    });

    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if(this.paramId){
        this.isEdit = true;
        this.getEmployeeNamesById(this.paramId);
        this.getEditData();
      }
    });
  }

  public onSubmit(): void {
    if(this.employeeForm.valid){
    if (this.employeeForm.value.name && this.employeeForm.value.salary) {
      const  formValue = this.employeeForm.value;
      console.log(formValue);
      const body = {
        username: this.employeeForm.value.username,
        password: this.employeeForm.value.password,
        name: this.employeeForm.value.name,
        phone: this.employeeForm.value.phone,
        email: this.employeeForm.value.email,
        address: this.employeeForm.value.address,
        salary: this.employeeForm.value.salary,
        departmentId: Number(this.employeeForm.value.departmentId),
        managerId: Number(this.employeeForm.value.managerId),
        role: Number(this.employeeForm.value.role)
      };
      console.log(body);
      if(this.isEdit == true){
        this.employeeService.updatedEmployee(body, this.paramId).subscribe({
          next: (data)=>{
            this.toaster.showSuccess("Employee updated successfully");
            this.employeeForm.reset();
          },
          error: (err)=>{
            console.log(err);
            this.toaster.showWarning("Error while updating the employee");
          }
        })
      }
      else{
      this.employeeService.addEmployee(body).subscribe({
        next: (data)=>{
          console.log(data);
          this.toaster.showSuccess('Employee added successfully');
           this.employeeForm.reset();
        },
        error: (err)=>{
          console.log(err);
          this.toaster.showWarning('Error while adding employee')
        }
      })
    }
    }
    }
  }

  public getDepartmentData(): void {
    this.departmentService.getDepartmentList().subscribe({
      next: (response: DepartmentResponse) => {
        this.departmentList = response.data || [];
      },
      error: (err: string) => {
        this.toaster.showWarning("Error occured while displaying the list");
      }
    });
  } 

  private getEditData(): void {
    this.progressSpinner = true;
    this.employeeService.getEmployeeById(this.paramId).subscribe({
      next: (response)=>{
        this.progressSpinner = false;
        const employeeDataOfId = response.data;
        console.log(employeeDataOfId);
        this.departmentName = employeeDataOfId.departmentName;
        this.getEmployeeNamesById(this.paramId);
        this.employeeForm.patchValue(employeeDataOfId)
      },
      error: (err)=>{
        this.progressSpinner = false;
        console.log("Error while showing employee details",err);
      }
    })
  }

  public onDepartmentChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    const selectedDepartmentId = target.value;
    const departmentId = Number(selectedDepartmentId);
    if (departmentId) {
      console.log(departmentId);
      this.getEmployeeNamesById(departmentId);
    } else {
      this.showManagerList = false; 
    }
  }

  public getManagerByDepartment(data: number): void{
    this.employeeService.getDepartmentDetailsByName(data).subscribe({
      next: (response)=>{
        console.log(response)
        if(this.adminNameList == null){
          this.toaster.showWarning("No Manager found");
          this.showManagerList = false;
        }
        else{
          this.showManagerList = true;
        }
      }
    })
  }

public getEmployeeNamesById(id: number): void{
  this.employeeService.getEmployeeNamesByDepartmentId(id).subscribe({
    next: (data) =>{
      this.showManagerList = true;
      const Data = data.data;
      this.adminNameList = Data;
    },
    error: (err)=>{
      console.log(err);
      this.showManagerList = false;
      this.toaster.showWarning("Error while fetching the employee Names");
    }
  })
}

}
