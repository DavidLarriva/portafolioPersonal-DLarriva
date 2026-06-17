import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  host: {
    // cuando esta oculto lo deslizamos hacia arriba 
    '[style.transform]': "oculto() ? 'translateY(-100%)' : ''"
  }
})
export class HeaderComponent {

  authService = inject(AuthService);
  private router = inject(Router);

  // definimos correo
  correoProgramador = 'programador@gmail.com';

  
  oculto = signal(false);
  private ultimoScroll = 0;

  @HostListener('window:scroll')
  alHacerScroll() {
    const posicionActual = window.scrollY;
    
    this.oculto.set(posicionActual > this.ultimoScroll && posicionActual > 80);
    this.ultimoScroll = posicionActual;
  }

  // evaluamos si quien esta conectado es el dueño
  esProgramador(): boolean {
    const usuarioActual = this.authService.currentUser();
    return usuarioActual?.email === this.correoProgramador;
  }

  cerrarSesion() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
