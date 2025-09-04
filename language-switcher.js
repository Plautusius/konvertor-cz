// Language switcher for Konvertor.cz
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'cs';
        this.converter = null;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadLanguage(this.currentLanguage);
    }
    
    bindEvents() {
        document.getElementById('lang-cs').addEventListener('click', () => {
            this.switchLanguage('cs');
        });
        
        document.getElementById('lang-en').addEventListener('click', () => {
            this.switchLanguage('en');
        });
    }
    
    switchLanguage(lang) {
        if (this.currentLanguage === lang) return;
        
        this.currentLanguage = lang;
        this.updateActiveButton();
        this.loadLanguage(lang);
        this.updateMetaTags(lang);
    }
    
    updateActiveButton() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(`lang-${this.currentLanguage}`).classList.add('active');
    }
    
    loadLanguage(lang) {
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        if (lang === 'cs') {
            this.loadCzechInterface();
            this.loadCzechConverter();
        } else {
            this.loadEnglishInterface();
            this.loadEnglishConverter();
        }
    }
    
    loadCzechInterface() {
        // Page content
        document.getElementById('main-title').textContent = 'Konvertor.cz';
        document.getElementById('main-subtitle').textContent = 'Rychlý a přesný převod všech měřicích jednotek';
        
        // Categories
        document.getElementById('cat-length').textContent = 'Délka';
        document.getElementById('cat-weight').textContent = 'Hmotnost';
        document.getElementById('cat-volume').textContent = 'Objem';
        document.getElementById('cat-temperature').textContent = 'Teplota';
        document.getElementById('cat-speed').textContent = 'Rychlost';
        document.getElementById('cat-pressure').textContent = 'Tlak';
        document.getElementById('cat-area').textContent = 'Plocha';
        document.getElementById('cat-energy').textContent = 'Energie';
        
        // Labels
        document.getElementById('label-input').textContent = 'Hodnota';
        document.getElementById('label-output').textContent = 'Výsledek';
        
        // Placeholders
        document.getElementById('input-value').placeholder = 'Zadejte číslo';
        document.getElementById('output-value').placeholder = 'Výsledek převodu';
        
        // Result display
        document.getElementById('result-display').textContent = 'Zadejte hodnotu pro převod';
        
        // AdSense
        document.querySelector('.adsense-placeholder').textContent = 'Místo pro Google AdSense reklamu (728×90)';
        
        // Footer
        document.getElementById('footer-text').textContent = '© 2025 Konvertor.cz - Bezplatný převodník jednotek';
        document.getElementById('footer-subtitle').textContent = 'Podporováno reklamou • Vytvořeno s láskou pro české uživatele';
    }
    
    loadEnglishInterface() {
        // Page content  
        document.getElementById('main-title').textContent = 'Unit Converter';
        document.getElementById('main-subtitle').textContent = 'Fast and accurate conversion of all measurement units';
        
        // Categories
        document.getElementById('cat-length').textContent = 'Length';
        document.getElementById('cat-weight').textContent = 'Weight';
        document.getElementById('cat-volume').textContent = 'Volume';
        document.getElementById('cat-temperature').textContent = 'Temperature';
        document.getElementById('cat-speed').textContent = 'Speed';
        document.getElementById('cat-pressure').textContent = 'Pressure';
        document.getElementById('cat-area').textContent = 'Area';
        document.getElementById('cat-energy').textContent = 'Energy';
        
        // Labels
        document.getElementById('label-input').textContent = 'Value';
        document.getElementById('label-output').textContent = 'Result';
        
        // Placeholders
        document.getElementById('input-value').placeholder = 'Enter number';
        document.getElementById('output-value').placeholder = 'Conversion result';
        
        // Result display
        document.getElementById('result-display').textContent = 'Enter a value to convert';
        
        // AdSense
        document.querySelector('.adsense-placeholder').textContent = 'Google AdSense ad space (728×90)';
        
        // Footer
        document.getElementById('footer-text').textContent = '© 2025 Konvertor.cz - Free Unit Converter';
        document.getElementById('footer-subtitle').textContent = 'Supported by ads • Made with love for global users';
    }
    
    loadCzechConverter() {
        // Remove existing converter script
        this.removeExistingScript();
        
        // Load Czech converter
        const script = document.createElement('script');
        script.src = 'converter.js';
        script.onload = () => {
            // Converter will auto-initialize
        };
        document.head.appendChild(script);
    }
    
    loadEnglishConverter() {
        // Remove existing converter script
        this.removeExistingScript();
        
        // Load English converter
        const script = document.createElement('script');
        script.src = 'converter-en.js';
        script.onload = () => {
            // Converter will auto-initialize
        };
        document.head.appendChild(script);
    }
    
    removeExistingScript() {
        const existingScripts = document.querySelectorAll('script[src*="converter"]');
        existingScripts.forEach(script => {
            script.remove();
        });
    }
    
    updateMetaTags(lang) {
        if (lang === 'cs') {
            document.getElementById('page-title').textContent = 'Konvertor.cz - Převodník jednotek | Bezplatný online kalkulátor';
            document.getElementById('page-description').content = 'Bezplatný převodník měřicích jednotek - délka, hmotnost, objem, teplota, rychlost, tlak, plocha, energie. České i mezinárodní jednotky včetně astronomických a historických.';
            document.getElementById('page-keywords').content = 'převod jednotek, převodník, délka, hmotnost, objem, teplota, palce na centimetry, libry na kilogramy, hektar na ary, kWh na jouly, rychlost světla';
        } else {
            document.getElementById('page-title').textContent = 'Unit Converter | Free Online Calculator - Konvertor.cz';
            document.getElementById('page-description').content = 'Free online unit converter - length, weight, volume, temperature, speed, pressure, area, energy. International and historical units including astronomical measurements.';
            document.getElementById('page-keywords').content = 'unit converter, conversion, length, weight, volume, temperature, inches to centimeters, pounds to kilograms, hectare to acres, kWh to joules, speed of light';
        }
    }
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});