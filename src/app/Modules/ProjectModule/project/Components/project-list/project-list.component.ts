import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { DataPage, Project, ProjectResponse } from '../../Models/Project.model';
import {ToastService} from '../../../../SharedModule/shared/Services/toast.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {

  public projectList: Project[] = [];
  // public searchQuery: string = '';
  public filteredProjectData: Project[] = []; 
  public projectListLength!: number;
  public currentPage: number = 1;
  public totalPages!: number;
  public totalPagesList!: number[];
  public progressSpinner!: boolean;
   public dataPage: DataPage = {
    "pageIndex": 1,
    "pagedItemsCount": 10,
    "orderKey": "Name",
    "sortedOrder": 1,
    "search": ""
  };

  constructor(
    private projectService: ProjectService,
    private dialogService: DeleteDialogService,
    public dialog: MatDialog,
    public toaster: ToastService
  ) {
    console.log("Loaded...")
  }

  ngOnInit(): void {
    this.getProjectData();
    // this.FilterChange();
  }

  // function for adding a new department
  public addNewProject(): void {
    console.log("addNewDepartment");
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          console.log('Find find');
          this.toaster.showSuccess("Project added successfully");
          // this.getDepartmentData();
          // this.findDepartment(); 
        }
      },
      error: (err) => {
        console.error("Error:", err);
        this.toaster.showWarning("An error occurred while adding the Project.")
      }
    });
  }

  public getProjectData(): void{
    this.progressSpinner = true;
    this.projectService.getProject().subscribe({
      next: (data: ProjectResponse)=>{
          console.log(data.data);
          this.progressSpinner = false;
          if(data.data == null || data.data == undefined){
            this.toaster.showInfo("No projects found")
            this.projectList = [];
          }
          else{
          this.progressSpinner = false;
          this.projectList = data.data;
          this.FilterChange();
          }
      }
    })
  }

  public FilterChange(): void {
    this.projectService.paginationOnProjects(this.dataPage).subscribe({
      next: (data) => {
        this.projectList = data.data.data;
        this.filteredProjectData = this.projectList;
        this.projectListLength = data.data.totalItems; 
        this.totalPages = this.getTotalPages(); 
        // this.totalPagesList.push(this.totalPages);
        this.totalPagesList = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        console.log(this.filteredProjectData);
      },
      error: (err) => {
        console.log(err);
        this.toaster.showWarning("Error occurred while Filtering");
        // alert("Error occurred");
      }
    });
  }

  public onPrevious(): void {
    if (this.dataPage.pageIndex > 1) {
      this.dataPage.pageIndex--;
      this.FilterChange();
    }
  }

  public onNext(): void {
    const totalPages = this.getTotalPages();
    if (this.dataPage.pageIndex < totalPages) {
      this.dataPage.pageIndex++;
      this.FilterChange();
    }
  }
  
  public onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.dataPage.pagedItemsCount = Number(selectElement.value);
    this.dataPage.pageIndex = 1; 
    this.FilterChange(); 
  }

  public getTotalPages(): number {
    return Math.ceil(this.projectListLength / this.dataPage.pagedItemsCount);
  }

  public searchProjectNew(): void {
    this.dataPage.pageIndex = 1;
    this.dataPage.pagedItemsCount= 10;
    this.FilterChange();
  }
    
    goToPage(pageNumber: number) {
      this.currentPage = pageNumber;
      this.loadPageData(pageNumber);
    }
    
    public loadPageData(pageNumber: number): void {
      console.log(`Loading data for page ${pageNumber}`);
      this.dataPage.pageIndex = pageNumber;
      this.FilterChange();
    }
    
    public sortData(event: any): void {
      console.log(event.active);
      console.log(event.direction);
      this.dataPage.orderKey = event.active;
  
      if (event.direction === 'asc') {
        this.dataPage.sortedOrder = 1;
      }
      else if (event.direction === 'desc') {
        this.dataPage.sortedOrder = 0;
      }
      else {
        this.dataPage.sortedOrder = 2;
      }
      this.FilterChange();
    }


  // public deleteProject(id: number): void{
  //   console.log(id);
  //   console.log("deleted");
  // }

   // Delete a project and refresh the list
   public deleteProject(id: number): void {
    // debugger;
    this.dialogService
      .openConfirmDialog('Are you sure to delete this Project?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          if (id !== null && id !== undefined) {
            this.projectService.deleteProject(id).subscribe({
              next: () => {
                console.log('Project deleted successfully.');
                this.toaster.showSuccess("Project deleted successfully");
                this.getProjectData(); 
              },
              error: err => {
                console.error('Error deleting Project:', err);
                this.toaster.showWarning("Error while deleting Project");
              },
              complete: () => {
                console.log('Deletion process completed.');
              }
            });
          } else {
            this.toaster.showInfo('Invalid ID')
            console.error('Invalid ID');
          }
        }
      });
  }
}
