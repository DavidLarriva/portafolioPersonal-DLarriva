# portafolio personal - david larriva

proyecto integrador de programacion y plataformas web. portafolio minimalista en escala de grises.

## paso 1: configuracion inicial
- creacion del proyecto base con angular 21 usando pnpm.
- desactivacion de ssr (server-side rendering) y configuracion de rutas activada.
- inicializacion del repositorio en github.
- limpieza de codigo base y estilos globales aplicados (escala de grises).
- instalacion y configuracion de tailwind css v3.

## paso 2: estructura y vistas
- creacion de componentes globales header y footer.
- creacion de vistas principales home, perfil y login.
- configuracion del enrutador de angular para navegacion.

## Paso 3: Configuración del CMS Headless (Strapi)
En esta fase se configuró el backend del proyecto utilizando Strapi, cumpliendo con la separación de responsabilidades solicitada en la arquitectura.

**Colecciones creadas:**
* **Programador:** Almacena la información del perfil (nombre, especialidad, descripciones, foto, redes sociales).
* **Proyecto:** Almacena los proyectos de portafolio. Se implementó una **relación de muchos a muchos** (has and belongs to many) con la colección Programador.
* **Servicio:** Almacena las áreas de especialización.

**Configuraciones de seguridad:**
Se modificaron los permisos en la sección *Users & Permissions Plugin > Roles > Public* para permitir peticiones no autenticadas (`find` y `findOne`) a los endpoints del contenido dinámico, permitiendo que Angular pueda consumir la API pública del portafolio.

