import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ToastService } from '../../Modules/SharedModule/shared/Services/toast.service';

export const customInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const toastr = inject(ToastrService);
  const router = inject(Router);
  const toaster = inject(ToastService);

  const myToken = localStorage.getItem('token');
  
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`
    }
  });

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      debugger;
      console.log('Error entered');
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {

        errorMessage = `Error: ${error.error.message}`;
        toaster.showWarning(errorMessage);
        toastr.warning(errorMessage, 'Client Error');
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        toaster.showWarning(errorMessage);
      }

      if (error.status === 401) {
        router.navigateByUrl('/login');
        toaster.showWarning('Session expired. Please log in again.');
      }

      if (error.status === 403) {
        toaster.showWarning('You do not have permission to access this resource.');
      }

      if (error.status === 404) {
        console.log("Toaster 404")
        toaster.showWarning('You have entered wrong data.');
      }

      if (error.status === 500) {
        router.navigateByUrl('/error');
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};
