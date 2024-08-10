import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { EmployeeForProjects, ProjectByEmployeeId, ProjectListOfEmployee } from '../../../../ProjectModule/project/Models/Project.model';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { ProjectDetails, ProjectListOfEmployee1 } from '../../Models/Employee.model';

@Component({
  selector: 'app-employee-project',
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.scss'
})
export class EmployeeProjectComponent implements OnInit {
  public paramId!: number;
  public isEdit!: boolean;
  public projectList: ProjectListOfEmployee[]=[];

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private projectService: ProjectService, private employeeService: EmployeServiceService){
    console.log("Employee Project");
  }

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(paramMap => {
    console.log(paramMap);
    this.paramId = Number(paramMap.get('id'));
    if(this.paramId){
      console.log(this.paramId);
      this.isEdit = true;
      this.getProjectsListOfEmployee(this.paramId);
      // this.getEditData();
    }
  });   
  }

  public getProjectsListOfEmployee(id: number){
    this.employeeService.getProjectsOfEmployeeById(id).subscribe({
      next: (data:  ProjectListOfEmployee1)=>{
        console.log(data);
      },
      error: (err)=>{
      console.log(err);
      }
    })
  }
}
