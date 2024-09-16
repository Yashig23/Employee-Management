import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from 'react-router-dom';
import { ApiResponse } from '../Models/Login.model';
import { ToastService } from '../../Modules/SharedModule/shared/Services/toast.service';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
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

  products: any[] = [
    {
      name: 'Product 1',
      price: 100,
      category: 'Category A',
      quantity: 10,
      inventoryStatus: 'In Stock',
      rating: 4
    },
    {
      name: 'Product 2',
      price: 200,
      category: 'Category B',
      quantity: 5,
      inventoryStatus: 'Low Stock',
      rating: 3
    },
    // Add more product objects as needed
  ];

  getSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'danger';
      default:
        return undefined; // Return undefined instead of null
    }
  }
  

  public onSubmit(): void{
    const formData = this.SignupForm.value;
    // console.log(formData);
    const body={
      username: this.SignupForm.value.username,
      password: this.SignupForm.value.password
    }
    this.loginService.postLogin(body).subscribe({
      next: (response: ApiResponse)=>{
        // console.log(response);
        this.token = response.data?.token;
        this.toaster.showSuccess("Signup Completed Successfully");
        // alert("Signup Completed successfully");
        // console.log("signup success");
        localStorage.clear();

        // setting up the local storage for username and password.
        // localStorage.setItem('username', this.SignupForm.value.username);
        // localStorage.setItem('password', this.SignupForm.value.password); 
        // localStorage.setItem('token', this.token ?? '');
        // console.log(this.token);
        this.router.navigateByUrl('/homepage');
        
      },
      error: (err)=>{
        // console.log(err);
        this.toaster.showWarning("Error occured while signUp");
        // alert("Error occured while signup");
      }
    })
  }
}
