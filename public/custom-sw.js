/* Service Worker personalizado del laboratorio */

console.log('[SW] custom-sw.js cargado');

/**
 * Evento install:
 * se ejecuta cuando el Service Worker se instala.
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Evento install');

  // Fuerza al nuevo Service Worker a pasar a la fase de activación.
  self.skipWaiting();
});

/**
 * Evento activate:
 * se ejecuta cuando el Service Worker toma el control.
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Evento activate');

  event.waitUntil(
    self.clients.claim().then(() => {
      console.log('[SW] Control de los clientes obtenido');
    })
  );
});

/**
 * Evento fetch:
 * se ejecuta cada vez que la aplicación solicita un recurso.
 */
self.addEventListener('fetch', (event) => {
  console.log('[SW] Solicitud fetch:', event.request.url);
});

/**
 * Evento message:
 * permite recibir mensajes enviados desde la aplicación.
 */
self.addEventListener('message', (event) => {
  console.log('[SW] Mensaje recibido:', event.data);

  if (event.data && event.data.type === 'PING') {
    console.log('[SW] PING recibido desde Angular');
  }
});

/**
 * Importa el Service Worker generado por Angular.
 * Esta línea debe permanecer al final.
 */
importScripts('./ngsw-worker.js');