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

  public token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQcmluY2UiLCJJZCI6IjEiLCJqdGkiOiI2MTg0MjVmOS1mY2EzLTQ1M2EtYWE3Zi1jODA3NGJhNzM5ZmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzIzMDE1NDAyLCJpc3MiOiJKd3RJc3N1ZXIiLCJhdWQiOiJKd3RBdWRpZW5jZSJ9.HXnJjZCYI0b8iHogCsPc96VoUSZANpKLmPVKyOJ7XOs";

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
