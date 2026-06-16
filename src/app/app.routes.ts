import { Routes } from '@angular/router';

// importamos las paginas que ya tienes creadas en tus carpetas
import { HomePage } from './features/home/pages/home-page/home-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';

export const routes: Routes = [
  // ruta principal que carga el home
  { path: '', component: HomePage },
  
  // ruta para ver los proyectos
  { path: 'profile', component: ProfilePage },
  
  // ruta para acceder al sistema
  { path: 'auth', component: LoginPage },
  
  // si el usuario escribe una ruta que no existe lo mandamos al inicio
  { path: '**', redirectTo: '' }
];