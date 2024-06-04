import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem('token');
  const router = inject(Router);
  let request = req;
  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
  } else {
    router.navigate(['/login']);
    Swal.fire('Alerta !', 'Su token ha expirado', 'info');
  }
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          router.navigate(['/login']);
          Swal.fire('Error', 'Su token es invalido o ha expirado', 'info');
        }
      }
      return throwError(() => err);
    })
  )
};
