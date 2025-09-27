# Konvertor.cz v2.4 - Production Release

🚀 **Cache-optimized version with advanced browser caching**

## 📦 Production Files

✅ **Core Application:**
- `index.html` - Main page with cache-busting
- `converter.js` - Main conversion logic
- `converter-en.js` - English version
- `language-switcher.js` - Language switching

✅ **Cache & Performance:**
- `cache-buster.js` - Cache management utility
- `sw.js` - Service Worker for PWA
- `.htaccess` - Server cache configuration

✅ **Assets & Config:**
- `Lyra.png` - Logo with version parameter
- `manifest.json` - PWA configuration

✅ **SEO & Legal:**
- `robots.txt` - Search engine directives
- `sitemap.xml` - Site structure
- `404.html` - Error page
- `privacy-policy.html` - GDPR compliance
- `cookie-policy.html` - Cookie policy
- `ads.txt` - AdSense verification

## 🎯 Version 2.4 Features

### ✨ Cache Optimization
- **Version parameters** on all assets (`?v=20250920`)
- **Smart caching** - HTML always fresh, assets cached long-term
- **Service Worker** with network-first/cache-first strategies
- **Auto cache cleanup** for old versions

### 🎨 UI Improvements
- **Lyra logo** integration with hover effects
- **Compact header** design
- **Quick conversions** section above ads
- **Mobile optimization** with responsive design
- **Dark mode** support for all elements

### 🔧 Technical Enhancements
- **AdSense integration** with Google CMP
- **PWA support** with offline capability
- **SEO optimization** with structured data
- **GDPR compliance** with consent management

## 🚀 Deploy Instructions

1. **Upload all files** to web server root
2. **Verify .htaccess** is applied
3. **Test in incognito** mode for cache verification
4. **Check AdSense** functionality
5. **Validate PWA** installation

## 📊 Cache Strategy

- **HTML**: No cache (always fresh)
- **JS/CSS with ?v=**: 1 year cache + immutable
- **Images with ?v=**: 1 year cache
- **Service Worker**: No cache
- **API calls**: Network-first

*Built: 2025-09-20 | Version: 2.4*