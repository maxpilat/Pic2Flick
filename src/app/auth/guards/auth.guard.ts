import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log(authService.getRedirectUrl());

  if (!authService.isAuthorized()) {
    router.navigate(['auth'], { queryParams: { redirectUrl: state.url } });

    return false;
  }

  return true;
};
