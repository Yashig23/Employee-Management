import { Injectable } from '@angular/core';
import { environment1, environment2 } from '../../../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, DataForSubTask, DataPost, deleteTaskResponse, getTaskDetailsById, getTaskReviewResponse, PaginatedEpicTask, PaginatedEpicTask2, PaginatedEpicTaskResponse, PaginationTaskResponse, ParentListResponse, PostReviewRequest, ProjectListEmployeeData, taskByIdResponse, TaskCountResponse, taskData, TaskList, TaskLogResponse, taskOfSprintResponse, TaskPostRequest, TaskPostResponse, TaskType, updateTaskRequest, updateTaskResponse } from '../Models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  public url = environment1.apiUrl.apiUrl;

  constructor(private httpClient: HttpClient) { }
  public token = environment1.token;

  public getTasksList(): Observable<TaskList>{
    return this.httpClient.get<TaskList>(`${this.url}/Tasks`);
  }

  public deleteTask(id: number): Observable<deleteTaskResponse>{
    return this.httpClient.delete<deleteTaskResponse>(`${this.url}/Tasks/${id}`);
  }

  public addTask(data: TaskPostRequest): Observable<TaskPostResponse>{
    return this.httpClient.post<TaskPostResponse>( `${this.url}/Tasks`, data);
   }

  public updatedTask(data: updateTaskRequest, id: number): Observable<updateTaskResponse>{
    console.log("Data ",data);
    return this.httpClient.put<updateTaskResponse>(`${this.url}/Tasks/${id}`, data);
  }

  public paginationOnTask(data: DataPost): Observable<PaginationTaskResponse>{
    console.log(data);
    return this.httpClient.post<PaginationTaskResponse>(`${this.url}/Tasks/pagination`, data)
  }

  public getEpics(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(`${this.url}/Tasks/epics`)
  }

  public paginatedTaskList(data: PaginatedEpicTask2, id: number): Observable<PaginatedEpicTaskResponse>{
    return this.httpClient.post<PaginatedEpicTaskResponse>(`${this.url}/Tasks/pagination/${id}`, data)
  }

  public getSubTaskList(id: number): Observable<DataForSubTask>{
    return this.httpClient.get<DataForSubTask>(`${this.url}/Tasks/task${id}/children`)
  }

  public postTaskReview(body: { content: string; }, id: number): Observable<TaskPostRequest>{
    return this.httpClient.post<TaskPostRequest>(`${this.url}/TaskReview/${id}`, body)
  }

  public getTaskReviewList(id: number): Observable<getTaskReviewResponse>{
    return this.httpClient.get<getTaskReviewResponse>(`${this.url}/TaskReview/${id}`);
  }

  public getTaskDetailsById(id: number): Observable<getTaskDetailsById>{
    return this.httpClient.get<getTaskDetailsById>(`${this.url}/Tasks/${id}`);
  }

  public getProjectEmployeeList(id: number): Observable<ProjectListEmployeeData>{
    return this.httpClient.get<ProjectListEmployeeData>(`${this.url}/api/ProjectEmployee/${id}`);
  }

  public getTaskLog(id: number): Observable<TaskLogResponse>{
    return this.httpClient.get<TaskLogResponse>(`${this.url}/api/Tasklog/${id}`)
  }

  public getTaskListOfSprintId(id: number): Observable<taskOfSprintResponse>{
    return this.httpClient.get<taskOfSprintResponse>(`${this.url}/Tasks/sprint/${id}`);
  }

  public taskStatusUpdate(id:number, status: number): Observable<deleteTaskResponse>{
    return this.httpClient.put<deleteTaskResponse>(`${this.url}/Tasks/update-status/${id}`, status);
  } 

  public getParentList(projectId: number, Tasktype: TaskType): Observable<ParentListResponse>{
    return this.httpClient.get<ParentListResponse>(`${this.url}/Tasks/${projectId}/type=${Tasktype}`)
  }

  public updateReview(data: string, id: number): Observable<deleteTaskResponse>{
    const body ={
      content: data
    }
    return this.httpClient.put<deleteTaskResponse>(`${this.url}/TaskReview/${id}`, body);
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
  
    return this.httpClient.patch<deleteTaskResponse>(`${this.url}/Tasks/${taskId}`, patchData, { headers })
  }

  public getCounts(id: number): Observable<TaskCountResponse>{
    return this.httpClient.get<TaskCountResponse>(`${this.url}/Tasks/Count/${id}`)
  }

  public deleteSprint(id: number): Observable<deleteTaskResponse>{
    return this.httpClient.delete<deleteTaskResponse>(`${this.url}/api/Sprint/${id}`)
  }
}

