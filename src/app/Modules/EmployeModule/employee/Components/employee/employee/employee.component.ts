import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentServiceService } from '../../../../../DepartmentModule/department/Service/department-service.service';
import { Department, DepartmentResponse } from '../../../../../DepartmentModule/department/Models/department.model';
import { EmployeServiceService } from '../../../Service/employe-service.service';

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
  public showManagerList: boolean = false;
  public departmentList: Department[]=[];
  public adminNameList: Department[]=[];
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private departmentService: DepartmentServiceService, private employeeService: EmployeServiceService) {}

  ngOnInit(): void {
    this.getDepartmentData();
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
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
            alert('Employee updated successfully');
            this.employeeForm.reset();
          },
          error: (err)=>{
            console.log(err);
            window.alert('Error while updating the employee');
          }
        })
      }
      else{
      this.employeeService.addEmployee(body).subscribe({
        next: (data)=>{
          console.log(data);
           alert('Employee added successfully');
           this.employeeForm.reset();
        },
        error: (err)=>{
          console.log(err);
          window.alert('Error while adding the employee');
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
        // window.alert('Error occurred while displaying the department list');
        console.log('Error occurred', err);
      }
    });
  } 

  private getEditData(): void {
    this.employeeService.getEmployeeById(this.paramId).subscribe({
      next: (response)=>{
        const employeeDataOfId = response.data;
        console.log(employeeDataOfId);
        this.getAdminById(this.paramId);
        this.employeeForm.patchValue(employeeDataOfId)
      },
      error: (err)=>{
        window.alert("Error while getting employee details");
        console.log("Error while showing employee details",err);
      }
    })
  }

  // onDepartmentChange(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   const selectedDepartmentId = target.value;
  
  //   // const departmentId = Number(selectedDepartmentId);
  //   // if (departmentId) {
  //   //   this.getAdminById(departmentId);
  //   // }

  //   if(selectedDepartmentId){
  //     this.getManagerByDepartment(selectedDepartmentId);
  //   }
  // }

  public onDepartmentChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    const selectedDepartmentId = target.value;
    const departmentId = Number(selectedDepartmentId);
    // const departmentId = event.target.value;
    if (departmentId) {
      console.log(departmentId);
      this.showManagerList = true; 
      this.getManagerByDepartment(departmentId);
    } else {
      this.showManagerList = false; 
    }
  }

  public getManagerByDepartment(data: number): void{
    this.employeeService.getDepartmentDetailsByName(data).subscribe({
      next: (response)=>{
        console.log(response)
        if(this.adminNameList == null){
          alert("No manager found");
          this.showManagerList = false;
        }
        else{
          this.adminNameList = response.data
          this.showManagerList = true;
          console.log(this.adminNameList)
        }
      }
    })
  }
// public getAdminById(id: number): void{
//   console.log("get admin data");
//   console.log(id);
//     this.departmentService.getDepartmentById(id).subscribe({
//       next: (response)=>{
//         console.log(response);
//         if(this.adminNameList == null){
//           alert("Manager list is empty");
//         }
//         else{
//         this.adminNameList = response.data;
//         }
//       },
//       error: (err)=>{
//         console.log(err);
//         window.alert("Error occured")
//       }
//     })
// }

public getAdminById(id: number): void {
  console.log("get admin data");
  console.log(id);
  this.departmentService.getDepartmentById(id).subscribe({
    next: (response) => {
      console.log(response);
      if (response.data === null || response.data === undefined) {
        this.adminNameList = []; 
        alert("Manager list is empty");
      } else {
        this.adminNameList = response.data;
      }
    },
    error: (err) => {
      console.log(err);
      window.alert("Error occurred");
    }
  });
}

}
