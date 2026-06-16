import { Component, inject } from '@angular/core';
// rxResource convierte el observable de strapi en un recurso reactivo basado en signals
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePage {

  // traemos el servicio del portafolio y la ruta activa
  private portfolioService = inject(PortfolioService);
  private route = inject(ActivatedRoute);

  // leemos el slug de la url de forma reactiva
  slug = toSignal(this.route.paramMap.pipe(map(p => p.get('slug') ?? '')), { initialValue: '' });

  // rxResource vuelve a pedir los datos cada vez que cambia el slug (params)
  programadorResource = rxResource({
    params: () => this.slug(),
    stream: ({ params }) => this.portfolioService.getProgramadorPorSlug(params).pipe(
      map((respuesta: any) => respuesta.data?.[0] ?? null)
    ),
    defaultValue: null
  });

  // exponemos el valor para el html
  programador = this.programadorResource.value;

  obtenerUrlImagen(prog: any): string {
    const rutaImagen = prog?.foto_perfil?.url || prog?.attributes?.foto_perfil?.data?.attributes?.url;
    if (rutaImagen) return environment.strapiUrl + rutaImagen;
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
