import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { ProjectsPage } from './features/projects/pages/projects-page/projects-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { ContactPageComponent } from './features/contact/pages/contact-page/contact-page';

import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'proyectos', component: ProjectsPage },
  { path: 'perfil/:slug', component: ProfilePage },
  { path: 'auth', component: LoginPage, canActivate: [guestGuard] },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard] },
  { path: 'contacto', component: ContactPageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];