import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'EmployeeManagement';
  public token!: string | null;

  constructor(public router: Router){}

  ngOnInit(): void {
      this.token = localStorage?.getItem('token');
      if(this.token== null){
        this.router.navigateByUrl('/login');
      }
      else{
        this.router.navigateByUrl('homepage');
        console.log(this.token);
      }
  }
}
