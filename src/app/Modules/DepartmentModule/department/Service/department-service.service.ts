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

  public token = environment1.token;
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
