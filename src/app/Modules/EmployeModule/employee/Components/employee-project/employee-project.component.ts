import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { ProjectDetails, projectDialogData, ProjectListOfEmployee1 } from '../../Models/Employee.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from '../../../../TaskModule/task/Components/task/task.component';
import { DialogData } from '../../../../SharedModule/shared/Model/delete.model';

@Component({
  selector: 'app-employee-project',
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.scss'
})
export class EmployeeProjectComponent implements OnInit {
  public paramId!: number;
  public isEdit!: boolean;
  public projectName!: string;
  public projectList: ProjectDetails[]=[];
  public progressSpinner!: boolean;

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private projectService: ProjectService, private employeeService: EmployeServiceService
    ,public router: Router, public dialog: MatDialog,
  ){
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
    this.progressSpinner = true;
    this.employeeService.getProjectsOfEmployeeById(id).subscribe({
      next: (data:  ProjectListOfEmployee1)=>{
        this.progressSpinner = false;
        console.log(data);
        const Data = data.data;
        // this.projectName = data.
        this.projectList = Data;
      },
      error: (err)=>{
        this.progressSpinner = false;
      console.log(err);
      }
    })
  }

  public openAddTask(id: number): void{
    console.log(id);
  }
}
