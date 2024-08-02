import { Component } from '@angular/core';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public password!: string;
  public rememberMe!: string;
  public email!:string;

  constructor(public loginService: LoginService){}
  public onSubmit(): void{
    console.log("loginn done");
  }


}
