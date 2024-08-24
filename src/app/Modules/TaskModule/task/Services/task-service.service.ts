import { Injectable } from '@angular/core';
import { environment1, environment2 } from '../../../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, DataForSubTask, DataPost, deleteTaskResponse, getTaskDetailsById, getTaskReviewResponse, PaginatedEpicTask, PaginatedEpicTask2, PaginatedEpicTaskResponse, PaginationTaskResponse, PostReviewRequest, ProjectListEmployeeData, taskByIdResponse, TaskList, TaskLogResponse, taskOfSprintResponse, TaskPostRequest, TaskPostResponse, updateTaskRequest, updateTaskResponse } from '../Models/task.model';

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
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  public getTasksList(): Observable<TaskList>{
    return this.httpClient.get<TaskList>(this.url1, { headers: this.headers });
  }

  public deleteTask(id: number): Observable<deleteTaskResponse>{
    return this.httpClient.delete<deleteTaskResponse>(`${this.url1}/${id}`, {headers: this.headers});
  }

  public addTask(data: TaskPostRequest): Observable<TaskPostResponse>{
    return this.httpClient.post<TaskPostResponse>( this.url1, data, {headers: this.headers});
   }

  public updatedTask(data: updateTaskRequest, id: number): Observable<updateTaskResponse>{
    console.log("Data ",data);
    return this.httpClient.put<updateTaskResponse>(`${this.url1}/${id}`, data, {headers: this.headers});
  }

  public paginationOnTask(data: DataPost): Observable<PaginationTaskResponse>{
    console.log(data);
    return this.httpClient.post<PaginationTaskResponse>(this.pagination, data, {headers: this.headers})
  }

  public getEpics(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(this.epicURL, {headers: this.headers})
  }

  public paginatedTaskList(data: PaginatedEpicTask2, id: number): Observable<PaginatedEpicTaskResponse>{
    return this.httpClient.post<PaginatedEpicTaskResponse>(`${this.paginationEpicUrl}/${id}`, data, {headers: this.headers})
  }

  public getSubTaskList(id: number): Observable<DataForSubTask>{
    return this.httpClient.get<DataForSubTask>(`https://192.168.1.2:8081/Tasks/task${id}/children`, {headers: this.headers})
  }

  public postTaskReview(body: { content: string; }, id: number): Observable<TaskPostRequest>{
    return this.httpClient.post<TaskPostRequest>(`https://192.168.1.2:8081/TaskReview/${id}`, body, {headers: this.headers})
  }

  public getTaskReviewList(id: number): Observable<getTaskReviewResponse>{
    return this.httpClient.get<getTaskReviewResponse>(`${this.taskPost}/${id}`, {headers: this.headers});
  }

  public getTaskDetailsById(id: number): Observable<getTaskDetailsById>{
    return this.httpClient.get<getTaskDetailsById>(`${this.url1}/${id}`, {headers: this.headers});
  }

  public getProjectEmployeeList(id: number): Observable<ProjectListEmployeeData>{
    return this.httpClient.get<ProjectListEmployeeData>(`https://192.168.1.2:8081/Project/projectEmployees${id}`, {headers: this.headers});
  }

  public getTaskLog(id: number): Observable<TaskLogResponse>{
    return this.httpClient.get<TaskLogResponse>(`${this.url1}/logs/${id}`, {headers: this.headers})
  }

  public getTaskListOfSprintId(id: number): Observable<taskOfSprintResponse>{
    return this.httpClient.get<taskOfSprintResponse>(`${this.url1}/sprint/${id}`, {headers: this.headers});
  }

  public taskStatusUpdate(id:number, status: number): Observable<deleteTaskResponse>{
    return this.httpClient.put<deleteTaskResponse>(`${this.url1}/update-status/${id}`, status,{headers: this.headers});
  } 
}

