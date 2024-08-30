import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../Modules/SharedModule/shared/Services/toast.service';
import { Router } from '@angular/router';
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

  constructor(public loginService: LoginService, private toaster: ToastService, private router: Router){
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
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  public onSubmit(): void {
    const formData = this.SignupForm.value;
    console.log(formData);
  
    const body = {
      username: this.SignupForm.value.username,
      password: this.SignupForm.value.password
    };
  
    this.loginService.postLogin(body).subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        const user = response.data!.employee;
        this.EmployeeDetails = user;
  
        // Save user details using the service
        this.loginService.saveUserDetails({
          id: user.id,
          role: user.role,
          isManager: user.isManager,
          token: response.data?.token
        });
  
        this.toaster.showSuccess("Signup Completed Successfully");
        this.EmployeeName = this.EmployeeDetails.name;
        localStorage.setItem('EmployeeName', this.EmployeeName.toString());
  
        this.router.navigateByUrl('/homepage');
      },
      error: (err) => {
        console.log(err);
        this.toaster.showWarning("Error occurred while signUp");
      }
    });
  }
  

}
