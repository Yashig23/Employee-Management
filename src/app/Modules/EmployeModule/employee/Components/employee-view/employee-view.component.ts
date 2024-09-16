import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { EmployeeDto } from '../../../../../Components/Models/Login.model';
import { GetEmployeeResponseById, GetEmployeeResponseById2 } from '../../Models/Employee.model';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from '../../../../SharedModule/shared/SharedClass/BaseComponentClass';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.scss'
})
export class EmployeeViewComponent extends BaseService implements OnInit{
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
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(this.takeUntilDestroy()).subscribe(paramMap => {
      // console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if(this.paramId){
        this.isEdit = true;
        this.getEmployeeByID();
        // console.log(this.EmployeeData.departmentName)
      }
    });
  }

  public getEmployeeByID(): void {
    this.progressSpinner = true;
    this.employeeService.getEmployeeByIdDetailsOnView(this.paramId).pipe(this.takeUntilDestroy()).subscribe({
        next: (data: GetEmployeeResponseById2) => {
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
