import { Component, OnInit, inject, signal } from '@angular/core';
import { PortfolioService } from '../../../../core/services/portfolio';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePage implements OnInit {
  
  // traemos solo el servicio del portafolio
  private portfolioService = inject(PortfolioService);

  // la señal para guardar los datos de strapi
  programadores = signal<any[]>([]);

  ngOnInit() {
    this.portfolioService.getProgramadores().subscribe((respuesta: any) => {
      this.programadores.set(respuesta.data);
    });
  }

  obtenerUrlImagen(prog: any): string {
    const rutaBase = 'http://localhost:1337';
    const rutaImagen = prog?.foto_perfil?.url || prog?.attributes?.foto_perfil?.data?.attributes?.url;
    if (rutaImagen) return rutaBase + rutaImagen;
    return '';
  }

  extraerTextoRichText(bloques: any): string {
    if (!bloques) return '';
    if (typeof bloques === 'string') return bloques;
    if (Array.isArray(bloques)) {
      return bloques.map((bloque: any) => {
        if (bloque.children && Array.isArray(bloque.children)) {
          return bloque.children.map((hijo: any) => hijo.text || '').join('');
        }
        return '';
      }).join('\n\n');
    }
    return '';
  }

  obtenerProyectos(prog: any): any[] {
    return prog?.proyectos || prog?.attributes?.proyectos?.data || [];
  }
}