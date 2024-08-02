import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../Service/department-service.service';
import { Department, DepartmentResponse } from '../../Models/department.model';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DepartmentComponent } from '../department/department.component';

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

  constructor(
    private departmentService: DepartmentServiceService,
    private dialogService: DeleteDialogService,
    public dialog: MatDialog
  ) {
    console.log("Loaded...")
  }

  ngOnInit(): void {
    this.getDepartmentData();
  }

  // Fetch department data and display it
  public getDepartmentData(): void {
    this.departmentService.getDepartmentList().subscribe({
      next: (response: DepartmentResponse) => {
        this.departmentList = response.data || [];
        this.departmentListLength = this.departmentList.length
        this.filteredDepartmentData = this.departmentList; 
        console.log(this.departmentList);
        console.log(response);
      },
      error: (err: string) => {
        // window.alert('Error occurred while displaying the department list');
        console.log('Error occurred', err);
      }
    });
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
                this.getDepartmentData(); 
              },
              error: err => {
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

  // Filter departments based on the search query
  public findDepartment(): void {
    if (this.searchQuery.trim()) {
      this.filteredDepartmentData = this.departmentList.filter(item =>
        item.name!.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredDepartmentData = this.departmentList;
    }
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
          this.findDepartment(); 
        }
      },
      error: (err) => {
        console.error("Error:", err);
        window.alert("An error occurred while adding the department.");
      }
    });
  }

  // deleteDepartment(id: number): void{
  //   console.log("deletd");
  // }

}

