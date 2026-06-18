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
    // se oculta deslizandose hacia arriba
    '[style.transform]': "oculto() ? 'translateY(-100%)' : ''"
  }
})
export class HeaderComponent {

  authService = inject(AuthService);
  private router = inject(Router);
  private portfolioService = inject(PortfolioService);

  correoProgramador = 'programador@gmail.com';

  // el enlace "Perfil" necesita el slug del programador
  private programadoresResource = rxResource({
    stream: () => this.portfolioService.getProgramadores().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });

  // solo mostramos "Perfil" cuando ya tenemos el slug
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
