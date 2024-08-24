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

  public headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}` // Use Bearer token
  });

  // public deleteDepartment(id: number): Observable<DepartmentResponse>{
  //   return this.httpClient.delete<DepartmentResponse>(`${this.url1.Department}/${id}`);
  // }

   public getProjectById(id:number): Observable<ProjectByIdResponse>{
    return this.httpClient.get<ProjectByIdResponse>(`${this.url.Project}/${id}`, {headers: this.headers} )
   }

   public AddProject(data: PostProjectRequest): Observable<PostProjectResponse>{
    return this.httpClient.post<PostProjectResponse>( this.url.Project, data, {headers: this.headers});
   }

   public getProject(): Observable<ProjectResponse>{
    return this.httpClient.get<ProjectResponse>(this.url.Project, {headers: this.headers})
   }
   
  public deleteProject(id: number): Observable<DeleteProjectResponse>{
    return this.httpClient.delete<DeleteProjectResponse>(`${this.url.Project}/${id}`, {headers: this.headers})
  }

  public paginationOnProjects(data: DataPage): Observable<ProjectResponsePagination>{
    return this.httpClient.post<ProjectResponsePagination>(this.pagination, data, {headers: this.headers})
  }
   
  public getProjectListOfEmployee(id: number): Observable<ProjectByEmployeeId>{
    return this.httpClient.get<ProjectByEmployeeId>(`${this.url.Project}/${id}`, {headers: this.headers})
  }

  public updateProjectById(data: updateProjectByIdRequest, id: number): Observable<updateProjectByIdResponse>{
    return this.httpClient.post<updateProjectByIdResponse>(`${this.url.Project}/${id}`, data, {headers: this.headers})
  }

  public addSprint(data: PostSprintRequest): Observable<updateProjectByIdResponse>{
    return this.httpClient.post<updateProjectByIdResponse>(`https://192.168.1.2:8081/api/Sprint/0`, data, {headers: this.headers})
  }

  public deleteSprint(id: number): Observable<DeleteProjectResponse>{
    return this.httpClient.delete<DeleteProjectResponse>(`${this.url.Sprint}/${id}`, {headers: this.headers})
  }

  public getSprintById(id: number): Observable<GetSprintById>{
    return this.httpClient.get<GetSprintById>(`${this.url.Sprint}/${id}`,{headers: this.headers})
  }

  public getSprintLists(id: number): Observable<getSprintsList>{
    return this.httpClient.get<getSprintsList>(`${this.url.Sprint}/${id}`,{headers: this.headers})
  }

  public getSprintListsByProject(id: number): Observable<getSprintsListByProjectId>{
   return this.httpClient.get<getSprintsListByProjectId>(`${this.url.Sprint}/project/${id}`, {headers: this.headers})
  }

}