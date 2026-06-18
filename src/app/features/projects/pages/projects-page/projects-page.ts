import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PortfolioService } from '../../../../core/services/portfolio';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [],
  templateUrl: './projects-page.html',
  styleUrls: ['./projects-page.css']
})
export class ProjectsPage {

  private portfolioService = inject(PortfolioService);

  // todos los proyectos (el home solo muestra los destacados)
  proyectosResource = rxResource({
    stream: () => this.portfolioService.getProyectos().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  proyectos = this.proyectosResource.value;

  obtenerUrlImagen(item: any, campos: string[]): string {
    for (const campo of campos) {
      const rutaImagen = item?.[campo]?.url || item?.attributes?.[campo]?.data?.attributes?.url;
      if (rutaImagen) {
        // strapi cloud da url absoluta; en local hay que anteponer el host
        return rutaImagen.startsWith('http') ? rutaImagen : environment.strapiUrl + rutaImagen;
      }
    }
    return '';
  }

  urlExterna(url: string): string {
    if (!url) return '';
    return /^https?:\/\//i.test(url) ? url : 'https://' + url;
  }
}
