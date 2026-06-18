import { Component, inject } from '@angular/core';
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

  private portfolioService = inject(PortfolioService);
  private route = inject(ActivatedRoute);

  slug = toSignal(this.route.paramMap.pipe(map(p => p.get('slug') ?? '')), { initialValue: '' });

  // vuelve a pedir los datos cuando cambia el slug de la url
  programadorResource = rxResource({
    params: () => this.slug(),
    stream: ({ params }) => this.portfolioService.getProgramadorPorSlug(params).pipe(
      map((respuesta: any) => respuesta.data?.[0] ?? null)
    ),
    defaultValue: null
  });
  programador = this.programadorResource.value;

  obtenerUrlImagen(prog: any): string {
    const rutaImagen = prog?.foto_perfil?.url || prog?.attributes?.foto_perfil?.data?.attributes?.url;
    if (rutaImagen) {
      // strapi cloud da url absoluta; en local hay que anteponer el host
      return rutaImagen.startsWith('http') ? rutaImagen : environment.strapiUrl + rutaImagen;
    }
    return '';
  }

  urlExterna(url: string): string {
    if (!url) return '';
    return /^https?:\/\//i.test(url) ? url : 'https://' + url;
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
