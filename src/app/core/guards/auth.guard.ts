import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  // inyectamos las herramientas de sesion y navegacion
  const authService = inject(AuthService);
  const router = inject(Router);

  // IMPORTANTE: al recargar la pagina, firebase tarda unos milisegundos en
  // restaurar la sesion guardada. Si decidieramos de inmediato veriamos "sin sesion"
  // y expulsariamos al usuario por error. Por eso esperamos la PRIMERA emision real
  // de firebase (take(1)) y recien ahi decidimos.
  return authService.estadoSesion.pipe(
    take(1),
    map(usuario => usuario ? true : router.createUrlTree(['/auth']))
  );
};