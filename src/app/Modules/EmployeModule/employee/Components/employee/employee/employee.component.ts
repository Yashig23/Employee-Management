import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentServiceService } from '../../../../../DepartmentModule/department/Service/department-service.service';
import { Department, DepartmentResponse } from '../../../../../DepartmentModule/department/Models/department.model';
import { EmployeServiceService } from '../../../Service/employe-service.service';
import { ToastService } from '../../../../../SharedModule/shared/Services/toast.service';
import { GetEmployeeResponseById, OnlyEmployeeData } from '../../../Models/Employee.model';

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
  public departmentID!: number | null;
  public departmentList: Department[]=[];
  public adminNameList: OnlyEmployeeData[]=[];
  public disableSubmitBtn: boolean = false;
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private departmentService: DepartmentServiceService, private employeeService: EmployeServiceService,
    public toaster: ToastService
  ) {}

  ngOnInit(): void {
    this.getDepartmentData();
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required,Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl('', [Validators.required,  Validators.minLength(1),
        Validators.maxLength(100),
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10), Validators.minLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(200)]),
      salary: new FormControl(null, [Validators.required, Validators.min(1)]),
      departmentID: new FormControl(null),
      managerID: new FormControl(null),
      role: new FormControl(0)
    });

    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if(this.paramId){
        this.isEdit = true;
        this.getEmployeeNamesById(this.paramId);
        this.disableSubmitBtn = false;
        this.getEditData();
        console.log("Edit Value", this.isEdit);
      }
    });
    this.employeeForm.valueChanges.subscribe((formValues) => {
      console.log(this.employeeForm.valid);
    });
    
  }

  public onSubmit(): void {
    this.disableSubmitBtn = true;
    console.log("From Valid",this.employeeForm.valid);
    const body = {
      name: this.employeeForm.value.name,
      phone: this.employeeForm.value.phone,
      email: this.employeeForm.value.email,
      address: this.employeeForm.value.address,
      salary: Number(this.employeeForm.value.salary),
      departmentID: Number(this.employeeForm.value.departmentID),
      managerID: Number(this.employeeForm.value.managerID),
      role: Number(0)
    };
    if(this.isEdit == true){
      this.employeeForm.removeControl('username');
      this.employeeForm.removeControl('password');
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
    if(this.employeeForm.valid) {
      console.log("Valid form");
      if(this.employeeForm.valid){
      const body = {
        username: this.employeeForm.value.username,
        password: this.employeeForm.value.password,
        name: this.employeeForm.value.name,
        phone: this.employeeForm.value.phone,
        email: this.employeeForm.value.email,
        address: this.employeeForm.value.address,
        salary: Number(this.employeeForm.value.salary),
        departmentID: Number(this.employeeForm.value.departmentID),
        managerID: Number(this.employeeForm.value.managerID),
        role: Number(0)
      };
      const  formValue = this.employeeForm.value;
      if(this.isEdit== true){
        this.employeeForm.removeControl('username');
          this.employeeForm.removeControl('password');
          const { username, password, ...updatedBody } = body;
          this.employeeService.updatedEmployee(updatedBody, this.paramId).subscribe({
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
             this.disableSubmitBtn = false;
          },
          error: (err)=>{
            console.log(err);
            this.toaster.showWarning('Error while adding employee');
            this.disableSubmitBtn = false;
          }
        })
      }
      // console.log(formValue);
      // console.log(body);
      // console.log(this.isEdit);
    //   this.employeeService.addEmployee(body).subscribe({
    //     next: (data)=>{
    //       console.log(data);
    //       this.toaster.showSuccess('Employee added successfully');
    //        this.employeeForm.reset();
    //        this.disableSubmitBtn = false;
    //     },
    //     error: (err)=>{
    //       console.log(err);
    //       this.toaster.showWarning('Error while adding employee');
    //       this.disableSubmitBtn = false;
    //     }
    //   })
    // }
  }
  else{
    console.log("Form is invalid");
    this.toaster.showWarning("Form is invalid");
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

  public onPhoneInput(event: any): void {
    console.log("enteres");
    const input = event.target;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10); 
    }
    else if(input.value.length == 10){
      this.employeeForm.controls['phone'].setValue(input.value);
      console.log(this.employeeForm.controls['phone'].value);
    }
  }

  public getEditData(): void {
    // this.progressSpinner = true;
    this.employeeService.getEmployeeById(this.paramId).subscribe({
      next: (response: GetEmployeeResponseById)=>{
        // this.progressSpinner = false;
        const employeeDataOfId = response.data;
        console.log(response.data);
        this.departmentID = employeeDataOfId.departmentID;
        if(this.departmentID != null){
          this.getEmployeeNamesById(this.departmentID);
        }
        this.employeeForm.patchValue(employeeDataOfId)
      },
      error: (err)=>{
        // this.progressSpinner = false;
        console.log("Error while showing employee details",err);
      }
    })
  }

  public onDepartmentChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    const selectedDepartmentID = target.value;
    const departmentID = Number(selectedDepartmentID);
    if (departmentID) {
      console.log(departmentID);
      this.getEmployeeNamesById(departmentID);
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
      console.log(this.adminNameList);
      console.log(Data);
    },
    error: (err)=>{
      console.log(err);
      this.showManagerList = false;
      this.toaster.showWarning("Error while fetching the employee Names");
    }
  })
}

}
