import { Component } from '@angular/core';
import { GetEmployeeResponseById } from '../../Modules/EmployeModule/employee/Models/Employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeServiceService } from '../../Modules/EmployeModule/employee/Service/employe-service.service';
import { ToastService } from '../../Modules/SharedModule/shared/Services/toast.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  public paramId!: number;
  public isEdit!: boolean;
  public avatarUrl!: string;
  public progressSpinner!: boolean;
  public EmployeeData ={
    name: '',
    departmentName: null as string | null,
    managerName: null as string | null,
    role: 1,
    salary: 1,
    phone: "xxxxxxx",
    email: 'ex@gmail.com',
    address: 'xyz',
    createdBy: 1,
    updatedBy: '', 
    createdOn: '',
    updatedOn: null as string | null ,
    imageUrl: ''
  }
 
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private employeeService: EmployeServiceService, private toster: ToastService,   public dialog: MatDialog,){
    this.paramId = Number(localStorage.getItem('userId'));
    console.log(this.paramId);
    if(this.paramId){
      this.isEdit = true;
        this.getEmployeeByID();
  }  
}

  public getEmployeeByID(): void {
    this.progressSpinner = true;
    this.employeeService.getEmployeeById(this.paramId).subscribe({
        next: (data: GetEmployeeResponseById) => {
            this.progressSpinner = false;
            const Data = data.data;
            console.log(Data);
            this.EmployeeData.name = Data.name;
            this.EmployeeData.departmentName = Data.departmentName;
            this.EmployeeData.managerName = Data.managerName;
            this.EmployeeData.role = Data.role;
            this.EmployeeData.salary = Data.salary;
            this.EmployeeData.createdBy = Data.createdBy;
            this.EmployeeData.createdOn = Data.createdOn;
            this.EmployeeData.address = Data.address;
            this.EmployeeData.phone = Data.phone;
            this.EmployeeData.email = Data.email;
            this.EmployeeData.imageUrl = Data.imageUrl;
        },
        error: (err) => {
          this.progressSpinner = false;
            console.log("Error while getting the employee data by id");
        }
    });
}
}
