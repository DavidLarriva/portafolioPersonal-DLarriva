// entorno de PRODUCCION (se usa al hacer "ng build")
// IMPORTANTE: reemplaza strapiUrl por la URL real de tu Strapi Cloud cuando lo despliegues.
export const environment = {
  production: true,
  // URL base de Strapi en la nube (sin /admin, sin /api y sin barra final)
  strapiUrl: 'https://heroic-bee-86e6f6e8c9.strapiapp.com',
  firebase: {
    apiKey: "AIzaSyArg-Kiy9sR8u8dQePsn5g7RE_5rsBZYdE",
    authDomain: "portafolio-david-5ba22.firebaseapp.com",
    projectId: "portafolio-david-5ba22",
    storageBucket: "portafolio-david-5ba22.firebasestorage.app",
    messagingSenderId: "670502142309",
    appId: "1:670502142309:web:f39b380d8c31b23e3aa18c"
  }
};
