import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css']
})
export class DashboardPageComponent {
  
  // traemos el servicio para saber quien inicio sesion
  authService = inject(AuthService);

}