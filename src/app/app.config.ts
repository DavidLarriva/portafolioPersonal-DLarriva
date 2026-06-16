import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

// importamos las herramientas de firebase
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

// encendemos firebase usando tus llaves apenas arranca la app
initializeApp(environment.firebase);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};