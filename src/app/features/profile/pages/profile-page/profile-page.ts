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
  
  private portfolioService = inject(PortfolioService);

  programadores = signal<any[]>([]);

  ngOnInit() {
    this.portfolioService.getProgramadores().subscribe((respuesta: any) => {
      this.programadores.set(respuesta.data);
    });
  }

  // funcion corregida usando foto_perfil
  obtenerUrlImagen(prog: any): string {
    const rutaBase = 'http://localhost:1337';
    // buscamos la ruta exacta que manda strapi v5
    const rutaImagen = prog?.foto_perfil?.url || prog?.attributes?.foto_perfil?.data?.attributes?.url;
    
    if (rutaImagen) {
      return rutaBase + rutaImagen;
    }
    return '';
  }

  // nueva funcion para traducir el rich text a texto normal
  extraerTextoRichText(bloques: any): string {
    if (!bloques) return '';
    
    // si el texto viene normal lo devolvemos tal cual
    if (typeof bloques === 'string') return bloques;
    
    // si es un arreglo de bloques de strapi, extraemos el texto de adentro
    if (Array.isArray(bloques)) {
      return bloques.map((bloque: any) => {
        if (bloque.children && Array.isArray(bloque.children)) {
          return bloque.children.map((hijo: any) => hijo.text || '').join('');
        }
        return '';
      }).join('\n\n'); // unimos los parrafos con un salto de linea
    }
    
    return '';
  }
}