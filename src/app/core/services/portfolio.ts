import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.strapiUrl}/api`;

  getProgramadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?populate=*`);
  }

  getProgramadorPorSlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?filters[slug][$eq]=${slug}&populate=*`);
  }

  getProyectos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos?populate=*`);
  }

  getProyectosDestacados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos?filters[destacado][$eq]=true&populate=*`);
  }

  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios?populate=*`);
  }
}
