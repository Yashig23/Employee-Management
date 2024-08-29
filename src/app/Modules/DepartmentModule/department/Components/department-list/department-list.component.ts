import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../Service/department-service.service';
import { DataPage, Department, DepartmentResponse } from '../../Models/department.model';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DepartmentComponent } from '../department/department.component';
import {ToastService} from '../../../../SharedModule/shared/Services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'] 
})
export class DepartmentListComponent implements OnInit {
  public departmentList: Department[] = [];
  public searchQuery: string = '';
  public filteredDepartmentData: Department[] = []; 
  public departmentListLength!: number;
  public currentPage: number = 1;
  public totalPages!: number;
  public progressSpinner!: boolean;
  public pagedItemsCount = 10;
  public totalPagesList!: number[];
  public range!: FormGroup;
   public dataPage: DataPage = {
    "pageIndex": 1,
    "pagedItemsCount": 10,
    "orderKey": "id",
    "sortedOrder": 0,
    "search": "",
    "dateRange": null
  };

  constructor(
    private departmentService: DepartmentServiceService,
    private dialogService: DeleteDialogService,
    public dialog: MatDialog,
    private toaster: ToastService,
    private fb: FormBuilder
  ) {
    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDepartmentData();
    this.FilterChange();
    this.range.valueChanges.subscribe((value) => {
      this.updateDateRange(value);
    });
  }

  // Fetch department data and display it
  public getDepartmentData(): void {
    this.progressSpinner = true;
    this.departmentService.getDepartmentList().subscribe({
      next: (response: DepartmentResponse) => {
        this.progressSpinner = false;
        this.departmentList = response.data || [];
        this.departmentListLength = this.departmentList.length
        this.filteredDepartmentData = this.departmentList; 
        console.log(this.departmentList);
        console.log(response);
      },
      error: (err: string) => {
        this.progressSpinner = false;
        console.log('Error occurred', err);
      }
    });
  }

  public updateDateRange(value: any) {
    console.log(value);
    const { start, end } = value;
    if (start) {
      this.dataPage.dateRange = {
        startDate: new Date(start).toISOString(),
        endDate: end ? new Date(end).toISOString(): new Date(Date.now()).toISOString(),
      };
      console.log(this.dataPage);
      this.FilterChange();
    } else {
      console.error("Invalid date range");
      this.toaster.showWarning("Invalid Date Range");
    }
  }

  // opening add department dialog
  public openAddDepartment(): void{
    const dialogRef = this.dialog.open(DepartmentComponent);
    dialogRef.afterClosed().subscribe({
      next: (data)=>{
        console.log(data);
        // this.toaster.showSuccess("New Department Added");
        console.log("added new Department");
        this.getDepartmentData();
      },
      error: (err)=>{
        console.log("Error occured whilee adding");
        this.toaster.showWarning("Error occured while Adding Department");
      }
    })
  }

  // Delete a department and refresh the list
  public deleteDepartment(id: number): void {
    this.dialogService
      .openConfirmDialog('Are you sure to delete this department?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          if (id !== null && id !== undefined) {
            this.departmentService.deleteDepartment(id).subscribe({
              next: () => {
                console.log('Department deleted successfully.');
                this.toaster.showSuccess('Department deleted successfully');
                this.getDepartmentData(); 
              },
              error: err => {
                this.toaster.showWarning('Error while deleting department');
                console.error('Error deleting department:', err);
              },
              complete: () => {
                console.log('Deletion process completed.');
              }
            });
          } else {
            console.error('Invalid ID');
          }
        }
      });
  }

  // function for adding a new department
  public addNewDepartment(): void {
    console.log("addNewDepartment");
    const dialogRef = this.dialog.open(DepartmentComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          console.log('Find find');
          this.getDepartmentData();
          this.toaster.showSuccess('Department added successfully');
        }
      },
      error: (err) => {
        console.error("Error:", err);
        this.toaster.showWarning("An error occured while adding the department");
        // window.alert("An error occurred while adding the department.");
      }
    });
  }

  public FilterChange(): void {
    this.departmentService.paginationOnDepartments(this.dataPage).subscribe({
      next: (data) => {
        this.departmentList = data.data.data;
        this.filteredDepartmentData = this.departmentList;
        this.departmentListLength = data.data.totalItems; 
        this.totalPages = this.getTotalPages(); 
        // this.totalPagesList.push(this.totalPages);
        this.totalPagesList = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        console.log(this.filteredDepartmentData);
      },
      error: (err) => {
        console.log(err);
        this.toaster.showWarning("Error occurred while Filtering");
        // alert("Error occurred");
      }
    });
  }

  // deleteDepartment(id: number): void{
  //   console.log("deletd");
  // }

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
    this.pagedItemsCount = Number(selectElement.value);
    this.currentPage = 1;
    this.FilterChange(); 
  }

  public getTotalPages(): number {
    return Math.ceil(this.departmentListLength / this.dataPage.pagedItemsCount);
  }

  public searchDepartmentNew(): void {
    this.dataPage.pageIndex = 1;
    this.dataPage.pagedItemsCount = 10;
    this.currentPage =1;
    this.pagedItemsCount = 10;
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

}
