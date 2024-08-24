import { Component, Inject, OnInit } from '@angular/core';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { DataPage, DialogService, Employee, EmployeeAddedList, EmployeeResponse } from '../../Models/Employee.model';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { EmployeeForProjects } from '../../../../ProjectModule/project/Models/Project.model';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.scss'
})
export class EmployeListComponent implements OnInit {

  public employeeList: Employee[] = [];
  public searchQuery: string = '';
  public filteredEmployeeData: Employee[] = [];
  public totalPagesList!: number[];
  public addedMembersList: EmployeeAddedList[]=[];
  public employeeListLength!: number;
  public searchEmployee!: string;
  public totalPages!: number;
  public addBtn: boolean = false;
  public deafultBtn: boolean = false;
  public toggleBtn: boolean = false;
  public progressSpinner!: boolean;
  public projectEmployees: EmployeeForProjects[]=[] ;
  public currentPage: number = 1;
  public pagedItemsCount: number = 10;
  public dataPage: DataPage = {
    "pageIndex": 1,
    "pagedItemsCount": 10,
    "orderKey": "Name",
    "sortedOrder": 2,
    "search": ""
  };
  public data!: DialogService;
  constructor(
    private employeService: EmployeServiceService,
    private dialogService: DeleteDialogService,
    public toaster: ToastService,
    // @Inject(MAT_DIALOG_DATA) public data: DialogService
  ) {
    console.log("Moaded");
    console.log(this.data?.isActive);
    console.log(this.data); 
  }

  ngOnInit(): void {
    // this.loadEmployeeData();
    this.getEmployeeData();
    // this.FilterChange();
    console.log("loaded 1")
  }

  // Fetch department data and display it
  public getEmployeeData(): void {
    this.progressSpinner = true;
    this.employeService.getEmployeeList().subscribe({
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
    debugger;
    this.dialogService
      .openConfirmDialog('Are you sure to delete this Employee?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          if (id !== null && id !== undefined) {
            this.employeService.deleteEmployee(id).subscribe({
              next: () => {
                console.log('Employee deleted successfully.');
                this.toaster.showSuccess("Employee deleted successfully");
                this.getEmployeeData();
              },
              error: err => {
                console.error('Error deleting Employee:', err);
                this.toaster.showSuccess("Error while deleting employee");
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
    this.currentPage = 1;
    this.pagedItemsCount = Number(selectElement.value);
    this.FilterChange(); 
  }

  public FilterChange(): void {
    this.employeService.paginationOnEmployee(this.dataPage).subscribe({
      next: (data) => {
        this.employeeList = data.data.data;
        this.filteredEmployeeData = this.employeeList;
        this.employeeListLength = data.data.totalItems; 
        this.totalPages = this.getTotalPages(); 
        // this.totalPagesList.push(this.totalPages);
        this.totalPagesList = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        console.log(this.filteredEmployeeData);
      },
      error: (err) => {
        console.log(err);
        this.toaster.showWarning("Error occurred while Filtering");
        // alert("Error occurred");
      }
    });
  }

  public resetForm(): void {
    const ResetData = {
      pageIndex: 1,
      pagedItemsCount: 10,
      orderKey: 'Name',
      sortedOrder: 1,
      search: ''
    };

    this.employeService.paginationOnEmployee(ResetData).subscribe({
      next: (data) => {
        this.employeeList = data.data.data;
        this.filteredEmployeeData = this.employeeList;
        console.log(typeof this.employeeList);
        console.log(typeof this.filteredEmployeeData);
        console.log(this.filteredEmployeeData);
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        this.toaster.showWarning("Error occured while Filtering");
        // alert("error occured");
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

  public getTotalPages(): number {
    return Math.ceil(this.employeeListLength / this.dataPage.pagedItemsCount);
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

// Add employee to the project
public addEmployeeInProject(id: number, name: string) {
  if (!this.existInArray(id)) {
    this.projectEmployees.push({
      employeeId: id,
      employeeName: name,
  });
  }
  // this.addMembers(id); 
  console.log(this.projectEmployees);
}

// Remove employee from the project
public removeEmployeeInProject(id: number) {
  const index = this.projectEmployees.findIndex(emp => emp.employeeId === id);
  if (index > -1) {
    this.projectEmployees.splice(index, 1);
  }
  console.log(this.projectEmployees);
}

// Check if employee exists in the array
public existInArray(id: number): boolean {
  return this.projectEmployees.some(emp => emp.employeeId === id);
}
}

