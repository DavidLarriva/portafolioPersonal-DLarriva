import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

// traemos las herramientas de angularfire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    
    // conectamos firebase a nuestra app usando tus llaves
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    
    // encendemos el modulo de autenticacion
    provideAuth(() => getAuth())
  ]
};