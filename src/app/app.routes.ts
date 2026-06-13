import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';

export const routes: Routes = [
  /* ruta principal */
  { path: '', component: HomePage },
  /* rutas secundarias */
  { path: 'perfil', component: ProfilePage },
  { path: 'login', component: LoginPage },
  /* redireccion por defecto si la ruta no existe */
  { path: '**', redirectTo: '' }
];