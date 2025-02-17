const CACHE_NAME = "wrapstudio-cache-v1";
const DYNAMIC_CACHE = "wrapstudio-dynamic-v1";
const API_CACHE = "wrapstudio-api-v1";

// Assets to cache
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/favicon.svg",
    "/og-image.jpg",
    "/manifest.json",
    "/robots.txt",
    "/sitemap.xml",
    "/fonts/unisans.woff2",
    "/fonts/montserrat.woff2",
    "/offline.html",
    "/images/**/*",
    "/styles/**/*",
    "/scripts/**/*"
];

// Cache duration in seconds
const CACHE_DURATION = {
    assets: 7 * 24 * 60 * 60, // 7 days
    api: 60 * 60, // 1 hour
    dynamic: 24 * 60 * 60 // 1 day
};

// Install event - cache core assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
    const currentCaches = [CACHE_NAME, DYNAMIC_CACHE];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!currentCaches.includes(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event handler with improved caching strategies
self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Handle API calls with stale-while-revalidate strategy
    if (url.pathname.startsWith("/api/")) {
        event.respondWith(
            caches.open(API_CACHE).then((cache) =>
                cache.match(request).then((cachedResponse) => {
                    const fetchPromise = fetch(request).then((networkResponse) => {
                        if (networkResponse.ok) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    });

                    return cachedResponse || fetchPromise;
                })
            )
        );
        return;
    }

    // Handle static assets with cache-first strategy
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            // Return cached response if found
            if (cachedResponse) {
                // Validate cache age
                const cachedTime = new Date(cachedResponse.headers.get('date')).getTime();
                const now = new Date().getTime();
                const isCacheValid = (now - cachedTime) < (CACHE_DURATION.assets * 1000);

                if (isCacheValid) {
                    return cachedResponse;
                }
            }

            // Fetch from network
            return fetch(request)
                .then((networkResponse) => {
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }

                    // Cache the new response
                    const responseToCache = networkResponse.clone();
                    caches.open(request.url.includes('/api/') ? API_CACHE : DYNAMIC_CACHE)
                        .then((cache) => {
                            if (request.method === "GET") {
                                // Add cache control headers
                                const headers = new Headers(responseToCache.headers);
                                headers.append('date', new Date().toUTCString());
                                const responseWithDate = new Response(responseToCache.body, {
                                    status: responseToCache.status,
                                    statusText: responseToCache.statusText,
                                    headers: headers
                                });
                                cache.put(request, responseWithDate);
                            }
                        });

                    return networkResponse;
                })
                .catch(() => {
                    // Return offline fallback for navigation requests
                    if (request.mode === "navigate") {
                        return caches.match("/offline.html");
                    }
                    return new Response("Network error", { status: 408 });
                });
        })
    );
});

// Handle background sync for forms and analytics
self.addEventListener("sync", (event) => {
    if (event.tag === "contact-form-sync") {
        event.waitUntil(
            // Process queued form submissions
            fetch('/api/contact/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    origin: 'wrapstudio.kz'
                })
            })
        );
    }
});

// Handle push notifications
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        event.waitUntil(
            self.registration.showNotification('WrapStudio', {
                body: data.message,
                icon: '/favicon.svg',
                badge: '/favicon.svg',
                data: data
            })
        );
    }
});

// Cache cleanup routine
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(
            Promise.all([
                cleanupCache(DYNAMIC_CACHE, CACHE_DURATION.dynamic),
                cleanupCache(API_CACHE, CACHE_DURATION.api)
            ])
        );
    }
});

// Helper function to cleanup expired cache entries
async function cleanupCache(cacheName, maxAge) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    const now = new Date().getTime();

    return Promise.all(
        requests.map(async (request) => {
            const response = await cache.match(request);
            const cachedTime = new Date(response.headers.get('date')).getTime();
            if (now - cachedTime > maxAge * 1000) {
                return cache.delete(request);
            }
        })
    );
}