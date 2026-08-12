const CACHE_NAME = "vamshi-cache-v1";

const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./config.js",
    "./memory.js",
    "./apps.js",
    "./app.js",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Cache-first for static assets; network calls to your Render backend
// (the /chat API) are never intercepted, since they aren't in ASSETS
// and don't match anything in the cache.
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});
