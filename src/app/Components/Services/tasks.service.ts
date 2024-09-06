import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment1 } from '../../../environment/environment';
import { TaskIdPostResquest, taskRequest, taskResponse } from '../Models/Tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public url = environment1.apiUrl.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public addTasks(data: taskRequest): Observable<taskResponse>{
    return this.httpClient.post<taskResponse>(`${this.url}/Task`, data);
  }

  public getTasksById(id: number): Observable<TaskIdPostResquest>{
    return this.httpClient.get<TaskIdPostResquest>(`${this.url}/Task${id}`)
  }
}
