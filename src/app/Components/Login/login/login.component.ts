import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../Modules/SharedModule/shared/Services/toast.service';
import { Router } from '@angular/router';
import { UserService } from '../../../Modules/SharedModule/shared/Services/user.service';
import { ApiResponse, EmployeeDto1 } from '../../Models/Login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public email!:string;
  public SignupForm!: FormGroup;
  public token?: string|null;
  public EmployeeDetails!: EmployeeDto1;
  public EmployeeName!: string;

  constructor(public loginService: LoginService, private toaster: ToastService, private router: Router, public userService: UserService){
    this.SignupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
    });
  }

  public onSubmit(): void {
    const formData = this.SignupForm.value;
    console.log(formData);
    debugger;

    const body = {
      username: this.SignupForm.value.username,
      password: this.SignupForm.value.password
    };
  
    this.loginService.postLogin(body).subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        const user = response.data!.employee;
        this.EmployeeDetails = user;
  
        this.loginService.saveUserDetails({
          id: user.id,
          role: user.role,
          isManager: user.isManager,
          token: response.data?.token
        });
        
        this.userService.setRole(user.role);
        this.SignupForm.reset();
        this.toaster.showSuccess("Login Completed Successfully");
        this.EmployeeName = this.EmployeeDetails.name;
        localStorage.setItem('EmployeeName', this.EmployeeName.toString());
  
        this.router.navigateByUrl('/projects');
      }
    });
  }
  

}
