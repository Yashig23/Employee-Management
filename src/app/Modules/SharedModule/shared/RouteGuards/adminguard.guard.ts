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

  if (isAdmin) {
    return router.createUrlTree(['/homepage']);
  }

  if (isSuperAdmin) {
    return router.createUrlTree(['/homepage']);
  }

  if (isEmployee) {
    return router.createUrlTree(['/homepage']);
  }

  return router.createUrlTree(['/homepage']);
};
