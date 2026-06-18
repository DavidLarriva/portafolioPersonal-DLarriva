import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // esperamos la primera respuesta de firebase (take(1)) para no expulsar al recargar
  return authService.estadoSesion.pipe(
    take(1),
    map(usuario => usuario ? true : router.createUrlTree(['/auth']))
  );
};