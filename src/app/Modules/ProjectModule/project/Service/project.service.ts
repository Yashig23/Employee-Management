import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment1 } from '../../../../../environment/environment';
import { DataPage, DeleteProjectResponse, PostProjectRequest, PostProjectResponse, ProjectByEmployeeId, ProjectByIdResponse, ProjectResponse, ProjectResponsePagination } from '../Models/Project.model';

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
    return this.httpClient.get<ProjectByEmployeeId>(`${this.url.Project}/${id}`)
  }
}