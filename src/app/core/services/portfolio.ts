import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // inyectamos la herramienta httpclient
  private http = inject(HttpClient);

  // guardamos la ruta base de nuestro strapi
  private apiUrl = 'http://localhost:1337/api';

  // metodo para traer los programadores usando la ruta exacta de strapi
  getProgramadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?populate=*`);
  }

  // metodo para traer los proyectos
  getProyectos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos?populate=*`);
  }

  // metodo para traer los servicios
  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios?populate=*`);
  }
}