import { Component, OnInit } from '@angular/core';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { DataPage, Employee, EmployeeResponse } from '../../Models/Employee.model';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.scss'
})
export class EmployeListComponent implements OnInit{

  public employeeList: Employee[] = [];
  public searchQuery: string = '';
  public filteredEmployeeData: Employee[] = []; 
  public employeeListLength!: number;
  public searchEmployee!: string;
  public dataPage: DataPage = {
    "pageIndex": 1,
    "pagedItemsCount": 10,
    "orderKey": "Name",
    "sortedOrder": 1,
    "search": ""
  };

  constructor(
    private employeService: EmployeServiceService,
    private dialogService: DeleteDialogService,
    public dialog: MatDialog
  ) {
    console.log("Moaded");
  }

  ngOnInit(): void {
    // this.loadEmployeeData();
    this.getEmployeeData();
    this.FilterChange();
    console.log("loaded 1")
  }

  // Fetch department data and display it
  public getEmployeeData(): void {
    this.employeService.getEmployeeList().subscribe({
      next: (response: EmployeeResponse) => {
        this.employeeList = response.data;
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
                console.log('Department deleted successfully.');
                this.getEmployeeData(); 
              },
              error: err => {
                console.error('Error deleting Employee:', err);
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

  // Filter departments based on the search query
  public findEmployee(): void {
    if (this.searchQuery.trim()) {
      this.filteredEmployeeData = this.employeeList.filter(item =>
        item.name!.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredEmployeeData = this.employeeList;
    }
  }

  public onPrevious(): void {
    if (this.dataPage.pageIndex > 0) {
      this.dataPage.pageIndex--;
      this.FilterChange();
    }
  }
  public onNext(): void {
    if (this.dataPage.pageIndex < this.employeeListLength -1) {
      this.dataPage.pageIndex++;
      this.FilterChange();
    }
  }

  public FilterChange(): void{
    console.log(this.dataPage);
    this.employeService.paginationOnEmployee(this.dataPage).subscribe({
      next: (data)=>{
        this.employeeList = data.data.data;
        this.filteredEmployeeData = this.employeeList;
        console.log(typeof this.employeeList);
        console.log(typeof this.filteredEmployeeData);
        console.log(this.filteredEmployeeData);
         console.log(data);
      },
      error: (err)=>{
        console.log(err);
        alert("error occured");
      }
    })
  }




}


