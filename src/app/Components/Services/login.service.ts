import { Injectable } from '@angular/core';
import { environment1 } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Models/Login.model';
import { ApiResponse } from '../Models/Login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url = environment1.apiUrl.Login;
  public isLogin!: boolean;
  public Admin!: boolean;
  public isEmployee!: boolean;
  public isSuperAdmin!: boolean;
  public userName!: string;

  constructor(private httpClient: HttpClient) {}

  public postLogin(data: LoginRequest): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.url, data);
  }

  public saveUserDetails(user: any): void {
    localStorage.clear();
    localStorage.setItem('userId', user.id.toString());
    localStorage.setItem('role', user.role);
    localStorage.setItem('isManager', user.isManager.toString());
    localStorage.setItem('token', user.token);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  public isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Admin';
  }

  public isSuperAdmin1(): boolean {
    const role = localStorage.getItem('role');
    return role === 'SuperAdmin';
  }

  public isEmployee1(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Employee';
  }

  public getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  public setUserName(data: string){
     this.userName = data;
     console.log("User Name", this.userName);
  }
  

}
