import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { LoginService } from '../../../../Components/Services/login.service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = this.loginService.isLoggedIn();
    const isAdmin = this.loginService.isAdmin();
    const isSuperAdmin = this.loginService.isSuperAdmin();
    const isEmployee = this.loginService.isEmployee();

    if (!isLoggedIn) {
      return this.router.createUrlTree(['/login']);
    }

    const restrictedRoutes = ['/employeeList', '/departmentList'];
    if (isAdmin || isSuperAdmin || (isEmployee && restrictedRoutes.includes(state.url))) {
      return this.router.createUrlTree(['/projects']);
    }

    return true;
  }
}
