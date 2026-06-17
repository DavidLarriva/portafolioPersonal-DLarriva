import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  
  private http = inject(HttpClient);

  // la ruta base 
  private apiUrl = `${environment.strapiUrl}/api`;

  // metodo para traer los programadores 
  getProgramadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?populate=*`);
  }

  // traemos un solo programador 
  getProgramadorPorSlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?filters[slug][$eq]=${slug}&populate=*`);
  }

  // metodo proyectos
  getProyectos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos?populate=*`);
  }

  // destacados
  getProyectosDestacados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos?filters[destacado][$eq]=true&populate=*`);
  }

  // metodo para traer los servicios
  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios?populate=*`);
  }
}
