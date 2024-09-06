import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment1 } from '../../../../../environment/environment';
// import { AddEmployeeResponse, EmployeResponse, UpdateEmployeeResponse } from '../Models/Employee.model';
import { AddEmployeeRequest, AddEmployeeResponse, DataPage, Employee, EmployeeResponse, EmployeeResponsePagination, GetEmployeeDepartmentById, GetEmployeeResponseById, GetEmployeeResponseById2, ProjectListOfEmployee1, TasksListOfEmployees, UpdateEmployeeRequest, UpdatedEmployeeResponse, UpdatedEmployeeResponse2 } from '../Models/Employee.model';
// import {CacheService} from '../Service/cache.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeServiceService {

  private url = environment1.apiUrl.apiUrl;

  constructor(private httpClient: HttpClient) { }

   public getEmployeeList(): Observable<EmployeeResponse>{
    return this.httpClient.get<EmployeeResponse>(`${this.url}/Employee`);
  }

  public deleteEmployee(id: number): Observable<EmployeeResponse>{
    return this.httpClient.delete<EmployeeResponse>(`${this.url}/Employee/${id}`);
  }

  public addEmployee(data: AddEmployeeRequest): Observable<AddEmployeeResponse>{
    return this.httpClient.post<AddEmployeeResponse>( `${this.url}/Employee`, data);
   }

  public updatedEmployee(data: UpdateEmployeeRequest, id: number): Observable<UpdatedEmployeeResponse2>{
    return this.httpClient.put<UpdatedEmployeeResponse2>(`${this.url}/Employee/${id}`, data);
  }

  public updatedEmployee2(id: number): Observable<UpdatedEmployeeResponse>{
    // console.log("Data ",data);
    return this.httpClient.get<UpdatedEmployeeResponse>(`${this.url}/Employee/${id}`);
  }

  public getEmployeeByIdDetailsOnView(id: number): Observable<GetEmployeeResponseById2>{
    return this.httpClient.get<GetEmployeeResponseById2>(`${this.url}/Employee/${id}`);
  }

  public getEmployeeById(id: number): Observable<GetEmployeeResponseById>{
    return this.httpClient.get<GetEmployeeResponseById>(`${this.url}/Employee/Update/${id}`);
  }

  public getDepartmentDetailsByName(data: number): Observable<EmployeeResponse>{
    return this.httpClient.get<EmployeeResponse>(`${this.url}/Employee/department/${data}`)
  } 

  public getEmployeeNamesByDepartmentId(id: number): Observable<GetEmployeeDepartmentById>{
    return this.httpClient.get<GetEmployeeDepartmentById>(`${this.url}/Employee/department/${id}`)
  }

  public paginationOnEmployee(data: DataPage): Observable<EmployeeResponsePagination>{
    console.log(data);
    return this.httpClient.post<EmployeeResponsePagination>(`${this.url}/Employee/pagination`, data)
  }

  public getAvatarOfEmployee(name: string): Observable<string> {
    return this.httpClient.get(`https://ui-avatars.com/api/?name=${name}`, { responseType: 'text' });
}

  public getProjectsOfEmployeeById(id: number): Observable<ProjectListOfEmployee1>{
    return this.httpClient.get<ProjectListOfEmployee1>(`${this.url}/Project/employee/${id}`)
  }

  public getTasksOfEmployeeById(id: number): Observable<TasksListOfEmployees>{
    return this.httpClient.get<TasksListOfEmployees>(`${this.url}/Tasks/employee`)
  }
 
}
