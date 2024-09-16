import { Component } from '@angular/core';
import { projectDialogData, TaskDetails, TasksListOfEmployees } from '../../Models/Employee.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { TaskComponent } from '../../../../TaskModule/task/Components/task/task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrl: './employee-tasks.component.scss'
})
export class EmployeeTasksComponent {
  public paramId!: number;
  public isEdit!: boolean;
  public taskList: TaskDetails[]=[];
  public projectName!: string;
  public progressSpinner!: boolean;

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private employeeService: EmployeServiceService
    , public dialog: MatDialog
  ){
  }

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(paramMap => {
    // console.log(paramMap);
    this.paramId = Number(paramMap.get('id'));
    if(this.paramId){
      // console.log(this.paramId);
      this.isEdit = true;
      this.getTasksListOfEmployee(this.paramId);
      // this.getEditData();
    }
  });   
  }

  public getTasksListOfEmployee(id: number){
    this.progressSpinner = true;
    this.employeeService.getTasksOfEmployeeById(id).subscribe({
      next: (data: TasksListOfEmployees)=>{
        this.progressSpinner = false;
        const Data = data.data;
        this.taskList = Data;
        // console.log(data);
      },
      error: (err)=>{
        this.progressSpinner = false;
      }
    })
  }

  // public openAddTaskDialog(): void{
  //   const taskDialog: projectDialogData ={projectName: this.projectName, projectId: this.paramId }
  //   const dialogRef = this.dialog.open(TaskComponent, {
  //     width: '1000px',
  //     height: '600px',
  //     disableClose: false,

  //   }); 
  //   dialogRef.componentInstance.data = taskDialog
  //   dialogRef.afterClosed().subscribe({
  //     next: (data)=>{
  //       console.log("Task added successfully");
  //       // this.taskList = data;
  //       // console.log(data)
  //     },
  //     error: (err)=>{
  //       console.log(err);
  //     }
  //   })
  // }
}
