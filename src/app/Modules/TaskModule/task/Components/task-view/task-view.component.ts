import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { TaskServiceService } from '../../Services/task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { Parent, subTasks, taskData, TaskReviewData, TaskTypeDialogData, AssignedTo, DataForEmployee, PaginatedEpicTask2, TaskType, Data, DataOfParent } from '../../Models/task.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskComponent } from '../task/task.component';

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
  public projectId!: number;
  public taskData!: { taskId: number };
  public progressSpinner!: boolean;
  public taskForm!: FormGroup;
  public ParentInfo!: Parent;
  public disableSubmitBtn!: boolean;
  public taskTypeDialog!: TaskTypeDialogData;
  public originalEstimatedTime!: number | null;
  public remainingEstimatedTime!: number | null;
  public previousOriginalEstimate!: number | null;
  public previousRemainingEstimate!: number | null;
  public EmployeeList: DataForEmployee[] | null = [];
  public toggleTaskParentSec: boolean = false;
  public originalName!: string;
  public previousName!: string;
  public description!: string | null;
  public newTaskType!: number;
  public TaskType!: number;
  public taskId!: number;
  public EmployeeName!: string | null;
  public previousDescription!: string | null;
  public ParentList: DataOfParent[] |null = [];
  public ParentType!: TaskType;
  public editBoolean: boolean = false;
  public isEditing: boolean = false; // Tracks whether the review is in edit mode
  public editContent: string = '';
  public taskReviewId: number | null = null;
  public showInputBox: boolean = false;
  public taskReviewContent = new FormControl<string | null>(null, [
    Validators.required,
  ]);
  public reviewDescription = new FormControl<string | null>(null);
  public taskReviewForm: FormGroup = new FormGroup({
    reviewDescription: this.reviewDescription,
  });
  constructor(private projectService: ProjectService, private taskService: TaskServiceService, private activatedRoute: ActivatedRoute, private toaster: ToastService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // console.log(paramMap);
      this.taskId = Number(paramMap.get('taskId'));
      this.projectId = Number(paramMap.get('projectId'));
      this.paramId = Number(paramMap.get('id'));
      if (this.paramId) {
        this.isEdit = true;
        // console.log(this.paramId);
        this.getDetailsOfTask();
        this.getEmployeeList();
        this.initializeTaskForm();
        this.EmployeeName = localStorage.getItem('EmployeeName');
        // console.log("EmployeeName", this.EmployeeName);
      }
    });

    if (!this.taskForm) {
      this.initializeTaskForm(); 
    }

    this.taskForm.valueChanges.subscribe(() => {
      console.log("Form changed!");
    });
    console.log("Project Id", this.projectId);
  }

  public initializeTaskForm(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      assignedTo: new FormControl(''),
      assigneeName: new FormControl(''),
      assignerName: new FormControl(''),
      projectId: new FormControl(0),
      parentId: new FormControl(0),
      taskType: new FormControl(1),
      status: new FormControl(1),
      originalEstimateHours: new FormControl(0),
      remainingEstimateHours: new FormControl(0),
      sprintId: new FormControl(0)
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
        this.originalName = this.taskForm.get('name')?.value;
        const ProjectId = data.data.task.projectId;
        const ParentType = data.data.parent?.taskType;
        this.taskId = data.data.task.id;
        if(ParentType != 0 && ParentType != null && ParentType != undefined){
              this.getParentList1(ProjectId, ParentType);
        }
        this.taskForm.patchValue(this.taskDetails);
      },
      error: (err) => {
        this.progressSpinner = false;
      }
    })
  }

  public addReviews() {
    this.openReviewBox = !this.openReviewBox;
  }

  public submitReview() {
    const TaskData: {
      content: string;
    } = {
      content: this.taskReviewForm.controls['reviewDescription']?.value ?? ''
    };

    if (TaskData.content) {
      // console.log('Submitting Task Review:', TaskData);

      this.taskService.postTaskReview(TaskData, this.paramId).subscribe({
        next: (data) => {
          // console.log(data);
          this.toaster.showSuccess('Added review successfully');
          this.taskReviewForm.reset();
          this.getDetailsOfTask();
          this.openReviewBox = !this.openReviewBox;
        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.toaster.showWarning(`Error occurred while adding review`);
        }
      });
    } else {
      this.toaster.showWarning("Please fill in the review description.");
    }
  }

  public checkAndUpdateTask(type: string): void {

    if (type === 'original' && this.originalEstimatedTime !== this.previousOriginalEstimate) {
      this.previousOriginalEstimate = this.originalEstimatedTime;
      this.updateTask();
    }
    else if (type === 'remaining' && this.remainingEstimatedTime !== this.previousRemainingEstimate) {
      this.previousRemainingEstimate = this.remainingEstimatedTime;
      this.updateTask();
    }
    else if (type === 'description' && this.description !== this.previousDescription) {
      this.previousDescription = this.description;
      this.updateTask();
    }
    else if (type === 'name' && this.originalName !== this.previousName) {
      this.previousName = this.originalName;
      this.updateTask();
    }
  }

  public updateTask(): void {
    setTimeout(() => {
      const body = {
        name: this.taskForm.controls['name'].value,
        description: this.taskForm.controls['description'].value,
        assignedTo: Number(this.taskForm.controls['assignedTo'].value),
        projectId: Number(this.taskForm.controls['projectId'].value),
        parentId: this.ParentInfo?.id ? Number(this.ParentInfo.id) : null,
        taskType: Number(this.taskForm.controls['taskType'].value),
        status: Number(this.taskForm.controls['status'].value),
        originalEstimateHours: Number(this.taskForm.controls['originalEstimateHours'].value),
        remainingEstimateHours: Number(this.taskForm.controls['remainingEstimateHours'].value),
        sprintId: Number(this.taskForm.controls['sprintId'].value),
      };
      if (this.isEdit == true) {
        this.taskService.updatedTask(body, this.paramId).subscribe({
          next: (data) => {
            // console.log(data);
            this.toaster.showSuccess('Task Updated successfully');
            this.getDetailsOfTask();
          },
          error: (err) => {
            // console.log(err);
            this.toaster.showWarning("Error occured while updating the task");
          }
        })
      }
      else {
        this.toaster.showWarning("Unable to fetch the is of task");
      }
    }, 0)
  }

  public openAddTaskDialog(Type: number, Id: number): void {

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

    const taskDialog: TaskTypeDialogData = { taskType: this.newTaskType, taskId: Id, projectId: this.projectId, isEdit: false }

    // console.log(taskDialog);
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '1000px',
      height: '700px',
      disableClose: false,

    });
    dialogRef.componentInstance.taskTypeDialog = taskDialog
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        // console.log("Task added successfully");
        // console.log(data)
        this.getDetailsOfTask();
      },
      error: (err) => {
        // console.log(err);
      }
    })
  }

  private askUserToChoose(): number {
    const choice = window.confirm("Do you want to add a Task? Click 'Cancel' for Bug");
    return choice ? 3 : 4;
  }

  public getEmployeeList(): void {
    const projectId = this.projectId;
    console.log("Project id", this.projectId);
    this.taskService.getProjectEmployeeList(this.projectId).subscribe({
      next: (data) => {
        // console.log(data);
        const Data = data.data;
        this.EmployeeList = Data;
        // console.log(data);
        // console.log("Employee List", Data);
      },
      error: (err) => {
        // console.log(err);
        this.toaster.showInfo("Error while fetching details of Employee");
      }
    })
  }

  public employeeUpdate(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    const selectedEmployee = Number(selectElement.value);
    // console.log(selectedEmployee);
    this.taskDetails.assignedTo = selectedEmployee;
    this.updateTask();

    // console.log(this.taskDetails);
  }

  public getParentList1(ProjectId: number, ParentType: number): void {
    console.log(ProjectId, ParentType);
    this.taskService.getParentList(ProjectId, ParentType).subscribe({
      next: (data) => {
        this.ParentList = data.data;
        // console.log("Parent List Upate", this.ParentList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // todo update the function
  public onParentChange(id: number): void {
    this.updateTaskParent('parentId', id);
  }

  public updateTaskParent(data: string, id: number): void {
    this.taskService.updateTask(this.taskDetails.id, id, data).subscribe({
      next: (data) => {
        // console.log(data);
        // console.log("Task Updated successfully");
        this.toaster.showSuccess("Task Updated successfully");
        this.getDetailsOfTask();
      },
      error: (err) => {
        // console.log(err);
        // console.log("error while updating the task");
        this.toaster.showWarning("error while updating the task");
      }
    })
  }

  public toggleTaskParent(): void{
    console.log("clicked");
    this.toggleTaskParentSec = !this.toggleTaskParentSec;
    console.log(this.toggleTaskParentSec);
  }

  public onStatusChange(newStatus: number) {
    this.updateTaskParent('status', newStatus);
  }

  public cancleUpdate(): void{
    this.editBoolean = false;
    this.taskReviewId = null; 
  }

  public updateReviews(reviewDescription: string, reviewId: number): void {
    this.taskService.updateReview(reviewDescription, reviewId).subscribe({
      next: (response) => {
        // console.log('Review updated:', response);
        this.getDetailsOfTask();
        this.editBoolean = false;
        this.taskReviewId = null; 
      },
      error: (err) => {
        console.error('Error occurred while updating review:', err);
        this.editBoolean = false;
        this.getDetailsOfTask();
      }
    });
  }

  public editReviewContent(id: number, content: string): void {
    this.taskReviewId = id;
    this.taskReviewForm.controls['reviewDescription'].setValue(content);
    this.editBoolean = true;
  }

}
