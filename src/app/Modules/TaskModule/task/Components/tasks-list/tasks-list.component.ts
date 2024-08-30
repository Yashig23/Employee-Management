import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TaskServiceService } from '../../Services/task-service.service';
import { assignCount, Data, DataForEmployee, Filters, PaginatedEpicTask, PaginatedEpicTask2, statusCount, TaskTypeDialogData, typeCount } from '../../Models/task.model';
import { TaskComponent } from '../task/task.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { AddSprintComponent } from '../../../../ProjectModule/project/Components/add-sprint/add-sprint.component';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { SprintData2, projectData, getSprintsList } from '../../../../ProjectModule/project/Models/Project.model';
import { DeleteDialogService } from '../../../../SharedModule/shared/Services/delete-dialog.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { TaskViewComponent } from '../task-view/task-view.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnChanges{
  @Input() projectId!: number;
  @Input() openReviewBox!: boolean;
  @Output() taskArrayLengthChanged = new EventEmitter<number>();
  public taskArray: Data[]=[];
  public progressSpinner!: boolean;
  public taskListLength!: number;
  public totalPages!: number;
  public progressSpinner2!: boolean;
  public totalPagesList: number[]=[];
  // public currentPage!: number;
  public type!: number;
  public status: number[] = [];
  public openUserStoryType!: boolean;
  public subTask: Data[]=[];
  // public type!: string; 
  public showSubChild!: boolean; 
  public newTaskType!: number;
  public pagedItemsCount: number = 10;
  public currentPage: number = 1;
  public runSearch: boolean = false;
  public sprintList: SprintData2[]=[];
  public selectedFilterList: Filters[]=[];
  public EmployeeList: DataForEmployee[]=[]
  public range: FormGroup;
  public disableSubmitBtn: boolean = true;
  public taskTypeSelected: boolean = false;
  public statusSelected: boolean = false;
  public assignSelected: boolean = false;
  public assignedToSelected: boolean = false;
  public sprintSelected: boolean = false;
  public EmployeeName!: string | null;
  public TypeCountDetails!: typeCount;
  public AssignedDetails!: assignCount;
  public StatusDetails!: statusCount;
  public Total!: number;

  public EpicTaskData: PaginatedEpicTask2 = {
    assign: null,
assignedTo: null,
dateRange: null,
orderKey: "id",
pageIndex: 1,
pagedItemsCount: 10,
search: "",
sortedOrder: 0,
sprintId: null,
status: null,
types: null,
  };
  
  constructor(public taskService: TaskServiceService, public dialog: MatDialog, public toaster: ToastService
    , public router: Router, private projectService: ProjectService, private dialogService: DeleteDialogService,
    private fb: FormBuilder
  ){
    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
  }

  ngOnInit() {
      this.getTaskEpicList();
      this.getSprintListOfProject(this.projectId);
      this.getEmployeeList(this.projectId);
      this.getTaskCount();
      this.range.valueChanges.subscribe((value) => {
        this.updateDateRange(value);
      });
      this.EmployeeName = localStorage.getItem('EmployeeName');
        console.log("EmployeeName", this.EmployeeName);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId'] && changes['projectId'].currentValue) {
      this.getTaskEpicList();
      this.getTaskCount();
    }
    this.getTaskEpicList();
  }

  public getTaskEpicList(): void{
    console.log(this.EpicTaskData);
     this.taskService.paginatedTaskList(this.EpicTaskData, this.projectId).subscribe({
      next: (data)=>{
        const Data = data.data.data;
        this.taskArray = Data;
        this.FilterChange();
        this.taskArrayLengthChanged.emit(this.taskArray.length);
        console.log(this.taskArray)
        console.log(Data);
        console.log(data)
      },
      error(err) {
          console.log(err);
      },
     })
  }

  public updateDateRange(value: any) {
    console.log(value);
    const { start, end } = value;
    if (start) {
      this.EpicTaskData.dateRange = {
        startDate: new Date(start),
        endDate: end ? new Date(end): new Date(Date.now()),
      };
      console.log(this.EpicTaskData);
      // this.FilterChange();
    } else {
      console.error("Invalid date range");
      this.toaster.showWarning("Invalid Date Range");
    }
  }
  public sortData(event: any): void {
    this.EpicTaskData.orderKey = event.active;

    if (event.direction === 'asc') {
      this.EpicTaskData.sortedOrder = 1;
    }
    else if (event.direction === 'desc') {
      this.EpicTaskData.sortedOrder = 0;
    }
    else {
      this.EpicTaskData.sortedOrder = 2;
    }
    this.FilterChange();
  }

checkIfSubmitShouldBeEnabled(): void {
  this.disableSubmitBtn = !(
    this.taskTypeSelected || 
    this.statusSelected || 
    this.assignSelected || 
    this.assignedToSelected || 
    this.sprintSelected
  );
}

public onPrevious(): void {
  if (this.EpicTaskData.pageIndex > 1) {
    this.EpicTaskData.pageIndex--;
    this.FilterChange();
  }
}

public ResetChanges(): void{
  this.disableSubmitBtn = true;
  this.EpicTaskData.assign = null;
  this.EpicTaskData.assignedTo = null,
  this.EpicTaskData.dateRange = null
  this.EpicTaskData.orderKey = "",
  this.EpicTaskData.pagedItemsCount = 10,
  this.EpicTaskData.pageIndex = 1,
  this.EpicTaskData.search = "",
  this.EpicTaskData.sortedOrder = 2,
  this.EpicTaskData.sprintId = null,
  this.EpicTaskData.status = null,
  this.EpicTaskData.types = null
  this.FilterChange();
}

public onNext(): void {
  const totalPages = this.getTotalPages();
  if (this.EpicTaskData.pageIndex < totalPages) {
    this.EpicTaskData.pageIndex++;
    this.FilterChange();
  }
}

  public openAddTaskDialog(Type: number, Id: number): void{
    
    switch (Type) {
      case 0:
        this.newTaskType = 1;
        break;
      case 1:
        this.newTaskType = 2;
        break;
      case 2:
        this.newTaskType = this.askUserToChoose();  
        break;
      default:
        this.newTaskType = 1;
        break;
    }

    const taskDialog: TaskTypeDialogData = {taskType: this.newTaskType, taskId: Id, projectId: this.projectId, isEdit: false }

    console.log(taskDialog);
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '1000px',
      height: '600px',
      disableClose: false,
  
    }); 
    dialogRef.componentInstance.taskTypeDialog = taskDialog
    dialogRef.afterClosed().subscribe({
      next: (data)=>{
        console.log("Task added successfully");
        // this.taskList = data;
        console.log(data)
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  private askUserToChoose(): number {
    // const DialogRef = this.dialog.open(SubChildTasksComponent);
    const choice = window.confirm("Do you want to add a Task? Click 'Cancel' for Bug");
    return choice ? 3 : 4;
  }

  public onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.EpicTaskData.pagedItemsCount = Number(selectElement.value);
    this.EpicTaskData.pageIndex = 1; 
    this.currentPage = 1;
    this.pagedItemsCount = Number(selectElement.value);
    this.FilterChange(); 
  }

  public searchTaskNew(): void {
    if(this.EpicTaskData.search!.length > 0){
    this.EpicTaskData.pageIndex = 1;
    this.EpicTaskData.pagedItemsCount = 10;
    this.currentPage = 1;
    this.pagedItemsCount = 10;
    this.FilterChange();
    }
  }

  public FilterChange(): void {
    this.progressSpinner = true;
    this.disableSubmitBtn = true;
    console.log(this.EpicTaskData);
    this.taskService.paginatedTaskList(this.EpicTaskData, this.projectId).subscribe({
      next: (data) => {
        this.progressSpinner = false;
        this.taskArray = data.data.data;
        // this.filteredTasksData = this.employeeList;
        this.taskListLength = data.data.totalItems; 
        this.totalPages = this.getTotalPages(); 
        this.totalPagesList.push(this.totalPages);
        this.disableSubmitBtn = false;
        this.totalPagesList = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (err) => {
        this.progressSpinner = false;
        console.log(err);
        this.disableSubmitBtn = false;
        this.toaster.showWarning("Error occurred while Filtering");
        // alert("Error occurred");
      }
    });
  }

  public onAssignBoolChange(event: MatSelectChange): void{
    const assigneBoolValue = event.value;
    console.log(assigneBoolValue);
    this.EpicTaskData.assign = assigneBoolValue;
    this.assignSelected = event.value !== null;
    this.checkIfSubmitShouldBeEnabled();
    // this.FilterChange();
  }
  public getTotalPages(): number {
    return Math.ceil(this.taskListLength / this.EpicTaskData.pagedItemsCount);
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.loadPageData(pageNumber);
  }
  
  public loadPageData(pageNumber: number): void {
    console.log(`Loading data for page ${pageNumber}`);
    this.EpicTaskData.pageIndex = pageNumber;
    this.FilterChange();
  }

public subTaskMap = new Map<number, Data[]>();
public expandedTasks = new Set<number>(); 

public loadSubTasks(id: number, event: MouseEvent): void {
  this.progressSpinner2 = true;
  event.stopPropagation();

  if (!this.subTaskMap.has(id) || this.subTaskMap.get(id)!.length === 0) {
    this.taskService.getSubTaskList(id).subscribe({
      next: (response) => {
        this.progressSpinner2 = false;
        const newSubTasks = response.data;
        this.subTaskMap.set(id, newSubTasks);
        this.expandedTasks.add(id);
        console.log(response);
        console.log(this.subTaskMap);
      },
      error: (err) => {
        this.toaster.showWarning("Error occure while fetching details of subtasks");
        this.progressSpinner2 = false;
        console.log(err);
      }
    });
  } else {
    if (this.expandedTasks.has(id)) {
      this.expandedTasks.delete(id);
    } else {
      this.expandedTasks.add(id);
    }
  }
}

public getSubTasks(id: number): Data[] {
  return this.subTaskMap.get(id) || [];
}

public hasSubTasks(id: number): boolean {
  return this.subTaskMap.has(id) && this.subTaskMap.get(id)!.length > 0;
}

public isExpanded(id: number): boolean {
  return this.expandedTasks.has(id);
}

public getEmployeeList(id: number){
  console.log("id of project", id);
  this.taskService.getProjectEmployeeList(id).subscribe({
    next:(data)=>{
      const Data = data.data;
      this.EmployeeList = Data;
      console.log(this.EmployeeList);
      console.log(data);
      console.log("Employee List",Data);
    },
    error: (err)=>{
      console.log(err);
      this.toaster.showInfo("Error occured while fetching details");
    }
  })
}

public onTaskTypeChange(event: MatSelectChange): void {
  const taskType = event.value;
  this.disableSubmitBtn = false;
  this.EpicTaskData.types = taskType;
  this.taskTypeSelected = event.value && event.value.length > 0;
  this.checkIfSubmitShouldBeEnabled();
}

public onAssignedChange(event: MatSelectChange): void{
  const assignedId = event.value;
  this.EpicTaskData.assignedTo = assignedId;
  // this.FilterChange();
  console.log(assignedId);
  this.assignedToSelected = event.value && event.value.length > 0;
  this.checkIfSubmitShouldBeEnabled();
  this.getEmployeeList(this.projectId);
}

public onStatusChange(event: MatSelectChange): void {
  const status = event.value;
  console.log(status);
  this.disableSubmitBtn = false;
  this.EpicTaskData.status = status;
  this.statusSelected = event.value && event.value.length > 0;
  this.checkIfSubmitShouldBeEnabled();
}

public onTaskNone(): void{
  const newData = {
    item1: 'type',
    item2: 5
  }
  // this.updateFilters(newData.item1, newData.item2)
}



// private updateFilters(item1: string, item2: number): void {
//   const filters = this.EpicTaskData.filters || [];
//   const existingFilterIndex = filters.findIndex(
//     (filter) => {filter.item1 === item1 && filter.item2 === item2}
//   );

//   if (existingFilterIndex > -1) {
//     filters[existingFilterIndex] = { item1, item2 };
//   } else {
//     filters.push({ item1, item2 });
//   }

//   this.EpicTaskData.filters = filters;
//   console.log(this.EpicTaskData);
//   this.searchTaskNew();
//   // this.FilterChange();
// }

public onSprintChange(event: MatSelectChange){
  const sprint = event.value;
  this.EpicTaskData.sprintId = sprint;
  console.log(this.EpicTaskData);
  console.log("changes");
  this.sprintSelected = event.value !== 0;
  this.checkIfSubmitShouldBeEnabled();
  // this.FilterChange();
}

public SubmitChanges(){
  if(this.disableSubmitBtn == false){
  this.EpicTaskData.pageIndex = 1;
  this.EpicTaskData.pagedItemsCount = 10;
  this.currentPage = 1;
  this.pagedItemsCount = 10;
  this.FilterChange();
  }
}

public getTaskCount(): void{
  this.taskService.getCounts().subscribe({
    next: (data)=>{
      console.log(data);
      // console.log(data.data);
      this.TypeCountDetails = data.typeCount;
      this.AssignedDetails = data.assignCount;
      this.StatusDetails = data.statusCount;
      this.Total = data.total
      console.log("TypeCount",this.TypeCountDetails);
    },
    error: (err)=>{
      console.log("Error while fetching the count of task",err);
    }
  })
}

public addSprint(id: number): void{
  const data = {projectId: id}
const DialogRef = this.dialog.open(AddSprintComponent, {
  width: '300px',
  height: '450px',
});
 DialogRef.componentInstance.projectData = data;
 DialogRef.afterClosed().subscribe({
  next: (data)=>{
    console.log(data);
    this.toaster.showSuccess("Task Added successfully");
    this.getSprintListOfProject(this.projectId);
  },
  error: (err)=>{
    console.log(err);
    this.toaster.showWarning("Error while adding Task");
  }
 })
}

public deleteTask(id: number): void {
  // debugger;
  console.log(id);
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
              this.getTaskEpicList();
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

public deleteSprint(id: number): void{
  this.dialogService
      .openConfirmDialog('Are you sure to delete this Sprint?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          if (id !== null && id !== undefined) {
            this.taskService.deleteSprint(id).subscribe({
              next: () => {
                console.log('Sprint deleted successfully.');
                this.toaster.showSuccess('Sprint deleted successfully');
                this.getSprintListOfProject(this.projectId);
              },
              error: err => {
                this.toaster.showWarning('Error while deleting sprint');
                console.error('Error deleting sprint:', err);
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

public updateTask(id: number, Type: number){   
  switch (Type) {
    case 0:
      this.newTaskType = 1;
      break;
    case 1:
      this.newTaskType = 2;
      break;
    case 2:
      this.newTaskType = this.askUserToChoose();  
      break;
    default:
      this.newTaskType = 1;
      break;
  }

  const Data = {projectId: this.projectId, isEdit: true, taskType: this.newTaskType, taskId: id};
  const dialogRef = this.dialog.open(TaskComponent, {
    width: '1000px',
    height: '600px',
    disableClose: false,

  }); 
  dialogRef.componentInstance.updateData = Data;
  dialogRef.afterClosed().subscribe({
    next: (data)=>{
      this.getTaskEpicList();
      // this.taskList = data;
      // console.log(data)
    },
    error: (err)=>{
      console.log(err);
      this.toaster.showWarning("Error occured while updating task")
    }
  })
}

public getSprintListOfProject(id: number): void{
  this.projectService.getSprintListsByProject(id).subscribe({
   next: (data)=>{
     console.log(data);
     const Data = data.data;
     this.sprintList = Data;
     console.log(Data);
   },
   error: (err)=>{
     console.log(err);
     this.toaster.showInfo("Erorr occured while fetching the details of sprint list");
   }
  })
}

public updateSprint(id: number){
  console.log(id);
  const Dialog = this.dialog.open(AddSprintComponent);
  const SprintId = {'sprintId': id};
  const ProjectId = {'projectId': this.projectId};
  Dialog.componentInstance.data = SprintId;
  Dialog.componentInstance.projectIdByTask = ProjectId;
  console.log("Sprint Id", SprintId);
  Dialog.afterClosed().subscribe({
    next:()=>{
      this.getSprintListOfProject(this.projectId);
      // this.toaster.showSuccess("Sprint Updated successfully");
    },
    error: (err)=>{
      console.log(err);
    }
  })
}

public openTaskDetailDialog(id: number): void{
  const Data = {taskId: id}
  const DialogRef = this.dialog.open(TaskViewComponent, {
    width: '1000px',
    height: '700px'
  });

  DialogRef.componentInstance.taskData = Data;
}
}
