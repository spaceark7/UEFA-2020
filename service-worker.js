const CACHE_NAME = "UEFA-2020-v5";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/pages/home.html",
  "/pages/saved.html",
  "/pages/teams.html",
  "/index.css",
  "/teamDetail.css",
  "/css/home.css",
  "/css/materialize.min.css",
  "/manifest.json",
  "/js/jquery-3.5.1.min.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/assets/bg.jpg",
  "/assets/cr.png",
  "/assets/dijk.png",
  "/assets/football-ball.png",
  "/assets/football-ball.svg",
  "/assets/football.svg",
  "/assets/logo.png",
  "/assets/lv.png",
  "/assets/mbappe.png",
  "/assets/Messi.png",
  "/assets/sports.svg",
  "/assets/statistics.svg",
  "/assets/top-image.jpg",
  "/logo192.png",
  "/logo256.png",
  "/logo512.png",
  "/lg.png",
  "/r1.png",
  "/icon.png",
  
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

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'assets/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
