// Cache-buster utility pro Konvertor.cz
// Zajišťuje, že se vždy načte nejnovější verze

(function() {
    'use strict';

    const VERSION = '20250921';
    const FORCE_RELOAD_ASSETS = [
        'converter.js',
        'Lyra.png',
        'manifest.json'
    ];

    // Zkontroluj a aktualizuj všechny asset odkazy
    function updateAssetVersions() {
        // Aktualizuj všechny <script> tagy
        document.querySelectorAll('script[src]').forEach(script => {
            const src = script.getAttribute('src');
            if (FORCE_RELOAD_ASSETS.some(asset => src.includes(asset))) {
                if (!src.includes('v=')) {
                    script.src = `${src}?v=${VERSION}`;
                }
            }
        });

        // Aktualizuj všechny <link> tagy
        document.querySelectorAll('link[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (FORCE_RELOAD_ASSETS.some(asset => href.includes(asset))) {
                if (!href.includes('v=')) {
                    link.href = `${href}?v=${VERSION}`;
                }
            }
        });

        // Aktualizuj všechny <img> tagy
        document.querySelectorAll('img[src]').forEach(img => {
            const src = img.getAttribute('src');
            if (FORCE_RELOAD_ASSETS.some(asset => src.includes(asset))) {
                if (!src.includes('v=')) {
                    img.src = `${src}?v=${VERSION}`;
                }
            }
        });
    }

    // Vyčisti cache při detekci nové verze
    function clearOldCache() {
        if ('caches' in window) {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    if (cacheName.includes('konvertor') && !cacheName.includes(VERSION)) {
                        console.log('Mazání starého cache:', cacheName);
                        caches.delete(cacheName);
                    }
                });
            });
        }
    }

    // Force reload při Ctrl+F5 nebo Cmd+Shift+R
    function setupForceReload() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
                console.log('Force reload detectován');
                clearOldCache();
                window.location.reload(true);
            }
        });
    }

    // Spusť při načtení
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            updateAssetVersions();
            clearOldCache();
            setupForceReload();
        });
    } else {
        updateAssetVersions();
        clearOldCache();
        setupForceReload();
    }

    // Exportuj pro manuální použití
    window.cacheBuster = {
        version: VERSION,
        updateAssets: updateAssetVersions,
        clearCache: clearOldCache,
        forceReload: () => {
            clearOldCache();
            window.location.reload(true);
        }
    };
})();