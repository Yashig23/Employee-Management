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
  public url = environment1.apiUrl.apiUrl;

  public token = environment1.token;
  constructor(private httpClient: HttpClient) { }

  public getDepartmentList(): Observable<DepartmentResponse>{
    return this.httpClient.get<DepartmentResponse>(`${this.url}/Department`);
  }

  public deleteDepartment(id: number): Observable<DepartmentDeleteResponse>{
    return this.httpClient.delete<DepartmentDeleteResponse>(`${this.url}/Department/${id}`);
  }

   public getDepartmentById(id:number): Observable<DepartmentResponse>{
    return this.httpClient.get<DepartmentResponse>(`${this.url}/Department/${id}`)
   }

   public AddDepartment(data: DepartmentRequest): Observable<AddDepartmentResponse>{
    return this.httpClient.post<AddDepartmentResponse>( `${this.url}/Department`, data);
   }

   public paginationOnDepartments(data: DataPage): Observable< DepartmentResponsePagination>{
    console.log(data);
    return this.httpClient.post<DepartmentResponsePagination>(`${this.url}/Department/pagination`, data)
  }
}
