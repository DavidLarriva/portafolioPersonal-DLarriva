# Portafolio Profesional — David Larriva

Proyecto Integrador de **Programación y Plataformas Web**. Aplicación web tipo portafolio de servicios, con contenido dinámico administrado desde un CMS Headless, autenticación de usuarios y gestión de solicitudes de contacto en tiempo real.

Diseño minimalista en escala de grises.

---

## 1. Arquitectura del sistema

La aplicación separa responsabilidades en tres piezas:

| Pieza | Responsabilidad |
|-------|-----------------|
| **Angular 21** | Frontend. Muestra el portafolio, consume los endpoints REST de Strapi, gestiona el login con Firebase y las solicitudes en Firestore. |
| **Strapi (CMS Headless)** | Administra el contenido dinámico: programadores, proyectos y servicios. No se desarrolla un panel admin propio en Angular. |
| **Firebase Authentication** | Registro e inicio de sesión por correo/contraseña. |
| **Cloud Firestore** | Almacena las solicitudes de contacto, asociadas al `uid`, correo del usuario y al programador seleccionado. |

```
Usuario → Angular ──REST──→ Strapi (contenido del portafolio)
                 └─SDK───→ Firebase Auth (sesión)
                 └─SDK───→ Cloud Firestore (solicitudes)
```

---

## 2. Stack técnico

- Angular 21 (standalone components, signals, control flow `@if`/`@for`).
- **`rxResource`** (`@angular/core/rxjs-interop`) para el consumo reactivo de Strapi, con estados de carga/error automáticos.
- Tailwind CSS v3.
- `@angular/fire` (Firebase Auth + Firestore).
- Strapi como CMS Headless.

---

## 3. Contenido dinámico en Strapi

Colecciones definidas:

- **Programador:** nombre completo, especialidad, descripción breve, descripción completa, foto de perfil, correo de contacto, GitHub, LinkedIn, estado activo y `slug` (para la navegación al perfil individual).
- **Proyecto:** nombre, `slug`, descripción breve, descripción completa, imagen principal, tipo de proyecto, tecnologías, enlace al repositorio, enlace al demo, campo **`destacado`** (para mostrarlo en el Home) y una relación **muchos a muchos** con Programador.
- **Servicio:** áreas de especialización (ej. desarrollo frontend, backend, diseño de interfaces).

> **Permisos:** en *Settings → Users & Permissions → Roles → Public* se habilitaron `find` y `findOne` para Programador, Proyecto y Servicio, de modo que Angular pueda consumir la API pública sin autenticación.

---

## 4. Configuración por entornos

La URL de Strapi **no está quemada en el código**; sale de los archivos de entorno:

- `src/environments/environment.ts` → **producción** (Strapi Cloud). Se usa al hacer `ng build`.
- `src/environments/environment.development.ts` → **local** (`http://localhost:1337`). Se usa al hacer `ng serve`.

El intercambio lo realiza `angular.json` mediante `fileReplacements` en la configuración de desarrollo.

> ⚠️ Antes de desplegar, edita `strapiUrl` en `src/environments/environment.ts` con la URL real de tu Strapi Cloud.

---

## 5. Ejecución local

**Requisitos:** Node.js, pnpm y una instancia de Strapi corriendo.

```bash
# 1. Levantar Strapi (en el proyecto de Strapi)
npm run develop          # queda en http://localhost:1337

# 2. Levantar el frontend (en este proyecto)
pnpm install
pnpm start               # http://localhost:4200
```

---

## 6. Guía de despliegue

### 6.1. Strapi en la nube (Strapi Cloud)
1. Sube el proyecto de Strapi a un repositorio y conéctalo a [Strapi Cloud](https://strapi.io/cloud) (o despliégalo en otro hosting).
2. Vuelve a configurar los permisos públicos (`find`/`findOne`) en el entorno de la nube.
3. Carga el contenido (programador, proyectos, servicios) y copia la URL pública, por ejemplo `https://mi-portafolio.strapiapp.com`.

### 6.2. Frontend en Firebase Hosting
```bash
# 1. Pon la URL de Strapi Cloud en src/environments/environment.ts (strapiUrl)

# 2. Compila en modo producción
pnpm build

# 3. Despliega (requiere firebase-tools: npm i -g firebase-tools)
firebase login
firebase deploy --only hosting
```

La configuración de Hosting ya está incluida:
- `firebase.json` → publica `dist/portafolio-david/browser` con *rewrite* SPA hacia `index.html`.
- `.firebaserc` → proyecto `portafolio-david-5ba22`.

---

## 7. Guía de usuario

### Usuario visitante (público)
- Explora el Home: perfil del desarrollador, servicios y proyectos destacados.
- Hace clic en la tarjeta del desarrollador para ver su **perfil individual** y sus proyectos.
- Para enviar una solicitud debe **registrarse / iniciar sesión**.

### Usuario externo autenticado
- Se registra con correo y contraseña en *Acceder*.
- Envía una solicitud de contacto desde *Contacto* (su correo se autocompleta).
- En *Panel* ve el estado de sus solicitudes enviadas y las respuestas recibidas.

### Programador / administrador
- Inicia sesión con la cuenta de programador (correo configurado en la app).
- En *Panel* ve **todas** las solicitudes recibidas, cambia su estado (Pendiente/Respondida) y registra una respuesta que se guarda en Firestore en tiempo real.

> El rol de programador se identifica por el correo definido en la constante `correoProgramador` (en header, dashboard y contacto).

---

## 8. Decisiones de diseño

- **`rxResource` en vez de `subscribe` manual:** elimina el manejo manual de suscripciones y entrega estados de carga/error/reintento listos para la plantilla.
- **`slug` para el perfil individual:** rutas legibles (`/perfil/:slug`) en lugar de IDs numéricos.
- **Lectura tolerante de Strapi (v4/v5):** las plantillas leen tanto `campo` (plano, Strapi v5) como `attributes.campo` (Strapi v4) para no romperse según la versión.
- **Configuración por entornos:** permite pasar de local a la nube cambiando solo un archivo, sin tocar el código.

---

## 9. Desafíos enfrentados

- **URL de Strapi quemada:** inicialmente apuntaba a `localhost:1337` en el código, lo que habría roto el sitio en producción. Se resolvió moviéndola a los archivos de entorno.
- **Formato de respuesta de Strapi:** la forma de los datos cambia entre versiones (plano vs. `attributes`); se manejó con lecturas defensivas.
- **Imágenes de Strapi:** las URLs llegan relativas; se arma la URL absoluta anteponiendo `strapiUrl`.
- **Diferenciación de roles:** distinguir visitante / usuario autenticado / programador reutilizando el estado de sesión de Firebase.

---

## 10. Proceso de desarrollo (bitácora)

1. Proyecto base con Angular 21 + pnpm, SSR desactivado, Tailwind v3.
2. Componentes globales (header/footer) y vistas principales con enrutador.
3. Configuración de Strapi como CMS Headless y sus colecciones.
4. Consumo de la API de Strapi (inicialmente con `HttpClient` + signals, luego migrado a `rxResource`).
5. Autenticación con Firebase (registro, login, logout) y formularios reactivos.
6. Solicitudes de contacto guardadas en Cloud Firestore.
7. Panel de gestión de solicitudes con vistas diferenciadas por rol.
8. Home con perfil, servicios y proyectos destacados; perfil individual por `slug`.
9. SEO inicial (tags y Open Graph) y preparación del despliegue.
