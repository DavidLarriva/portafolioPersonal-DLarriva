import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage {

  private portfolioService = inject(PortfolioService);

  programadoresResource = rxResource({
    stream: () => this.portfolioService.getProgramadores().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  programadores = this.programadoresResource.value;

  serviciosResource = rxResource({
    stream: () => this.portfolioService.getServicios().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  servicios = this.serviciosResource.value;

  destacadosResource = rxResource({
    stream: () => this.portfolioService.getProyectosDestacados().pipe(
      map((respuesta: any) => respuesta.data ?? [])
    ),
    defaultValue: [] as any[]
  });
  destacados = this.destacadosResource.value;

  obtenerSlug(item: any): string {
    return item?.slug || item?.attributes?.slug || item?.documentId || item?.id;
  }

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
