import { Component, OnInit} from '@angular/core';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskServiceService } from '../../Services/task-service.service';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { DataPost, Task, TaskList } from '../../Models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{
  public employeeList: Task[] = [];
  public searchQuery: string = '';
  public filteredTasksData: Task[] = [];
  public totalPagesList!: number[];
  public currentPage: number = 1;
  public taskList: Task[] =[];
  public totalPages!: number;
  public taskListLength!: number;
  public progressSpinner!: boolean;
  public dataPage: DataPost = {
    "pageIndex": 1,
    "pagedItemsCount": 10,
    "orderKey": "Name",
    "sortedOrder": 1,
    "search": ""
  };

  constructor(  private taskService: TaskServiceService,
    private dialogService: DeleteDialogService,
    public dialog: MatDialog,
    public toaster: ToastService,){
      console.log("Moaded");
  }

  ngOnInit(): void {
      // this.loadEmployeeData();
      this.getTasksData();
      this.FilterChange();
  }

  public getTasksData(): void {
    this.taskService.getTasksList().subscribe({
      next: (response: TaskList) => {
        console.log(response.data);
        if(response.data == null || response.data == undefined){
          this.toaster.showInfo("No projects found")
          this.taskList = [];
        }
        else{
        this.taskList = response.data;
        this.taskListLength = this.taskList.length;
        this.FilterChange();
        }
      },
      error: (err: string) => {
        console.log('Error occurred', err);
      }
    });
  }

  // public getTasksData(): void{
  //   this.tasksService.getTasksList().subscribe({
  //     next: (data: ProjectResponse)=>{
  //         console.log(data.data);
  //         if(data.data == null || data.data == undefined){
  //           this.toaster.showInfo("No projects found")
  //           this.projectList = [];
  //         }
  //         else{
  //         this.projectList = data.data;
  //         this.FilterChange();
  //         }
  //     }
  //   })
  // }

  // Delete a employee and refresh the list
  public deleteTask(id: number): void {
    // debugger;
    this.dialogService
      .openConfirmDialog('Are you sure to delete this Task?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          if (id !== null && id !== undefined) {
            this.taskService.deleteTask(id).subscribe({
              next: () => {
                console.log('Task deleted successfully.');
                this.toaster.showSuccess("Task deleted successfully");
                this.getTasksData();
              },
              error: err => {
                console.error('Error deleting Task:', err);
                this.toaster.showSuccess("Error while deleting Task");
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

  public FilterChange(): void {
    this.taskService.paginationOnTask(this.dataPage).subscribe({
      next: (data) => {
        this.employeeList = data.data.data;
        this.filteredTasksData = this.employeeList;
        this.taskListLength = data.data.totalItems; 
        this.totalPages = this.getTotalPages(); 
        // this.totalPagesList.push(this.totalPages);
        this.totalPagesList = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        console.log(this.filteredTasksData);
      },
      error: (err) => {
        console.log(err);
        this.toaster.showWarning("Error occurred while Filtering");
        alert("Error occurred");
      }
    });
  }

  public getTotalPages(): number {
    return Math.ceil(this.taskListLength / this.dataPage.pagedItemsCount);
  }

  public searchTaskNew(): void {
    this.dataPage.pageIndex = 1;
    this.dataPage.pagedItemsCount = 10;
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

goToPage(pageNumber: number) {
  this.currentPage = pageNumber;
  this.loadPageData(pageNumber);
}

public loadPageData(pageNumber: number): void {
  console.log(`Loading data for page ${pageNumber}`);
  this.dataPage.pageIndex = pageNumber;
  this.FilterChange();
}



}