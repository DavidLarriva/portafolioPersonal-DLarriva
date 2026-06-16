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

## paso 3: configuracion del cms headless (strapi)
en esta fase se configuro el backend del proyecto utilizando strapi, cumpliendo con la separacion de responsabilidades solicitada en la arquitectura.

**colecciones creadas:**
* **programador:** almacena la informacion del perfil (nombre, especialidad, descripciones, foto, redes sociales).
* **proyecto:** almacena los proyectos de portafolio. se implemento una **relacion de muchos a muchos** (has and belongs to many) con la coleccion programador.
* **servicio:** almacena las areas de especializacion.

**configuraciones de seguridad:**
se modificaron los permisos en la seccion *users & permissions plugin > roles > public* para permitir peticiones no autenticadas (`find` y `findone`) a los endpoints del contenido dinamico, permitiendo que angular pueda consumir la api publica del portafolio.

## paso 6: consumo de la api (conexion angular - strapi)
se configuro httpclient para realizar peticiones al backend. se creo un servicio para consumir los endpoints publicos de strapi. se diseño la interfaz de las paginas home y perfil aplicando directivas de control de flujo para renderizar los datos del programador y sus proyectos relacionados de forma dinamica, armando correctamente las url de las imagenes.