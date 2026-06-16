import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // si ya esta logueado lo enviamos directamente a la pagina principal
  if (authService.currentUser()) {
    return router.createUrlTree(['/']);
  }

  // si es un invitado le permitimos quedarse en la ruta
  return true;
};