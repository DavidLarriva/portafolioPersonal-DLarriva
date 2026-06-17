/** @type {import('tailwindcss').Config} */
module.exports = {
  /* rutas donde tailwind buscara clases */
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      /* jerarquia tipografica estilo Harvard:
         - sans (Inter) para cuerpo, subtitulos, botones y nav -> limpio y minimalista
         - serif (Libre Baskerville) para los titulos -> aire academico */
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}