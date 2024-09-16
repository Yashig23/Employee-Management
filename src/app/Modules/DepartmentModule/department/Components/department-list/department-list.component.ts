import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../Service/department-service.service';
import { DataPage, Department, DepartmentResponse } from '../../Models/department.model';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DepartmentComponent } from '../department/department.component';
import {ToastService} from '../../../../SharedModule/shared/Services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BaseService } from '../../../../SharedModule/shared/SharedClass/BaseComponentClass';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'] 
})
export class DepartmentListComponent  extends BaseService implements OnInit {
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
    super();
    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDepartmentData();
    this.FilterChange();
    this.range.valueChanges.pipe(this.takeUntilDestroy()).subscribe((value) => {
      this.updateDateRange(value);
    });
  }

  // Fetch department data and display it
  public getDepartmentData(): void {
    this.progressSpinner = true;
    this.departmentService.getDepartmentList().pipe(this.takeUntilDestroy()).subscribe({
      next: (response: DepartmentResponse) => {
        this.progressSpinner = false;
        this.departmentList = response.data || [];
        this.departmentListLength = this.departmentList.length
        this.filteredDepartmentData = this.departmentList; 
      },
      error: (err: string) => {
        this.progressSpinner = false;
        this.toaster.showWarning("Error occured while fetching Department List");
      }
    });
  }

  public loadPageData(pageNumber: number): void {
    this.dataPage.pageIndex = pageNumber;
    this.FilterChange();
  }

  public onPrevious(pageNumber: number): void {
    this.dataPage.pageIndex = pageNumber;
      this.FilterChange();
  }

  public onNext(pageNumber: number): void {
    this.dataPage.pageIndex = pageNumber;
    this.FilterChange();
  }

  public onPageSizeChange(pageSize: number): void {
    const newPageSize = pageSize;
    this.dataPage.pagedItemsCount = Number(newPageSize);
    this.dataPage.pageIndex = 1; 
    this.currentPage = 1;
    this.pagedItemsCount = Number(newPageSize);
    this.FilterChange(); 
  }

  public updateDateRange(value: any) {
    const { start, end } = value;
    if (start) {
      this.dataPage.dateRange = {
        startDate: new Date(start).toISOString(),
        endDate: end ? new Date(end).toISOString(): new Date(Date.now()).toISOString(),
      };
      this.FilterChange();
    } else {
      this.toaster.showWarning("Invalid Date Range");
    }
  }

  // opening add department dialog
  public openAddDepartment(): void{
    const dialogRef = this.dialog.open(DepartmentComponent);
    dialogRef.afterClosed().pipe(this.takeUntilDestroy()).subscribe({
      next: ()=>{
        this.getDepartmentData();
      },
      error: (err)=>{
        this.toaster.showWarning("Error occured while Adding Department");
      }
    })
  }

  // Delete a department and refresh the list
  public deleteDepartment(id: number): void {
    this.dialogService
      .openConfirmDialog('Are you sure to delete this department?')
      .afterClosed()
      .pipe(this.takeUntilDestroy())
      .subscribe(res => {
        if (res) {
          if (id !== null && id !== undefined) {
            this.departmentService.deleteDepartment(id).pipe(this.takeUntilDestroy()).subscribe({
              next: () => {
                this.toaster.showSuccess('Department deleted successfully');
                this.getDepartmentData(); 
              },
              error: err => {
                this.toaster.showWarning('Error while deleting department');
                console.error('Error deleting department:', err);
              },
              complete: () => {
                // console.log('Deletion process completed.');
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
    ("addNewDepartment");
    const dialogRef = this.dialog.open(DepartmentComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().pipe(this.takeUntilDestroy()).subscribe({
      next: (result) => {
        if (result) {
          this.getDepartmentData();
          this.toaster.showSuccess('Department added successfully');
        }
      },
      error: (err) => {
        console.error("Error:", err);
        this.toaster.showWarning("An error occured while adding the department");
      }
    });
  }

  public FilterChange(): void {
    this.departmentService.paginationOnDepartments(this.dataPage).pipe(this.takeUntilDestroy()).subscribe({
      next: (data) => {
        this.departmentList = data.data.data;
        this.filteredDepartmentData = this.departmentList;
        this.departmentListLength = data.data.totalItems; 
        this.totalPages = this.getTotalPages(); 
        // this.totalPagesList.push(this.totalPages);
        this.totalPagesList = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        (this.filteredDepartmentData);
      },
      error: (err) => {
        this.toaster.showWarning("Error occurred while Filtering");
        // alert("Error occurred");
      }
    });
  }

  public getTotalPages(): number {
    return Math.ceil(this.departmentListLength / this.dataPage.pagedItemsCount);
  }

  public searchDepartmentNew(): void {
    // if(this.dataPage.search!.length != 0 ){
    this.dataPage.pageIndex = 1;
    this.dataPage.pagedItemsCount = 10;
    this.currentPage =1;
    this.pagedItemsCount = 10;
    this.FilterChange();
  }
    
    public sortData(event: any): void {
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

  public reset(): void{
    this.dataPage.search = '';
    this.dataPage.pageIndex = 1;
    this.dataPage.pagedItemsCount = 10;
    this.currentPage =1;
    this.pagedItemsCount = 10;
    this.FilterChange();
  }

}
