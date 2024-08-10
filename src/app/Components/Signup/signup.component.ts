import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from 'react-router-dom';
import { ApiResponse } from '../Models/Login.model';
import { ToastService } from '../../Modules/SharedModule/shared/Services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public email!:string;
  public SignupForm!: FormGroup;
  public token?: string|null;

  constructor(public loginService: LoginService, private toaster: ToastService){
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
        this.token = response.data?.token;
        this.toaster.showSuccess("Signup Completed Successfully");
        // alert("Signup Completed successfully");
        console.log("signup success");

        // setting up the local storage for username and password.
        localStorage.setItem('username', this.SignupForm.value.username);
        localStorage.setItem('password', this.SignupForm.value.password); 
        localStorage.setItem('token', this.token ?? '');
        console.log(this.token);
      },
      error: (err)=>{
        console.log(err);
        this.toaster.showWarning("Error occured while signUp");
        // alert("Error occured while signup");
      }
    })
  }
}
