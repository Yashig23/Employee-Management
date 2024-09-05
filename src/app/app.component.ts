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
  public showSidebar!: boolean;


  constructor(public router: Router){
    this.router.events.subscribe(()=>{
      this.showSidebar = !this.router.url.includes('/login');
    })
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }

    if (this.token == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('projects');
      console.log(this.token);
    }
  }
}
