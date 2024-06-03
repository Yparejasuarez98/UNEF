import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

export const isLoggedInGuard: CanMatchFn = (route, state) => {

  const authService = inject(AuthService);
  const rol = inject(SharedService);

  // rol.getRol().subscribe((rol: any) => {
  //   debugger
  // })
  // return authService.getAuthToken();
  return true
};
