# 🚀 NÁVOD NA NAHRÁNÍ DO GITHUB - OPRAVENÁ VERZE

## ⚠️ DŮLEŽITÉ: VERZE JE OPRAVENÁ!

Právě jsem opravil chybějící tlačítka a vysvětlivky. Pokud jsi už nahrál na GitHub, **smaž to a nahraj znovu** tuto opravenou verzi!

## 📁 KTEROU SLOŽKU NAHRÁT

**Nahraj celou složku:** `konvertor-cz-v2.0-full-20categories-explanations/` ✅ OPRAVENO

**Co je teď opravené:**
- ✅ `index.html` - všech 20 tlačítek kategorií (407 řádků)
- ✅ `converter.js` - kompletní logika s vysvětlivkami (747 řádků)  
- ✅ Všechny kategorie: Čas, Data, Výkon, Úhel, Frekvence, Síla, Napětí, Proud, Odpor, Náboj, Palivo
- ✅ 120 vysvětlivek jednotek (6 na kategorii)
- ✅ Funkční spodní informační karty

---

## 🎯 POSTUP NAHRÁNÍ

### VARIANTA A: Přes GitHub Web (jednodušší)

1. **Přihlásit se na GitHub.com**
   - Účet: **Plautus** (nebo tvůj GitHub účet)

2. **Vytvořit nový repository**
   - Klik "New repository" (zelené tlačítko)
   - **Repository name:** `konvertor-cz`
   - **Description:** `Konvertor.cz - Professional Czech Unit Converter with 20 categories and 120 unit explanations`
   - **Public** ✅ (aby fungovaly GitHub Pages)
   - **Add README** ❌ (máme vlastní)
   - Klik "Create repository"

3. **Nahrát soubory**
   - Na prázdné repository stránce klik "uploading an existing file"
   - **Přetáhni všechny soubory** z `konvertor-cz-v2.0-full-20categories-explanations/`
   - Nebo použij "choose your files" a vyber všechny

4. **Commit**
   - **Commit message:** `Initial commit - Konvertor.cz v2.0 with 20 categories`
   - Klik "Commit changes"

### VARIANTA B: Přes Git Command Line

```bash
# V této složce:
cd C:/Users/platl/Desktop/Claudetest/konvertor-cz-v2.0-full-20categories-explanations

# Inicializace git
git init

# Přidat všechny soubory
git add .

# Commit
git commit -m "Initial commit - Konvertor.cz v2.0 with 20 categories"

# Připojit remote (nahraď URL za svůj)
git remote add origin https://github.com/Plautus/konvertor-cz.git

# Push
git branch -M main
git push -u origin main
```

---

## 🌐 AKTIVACE GITHUB PAGES

Po nahrání:

1. **Settings → Pages**
2. **Source:** "Deploy from a branch"
3. **Branch:** "main" 
4. **Folder:** "/ (root)"
5. **Save**

**Výsledek:**
- Web bude dostupný na: `https://plautus.github.io/konvertor-cz`
- Za 5-10 minut bude online

---

## 🎯 CUSTOM DOMÉNA (volitelné)

Pro `konvertor.cz`:

1. **V GitHub Pages settings**
   - Custom domain: `konvertor.cz`
   - Save

2. **DNS u registrátora domény:**
```
A záznam: @    185.199.108.153
A záznam: @    185.199.109.153  
A záznam: @    185.199.110.153
A záznam: @    185.199.111.153
CNAME: www     konvertor.cz
```

---

## ✅ HOTOVO!

Po nahrání budeš mít:
- ✅ **Funkční web** na GitHub Pages
- ✅ **Všech 20 kategorií** převodů
- ✅ **120 vysvětlivek** jednotek
- ✅ **SEO optimalizaci**
- ✅ **Mobilní verzi**
- ✅ **Production ready** kód

**Tip:** Po nahrání zkus hned `https://plautus.github.io/konvertor-cz` - mělo by fungovat okamžitě!

---

## 🔄 CACHE-BUSTING (důležité!)

**Implementováno cache-busting:** `converter.js?v=20250906`

**Při dalších úpravách:**
1. **Změň verzi** v `index.html`: `converter.js?v=20250907` (nové datum)
2. **Nahraj na GitHub** - uživatelé uvidí změny okamžitě
3. **Bez tohoto** by prohlížeče používaly starou JavaScript cache

**Pro testování:**
- **Anonymní okno** - vždy čerstvá verze
- **Ctrl+F5** - tvrdý refresh (obchází cache)
- **GitHub Pages cache** - někdy trvá 5-10 min