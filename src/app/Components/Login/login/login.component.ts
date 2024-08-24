import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../Modules/SharedModule/shared/Services/toast.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../Models/Login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public email!:string;
  public SignupForm!: FormGroup;
  public token?: string|null;

  constructor(public loginService: LoginService, private toaster: ToastService, private router: Router){
   this.SignupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
   })
  }

  public onSubmit(): void{
    const formData = this.SignupForm.value;
    console.log(formData);
    const body={
      username: this.SignupForm.value.username,
      password: this.SignupForm.value.password
    }
    this.loginService.postLogin(body).subscribe({
      next: (response: ApiResponse)=>{
        console.log(response);
        const userId = response.data!.employee.id;
        localStorage.setItem('userId', userId.toString());
        const userRole = response.data!.employee.role;
        localStorage.setItem('role', userRole.toString());
        const userIsManager= response.data!.employee.isManager;
        localStorage.setItem('isManager', userIsManager.toString());
        this.token = response.data?.token;
        this.toaster.showSuccess("Signup Completed Successfully");
        // alert("Signup Completed successfully");
        console.log("signup success");

        localStorage.setItem('username', this.SignupForm.value.username);
        localStorage.setItem('password', this.SignupForm.value.password); 
        // localStorage.setItem('userId', this.SignupForm.value.Id);
        localStorage.setItem('token', this.token ?? '');
        console.log(this.token);
        this.router.navigateByUrl('/homepage');
        
      },
      error: (err)=>{
        console.log(err);
        this.toaster.showWarning("Error occured while signUp");
        // alert("Error occured while signup");
      }
    })
  }


}
