# Cache Strategy - Konvertor.cz v2.4

## ✅ Implementované Řešení

### 1. Version Query Parameters
- **Všechny statické assety** mají `?v=20250920` parametr
- **HTML soubory**: NO CACHE (vždy fresh)
- **JS/CSS s version**: Cache 1 rok
- **Obrázky s version**: Cache 1 rok
- **Bez version**: Krátká cache (1-24h)

### 2. Service Worker Strategie
```javascript
// Versioned assety = strict cache-first
// HTML a API = network-first s fallback
```

### 3. .htaccess Konfigurace
- **GZIP komprese** pro všechny text assets
- **Cache headers** podle typu souboru a presence `?v=`
- **Redirecty** starých verzí na nové
- **Security headers**

### 4. Cache-Buster Utility
- **Automatická detekce** starých verzí
- **Force reload** při Ctrl+Shift+R
- **Cache cleanup** starých verzí

## 🎯 Výsledek

### ✅ Co je vyřešeno:
1. **Browser cache nevybírá staré verze** - versioned URLs
2. **Rychlé načítání** - dlouhá cache pro versioned assety
3. **Fresh HTML vždy** - no-cache pro HTML
4. **AdSense kompatibilita** - external requests nezasaženy
5. **PWA funkční** - Service Worker s proper strategií

### 🔧 Technické detaily:
- **Cache-Control** headers dle typu souboru
- **Immutable cache** pro versioned assets
- **Network-first** pro HTML a API
- **Fallback** pro offline režim

### 📱 Testování:
```bash
# Otevři DevTools → Network → Disable cache
# Reload page několikrát
# Zkontroluj: Status 200 vs 304 vs (disk cache)
```

## 🚀 Deploy Checklist
- [ ] Upload všech souborů s novou version
- [ ] Test v inkognito režimu
- [ ] Kontrola AdSense funkčnosti
- [ ] Mobile responsivity check
- [ ] PWA install test

*Aktualizováno: 2025-09-20*