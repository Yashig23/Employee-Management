import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { LoginService } from '../../../../Components/Services/login.service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
): boolean | UrlTree => {
  
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn = loginService.isLoggedIn();
  const isAdmin = loginService.isAdmin();
  const isSuperAdmin = loginService.isSuperAdmin1();
  const isEmployee = loginService.isEmployee1();

  if (!isLoggedIn) {
    return router.createUrlTree(['/login']);
  }

  const restrictedRoutes = ['/employeeList', '/departmentList'];
  if (isAdmin) {
    return router.createUrlTree(['/projectList']);
  }

  if (isSuperAdmin) {
    return router.createUrlTree(['/projectList']);
  }

  if (isEmployee && restrictedRoutes.includes(state.url)) {
    return router.createUrlTree(['/projectList']);
  }

  return router.createUrlTree(['/projectList']);
};
