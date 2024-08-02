import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment1, environment2 } from '../../../../../environment/environment';
import { PostProjectRequest, PostProjectResponse, ProjectByIdResponse, ProjectResponse } from '../Models/Project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public url = environment1.apiUrl;
  public url1 =  environment2.apiUrl;
  public token = environment1.token;

  constructor(private httpClient: HttpClient) { }

  private headers = new HttpHeaders({
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
   
   
}