import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../../../../Components/Models/Login.model';
import { UserService } from '../../Services/user.service';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit{
  public userId!: number;
  public role!: number;

  constructor(public router: Router, public userService: UserService, public toaster: ToastService){}

  ngOnInit(): void {
      this.userId = Number(localStorage.getItem('userId'));
      // this.role = Number(localStorage.getItem('role'));
      this.userService.role$.subscribe((newRole: number) => {
        this.role = newRole;
      });
  
      this.role = this.userService.getRole();
  
  }

  public logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.clear();
      this.toaster.showSuccess("Logged out successfully");
      this.router.navigateByUrl('/login');
    } else {
      this.toaster.showSuccess("Logged out successfully");
      this.router.navigateByUrl('/login');
    }
  }
  

}
