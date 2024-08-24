import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../SharedModule/shared/Services/toast.service';
import { TaskServiceService } from '../../Services/task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../../ProjectModule/project/Service/project.service';
import { subTasks, taskData, TaskReviewData } from '../../Models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {
  public paramId!: number;
  public isEdit!: boolean;
  public taskDetails!: taskData;
  public reviews: TaskReviewData[]=[];
  public subTasks: subTasks[]=[];
  public openReviewBox: boolean = false;
  public reviewContent!: string;
  public taskData!: {taskId: number};
  public progressSpinner!: boolean;
  constructor(private projectService: ProjectService, private taskService: TaskServiceService, private activatedRoute: ActivatedRoute, private toaster: ToastService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.paramId = Number(paramMap.get('id'));
      if(this.paramId){
        this.isEdit = true;
        console.log(this.paramId);
        this.getDetailsOfTask();
      }
    });
  }

  public getDetailsOfTask(): void{
    this.progressSpinner = true;
    this.taskService.getTaskDetailsById(this.paramId).subscribe({
      next: (data)=>{
        console.log(data);
        this.progressSpinner = false;
        this.taskDetails = data.data.task;
        this.reviews = data.data.reviews;
        this.subTasks = data.data.subTasks;
        console.log(this.taskDetails);
      },
      error: (err)=>{
        console.log(err);
        this.progressSpinner = false;
        this.toaster.showInfo("Error occured while fetching Details")
      }
    })
  }

  public addReviews(){
    console.log("add");
    this.openReviewBox =! this.openReviewBox;
  }

  public submitReview(){
    const TaskData = {
      content: this.reviewContent
    }
    console.log(TaskData);
    if(TaskData){
      console.log('Submitting Task Review:', TaskData);

      this.taskService.postTaskReview(TaskData, this.paramId).subscribe({
        next: (data) => {
          console.log(data);
          // console.log('Review submission success:', data);
          this.toaster.showSuccess('Added review successfully');
          this.reviewContent = "";
          this.getDetailsOfTask();
          this.openReviewBox =! this.openReviewBox;
        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.toaster.showWarning(`Error occurred while adding review`);
        }
  })
}
  else{
    this.toaster.showWarning("Error occured");
  }
  }

}
