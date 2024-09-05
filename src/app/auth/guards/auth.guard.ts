import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  console.log(window.location.origin + state.url);

  if (!authService.isAuthorized()) {
    window.location.href = authService.getAuthUrl(window.location.origin + state.url);
    return false;
  }

  return true;
};
