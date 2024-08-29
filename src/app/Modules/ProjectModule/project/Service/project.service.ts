import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment1 } from '../../../../../environment/environment';
import { DataPage, DeleteProjectResponse, GetSprintById, getSprintsList, getSprintsListByProjectId, PostProjectRequest, PostProjectResponse, PostSprintRequest, ProjectByEmployeeId, ProjectByIdResponse, ProjectResponse, ProjectResponsePagination, SprintData2, updateProjectByIdRequest, updateProjectByIdResponse } from '../Models/Project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public url = environment1.apiUrl;
  public token = environment1.token;
  public pagination = environment1.apiUrl.PaginationProjects;

  constructor(private httpClient: HttpClient) { }

  // public deleteDepartment(id: number): Observable<DepartmentResponse>{
  //   return this.httpClient.delete<DepartmentResponse>(`${this.url1.Department}/${id}`);
  // }

   public getProjectById(id:number): Observable<ProjectByIdResponse>{
    return this.httpClient.get<ProjectByIdResponse>(`${this.url.Project}/${id}` )
   }

   public AddProject(data: PostProjectRequest): Observable<PostProjectResponse>{
    return this.httpClient.post<PostProjectResponse>( this.url.Project, data);
   }

   public getProject(): Observable<ProjectResponse>{
    return this.httpClient.get<ProjectResponse>(this.url.Project)
   }
   
  public deleteProject(id: number): Observable<DeleteProjectResponse>{
    return this.httpClient.delete<DeleteProjectResponse>(`${this.url.Project}/${id}`)
  }

  public paginationOnProjects(data: DataPage): Observable<ProjectResponsePagination>{
    return this.httpClient.post<ProjectResponsePagination>(this.pagination, data)
  }
   
  public getProjectListOfEmployee(id: number): Observable<ProjectByEmployeeId>{
    return this.httpClient.get<ProjectByEmployeeId>(`${this.url.Project}/${id}`)
  }

  public updateProjectById(data: updateProjectByIdRequest, id: number): Observable<updateProjectByIdResponse>{
    return this.httpClient.put<updateProjectByIdResponse>(`${this.url.Project}/${id}`, data)
  }

  public addSprint(data: PostSprintRequest): Observable<updateProjectByIdResponse>{
    return this.httpClient.post<updateProjectByIdResponse>(`https://192.168.1.8:8081/api/Sprint/0`, data)
  }

  public updateSprint(data: PostSprintRequest, id: number): Observable<updateProjectByIdResponse>{
    return this.httpClient.post<updateProjectByIdResponse>(`https://192.168.1.8:8081/api/Sprint/${id}`, data)
  }

  public deleteSprint(id: number): Observable<DeleteProjectResponse>{
    return this.httpClient.delete<DeleteProjectResponse>(`${this.url.Sprint}/${id}`)
  }

  public getSprintById(id: number): Observable<GetSprintById>{
    return this.httpClient.get<GetSprintById>(`${this.url.Sprint}/${id}`)
  }

  public getSprintLists(id: number): Observable<getSprintsList>{
    return this.httpClient.get<getSprintsList>(`${this.url.Sprint}/${id}`)
  }

  public getSprintListsByProject(id: number): Observable<getSprintsListByProjectId>{
   return this.httpClient.get<getSprintsListByProjectId>(`${this.url.Sprint}/project/${id}`)
  }

}