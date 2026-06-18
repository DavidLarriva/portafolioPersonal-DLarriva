import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // si ya hay sesion no dejamos entrar a /auth (esperamos a firebase con take(1))
  return authService.estadoSesion.pipe(
    take(1),
    map(usuario => usuario ? router.createUrlTree(['/']) : true)
  );
};