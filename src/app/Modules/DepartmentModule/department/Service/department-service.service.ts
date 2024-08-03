import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddDepartmentResponse, DepartmentApiResponseById, DepartmentDeleteResponse, DepartmentRequest, DepartmentResponse } from '../Models/department.model';
import { environment1 } from '../../../../../environment/environment';
import { environment2 } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  public url = environment1.apiUrl;
  public url1 =  environment2.apiUrl;

  public token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YXNoaTEyMyIsIklkIjoiNDUiLCJVc2VySWQiOiI3OCIsImp0aSI6ImI1ZmMyMjJhLTJjZDItNGJkNi05Y2I1LTNmZTgxMDRlMmRkMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3MjMwOTYzMzUsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.K89iu2yb2T-ZNxSDNhVQQLZLzwRGb4EaGtt_i9D96e4";

  constructor(private httpClient: HttpClient) { }
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}` // Use Bearer token
  });

  public getDepartmentList(): Observable<DepartmentResponse>{
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${this.token}` // Use Bearer token
    // });
    return this.httpClient.get<DepartmentResponse>(this.url.Department,{headers:this.headers});
  }

  public deleteDepartment(id: number): Observable<DepartmentDeleteResponse>{
    return this.httpClient.delete<DepartmentDeleteResponse>(`${this.url.Department}/${id}`, {headers:this.headers});
  }

   public getDepartmentById(id:number): Observable<DepartmentResponse>{
    return this.httpClient.get<DepartmentResponse>(`${this.url.Department}/${id}`,{headers:this.headers} )
   }

   public AddDepartment(data: DepartmentRequest): Observable<AddDepartmentResponse>{
    return this.httpClient.post<AddDepartmentResponse>( this.url.Department, data,{headers:this.headers});
   }
}
