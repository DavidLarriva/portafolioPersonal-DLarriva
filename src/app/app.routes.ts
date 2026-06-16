import { Routes } from '@angular/router';

import { HomePage } from './features/home/pages/home-page/home-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';

// importamos el guardia que acabamos de crear
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'profile', component: ProfilePage },
  
  // aplicamos la proteccion a la ruta de login
  { 
    path: 'auth', 
    component: LoginPage,
    canActivate: [guestGuard] 
  },
  
  { path: '**', redirectTo: '' }
];