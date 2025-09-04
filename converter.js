// Převodník jednotek - JavaScript logika
class UnitConverter {
    constructor() {
        this.currentCategory = 'length';
        this.conversions = this.initializeConversions();
        this.quickConversions = this.initializeQuickConversions();
        this.init();
    }
    
    initializeConversions() {
        return {
            length: {
                name: 'Délka',
                units: {
                    // Metrické jednotky
                    'nm': { name: 'nanometr', factor: 0.000000001 },
                    'μm': { name: 'mikrometr', factor: 0.000001 },
                    'mm': { name: 'mm', factor: 0.001 },
                    'cm': { name: 'cm', factor: 0.01 },
                    'dm': { name: 'dm', factor: 0.1 },
                    'm': { name: 'metr', factor: 1 },
                    'km': { name: 'kilometr', factor: 1000 },
                    
                    // Anglické jednotky
                    'in': { name: 'palec', factor: 0.0254 },
                    'ft': { name: 'stopa', factor: 0.3048 },
                    'yd': { name: 'yard', factor: 0.9144 },
                    'mi': { name: 'míle', factor: 1609.344 },
                    'nmi': { name: 'námořní míle', factor: 1852 },
                    
                    // Astronomické
                    'au': { name: 'astronomická jednotka', factor: 149597870700 },
                    'ly': { name: 'světelný rok', factor: 9460730472580800 },
                    
                    // České historické
                    'sah': { name: 'sáh', factor: 1.896 },
                    'loket': { name: 'loket', factor: 0.594 },
                    'stopa_ceska': { name: 'česká stopa', factor: 0.316 }
                }
            },
            
            weight: {
                name: 'Hmotnost',
                units: {
                    // Metrické
                    'μg': { name: 'mikrogram', factor: 0.000000001 },
                    'mg': { name: 'miligram', factor: 0.000001 },
                    'g': { name: 'gram', factor: 0.001 },
                    'dkg': { name: 'dekagram', factor: 0.01 },
                    'kg': { name: 'kilogram', factor: 1 },
                    't': { name: 'tuna', factor: 1000 },
                    'kt': { name: 'kilotuna', factor: 1000000 },
                    
                    // Anglické
                    'oz': { name: 'unce', factor: 0.0283495 },
                    'lb': { name: 'libra', factor: 0.453592 },
                    'st': { name: 'stone', factor: 6.35029 },
                    
                    // České historické
                    'lot': { name: 'lot', factor: 0.0175 },
                    'libra_ceska': { name: 'česká libra', factor: 0.560 }
                }
            },
            
            volume: {
                name: 'Objem',
                units: {
                    // Metrické
                    'μl': { name: 'mikrolitr', factor: 0.000001 },
                    'ml': { name: 'mililitr', factor: 0.001 },
                    'cl': { name: 'centilitr', factor: 0.01 },
                    'dl': { name: 'decilitr', factor: 0.1 },
                    'l': { name: 'litr', factor: 1 },
                    'hl': { name: 'hektolitr', factor: 100 },
                    
                    // Kubické
                    'cm3': { name: 'cm³', factor: 0.001 },
                    'dm3': { name: 'dm³', factor: 1 },
                    'm3': { name: 'm³', factor: 1000 },
                    
                    // Anglické
                    'fl_oz': { name: 'fl. unce', factor: 0.0295735 },
                    'cup': { name: 'šálek', factor: 0.236588 },
                    'pt': { name: 'pinta', factor: 0.473176 },
                    'qt': { name: 'quart', factor: 0.946353 },
                    'gal': { name: 'galon', factor: 3.78541 },
                    
                    // České historické
                    'korec': { name: 'korec', factor: 93.6 },
                    'zeidlik': { name: 'žejdlík', factor: 1.404 }
                }
            },
            
            temperature: {
                name: 'Teplota',
                units: {
                    'c': { name: 'Celsius (°C)' },
                    'f': { name: 'Fahrenheit (°F)' },
                    'k': { name: 'Kelvin (K)' },
                    'r': { name: 'Rankine (°R)' }
                }
            },
            
            speed: {
                name: 'Rychlost',
                units: {
                    'ms': { name: 'm/s', factor: 1 },
                    'kms': { name: 'km/s', factor: 1000 },
                    'kmh': { name: 'km/h', factor: 0.277778 },
                    'mph': { name: 'mph', factor: 0.44704 },
                    'kn': { name: 'uzel', factor: 0.514444 },
                    'mach': { name: 'Mach', factor: 343 },
                    'c': { name: 'rychlost světla', factor: 299792458 }
                }
            },
            
            pressure: {
                name: 'Tlak',
                units: {
                    'pa': { name: 'Pascal', factor: 1 },
                    'kpa': { name: 'kiloPascal', factor: 1000 },
                    'mpa': { name: 'megaPascal', factor: 1000000 },
                    'bar': { name: 'bar', factor: 100000 },
                    'atm': { name: 'atmosféra', factor: 101325 },
                    'mmhg': { name: 'mmHg', factor: 133.322 },
                    'psi': { name: 'PSI', factor: 6894.76 }
                }
            },
            
            area: {
                name: 'Plocha',
                units: {
                    // Metrické
                    'mm2': { name: 'mm²', factor: 0.000001 },
                    'cm2': { name: 'cm²', factor: 0.0001 },
                    'dm2': { name: 'dm²', factor: 0.01 },
                    'm2': { name: 'm²', factor: 1 },
                    'km2': { name: 'km²', factor: 1000000 },
                    'ha': { name: 'hektar', factor: 10000 },
                    'a': { name: 'ar', factor: 100 },
                    
                    // Anglické
                    'in2': { name: 'čtvereční palec', factor: 0.00064516 },
                    'ft2': { name: 'čtvereční stopa', factor: 0.092903 },
                    'yd2': { name: 'čtvereční yard', factor: 0.836127 },
                    'acre': { name: 'akr', factor: 4046.86 },
                    'mi2': { name: 'čtvereční míle', factor: 2589988 }
                }
            },
            
            energy: {
                name: 'Energie',
                units: {
                    // Základní
                    'j': { name: 'Joule', factor: 1 },
                    'kj': { name: 'kiloJoule', factor: 1000 },
                    'mj': { name: 'megaJoule', factor: 1000000 },
                    'cal': { name: 'kalorie', factor: 4.184 },
                    'kcal': { name: 'kilokalorie', factor: 4184 },
                    
                    // Elektrická
                    'kwh': { name: 'kWh', factor: 3600000 },
                    'wh': { name: 'Wh', factor: 3600 },
                    
                    // Jiné
                    'btu': { name: 'BTU', factor: 1055.06 },
                    'erg': { name: 'erg', factor: 0.0000001 }
                }
            }
        };
    }
    
    initializeQuickConversions() {
        return {
            length: [
                { from: 'in', to: 'cm', value: 1, label: '1 palec = ? cm' },
                { from: 'ft', to: 'm', value: 1, label: '1 stopa = ? m' },
                { from: 'mi', to: 'km', value: 1, label: '1 míle = ? km' },
                { from: 'au', to: 'km', value: 1, label: '1 AU = ? km' }
            ],
            weight: [
                { from: 'lb', to: 'kg', value: 1, label: '1 libra = ? kg' },
                { from: 'kg', to: 'lb', value: 1, label: '1 kg = ? liber' },
                { from: 'oz', to: 'g', value: 1, label: '1 unce = ? g' },
                { from: 'g', to: 'oz', value: 100, label: '100 g = ? uncí' }
            ],
            volume: [
                { from: 'gal', to: 'l', value: 1, label: '1 galon = ? l' },
                { from: 'l', to: 'gal', value: 1, label: '1 litr = ? galonu' },
                { from: 'cup', to: 'ml', value: 1, label: '1 šálek = ? ml' },
                { from: 'ml', to: 'fl_oz', value: 100, label: '100 ml = ? fl. uncí' }
            ],
            temperature: [
                { from: 'c', to: 'f', value: 0, label: '0°C = ? °F' },
                { from: 'f', to: 'c', value: 32, label: '32°F = ? °C' },
                { from: 'c', to: 'k', value: 20, label: '20°C = ? K' },
                { from: 'f', to: 'c', value: 100, label: '100°F = ? °C' }
            ],
            speed: [
                { from: 'kmh', to: 'ms', value: 100, label: '100 km/h = ? m/s' },
                { from: 'mph', to: 'kmh', value: 60, label: '60 mph = ? km/h' },
                { from: 'kms', to: 'ms', value: 1, label: '1 km/s = ? m/s' },
                { from: 'c', to: 'kms', value: 1, label: 'rychlost světla = ? km/s' }
            ],
            pressure: [
                { from: 'bar', to: 'psi', value: 1, label: '1 bar = ? PSI' },
                { from: 'atm', to: 'kpa', value: 1, label: '1 atm = ? kPa' },
                { from: 'mmhg', to: 'kpa', value: 100, label: '100 mmHg = ? kPa' },
                { from: 'psi', to: 'bar', value: 15, label: '15 PSI = ? bar' }
            ],
            area: [
                { from: 'm2', to: 'a', value: 100, label: '100 m² = ? ar' },
                { from: 'ha', to: 'm2', value: 1, label: '1 hektar = ? m²' },
                { from: 'acre', to: 'ha', value: 1, label: '1 akr = ? ha' },
                { from: 'ft2', to: 'm2', value: 100, label: '100 ft² = ? m²' }
            ],
            energy: [
                { from: 'kwh', to: 'mj', value: 1, label: '1 kWh = ? MJ' },
                { from: 'kcal', to: 'kj', value: 1, label: '1 kcal = ? kJ' },
                { from: 'cal', to: 'j', value: 1, label: '1 kalorie = ? J' },
                { from: 'btu', to: 'kj', value: 1, label: '1 BTU = ? kJ' }
            ]
        };
    }
    
    init() {
        this.bindEvents();
        this.updateCategory('length');
    }
    
    bindEvents() {
        // Kategorie
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateCategory(e.target.dataset.category);
            });
        });
        
        // Vstup
        document.getElementById('input-value').addEventListener('input', () => {
            this.convert();
        });
        
        // Jednotky
        document.getElementById('from-unit').addEventListener('change', () => {
            this.convert();
        });
        
        document.getElementById('to-unit').addEventListener('change', () => {
            this.convert();
        });
        
        // Výměna jednotek
        document.getElementById('swap-btn').addEventListener('click', () => {
            this.swapUnits();
        });
    }
    
    updateCategory(category) {
        this.currentCategory = category;
        
        // Aktivní tlačítko
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Naplnění jednotek
        this.populateUnits();
        
        // Rychlé převody
        this.updateQuickConversions();
        
        // Převod
        this.convert();
    }
    
    populateUnits() {
        const fromSelect = document.getElementById('from-unit');
        const toSelect = document.getElementById('to-unit');
        const units = this.conversions[this.currentCategory].units;
        
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';
        
        Object.keys(units).forEach(key => {
            const option1 = new Option(units[key].name, key);
            const option2 = new Option(units[key].name, key);
            
            fromSelect.add(option1);
            toSelect.add(option2);
        });
        
        // Defaultní výběr
        if (this.currentCategory === 'length') {
            fromSelect.value = 'm';
            toSelect.value = 'cm';
        } else if (this.currentCategory === 'weight') {
            fromSelect.value = 'kg';
            toSelect.value = 'g';
        } else if (this.currentCategory === 'volume') {
            fromSelect.value = 'l';
            toSelect.value = 'ml';
        } else if (this.currentCategory === 'temperature') {
            fromSelect.value = 'c';
            toSelect.value = 'f';
        } else {
            toSelect.selectedIndex = 1;
        }
    }
    
    convert() {
        const inputValue = parseFloat(document.getElementById('input-value').value);
        const fromUnit = document.getElementById('from-unit').value;
        const toUnit = document.getElementById('to-unit').value;
        const outputElement = document.getElementById('output-value');
        const resultDisplay = document.getElementById('result-display');
        
        if (isNaN(inputValue) || inputValue === '') {
            outputElement.value = '';
            resultDisplay.textContent = 'Zadejte hodnotu pro převod';
            return;
        }
        
        let result;
        
        if (this.currentCategory === 'temperature') {
            result = this.convertTemperature(inputValue, fromUnit, toUnit);
        } else {
            result = this.convertStandard(inputValue, fromUnit, toUnit);
        }
        
        if (result !== null) {
            const rounded = this.roundResult(result);
            outputElement.value = rounded;
            
            const fromName = this.conversions[this.currentCategory].units[fromUnit].name;
            const toName = this.conversions[this.currentCategory].units[toUnit].name;
            
            resultDisplay.innerHTML = `<strong>${inputValue} ${fromName} = ${rounded} ${toName}</strong>`;
        } else {
            outputElement.value = '';
            resultDisplay.textContent = 'Chyba při převodu';
        }
    }
    
    convertStandard(value, fromUnit, toUnit) {
        const units = this.conversions[this.currentCategory].units;
        
        if (!units[fromUnit] || !units[toUnit]) return null;
        
        // Převod na základní jednotku a pak na cílovou
        const baseValue = value * units[fromUnit].factor;
        return baseValue / units[toUnit].factor;
    }
    
    convertTemperature(value, fromUnit, toUnit) {
        // Převod na Celsius
        let celsius;
        switch (fromUnit) {
            case 'c': celsius = value; break;
            case 'f': celsius = (value - 32) * 5/9; break;
            case 'k': celsius = value - 273.15; break;
            case 'r': celsius = (value - 491.67) * 5/9; break;
            default: return null;
        }
        
        // Převod z Celsius na cílovou jednotku
        switch (toUnit) {
            case 'c': return celsius;
            case 'f': return celsius * 9/5 + 32;
            case 'k': return celsius + 273.15;
            case 'r': return celsius * 9/5 + 491.67;
            default: return null;
        }
    }
    
    roundResult(value) {
        if (Math.abs(value) >= 1000000) {
            return value.toExponential(3);
        } else if (Math.abs(value) >= 1000) {
            return Math.round(value * 100) / 100;
        } else if (Math.abs(value) >= 1) {
            return Math.round(value * 10000) / 10000;
        } else {
            return parseFloat(value.toFixed(8));
        }
    }
    
    swapUnits() {
        const fromSelect = document.getElementById('from-unit');
        const toSelect = document.getElementById('to-unit');
        const inputValue = document.getElementById('input-value');
        const outputValue = document.getElementById('output-value');
        
        // Výměna jednotek
        const tempUnit = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = tempUnit;
        
        // Výměna hodnot
        const tempValue = inputValue.value;
        inputValue.value = outputValue.value;
        
        // Převod
        this.convert();
    }
    
    updateQuickConversions() {
        const container = document.getElementById('quick-converts');
        const conversions = this.quickConversions[this.currentCategory] || [];
        
        container.innerHTML = '';
        
        conversions.forEach(conv => {
            const card = document.createElement('div');
            card.className = 'quick-convert-card';
            card.innerHTML = `<div>${conv.label}</div>`;
            
            card.addEventListener('click', () => {
                document.getElementById('input-value').value = conv.value;
                document.getElementById('from-unit').value = conv.from;
                document.getElementById('to-unit').value = conv.to;
                this.convert();
            });
            
            container.appendChild(card);
        });
    }
}

// Inicializace bude řízena language-switcherem