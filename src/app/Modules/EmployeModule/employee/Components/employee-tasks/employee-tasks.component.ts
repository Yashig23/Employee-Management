import { Component } from '@angular/core';
import { TasksListOfEmployees } from '../../Models/Employee.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeServiceService } from '../../Service/employe-service.service';

@Component({
  selector: 'app-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrl: './employee-tasks.component.scss'
})
export class EmployeeTasksComponent {
  public paramId!: number;
  public isEdit!: boolean;
  public projectList: TasksListOfEmployees[]=[];

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private employeeService: EmployeServiceService){
    console.log("Employee Project");
  }

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(paramMap => {
    console.log(paramMap);
    this.paramId = Number(paramMap.get('id'));
    if(this.paramId){
      console.log(this.paramId);
      this.isEdit = true;
      this.getTasksListOfEmployee(this.paramId);
      // this.getEditData();
    }
  });   
  }

  public getTasksListOfEmployee(id: number){
    this.employeeService.getTasksOfEmployeeById(id).subscribe({
      next: (data: TasksListOfEmployees)=>{
        console.log(data);
      },
      error: (err)=>{
      console.log(err);
      }
    })
  }
}
