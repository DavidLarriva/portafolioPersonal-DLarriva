import { Component, inject } from '@angular/core';
// rxResource convierte un observable en un recurso reactivo basado en signals
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

  // recurso con TODOS los proyectos (no solo los destacados del home)
  proyectosResource = rxResource({
    stream: () => this.portfolioService.getProyectos().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  proyectos = this.proyectosResource.value;

  // arma la url completa de una imagen de strapi probando varios nombres de campo posibles
  obtenerUrlImagen(item: any, campos: string[]): string {
    for (const campo of campos) {
      const rutaImagen = item?.[campo]?.url || item?.attributes?.[campo]?.data?.attributes?.url;
      if (rutaImagen) {
        // en strapi cloud la url ya es absoluta; en local es relativa y hay que anteponer el host
        return rutaImagen.startsWith('http') ? rutaImagen : environment.strapiUrl + rutaImagen;
      }
    }
    return '';
  }

  // normaliza enlaces externos: si el usuario no puso http(s), se lo agregamos
  urlExterna(url: string): string {
    if (!url) return '';
    return /^https?:\/\//i.test(url) ? url : 'https://' + url;
  }
}
