import { Component, inject } from '@angular/core';
// rxResource convierte un observable en un recurso reactivo basado en signals
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
// importamos routerlink para poder navegar desde el html
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-home-page',
  standalone: true,
  // agregamos routerlink al arreglo de importaciones
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage {

  private portfolioService = inject(PortfolioService);

  // recurso con las tarjetas de los programadores
  programadoresResource = rxResource({
    stream: () => this.portfolioService.getProgramadores().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  programadores = this.programadoresResource.value;

  // recurso con los servicios o areas de especializacion
  serviciosResource = rxResource({
    stream: () => this.portfolioService.getServicios().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  servicios = this.serviciosResource.value;

  // recurso con los proyectos marcados como destacados
  destacadosResource = rxResource({
    stream: () => this.portfolioService.getProyectosDestacados().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  destacados = this.destacadosResource.value;

  // el slug nos sirve para construir el enlace al perfil individual
  obtenerSlug(item: any): string {
    return item?.slug || item?.attributes?.slug || item?.documentId || item?.id;
  }

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
