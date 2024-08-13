import { Injectable } from '@angular/core';
import { environment1, environment2 } from '../../../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, DataPost, deleteTaskResponse, PaginationTaskResponse, taskByIdResponse, TaskList, TaskPostRequest, TaskPostResponse, updateTaskRequest, updateTaskResponse } from '../Models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  public url = environment2.apiUrl.Task;
  public url1 = environment1.apiUrl.Task;
  public epicURL = environment1.apiUrl.Epic;
  public pagination = environment1.apiUrl.PaginationTasks;

  constructor(private httpClient: HttpClient) { }
  public token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YXNoaTEyMyIsIklkIjoiNDUiLCJVc2VySWQiOiI3OCIsImp0aSI6IjNmZmIzOWQzLWQxZTUtNGQ1Yi04ZWU5LTI1OTI1Yjc5MzZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJEYXRlIjoiOC8xMy8yMDI0IDY6NTk6NDIgQU0iLCJleHAiOjE3MjM5NjQzODIsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.b-gkVJMxcYGWCCpkfY6ytfBrFx4SngHWd60z-LOQUQQ";

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

  public getTaskById(id: number): Observable<taskByIdResponse>{
    return this.httpClient.get<taskByIdResponse>(`${this.url1}/${id}`, {headers: this.headers});
  }

  public paginationOnTask(data: DataPost): Observable<PaginationTaskResponse>{
    console.log(data);
    return this.httpClient.post<PaginationTaskResponse>(this.pagination, data, {headers: this.headers})
  }

  public getEpics(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(this.epicURL, {headers: this.headers})
  }

}
