import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddDepartmentResponse, DataPage, DepartmentApiResponseById, DepartmentDeleteResponse, DepartmentRequest, DepartmentResponse, DepartmentResponsePagination } from '../Models/department.model';
import { environment1 } from '../../../../../environment/environment';
import { environment2 } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  public url = environment1.apiUrl;
  public url1 =  environment2.apiUrl;
  public pagination = environment1.apiUrl.PaginationDepartments;

  public token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YXNoaTEyMyIsIklkIjoiNDUiLCJVc2VySWQiOiI3OCIsImp0aSI6IjJjZGM1Y2RlLTE1MDUtNDA0ZS04OTgzLTNjYTYyMTBiMjkzYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3MjM1Mjk2NTYsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.7_DPpjGLEdmyStL6nfaP4e2qxOxp-evT1LeMIsHfDRI";

  constructor(private httpClient: HttpClient) { }
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}` // Use Bearer token
  });

  public getDepartmentList(): Observable<DepartmentResponse>{
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

   public paginationOnDepartments(data: DataPage): Observable< DepartmentResponsePagination>{
    console.log(data);
    return this.httpClient.post<DepartmentResponsePagination>(this.pagination, data, {headers: this.headers})
  }
}
