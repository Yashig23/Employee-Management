import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit{
  public userId!: number;

  constructor(public router: Router){}

  ngOnInit(): void {
      this.userId = Number(localStorage.getItem('userId'));
  }

  public logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    } else {
      console.log('No token found in localStorage.');
      this.router.navigateByUrl('/login');
    }
  }
  

}
