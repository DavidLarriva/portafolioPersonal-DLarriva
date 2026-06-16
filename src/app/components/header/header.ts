import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class AppHeaderComponent {
  
  // pedimos prestadas las herramientas de sesion y navegacion
  authService = inject(AuthService);
  private router = inject(Router);

  // funcion para salir de la cuenta y volver al inicio
  cerrarSesion() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}