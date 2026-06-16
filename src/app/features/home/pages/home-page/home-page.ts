import { Component, OnInit, inject, signal } from '@angular/core';
// importamos routerlink para poder navegar desde el html
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio';

@Component({
  selector: 'app-home-page',
  standalone: true,
  // agregamos routerlink al arreglo de importaciones
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage implements OnInit {
  
  private portfolioService = inject(PortfolioService);

  programadores = signal<any[]>([]);

  ngOnInit() {
    this.portfolioService.getProgramadores().subscribe((respuesta: any) => {
      this.programadores.set(respuesta.data);
    });
  }
}