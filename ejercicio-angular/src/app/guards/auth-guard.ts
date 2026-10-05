import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Authentication } from '../services/authentication';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authentication);
  if (!authService.isLogged()) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
  return true;
};
