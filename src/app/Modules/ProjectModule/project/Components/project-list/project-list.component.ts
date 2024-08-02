import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { Project, ProjectResponse } from '../../Models/Project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {

  public projectList: Project[] = [];
  // public searchQuery: string = '';
  public filteredProjectData: Project[] = []; 
  public departmentListLength!: number;

  constructor(
    private productService: ProjectService,
    private dialogService: DeleteDialogService,
    public dialog: MatDialog
  ) {
    console.log("Loaded...")
  }

  ngOnInit(): void {
  }

  // function for adding a new department
  public addNewProject(): void {
    console.log("addNewDepartment");
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          console.log('Find find');
          // this.getDepartmentData();
          // this.findDepartment(); 
        }
      },
      error: (err) => {
        console.error("Error:", err);
        window.alert("An error occurred while adding the Project.");
      }
    });
  }

  public getDepartmentData(): void{
    this.productService.getProject().subscribe({
      next: (data: ProjectResponse)=>{
          console.log(data.data);
          if(data.data == null || data.data == undefined){
            alert("No projects found")
            this.projectList = [];
          }
          else{
          this.projectList = data.data;
          }
      }
    })
  }

  // deleteDepartment(id: number): void{
  //   console.log("deletd");
  // }

  deleteProject(id: number): void{
    console.log(id);
    console.log("deleted");
  }

}
