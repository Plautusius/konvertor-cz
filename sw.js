// Service Worker pro Konvertor.cz - Offline functionality
const CACHE_NAME = 'konvertor-v2.3';
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/converter.js?v=20250907-v3', // přidat verzi pro úplnou cache kontrolu
    '/manifest.json',
    '/favicon.ico'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Install complete');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('Service Worker: Install failed', err);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== CACHE_NAME) {
                            console.log('Service Worker: Deleting old cache', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    const url = new URL(event.request.url);
    
    // DŮLEŽITÉ: Necacheuj API endpointy - vždy network-first
    if (url.hostname.includes('api.cnb.cz') || 
        url.hostname.includes('allorigins.win') ||
        url.hostname.includes('corsproxy.io') ||
        url.hostname.includes('cors-anywhere.herokuapp.com')) {
        
        console.log('Service Worker: API call - network-first:', event.request.url);
        event.respondWith(
            fetch(event.request, { cache: 'no-store' })
                .catch(error => {
                    console.error('Service Worker: API call failed:', error);
                    // Nevrátíme cache pro API - chceme fresh data
                    throw error;
                })
        );
        return;
    }
    
    // Skip external requests (Google Analytics, etc.) 
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }
    
    // Cache-first pro statické zdroje
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache', event.request.url);
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone response for caching
                        const responseToCache = response.clone();
                        
                        // Cache successful responses (ukládej přesnou variantu s query)
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                                console.log('Service Worker: Cached new resource', event.request.url);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Network failed, check if it's a page request
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background sync for analytics when online
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-analytics') {
        event.waitUntil(
            // Send queued analytics events when online
            console.log('Service Worker: Background sync for analytics')
        );
    }
});