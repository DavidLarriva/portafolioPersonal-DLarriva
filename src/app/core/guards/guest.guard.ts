import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // igual que el authGuard: esperamos la primera respuesta real de firebase
  // para no dejar entrar a /auth a alguien que en realidad ya tiene sesion.
  return authService.estadoSesion.pipe(
    take(1),
    map(usuario => usuario ? router.createUrlTree(['/']) : true)
  );
};