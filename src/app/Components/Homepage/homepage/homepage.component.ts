import { Component, OnInit } from '@angular/core';
import { GetEmployeeResponseById } from '../../../Modules/EmployeModule/employee/Models/Employee.model';
import { EmployeServiceService } from '../../../Modules/EmployeModule/employee/Service/employe-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  public role!: number;
  public id!: number;
  // public EmployeeData!: string
  public EmployeeName!: string;

  constructor(public employeeService: EmployeServiceService){
    this.role = Number(localStorage.getItem('role'));
    this.id = Number(localStorage.getItem('id'));
  }
  ngOnInit(): void {
      this.getEmployeeDetails();
  }

  public getEmployeeDetails(): void{
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data: GetEmployeeResponseById) => {
          const Data = data.data;
          console.log(Data);
          // this.EmployeeName = Data.employee.name;
          // localStorage.setItem('employeeName', this.EmployeeName);
  },
  error: (err)=>{
    console.log(err);
  }
})

}
}
