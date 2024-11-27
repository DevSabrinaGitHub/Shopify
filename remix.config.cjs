/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    // Ruta base de la aplicación Remix
    appDirectory: "app",
    
    // Ruta donde se generarán los archivos compilados
    assetsBuildDirectory: "public/build",
    
    // Ruta del servidor
    serverBuildPath: "build/index.js",
    
    // Directorio público para archivos estáticos
    publicPath: "/build/",
    
    // Configuración para usar la sintaxis moderna
    future: {
      v2_routeConvention: true, // Opt-in para la convención moderna de rutas
      v2_meta: true, // Meta API moderna
      v2_errorBoundary: true, // Manejo de errores más robusto
      v2_normalizeFormMethod: true, // Normalización de métodos en formularios
    },
  };
  