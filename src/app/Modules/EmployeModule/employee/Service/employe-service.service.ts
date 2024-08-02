import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment1, environment2 } from '../../../../../environment/environment';
// import { AddEmployeeResponse, EmployeResponse, UpdateEmployeeResponse } from '../Models/Employee.model';
import { AddEmployeeRequest, AddEmployeeResponse, DataPage, Employee, EmployeeResponse, GetEmployeeResponseById, UpdateEmployeeRequest, UpdatedEmployeeResponse } from '../Models/Employee.model';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmployeServiceService {

  public url = environment2.apiUrl.Employee;
  public url1 = environment1.apiUrl.Employee;
  public pagination = environment1.apiUrl.Pagination;

  constructor(private httpClient: HttpClient) { }
  public token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQcmluY2UiLCJJZCI6IjEiLCJqdGkiOiI2MTg0MjVmOS1mY2EzLTQ1M2EtYWE3Zi1jODA3NGJhNzM5ZmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzIzMDE1NDAyLCJpc3MiOiJKd3RJc3N1ZXIiLCJhdWQiOiJKd3RBdWRpZW5jZSJ9.HXnJjZCYI0b8iHogCsPc96VoUSZANpKLmPVKyOJ7XOs";

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}` // Use Bearer token
  });

  // public getEmployeeList(): Observable<EmployeResponse>{
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}` // Use Bearer token
  //   });
  //   return this.httpClient.get<EmployeResponse>(this.url, { headers });
  // }

  // public deleteEmployee(id: number): Observable<EmployeResponse>{
  //   return this.httpClient.delete<EmployeResponse>(`${this.url}/${id}`);
  // }

  // public addEmployee(data: AddEmployeeResponse): Observable<EmployeResponse>{
  //   return this.httpClient.post<EmployeResponse>( this.url, data, {headers : {
  //     Token : this.token
  //   }});
  //  }

  // public updatedEmployee(data: UpdateEmployeeResponse, id: number): Observable<EmployeResponse>{
  //   console.log("Data ",data);
  //   return this.httpClient.put<EmployeResponse>(`${this.url}/${id}`, data);
  // }

  // public getEmployeeById(id: number): Observable<EmployeResponse>{
  //   return this.httpClient.get<EmployeResponse>(`${this.url}/${id}`);
  // }

  // functionalities based on Price data;

   public getEmployeeList(): Observable<EmployeeResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Use Bearer token
    });
    return this.httpClient.get<EmployeeResponse>(this.url1, { headers });
  }

  public deleteEmployee(id: number): Observable<EmployeeResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Use Bearer token
    });
    return this.httpClient.delete<EmployeeResponse>(`${this.url1}/${id}`, {headers});
  }

  public addEmployee(data: AddEmployeeRequest): Observable<AddEmployeeResponse>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Use Bearer token
    });
    return this.httpClient.post<AddEmployeeResponse>( this.url1, data, {headers});
   }

  public updatedEmployee(data: UpdateEmployeeRequest, id: number): Observable<UpdatedEmployeeResponse>{
    console.log("Data ",data);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Use Bearer token
    });
    return this.httpClient.put<UpdatedEmployeeResponse>(`${this.url1}/${id}`, data, {headers});
  }

  public getEmployeeById(id: number): Observable<GetEmployeeResponseById>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Use Bearer token
    });
    return this.httpClient.get<GetEmployeeResponseById>(`${this.url1}/${id}`, {headers});
  }

  public getDepartmentDetailsByName(data: number): Observable<EmployeeResponse>{
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${this.token}` // Use Bearer token
    // });
    return this.httpClient.get<EmployeeResponse>(`https://192.168.1.5:8081/Employee/department/${data}`, {headers: this.headers})
  } 

  public paginationOnEmployee(data: DataPage): Observable<EmployeeResponse>{
    return this.httpClient.post<EmployeeResponse>(this.pagination, data, {headers: this.headers})
  }

}
