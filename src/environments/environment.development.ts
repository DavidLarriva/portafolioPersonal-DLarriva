// entorno de DESARROLLO (se usa al hacer "ng serve")
// aqui apuntamos a tu Strapi corriendo localmente.
export const environment = {
  production: false,
  // URL base de Strapi local (sin la barra final)
  strapiUrl: 'http://localhost:1337',
  firebase: {
    apiKey: "AIzaSyArg-Kiy9sR8u8dQePsn5g7RE_5rsBZYdE",
    authDomain: "portafolio-david-5ba22.firebaseapp.com",
    projectId: "portafolio-david-5ba22",
    storageBucket: "portafolio-david-5ba22.firebasestorage.app",
    messagingSenderId: "670502142309",
    appId: "1:670502142309:web:f39b380d8c31b23e3aa18c"
  }
};
