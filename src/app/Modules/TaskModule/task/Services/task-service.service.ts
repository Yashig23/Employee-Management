import { Injectable } from '@angular/core';
import { environment1, environment2 } from '../../../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, DataForSubTask, DataPost, deleteTaskResponse, getTaskDetailsById, getTaskReviewResponse, PaginatedEpicTask, PaginatedEpicTask2, PaginatedEpicTaskResponse, PaginationTaskResponse, ParentListResponse, PostReviewRequest, ProjectListEmployeeData, taskByIdResponse, TaskCountResponse, taskData, TaskList, TaskLogResponse, taskOfSprintResponse, TaskPostRequest, TaskPostResponse, TaskType, updateTaskRequest, updateTaskResponse } from '../Models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  public url = environment2.apiUrl.Task;
  public url1 = environment1.apiUrl.Task;
  public epicURL = environment1.apiUrl.Epic;
  public pagination = environment1.apiUrl.PaginationTasks;
  public taskPost = environment1.apiUrl.TaskReview;
  public paginationEpicUrl = environment1.apiUrl.PaginationEpicTasks

  constructor(private httpClient: HttpClient) { }
  public token = environment1.token;

  public getTasksList(): Observable<TaskList>{
    return this.httpClient.get<TaskList>(this.url1);
  }

  public deleteTask(id: number): Observable<deleteTaskResponse>{
    return this.httpClient.delete<deleteTaskResponse>(`${this.url1}/${id}`);
  }

  public addTask(data: TaskPostRequest): Observable<TaskPostResponse>{
    return this.httpClient.post<TaskPostResponse>( this.url1, data);
   }

  public updatedTask(data: updateTaskRequest, id: number): Observable<updateTaskResponse>{
    console.log("Data ",data);
    return this.httpClient.put<updateTaskResponse>(`${this.url1}/${id}`, data);
  }

  public paginationOnTask(data: DataPost): Observable<PaginationTaskResponse>{
    console.log(data);
    return this.httpClient.post<PaginationTaskResponse>(this.pagination, data)
  }

  public getEpics(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(this.epicURL)
  }

  public paginatedTaskList(data: PaginatedEpicTask2, id: number): Observable<PaginatedEpicTaskResponse>{
    return this.httpClient.post<PaginatedEpicTaskResponse>(`${this.paginationEpicUrl}/${id}`, data)
  }

  public getSubTaskList(id: number): Observable<DataForSubTask>{
    return this.httpClient.get<DataForSubTask>(`https://192.168.1.8:8081/Tasks/task${id}/children`)
  }

  public postTaskReview(body: { content: string; }, id: number): Observable<TaskPostRequest>{
    return this.httpClient.post<TaskPostRequest>(`https://192.168.1.8:8081/TaskReview/${id}`, body)
  }

  public getTaskReviewList(id: number): Observable<getTaskReviewResponse>{
    return this.httpClient.get<getTaskReviewResponse>(`${this.taskPost}/${id}`);
  }

  public getTaskDetailsById(id: number): Observable<getTaskDetailsById>{
    return this.httpClient.get<getTaskDetailsById>(`${this.url1}/${id}`);
  }

  public getProjectEmployeeList(id: number): Observable<ProjectListEmployeeData>{
    return this.httpClient.get<ProjectListEmployeeData>(`https://192.168.1.8:8081/api/ProjectEmployee/${id}`);
  }

  public getTaskLog(id: number): Observable<TaskLogResponse>{
    return this.httpClient.get<TaskLogResponse>(`https://192.168.1.8:8081/api/Tasklog/${id}`)
  }

  public getTaskListOfSprintId(id: number): Observable<taskOfSprintResponse>{
    return this.httpClient.get<taskOfSprintResponse>(`${this.url1}/sprint/${id}`);
  }

  public taskStatusUpdate(id:number, status: number): Observable<deleteTaskResponse>{
    return this.httpClient.put<deleteTaskResponse>(`${this.url1}/update-status/${id}`, status);
  } 

  public getParentList(projectId: number, Tasktype: TaskType): Observable<ParentListResponse>{
    return this.httpClient.get<ParentListResponse>(`${this.url1}/${projectId}/type=${Tasktype}`)
  }

  public updateReview(data: string, id: number): Observable<deleteTaskResponse>{
    const body ={
      content: data
    }
    return this.httpClient.put<deleteTaskResponse>(`https://192.168.1.8:8081/TaskReview/${id}`, data);
  }

  public updateTask(taskId: number, data: number, path: string): Observable<deleteTaskResponse> {
    const patchData = [
      {
        "op": "replace",
        "path": `/${path}`,
        "value": data
      }
    ];
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      'Authorization': `Bearer ${this.token}`
    });
    console.log(patchData);
  
    return this.httpClient.patch<deleteTaskResponse>(`https://192.168.1.8:8081/Tasks/${taskId}`, patchData, { headers })
  }

  public getCounts(): Observable<TaskCountResponse>{
    return this.httpClient.get<TaskCountResponse>(`https://192.168.1.8:8081/Tasks/Count`)
  }

  public deleteSprint(id: number): Observable<deleteTaskResponse>{
    return this.httpClient.delete<deleteTaskResponse>(`https://192.168.1.8:8081/api/Sprint/${id}`)
  }
}

