import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrl: './layout-component.component.scss'
})
export class LayoutComponentComponent {
  title = 'EmployeeManagement';
  public token!: string | null;
  public showSidebar!: boolean;

  constructor(public router: Router) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.showSidebar = !event.url.includes('/login');
    //   }
    // });
  }

  // ngOnInit(): void {
    // console.log("entered inside the layout");
    // if (typeof localStorage !== 'undefined') {
    //   this.token = localStorage.getItem('token');
    // } else {
    //   this.token = null;
    // }

    // if(this.token){
    //   this.router.navigateByUrl('/projects');
    // }
    // else{
    //   this.router.navigateByUrl('/login');
    // }

  // }
  
}
