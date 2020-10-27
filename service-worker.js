const CACHE_NAME = "UEFA-2020";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/index.css",
  "/manifest.json",
  "/js/api.js",
  "/js/jquery-3.5.1.min.js",
  "/js/materialize.min.js",
  "/js/nav.js",
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
