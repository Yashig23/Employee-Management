import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { DataPage, DialogService, Employee, EmployeeAddedList, EmployeeResponse } from '../../Models/Employee.model';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { EmployeeForProjects } from '../../../../ProjectModule/project/Models/Project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { Observable, Subject, takeUntil } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from '../../../../SharedModule/shared/SharedClass/BaseComponentClass'; 
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.scss'
})
export class  EmployeListComponent extends BaseService implements OnInit, OnDestroy {

  public employeeList: Employee[] | null= [];
  public searchQuery: string = '';
  public filteredEmployeeData: Employee[] | null = [];
  public totalPagesList!: number[];
  public addedMembersList!: Observable<EmployeeAddedList[]>;
  public employeeListLength!: number;
  public searchEmployee!: string;
  public totalPages!: number;
  public addBtn: boolean = false;
  public deafultBtn: boolean = false;
  public toggleBtn: boolean = false;
  public progressSpinner!: boolean;
  public projectEmployees:EmployeeForProjects[] = [];
  public currentPage: number = 1;
  public range!: FormGroup;
  public currentMembersInProject :{employeeName: string; employeeId: number}[]=[]
  // public membersList!: EmployeeForProjects[];
  public myData$!: Observable<any>;
  public pagedItemsCount: number = 10;
  // private destroy$ = new Subject<void>();
  public dataPage: DataPage = {
    "pageIndex": 1,
    "pagedItemsCount": 10,
    "orderKey": "id",
    "sortedOrder": 0,
    "search": "",
    "dateRange": null
  };
  public data!: DialogService;
  constructor(
    private employeService: EmployeServiceService,
    private dialogService: DeleteDialogService,
    public toaster: ToastService,
    public fb: FormBuilder
    // @Inject(MAT_DIALOG_DATA) public data: DialogService
  ) {
     super();
    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
  }

  // ngOnInit(): void {
  //   this.getEmployeeData();
  //   this.myData$ = this.employeService.getEmployeeList().pipe(
  //     this.takeUntilDestroy(),
  //     tap((data) => {
  //       this.employeeList = data.data;
        
  //       // Mark checkboxes for already selected members
  //       this.employeeList.forEach((employee) => {
  //         employee.isChecked = this.projectEmployees.some(
  //           (member) => member.employeeId === employee.id
  //         );
  //         console.log(employee.isChecked);
  //       });
  //     })
  //   );
  //   // this.myData$ = this.employeService.getEmployeeList().pipe(
  //   //   this.takeUntilDestroy(), 
  //   //   tap(data => {
  //   //     console.log('Data:', data);
  //   //   })
  //   // );

  //   this.myData$.subscribe();

  //   this.range.valueChanges.pipe(this.takeUntilDestroy()).subscribe((value) => {
  //     this.updateDateRange(value);
  //   });
  // }

  ngOnInit(): void {
    this.getEmployeeData();
  
    this.myData$ = this.employeService.getEmployeeList().pipe(
      this.takeUntilDestroy(),
      tap((data) => {
        this.employeeList = data.data;
        this.employeeList.forEach((employee) => {
          const isPresent = this.projectEmployees.some((mem) => {
            // console.log("MemberID", mem.employeeId);
            return mem.employeeId === employee.id;
          });

          employee.isChecked = isPresent;
        });
  
        this.filteredEmployeeData = [...this.employeeList];
      })
    );
  
    this.myData$.subscribe();
  
    // Handle range value changes
    this.range.valueChanges.pipe(this.takeUntilDestroy()).subscribe((value) => {
      this.updateDateRange(value);
    });
  }
  

  public updateDateRange(value: any) {
    // console.log(value);
    const { start, end } = value;
    if (start) {
      this.dataPage.dateRange = {
        startDate: new Date(start).toISOString(),
        endDate: end ? new Date(end).toISOString(): new Date(Date.now()).toISOString(),
      };
      // console.log(this.dataPage);
      this.FilterChange();
    } else {
      console.error("Invalid date range");
      this.toaster.showWarning("Invalid Date Range");
    }
  }

  public selectAllEmployees(event: MatCheckboxChange): void {
    const isChecked = event.checked;
    
    if (isChecked) {
      this.projectEmployees = []; 
    }
  
    this.employeeList?.forEach((employee) => {
      employee.isChecked = isChecked;
  
      if (employee.isChecked) {
        this.projectEmployees.push({
          employeeId: employee.id,
          employeeName: employee.name,
        });
      }
    });
  }
  
  // Fetch department data and display it
  public getEmployeeData(): void {
    this.progressSpinner = true;
    this.employeService.getEmployeeList().pipe(this.takeUntilDestroy()).subscribe({
      next: (response: EmployeeResponse) => {
        this.progressSpinner = false;
        this.employeeList = response.data;
        this.filteredEmployeeData = this.employeeList; 
        this.FilterChange();
        this.employeeListLength = this.employeeList.length;
      },
      error: (err: string) => {
        console.log('Error occurred', err);
      }
    });
  }

  // Delete a employee and refresh the list
  public deleteEmployee(id: number): void {
    // debugger;
    this.dialogService
      .openConfirmDialog('Are you sure to delete this Employee?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          if (id !== null && id !== undefined) {
            this.employeService.deleteEmployee(id).pipe(this.takeUntilDestroy()).subscribe({
              next: () => {
                // console.log('Employee deleted successfully.');
                this.toaster.showSuccess("Employee deleted successfully");
                this.getEmployeeData();
              },
              error: err => {
                console.error('Error deleting Employee:', err);
                this.toaster.showSuccess("Error while deleting employee");
              },
              complete: () => {
                // console.log('Deletion process completed.');
              }
            });
          } else {
            this.toaster.showInfo('Invalid ID')
            console.error('Invalid ID');
          }
        }
      });
  }

  public onPrevious2(pageNumber: number): void {
    this.dataPage.pageIndex = pageNumber;
      this.FilterChange();
  }

  public onNext2(pageNumber: number): void {
    const totalPages = this.getTotalPages();
    this.dataPage.pageIndex = pageNumber;
    this.FilterChange();
    // if (this.dataPage.pageIndex < totalPages) {
    //   this.dataPage.pageIndex++;
    //   this.FilterChange();
    // }
  }

  public onPageSizeChange2(pageSize: number): void {
    const newPageSize = pageSize;
    this.dataPage.pagedItemsCount = Number(newPageSize);
    this.dataPage.pageIndex = 1; 
    this.currentPage = 1;
    this.pagedItemsCount = Number(newPageSize);
    this.FilterChange(); 
  }

  public FilterChange(): void {
    this.employeService.paginationOnEmployee(this.dataPage).pipe(this.takeUntilDestroy()).subscribe({
      next: (data) => {
        this.employeeList = data.data.data;
        this.filteredEmployeeData = this.employeeList;
        this.employeeListLength = data.data.totalItems; 
        this.totalPages = this.getTotalPages(); 
        this.totalPagesList = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (err) => {
        // console.log(err);
        this.toaster.showWarning("Error occurred while Filtering");
      }
    });
  }

  public resetForm(): void {
    const ResetData = {
      pageIndex: 1,
      pagedItemsCount: 10,
      orderKey: 'Name',
      sortedOrder: 1,
      search: '',
      dateRange: null
    };

    this.employeService.paginationOnEmployee(ResetData).pipe(this.takeUntilDestroy()).subscribe({
      next: (data) => {
        this.employeeList = data.data.data;
        this.filteredEmployeeData = this.employeeList;
      },
      error: (err) => {
        // console.log(err);
        this.toaster.showWarning("Error occured while Filtering");
      }
    })
  }

  public searchEmployeeNew(): void {
    this.dataPage.pageIndex = 1;
    this.dataPage.pagedItemsCount = 10;
    this.currentPage = 1;
    this.pagedItemsCount = 10;
    this.FilterChange();
  }

  public onCheckboxChange(event: any, employee: any): void{
    if (event.checked) {
      if (!this.existInArray(employee.id)) {
        this.projectEmployees.push({
          employeeId: employee.id,
          employeeName: employee.name
        });
      }
    } else {
      this.projectEmployees = this.projectEmployees.filter(
        (e) => e.employeeId !== employee.id
      );
    }
  }

  public getTotalPages(): number {
    return Math.ceil(this.employeeListLength / this.dataPage.pagedItemsCount);
  }
    
    goToPage(pageNumber: number) {
      this.currentPage = pageNumber;
      this.loadPageData(pageNumber);
    }
    
    public loadPageData(pageNumber: number): void {
      this.dataPage.pageIndex = pageNumber;
      this.FilterChange();
    }

    public loadPageData2(pageNumber: number): void {
      this.dataPage.pageIndex = pageNumber;
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

// Add employee to the project
public addEmployeeInProject(id: number, name: string) {
  if (!this.existInArray(id)) {
    this.projectEmployees.push({
      employeeId: id,
      employeeName: name,
  });
  }
  // this.addMembers(id); 
  // console.log(this.projectEmployees);
}

// Remove employee from the project
public removeEmployeeInProject(id: number) {
  const index = this.projectEmployees.findIndex(emp => emp.employeeId === id);
  if (index > -1) {
    this.projectEmployees.splice(index, 1);
  }
  // (this.projectEmployees);console.log
}

// Check if employee exists in the array
public existInArray(id: number): boolean {
  return this.projectEmployees.some(emp => emp.employeeId === id);
}

public handlePageSizeChange(newPageSize: number): void{
  // console.log("New Page ISze",newPageSize);
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

