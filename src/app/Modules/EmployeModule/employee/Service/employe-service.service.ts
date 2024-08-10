import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment1} from '../../../../../environment/environment';
// import { AddEmployeeResponse, EmployeResponse, UpdateEmployeeResponse } from '../Models/Employee.model';
import { AddEmployeeRequest, AddEmployeeResponse, DataPage, Employee, EmployeeResponse, EmployeeResponsePagination, GetEmployeeResponseById, ProjectListOfEmployee1, TasksListOfEmployees, UpdateEmployeeRequest, UpdatedEmployeeResponse } from '../Models/Employee.model';
// import {CacheService} from '../Service/cache.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeServiceService {

  public url1 = environment1.apiUrl.Employee;
  public url2 = environment1.apiUrl.Project;
  public tasks = 'https://emp-mgmt-dev.azurewebsites.net/Tasks/employee';
  public pagination = environment1.apiUrl.Pagination;

  constructor(private httpClient: HttpClient) { }
  public token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YXNoaTEyMyIsIklkIjoiNDUiLCJVc2VySWQiOiI3OCIsImp0aSI6IjJjZGM1Y2RlLTE1MDUtNDA0ZS04OTgzLTNjYTYyMTBiMjkzYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3MjM1Mjk2NTYsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.7_DPpjGLEdmyStL6nfaP4e2qxOxp-evT1LeMIsHfDRI";

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}` // Use Bearer token
  });

  // functionalities based on Price data;

   public getEmployeeList(): Observable<EmployeeResponse>{
    return this.httpClient.get<EmployeeResponse>(this.url1, { headers: this.headers });
  }

  public deleteEmployee(id: number): Observable<EmployeeResponse>{
    return this.httpClient.delete<EmployeeResponse>(`${this.url1}/${id}`, {headers: this.headers});
  }

  public addEmployee(data: AddEmployeeRequest): Observable<AddEmployeeResponse>{
    return this.httpClient.post<AddEmployeeResponse>( this.url1, data, {headers: this.headers});
   }

  public updatedEmployee(data: UpdateEmployeeRequest, id: number): Observable<UpdatedEmployeeResponse>{
    console.log("Data ",data);
    return this.httpClient.put<UpdatedEmployeeResponse>(`${this.url1}/${id}`, data, {headers: this.headers});
  }

  public getEmployeeById(id: number): Observable<GetEmployeeResponseById>{
    return this.httpClient.get<GetEmployeeResponseById>(`${this.url1}/${id}`, {headers: this.headers});
  }

  public getDepartmentDetailsByName(data: number): Observable<EmployeeResponse>{
    return this.httpClient.get<EmployeeResponse>(`https://192.168.1.34:8081/Employee/department/${data}`, {headers: this.headers})
  } 

  public paginationOnEmployee(data: DataPage): Observable<EmployeeResponsePagination>{
    console.log(data);
    return this.httpClient.post<EmployeeResponsePagination>(this.pagination, data, {headers: this.headers})
  }

  public getAvatarOfEmployee(name: string): Observable<string> {
    return this.httpClient.get(`https://ui-avatars.com/api/?name=${name}`, { responseType: 'text' });
}

  public getProjectsOfEmployeeById(id: number): Observable<ProjectListOfEmployee1>{
    return this.httpClient.get<ProjectListOfEmployee1>(`${this.url2}/employee/${id}`,  {headers: this.headers})
  }

  public getTasksOfEmployeeById(id: number): Observable<TasksListOfEmployees>{
    return this.httpClient.get<TasksListOfEmployees>(`${this.tasks}/${id}`, {headers: this.headers})
  }
 
}
