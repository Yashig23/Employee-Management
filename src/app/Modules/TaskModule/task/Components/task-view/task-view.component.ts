import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { TaskServiceService } from '../../Services/task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { Parent, subTasks, taskData, TaskReviewData, TaskTypeDialogData, AssignedTo, DataForEmployee, PaginatedEpicTask2, TaskType, Data, DataOfParent } from '../../Models/task.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
import { ProjectListOfEmployee } from '../../../../ProjectModule/project/Models/Project.model';
import { MatSelectChange } from '@angular/material/select';
import { TaskDetails } from '../../../../EmployeModule/employee/Models/Employee.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {
  public paramId!: number;
  public isEdit!: boolean;
  public taskDetails!: taskData;
  public reviews: TaskReviewData[] = [];
  public subTasks: subTasks[] = [];
  public openReviewBox: boolean = false;
  public reviewContent!: string;
  public taskData!: { taskId: number };
  public progressSpinner!: boolean;
  public taskForm!: FormGroup;
  public ParentInfo!: Parent;
  public disableSubmitBtn!: boolean;
  public projectId!: number;
  public taskTypeDialog!: TaskTypeDialogData;
  public originalEstimatedTime!: number | null;
  public remainingEstimatedTime!: number | null;
  public previousOriginalEstimate!: number | null;
  public previousRemainingEstimate!: number | null;
  public EmployeeList: DataForEmployee[]|null=[];
  public originalName!: string;
  public previousName!: string;
  public description!: string | null;
  public newTaskType!: number;
  public TaskType!: number;
  public taskId!: number;
  public EmployeeName!: string | null;
  public previousDescription!: string | null;
  public ParentList: DataOfParent[] | null=[];
  public ParentType!: TaskType;
  public editBoolean: boolean = false;
  public isEditing: boolean = false; // Tracks whether the review is in edit mode
  public editContent: string = ''; 
  public taskReviewId: number | null = null;
  public taskReviewContent = new FormControl<string | null>(null, [
    Validators.required,
  ]);
  constructor(private projectService: ProjectService, private taskService: TaskServiceService, private activatedRoute: ActivatedRoute, private toaster: ToastService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if (this.paramId) {
        this.isEdit = true;
        console.log(this.paramId);
        this.getDetailsOfTask();
        this.getEmployeeList();
        this.initializeTaskForm();
        this.EmployeeName = localStorage.getItem('EmployeeName');
        console.log("EmployeeName", this.EmployeeName);
      }
    });
  }

  public initializeTaskForm(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.taskDetails.description),
      assignedTo: new FormControl(this.taskDetails.assignedTo),
      projectId: new FormControl(this.projectId),
      parentId: new FormControl(this.ParentInfo?.id),
      taskType: new FormControl(this.taskDetails.taskType),
      status: new FormControl(this.taskDetails.status),
      originalEstimateHours: new FormControl(this.taskDetails.originalEstimateHours),
      remainingEstimateHours: new FormControl(this.taskDetails.remainingEstimateHours),
      sprintId: new FormControl(this.taskDetails.sprintId)
    });

  }

  public getDetailsOfTask(): void {
    this.progressSpinner = true;
    this.taskService.getTaskDetailsById(this.paramId).subscribe({
      next: (data) => {
        console.log(data);
        this.ParentList = [];
        this.progressSpinner = false;
        const TaskDetails = data.data.task;
        this.taskDetails = data.data.task;
        this.reviews = data.data.reviews;
        this.subTasks = data.data.subTasks;
        this.TaskType = this.taskDetails.taskType;
        this.ParentInfo = data.data.parent;
        this.projectId = this.taskDetails.projectId;
        this.originalEstimatedTime = this.taskDetails.originalEstimateHours;
        this.remainingEstimatedTime = this.taskDetails.remainingEstimateHours;
        this.description = this.taskDetails.description;
        this.originalName = this.taskDetails.name;
        const ProjectId = data.data.task.projectId;
        console.log("Project Id", ProjectId);
        const ParentType = data.data.parent?.taskType;
        this.taskId = data.data.task.id;
        console.log("TaskId", this.taskId);
        console.log("Parent type", ParentType);
        this.getParentList1(ProjectId, ParentType);
             // this.taskForm.patchValue(TaskDetails);
      },
      error: (err) => {
        console.log(err);
        this.progressSpinner = false;
      }
    })
  }

  public addReviews() {
    console.log("add");
    this.openReviewBox = !this.openReviewBox;
  }

  public submitReview() {
    const TaskData = {
      content: this.reviewContent
    }
    console.log(TaskData);
    if (TaskData) {
      console.log('Submitting Task Review:', TaskData);

      this.taskService.postTaskReview(TaskData, this.paramId).subscribe({
        next: (data) => {
          console.log(data);
          // console.log('Review submission success:', data);
          this.toaster.showSuccess('Added review successfully');
          this.reviewContent = "";
          this.getDetailsOfTask();
          this.openReviewBox = !this.openReviewBox;
        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.toaster.showWarning(`Error occurred while adding review`);
        }
      })
    }
    else {
      this.toaster.showWarning("Error occured");
    }
  }


checkAndUpdateTask(type: string) {
  if (type === 'original' && this.originalEstimatedTime !== this.previousOriginalEstimate) {
    this.previousOriginalEstimate = this.originalEstimatedTime;
    this.updateTask();
  } else if (type === 'remaining' && this.remainingEstimatedTime !== this.previousRemainingEstimate) {
    this.previousRemainingEstimate = this.remainingEstimatedTime;
    this.updateTask();
  }
  else if(type === 'description' && this.description != this.previousDescription){
    this.description = this.previousDescription;
    this.updateTask();
  }
  else if(type === 'name' && this.originalName != this.previousName){
    this.originalName = this.previousName;
    this.updateTask();
  }
}

oninput(){
  console.log("input has entered");
}

  public updateTask(): void {
        console.log("enter into upadte function..")
        setTimeout(()=>{
        const body = {
          name: this.taskDetails.name,
          description: this.taskDetails.description,
          assignedTo: Number(this.taskDetails.assignedTo),
          projectId: Number(this.projectId),
          parentId:  this.ParentInfo?.id ? Number(this.ParentInfo.id) : null,
          taskType: Number(this.taskDetails.taskType),
          status: Number(this.taskDetails.status),
          originalEstimateHours: Number(this.originalEstimatedTime),
          remainingEstimateHours: Number(this.remainingEstimatedTime),
          sprintId: Number(this.taskDetails.sprintId),
        };
        // console.log(this.taskForm.value.taskType);
        console.log("body of request",body);
        if (this.isEdit == true) {
          this.taskService.updatedTask(body, this.paramId).subscribe({
            next: (data) => {
              console.log(data);
              this.toaster.showSuccess('Task Updated successfully');
              this.getDetailsOfTask();
            },
            error: (err) => {
              console.log(err);
              this.toaster.showWarning("Error occured while updating the task");
            }
          })
        }
        else{
          this.toaster.showWarning("Unable to fetch the is of task");
        }
      }, 1000)
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
            console.log(data)
            this.getDetailsOfTask();
          },
          error: (err)=>{
            console.log(err);
          }
        })
      }

      private askUserToChoose(): number {
        const choice = window.confirm("Do you want to add a Task? Click 'Cancel' for Bug");
        return choice ? 3 : 4;
      }

      public getEmployeeList(): void{
        this.taskService.getProjectEmployeeList(this.paramId).subscribe({
          next: (data)=>{
            console.log(data);
            const Data = data.data;
            this.EmployeeList = Data;
            console.log(data);
            console.log("Employee List", Data);
          },
          error: (err)=>{
            console.log(err);
            this.toaster.showInfo("Error while fetching details of Employee");
          }
        })
      }

      public employeeUpdate(e: Event){
        const selectElement = e.target as HTMLSelectElement;
        const selectedEmployee = Number(selectElement.value);
        console.log(selectedEmployee);
        this.taskDetails.assignedTo = selectedEmployee;
        this.updateTask();
      
        console.log(this.taskDetails);
      }

      public getParentList1(ProjectId: number, ParentType: number): void{
         this.taskService.getParentList(ProjectId, ParentType).subscribe({
          next: (data)=>{ 
            this.ParentList = data.data;
            console.log("Parent List Upate",this.ParentList);
          },
          error: (err)=>{
            console.log(err);
          }
         })
      }
      
      // todo update the function
      public onParentChange(id: number): void{
        this.updateTaskParent('parentId', id);
      }

      public updateTaskParent(data: string, id: number): void{
        this.taskService.updateTask(this.taskDetails.id, id, data).subscribe({
          next: (data)=>{
            console.log(data);
            console.log("Task Updated successfully");
            this.toaster.showSuccess("Task Updated successfully");
            this.getDetailsOfTask();
          },
          error: (err)=>{
            console.log(err);
            console.log("error while updating the task");
            this.toaster.showWarning("error while updating the task");
          }
        })
      }

      public onStatusChange(newStatus: number){
        this.updateTaskParent('status', newStatus );
      }

      public updateReviews(data: string, taskId: number): void{
        // const taskReview = this.taskDetails.
        this.taskService.updateReview(data, taskId).subscribe({
          next:(data)=>{
             console.log(data);
             this.getDetailsOfTask();
             this.editBoolean = false;
          },
          error: (err)=>{
            console.log(err);
            console.log("error occured while updating review");
            this.editBoolean = false;
          }
        })
      }

      toggleEdit(): void {
        if (this.isEditing) {
  
          // this.saveReview();
        }
        this.isEditing = !this.isEditing;
      }
    
      cancelEdit(): void {
        this.isEditing = false;
        // this.editContent = this.review.content;
      }

      openEditSection(reviewId: number, open: boolean): void {
        if (open &&  reviewId) {
          this.isEditing = true;
        } else {
          this.isEditing = false;
        }
      }

      public editReviewContent(id: number, body: string){
        this.taskReviewId = id;
        this.taskReviewContent.setValue(body);
        this.editBoolean = true;
      }

      public updateReview(): void{
        console.log("updated");
      }

    }
