import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentServiceService } from '../../../../../DepartmentModule/department/Service/department-service.service';
import { Department, DepartmentResponse } from '../../../../../DepartmentModule/department/Models/department.model';
import { EmployeServiceService } from '../../../Service/employe-service.service';
import { ToastService } from '../../../../../SharedModule/shared/Services/toast.service';

// export enum EmployeeRole {
//   Admin = 1,
//   Employee = 2,
//   SuperAdmin = 3
// }

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
  public departmentList: Department[]=[];
  public adminNameList: Department[]=[];
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private departmentService: DepartmentServiceService, private employeeService: EmployeServiceService,
    public toaster: ToastService,
  ) {}

  ngOnInit(): void {
    this.getDepartmentData();
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      // lastname: new FormControl('', [Validators.required]),
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
        this.getAdminById(this.paramId);
        this.getEditData();
      }
    });
  }

  public onSubmit(): void {
    console.log("submitted");
    console.log(this.employeeForm.value)
    if(this.employeeForm.valid){
    if (this.employeeForm.value.name && this.employeeForm.value.salary) {
      const  formValue = this.employeeForm.value;
      console.log(formValue);
      // const username1 = localStorage.getItem('username');
      // const password1 = localStorage.getItem('password');
      const body = {
        // id: this.employeeForm.value.id,
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
            console.log(data);
            // alert('Employee updated successfully');
            this.toaster.showSuccess("Employee updated successfully");
            this.employeeForm.reset();
          },
          error: (err)=>{
            console.log(err);
            this.toaster.showWarning("Error while updating the employee");
            // window.alert('Error while updating the employee');
          }
        })
      }
      else{
      this.employeeService.addEmployee(body).subscribe({
        next: (data)=>{
          console.log(data);
          this.toaster.showSuccess('Employee added successfully');
          //  alert('Employee added successfully');
           this.employeeForm.reset();
        },
        error: (err)=>{
          console.log(err);
          this.toaster.showWarning('Error while adding employee')
          // window.alert('Error while adding the employee');
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
        console.log(this.departmentList);
        console.log(response);
      },
      error: (err: string) => {
        this.toaster.showWarning("Error occured while displaying the list");
        // window.alert('Error occurred while displaying the department list');
        console.log('Error occurred', err);
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
        this.getAdminById(this.paramId);
        this.employeeForm.patchValue(employeeDataOfId)
      },
      error: (err)=>{
        this.progressSpinner = false;
        // window.alert("Error while getting employee details");
        console.log("Error while showing employee details",err);
      }
    })
  }

  public onDepartmentChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    const selectedDepartmentId = target.value;
    const departmentId = Number(selectedDepartmentId);
    // const departmentId = event.target.value;
    if (departmentId) {
      console.log(departmentId);
      debugger;
      console.log("Loaded....")
      // this.showManagerList = true; 
      // this.getManagerByDepartment(departmentId);
      this.getAdminById(departmentId);
    } else {
      this.showManagerList = false; 
    }
  }

  public getManagerByDepartment(data: number): void{
    this.employeeService.getDepartmentDetailsByName(data).subscribe({
      next: (response)=>{
        console.log(response)
        if(this.adminNameList == null){
          console.log("null admin list");
          // alert("No manager found");
          this.toaster.showWarning("No Manager found");
          this.showManagerList = false;
        }
        else{
          console.log('Managers found');
          // this.adminNameList = response.data;
          this.showManagerList = true;
          console.log(this.adminNameList);
        }
      }
    })
  }

// TODO Check this function
public getAdminById(id: number): void {
  console.log("get admin data");
  console.log(id);
  this.departmentService.getDepartmentById(id).subscribe({
    next: (response) => {
      console.log(response);
      if (response.data === null || response.data === undefined) {
        this.adminNameList = []; 
        this.toaster.showInfo("No Manager available in this department");
        // alert("Manager list is empty");
      } else {
        this.adminNameList = response.data;
      }
    },
    error: (err) => {
      console.log(err);
      this.toaster.showWarning("Error while getting Managers list");
      // window.alert("Error occurred");
    }
  });
}

}
