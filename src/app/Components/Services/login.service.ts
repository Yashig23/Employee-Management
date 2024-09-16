// import { Injectable } from '@angular/core';
// import { environment1 } from '../../../environment/environment';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { LoginRequest } from '../Models/Login.model';
// import { ApiResponse } from '../Models/Login.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   public url = environment1.apiUrl.apiUrl;
//   public isLogin!: boolean;
//   public Admin!: boolean;
//   public isEmployee!: boolean;
//   public isSuperAdmin!: boolean;
//   public userName!: string;

//   constructor(private httpClient: HttpClient) {}

//   public postLogin(data: LoginRequest): Observable<ApiResponse> {
//     return this.httpClient.post<ApiResponse>(`${this.url}/Login`, data);
//   }

//   public saveUserDetails(user: any): void {
//     localStorage.clear();
//     localStorage.setItem('userId', user.id.toString());
//     localStorage.setItem('role', user.role);
//     localStorage.setItem('isManager', user.isManager.toString());
//     localStorage.setItem('token', user.token);
//   }

//   public isLoggedIn(): boolean {
//     const token = localStorage.getItem('token');
//     return !!token;
//   }

//   public isAdmin(): boolean {
//     const role = localStorage.getItem('role');
//     return role === 'Admin';
//   }

//   public isSuperAdmin1(): boolean {
//     const role = localStorage.getItem('role');
//     return role === 'SuperAdmin';
//   }

//   public isEmployee1(): boolean {
//     const role = localStorage.getItem('role');
//     return role === 'Employee';
//   }

//   public getUserRole(): string | null {
//     return localStorage.getItem('role');
//   }

//   public setUserName(data: string){
//      this.userName = data;
//   }
  

// }

import { Injectable } from '@angular/core';
import { environment1 } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, ApiResponse, Role } from '../Models/Login.model'; // Assuming LoginRequest and ApiResponse are properly defined

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment1.apiUrl.apiUrl;
  private userName!: string;

  constructor(private httpClient: HttpClient) {}

  // Login request method
  public postLogin(data: LoginRequest): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.url}/Login`, data);
  }

  // Save user details to localStorage
  public saveUserDetails(user: any): void {
    localStorage.clear(); 
    localStorage.setItem('userId', user.id.toString());
    localStorage.setItem('role', user.role);
    localStorage.setItem('isManager', user.isManager.toString());
    localStorage.setItem('token', user.token);
  }

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Returns true if token exists
  }

  // Check if the user has an Admin role
  public isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Admin'; // Check against "Admin"
  }

  // Check if the user has a SuperAdmin role
  public isSuperAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'SuperAdmin'; // Check against "SuperAdmin"
  }

  // Check if the user has an Employee role
  public isEmployee(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Employee'; // Check against "Employee"
  }

  // Get the user's role
  public getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Set the username in the service (optional use case)
  public setUserName(name: string): void {
    this.userName = name;
  }

  // Get the username (optional if needed in the future)
  public getUserName(): string {
    return this.userName;
  }
}

