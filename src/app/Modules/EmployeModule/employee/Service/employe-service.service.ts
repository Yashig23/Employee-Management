import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment1} from '../../../../../environment/environment';
// import { AddEmployeeResponse, EmployeResponse, UpdateEmployeeResponse } from '../Models/Employee.model';
import { AddEmployeeRequest, AddEmployeeResponse, DataPage, Employee, EmployeeResponse, EmployeeResponsePagination, GetEmployeeDepartmentById, GetEmployeeResponseById, ProjectListOfEmployee1, TasksListOfEmployees, UpdateEmployeeRequest, UpdatedEmployeeResponse } from '../Models/Employee.model';
// import {CacheService} from '../Service/cache.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeServiceService {

  public url1 = environment1.apiUrl.Employee;
  public url2 = environment1.apiUrl.Project;
  public tasks = 'https://192.168.1.4:8081/Tasks/employee';
  public pagination = environment1.apiUrl.Pagination;

  constructor(private httpClient: HttpClient) { }

  public token = environment1.token;

  // functionalities based on Price data;

   public getEmployeeList(): Observable<EmployeeResponse>{
    return this.httpClient.get<EmployeeResponse>(this.url1);
  }

  public deleteEmployee(id: number): Observable<EmployeeResponse>{
    return this.httpClient.delete<EmployeeResponse>(`${this.url1}/${id}`);
  }

  public addEmployee(data: AddEmployeeRequest): Observable<AddEmployeeResponse>{
    return this.httpClient.post<AddEmployeeResponse>( this.url1, data);
   }

  public updatedEmployee(data: UpdateEmployeeRequest, id: number): Observable<UpdatedEmployeeResponse>{
    console.log("Data ",data);
    return this.httpClient.put<UpdatedEmployeeResponse>(`${this.url1}/${id}`, data);
  }

  public getEmployeeById(id: number): Observable<GetEmployeeResponseById>{
    return this.httpClient.get<GetEmployeeResponseById>(`${this.url1}/${id}`);
  }

  public getDepartmentDetailsByName(data: number): Observable<EmployeeResponse>{
    return this.httpClient.get<EmployeeResponse>(`https://192.168.1.8:8081/Employee/department/${data}`)
  } 

  public getEmployeeNamesByDepartmentId(id: number): Observable<GetEmployeeDepartmentById>{
    return this.httpClient.get<GetEmployeeDepartmentById>(`https://192.168.1.8:8081/Employee/department/${id}`)
  }

  public paginationOnEmployee(data: DataPage): Observable<EmployeeResponsePagination>{
    console.log(data);
    return this.httpClient.post<EmployeeResponsePagination>(this.pagination, data)
  }

  public getAvatarOfEmployee(name: string): Observable<string> {
    return this.httpClient.get(`https://ui-avatars.com/api/?name=${name}`, { responseType: 'text' });
}

  public getProjectsOfEmployeeById(id: number): Observable<ProjectListOfEmployee1>{
    return this.httpClient.get<ProjectListOfEmployee1>(`${this.url2}/employee/${id}`)
  }

  public getTasksOfEmployeeById(id: number): Observable<TasksListOfEmployees>{
    return this.httpClient.get<TasksListOfEmployees>(`${this.tasks}/${id}`)
  }
 
}
