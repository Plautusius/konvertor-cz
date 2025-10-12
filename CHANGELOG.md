# Changelog - Konvertor.cz

## [2.6.0] - 2025-10-12 🚀 AdSense Ready

### ✨ Přidáno
- **Samostatná stránka Encyklopedie** (`encyklopedie.html`)
  - 8 kategorií: Čas, Chemie, Data, Délka, Hmotnost, Objem, Teplota, Tlak
  - 44 kompletních jednotek s definicemi, historií a použitím
  - 88 paragrafů vzdělávacího obsahu (98 KB HTML, 1444 řádků)
  - Navigace po kategoriích s kotvami
- **Výrazný box "Encyklopedie jednotek"** na homepage
  - Fialový gradient s ikonou 📚
  - CTA tlačítko "Procházet encyklopedii"
  - Umístěno mezi kategorií selector a převodníkem
- **AdSense slot na encyklopedii** (pod úvodem)
  - Desktop: 728×90 (Leaderboard)
  - Mobil: Responzivní (Auto)
  - Auto-hide placeholder po načtení
- **Dark mode synchronizace** mezi homepage a encyklopedií
  - Sjednocený localStorage klíč: `konvertor_theme`
- **SEO vylepšení**
  - Encyklopedie v sitemap.xml (priority 0.9)
  - CollectionPage JSON-LD schema
  - Aktualizované meta descriptions

### 🔄 Změněno
- **Encyklopedie obsah** - odstraněno "Další kategorie budou brzy dostupné"
- **Navigace** - pouze 8 existujících kategorií (ne 25 plánovaných)
- **Meta tagy** - reflektují skutečný obsah (ne plánovaný)
- **localStorage klíč** - z `'theme'` na `'konvertor_theme'` v encyklopedii

### 🗑️ Odstraněno
- "Work in progress" indikátory na encyklopedii
- Odkazy na neexistující kategorie
- Nerealistické tvrzení o "250+ jednotkách"
- Link na encyklopedii z category-btn gridu

### 🐛 Opraveno
- Dark mode se nyní správně synchronizuje mezi stránkami
- AdSense slot na encyklopedii se správně načítá podle zařízení
- Theme toggle ikona (sun/moon) se správně přepíná

### 📋 AdSense Compliance
✅ **Pre-flight checklist splněn:**
- Encyklopedie má viditelný text hned po načtení
- AdSense slot umístěn až pod prvním obsahem
- Viditelné odkazy na encyklopedii (homepage box + patička)
- AdSense snippet v `<head>` na obou stránkách
- ads.txt v kořeni: `pub-4014521280729531`
- Meta robots: `index,follow` (žádný noindex)
- Consent Mode v2 implementován

**Status:** Production ready - připraveno pro AdSense review request

---

## [2.5.0] - 2025-10-11

### ✨ Přidáno
- **257 kompletních historií jednotek** - každá s origin, history, inventor, purpose, modernUse
- **33 světových měn** - kompletní historie měn z ČNB kurzů
- **Interaktivní encyklopedie** - Info ikony (ℹ️) u dropdownů s detailními historiemi
- **Historie pro mikro-jednotky** - mikrometr, mikrogram, mikrosekunda
- **Historie rychlosti světla** - s řešením konfliktu s Celsius

### 🐛 Opraveno
- **Galon (gal)** - Opravena etymologie ze staré normanské francouzštiny (ne z řečtiny)
- **PSI** - Opraven původ na moderní inženýrství 19. století (ne středověk)
- **Ampér** - Opraven rok přijetí do SI systému (1954, ne 1921)
- **Konflikt klíče 'c'** - Vyřešen pomocí category-specific lookup (temperature_c vs speed_c)
- **Překlep** - "kompresorz" → "kompresory"

### 🗑️ Odstraněno
- Nepoužívaná anglická verze (converter-en.js)
- Language switcher (nepřipojený)
- Rušivé "rychlé převody" tlačítka

### 📝 Dokumentace
- Nové README.md s deployment instrukcemi
- CHANGELOG.md s kompletní historií změn
- Dokumentace pro AdSense setup

---

## [2.4.0] - 2025-10-04

### ✨ Přidáno
- Logo Lyra.png
- Redesign headeru
- Rychlé převody (později odstraněny v 2.5)

---

## [2.3.0] - 2025-09-30

### ✨ Přidáno
- Základní historie pro většinu jednotek
- PWA funkcionalita
- Service Worker

---

## [2.2.0] - 2025-09-25

### ✨ Přidáno
- 20 kategorií jednotek
- Měnový konvertor s ČNB kurzami

---

## [2.0.0] - 2025-09-20

### ✨ Přidáno
- Kompletní redesign UI
- Responzivní layout
- Kategorizace jednotek

---

## [1.0.0] - 2025-09-15

### ✨ První verze
- Základní převodník jednotek
- 10 kategorií
- Offline PWA podpora
