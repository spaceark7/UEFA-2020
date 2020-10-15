const CACHE_NAME = "UEFA-2020-V1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/index.css",
  "/manifest.json",
  "/fonts/poppins-v13-latin-regular.woff2",
  "/fonts/poppins-v13-latin-regular.woff",
  "/fonts/poppins-v13-latin-500.woff",
  "/fonts/poppins-v13-latin-500.woff2",
  "/fonts/poppins-v13-latin-800.woff2",
  "/fonts/poppins-v13-latin-700.woff2",
  "/fonts/poppins-v13-latin-600.woff2",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log(
            "Service Worker: Menggunakan aset dari cache: ",
            response.url
          );
          return response;
        }
        console.log(
          "Service Worker: Menggunakan aset dari server: ",
          event.request.url
        );

        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("Service Worker: cache " + cacheName + " dihapus!");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});