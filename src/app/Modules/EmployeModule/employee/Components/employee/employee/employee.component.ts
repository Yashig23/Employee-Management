import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentServiceService } from '../../../../../DepartmentModule/department/Service/department-service.service';
import { Department, DepartmentResponse } from '../../../../../DepartmentModule/department/Models/department.model';
import { EmployeServiceService } from '../../../Service/employe-service.service';
import { ToastService } from '../../../../../SharedModule/shared/Services/toast.service';
import { GetEmployeeResponseById, OnlyEmployeeData } from '../../../Models/Employee.model';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../../SharedModule/shared/SharedClass/BaseComponentClass';

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
export class EmployeeComponent extends BaseService implements OnInit, OnDestroy{
  public employeeForm!: FormGroup;
  public isEdit = false;
  public paramId!: number;
  public progressSpinner!: boolean;
  public showManagerList: boolean = false;
  public departmentID!: number | null;
  public departmentList: Department[] = [];
  public adminNameList: OnlyEmployeeData[] = [];
  public disableSubmitBtn: boolean = true;
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private departmentService: DepartmentServiceService, private employeeService: EmployeServiceService,
    public toaster: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDepartmentData();
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl('', [Validators.required, Validators.minLength(1),
      Validators.maxLength(100),
      Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10), Validators.minLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(1),
      Validators.maxLength(200)]),
      salary: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      departmentID: new FormControl(null),
      managerID: new FormControl(null),
      role: new FormControl(0)
    });

    this.activatedRoute.paramMap.pipe(this.takeUntilDestroy()).subscribe(paramMap => {
      this.paramId = Number(paramMap.get('id'));
      if (this.paramId) {
        this.isEdit = true;
        this.getEmployeeNamesById(this.paramId);
        this.disableSubmitBtn = false;
        this.getEditData();
      }
    });

    this.employeeForm.valueChanges.subscribe(() => {
      console.log("Value changes of form");
      this.updateButtonState();
    });

  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent) {
    if (this.employeeForm.dirty) {
      $event.preventDefault();
    }
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.employeeForm.dirty && this.disableSubmitBtn == true) {
      return confirm('You have unsaved changes! Do you really want to leave?');
    }
    return true;
  }

  public updateButtonState(): void {
    if (this.isEdit) {
      this.disableSubmitBtn = this.employeeForm.dirty || this.employeeForm.valid;
    } else {
      this.disableSubmitBtn = !this.employeeForm.valid;
    }
  }

  onSubmit(): void {
      let body: any = {
        name: this.employeeForm.value.name,
        phone: this.employeeForm.value.phone,
        email: this.employeeForm.value.email,
        address: this.employeeForm.value.address,
        salary: Number(this.employeeForm.value.salary),
        departmentID: Number(this.employeeForm.value.departmentID),
        managerID: Number(this.employeeForm.value.managerID),
        role: Number(this.employeeForm.value.role)
      };

      if (this.isEdit) {
        this.employeeForm.removeControl('username');
        this.employeeForm.removeControl('password');
        const { username, password, ...updatedBody } = body;

        this.employeeService.updatedEmployee(updatedBody, this.paramId).subscribe({
          next: () => {
            this.toaster.showSuccess("Employee updated successfully");
            this.employeeForm.reset();
            this.disableSubmitBtn = false;
          },
          error: () => {
            this.disableSubmitBtn = false;
            this.toaster.showWarning("Error while updating the employee");
          }
        });
      } else {
        body = {
          username: this.employeeForm.value.username,
          password: this.employeeForm.value.password,
          ...body
        };

        this.employeeService.addEmployee(body).subscribe({
          next: () => {
            this.toaster.showSuccess('Employee added successfully');
            this.employeeForm.reset();
            this.disableSubmitBtn = false;
          },
          error: () => {
            this.toaster.showWarning('Error while adding employee');
            this.disableSubmitBtn = false;
          }
        });
      }
  }

  public getDepartmentData(): void {
    this.departmentService.getDepartmentList().pipe(this.takeUntilDestroy()).subscribe({
      next: (response: DepartmentResponse) => {
        this.departmentList = response.data || [];
      },
      error: (err: string) => {
        this.toaster.showWarning("Error occured while displaying the list");
      }
    });
  }

  public onPhoneInput(event: any): void {
    // console.log("enteres");
    const input = event.target;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
    }
    else if (input.value.length == 10) {
      this.employeeForm.controls['phone'].setValue(input.value);
      // console.log(this.employeeForm.controls['phone'].value);
    }
  }

  public getEditData(): void {
    this.employeeService.getEmployeeById(this.paramId).pipe(this.takeUntilDestroy()).subscribe({
      next: (response: GetEmployeeResponseById) => {
        // this.progressSpinner = false;
        const employeeDataOfId = response.data;
        // console.log(response.data);
        this.departmentID = employeeDataOfId.departmentID;
        if (this.departmentID != null) {
          this.getEmployeeNamesById(this.departmentID);
        }
        this.employeeForm.patchValue(employeeDataOfId)
      },
      error: (err) => {
        // this.progressSpinner = false;
      }
    })
  }

  public onDepartmentChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    const selectedDepartmentID = target.value;
    const departmentID = Number(selectedDepartmentID);
    if (departmentID) {
      this.getEmployeeNamesById(departmentID);
    } else {
      this.showManagerList = false;
    }
  }

  public getManagerByDepartment(data: number): void {
    this.employeeService.getDepartmentDetailsByName(data).pipe(this.takeUntilDestroy()).subscribe({
      next: (response) => {
        // console.log(response)
        if (this.adminNameList == null) {
          this.toaster.showWarning("No Manager found");
          this.showManagerList = false;
        }
        else {
          this.showManagerList = true;
        }
      }
    })
  }

  public getEmployeeNamesById(id: number): void {
    this.employeeService.getEmployeeNamesByDepartmentId(id).pipe(this.takeUntilDestroy()).subscribe({
      next: (data) => {
        this.showManagerList = true;
        const Data = data.data;
        this.adminNameList = Data;
      },
      error: (err) => {
        // console.log(err);
        this.showManagerList = false;
        this.toaster.showWarning("Error while fetching the employee Names");
      }
    })
  }

  getButtonStyles(isEnabled: boolean) {
    return {
      'background-color': isEnabled ? '#007bff' : '#d6d6d6',
      'color': isEnabled ? 'white' : '#a1a1a1',
      'cursor': isEnabled ? 'pointer' : 'not-allowed',
      'margin-right': '1rem',
      'margin-top': '7px'
    };
  }
  

}
