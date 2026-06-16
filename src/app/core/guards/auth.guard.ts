import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  // inyectamos las herramientas de sesion y navegacion
  const authService = inject(AuthService);
  const router = inject(Router);

  // verificamos si existe un usuario conectado actualmente
  if (authService.currentUser()) {
    return true;
  }

  // si no hay sesion lo expulsamos hacia la pagina de autenticacion
  return router.createUrlTree(['/auth']);
};