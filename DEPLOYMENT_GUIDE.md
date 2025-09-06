# 🚀 DEPLOYMENT GUIDE - Konvertor.cz

## GITHUB DEPLOYMENT - Rychlý návod

### KROK 1: Vytvořte repository
1. Přihlaste se na https://github.com jako **Plautus**
2. Klikněte "New repository" (zelené tlačítko)
3. **Název:** `konvertor-cz`
4. **Popis:** `Konvertor.cz - Professional Czech unit converter`
5. **Public** ✅
6. **Add README** ✅
7. "Create repository"

### KROK 2: Nahrajte soubory
1. V repository klikněte "uploading an existing file"
2. Přetáhněte všechny soubory z této složky
3. Commit message: `Initial commit - Czech unit converter`
4. "Commit changes"

### KROK 3: GitHub Pages
1. Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main"
4. Folder: "/ (root)"
5. Save

### KROK 4: Custom doména
1. Stále v Settings → Pages
2. Custom domain: `konvertor.cz`
3. Save
4. Enforce HTTPS ✅

### KROK 5: DNS v Wedos
V zákaznické zóně Wedos → DNS management:
```
A záznam: @    185.199.108.153
A záznam: @    185.199.109.153  
A záznam: @    185.199.110.153
A záznam: @    185.199.111.153
CNAME: www     konvertor.cz
```

## 🎯 VÝSLEDEK
- **GitHub Pages URL:** https://plautus.github.io/konvertor-cz
- **Vlastní doména:** https://konvertor.cz
- **Čas propagace DNS:** 1-24 hodin

## 📞 PODPORA
Pokud něco nejde, napište mi přesnou chybu a pomůžu.