import { Routes } from '@angular/router';

import { HomePage } from './features/home/pages/home-page/home-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';
// importamos el nuevo componente
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';

import { guestGuard } from './core/guards/guest.guard';
// importamos el guardia que bloquea a los intrusos sin sesion
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'profile', component: ProfilePage },
  { 
    path: 'auth', 
    component: LoginPage,
    canActivate: [guestGuard] 
  },
  // creamos la ruta privada protegida por el authguard
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];