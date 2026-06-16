import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // inyectamos la herramienta httpclient
  private http = inject(HttpClient);

  // la ruta base sale del environment para que cambie sola entre local y la nube
  private apiUrl = `${environment.strapiUrl}/api`;

  // metodo para traer los programadores usando la ruta exacta de strapi
  getProgramadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?populate=*`);
  }

  // traemos un solo programador por su slug (para el perfil individual)
  getProgramadorPorSlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?filters[slug][$eq]=${slug}&populate=*`);
  }

  // metodo para traer los proyectos
  getProyectos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos?populate=*`);
  }

  // traemos solo los proyectos marcados como destacados (para el home)
  getProyectosDestacados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos?filters[destacado][$eq]=true&populate=*`);
  }

  // metodo para traer los servicios
  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios?populate=*`);
  }
}
