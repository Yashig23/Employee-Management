import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartmentServiceService } from '../../../../DepartmentModule/department/Service/department-service.service';
import { DeleteDialogService } from '../../Services/delete-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../Services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataPage, Department } from '../../../../DepartmentModule/department/Models/department.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pagedItemsCount!: number;
  @Input() pageIndex!: number;
  @Input() totalPagesList: number[] =[];
  @Input() totalLength!: number;
  @Input() totalPages!: number;
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() onPreviousClick = new EventEmitter<number>();
  @Output() onNextClick = new EventEmitter<number>();
  @Output() goToPageValue = new EventEmitter<number>();
  public departmentList: Department[] = [];
  public searchQuery: string = '';
  public filteredDepartmentData: Department[] = []; 
  public departmentListLength!: number;
  public currentPage: number = 1;
  // public totalPages!: number;
  public progressSpinner!: boolean;
  // public totalPagesList!: number[];
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
    // console.log(this.pagedItemsCount);
    // console.log(this.pageIndex);
    // console.log(this.totalPagesList);
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

  public FilterChange(): void {
    this.departmentService.paginationOnDepartments(this.dataPage).subscribe({
      next: (data) => {
        this.departmentList = data.data.data;
        this.filteredDepartmentData = this.departmentList;
        this.departmentListLength = data.data.totalItems; 
        this.totalPages = this.getTotalPages(); 
        // this.totalPagesList.push(this.totalPages);
        this.totalPagesList = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        // console.log(this.filteredDepartmentData);
      },
      error: (err) => {
        // console.log(err);
        this.toaster.showWarning("Error occurred while Filtering");
        // alert("Error occurred");
      }
    });
  }

  public onPrevious(): void {
    if(this.pageIndex>1){
      this.pageIndex--;
      this.onPreviousClick.emit(this.pageIndex);
    }
  }

  public onNext(): void {
    const totalPages = this.getTotalPages();
    if (this.pageIndex < totalPages) {
      this.pageIndex++;
      this.onNextClick.emit(this.pageIndex);
    }
  }
  
  public onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    // this.dataPage.pagedItemsCount = Number(selectElement.value);
    this.dataPage.pageIndex = 1; 
    this.pagedItemsCount = Number(selectElement.value);
    this.currentPage = 1;
    this.pageSizeChange.emit(this.pagedItemsCount); 
    this.FilterChange(); 
  }

  public getTotalPages(): number {
    return Math.ceil(this.totalLength / this.pagedItemsCount);
  }
    
    goToPage(pageNumber: number) {
      this.currentPage = pageNumber;
      this.loadPageData(pageNumber);
    }
    
    public loadPageData(pageNumber: number): void {
      // console.log(`Loading data for page ${pageNumber}`);
      this.pageIndex = pageNumber;
      this.goToPageValue.emit(this.pageIndex);
      this.FilterChange();
    }
    
    public sortData(event: any): void {
      // console.log(event.active);
      // console.log(event.direction);
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
