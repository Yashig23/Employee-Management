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

  constructor(private httpClient: HttpClient) { }

  public postLogin(data: LoginRequest ): Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>(this.url, data);
  }
}
