import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// importamos la herramienta para hacer peticiones a strapi
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // encendemos el cliente de red usando fetch para mayor velocidad
    provideHttpClient(withFetch())
  ]
};