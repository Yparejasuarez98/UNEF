import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem('token');
  const router = inject(Router);
  let request = req;
  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
  } else {
    router.navigate(['/login']);
    Swal.fire('Alerta !', 'Su token ha expirado', 'info');
  }
  return next(request);
};
