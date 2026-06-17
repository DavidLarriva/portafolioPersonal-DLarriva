import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PortfolioService } from '../../core/services/portfolio';

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
  private portfolioService = inject(PortfolioService);

  // definimos correo
  correoProgramador = 'programador@gmail.com';

  // traemos el programador para poder armar el enlace al perfil (la ruta /perfil/:slug necesita su slug)
  private programadoresResource = rxResource({
    stream: () => this.portfolioService.getProgramadores().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });

  // slug del perfil principal; el enlace "Perfil" solo aparece cuando ya lo tenemos
  slugPerfil = computed(() => {
    const prog = this.programadoresResource.value()?.[0];
    return prog?.slug || prog?.documentId || prog?.id || '';
  });

  
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
