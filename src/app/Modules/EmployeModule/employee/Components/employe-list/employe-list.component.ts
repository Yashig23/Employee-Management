import { Component, OnInit } from '@angular/core';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeServiceService } from '../../Service/employe-service.service';
import { Employee, EmployeeResponse } from '../../Models/Employee.model';

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

  constructor(
    private employeService: EmployeServiceService,
    private dialogService: DeleteDialogService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployeeData();
  }

  // Fetch department data and display it
  public getEmployeeData(): void {
    this.employeService.getEmployeeList().subscribe({
      next: (response: EmployeeResponse) => {
        this.employeeList = response.data;
        this.employeeListLength = this.employeeList.length;
        this.filteredEmployeeData = this.employeeList; 
        console.log(this.employeeList);
        console.log(response);
      },
      error: (err: string) => {
        // window.alert('Error occurred while displaying the department list');
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

  // function for adding a new employee
  // public addNewEmployee(): void {
  //   debugger;
  //   console.log("addNewEmployee");
  //   const dialogRef = this.dialog.open(EmployeeComponent, {
  //     width: '400px'
  //   });
  //   dialogRef.afterClosed().subscribe({
  //     next: (result) => {
  //       if (result) {
  //         console.log('Find find');
  //         this.getEmployeeData();
  //         this.findEmployee(); 
  //       }
  //     },
  //     error: (err) => {
  //       console.error("Error:", err);
  //       window.alert("An error occurred while adding the department.");
  //     }
  //   });
  // }

}


