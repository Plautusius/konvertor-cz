// Unit Converter - English Version
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
                name: 'Length',
                units: {
                    // Metric units
                    'nm': { name: 'nanometer', factor: 0.000000001 },
                    'μm': { name: 'micrometer', factor: 0.000001 },
                    'mm': { name: 'millimeter', factor: 0.001 },
                    'cm': { name: 'centimeter', factor: 0.01 },
                    'dm': { name: 'decimeter', factor: 0.1 },
                    'm': { name: 'meter', factor: 1 },
                    'km': { name: 'kilometer', factor: 1000 },
                    
                    // Imperial units
                    'in': { name: 'inch', factor: 0.0254 },
                    'ft': { name: 'foot', factor: 0.3048 },
                    'yd': { name: 'yard', factor: 0.9144 },
                    'mi': { name: 'mile', factor: 1609.344 },
                    'nmi': { name: 'nautical mile', factor: 1852 },
                    
                    // Astronomical
                    'au': { name: 'astronomical unit', factor: 149597870700 },
                    'ly': { name: 'light year', factor: 9460730472580800 },
                    
                    // Historical Czech
                    'sah': { name: 'Czech fathom', factor: 1.896 },
                    'loket': { name: 'Czech ell', factor: 0.594 },
                    'stopa_ceska': { name: 'Czech foot', factor: 0.316 }
                }
            },
            
            weight: {
                name: 'Weight',
                units: {
                    // Metric
                    'μg': { name: 'microgram', factor: 0.000000001 },
                    'mg': { name: 'milligram', factor: 0.000001 },
                    'g': { name: 'gram', factor: 0.001 },
                    'dkg': { name: 'dekagram', factor: 0.01 },
                    'kg': { name: 'kilogram', factor: 1 },
                    't': { name: 'metric ton', factor: 1000 },
                    'kt': { name: 'kiloton', factor: 1000000 },
                    
                    // Imperial
                    'oz': { name: 'ounce', factor: 0.0283495 },
                    'lb': { name: 'pound', factor: 0.453592 },
                    'st': { name: 'stone', factor: 6.35029 },
                    
                    // Historical
                    'lot': { name: 'Czech lot', factor: 0.0175 },
                    'libra_ceska': { name: 'Czech pound', factor: 0.560 }
                }
            },
            
            volume: {
                name: 'Volume',
                units: {
                    // Metric
                    'μl': { name: 'microliter', factor: 0.000001 },
                    'ml': { name: 'milliliter', factor: 0.001 },
                    'cl': { name: 'centiliter', factor: 0.01 },
                    'dl': { name: 'deciliter', factor: 0.1 },
                    'l': { name: 'liter', factor: 1 },
                    'hl': { name: 'hectoliter', factor: 100 },
                    
                    // Cubic
                    'cm3': { name: 'cm³', factor: 0.001 },
                    'dm3': { name: 'dm³', factor: 1 },
                    'm3': { name: 'm³', factor: 1000 },
                    
                    // Imperial
                    'fl_oz': { name: 'fl. ounce', factor: 0.0295735 },
                    'cup': { name: 'cup', factor: 0.236588 },
                    'pt': { name: 'pint', factor: 0.473176 },
                    'qt': { name: 'quart', factor: 0.946353 },
                    'gal': { name: 'gallon', factor: 3.78541 },
                    
                    // Historical Czech
                    'korec': { name: 'Czech korec', factor: 93.6 },
                    'zeidlik': { name: 'Czech pint', factor: 1.404 }
                }
            },
            
            temperature: {
                name: 'Temperature',
                units: {
                    'c': { name: 'Celsius (°C)' },
                    'f': { name: 'Fahrenheit (°F)' },
                    'k': { name: 'Kelvin (K)' },
                    'r': { name: 'Rankine (°R)' }
                }
            },
            
            speed: {
                name: 'Speed',
                units: {
                    'ms': { name: 'm/s', factor: 1 },
                    'kms': { name: 'km/s', factor: 1000 },
                    'kmh': { name: 'km/h', factor: 0.277778 },
                    'mph': { name: 'mph', factor: 0.44704 },
                    'kn': { name: 'knot', factor: 0.514444 },
                    'mach': { name: 'Mach', factor: 343 },
                    'c': { name: 'speed of light', factor: 299792458 }
                }
            },
            
            pressure: {
                name: 'Pressure',
                units: {
                    'pa': { name: 'Pascal', factor: 1 },
                    'kpa': { name: 'kiloPascal', factor: 1000 },
                    'mpa': { name: 'megaPascal', factor: 1000000 },
                    'bar': { name: 'bar', factor: 100000 },
                    'atm': { name: 'atmosphere', factor: 101325 },
                    'mmhg': { name: 'mmHg', factor: 133.322 },
                    'psi': { name: 'PSI', factor: 6894.76 }
                }
            },
            
            area: {
                name: 'Area',
                units: {
                    // Metric
                    'mm2': { name: 'mm²', factor: 0.000001 },
                    'cm2': { name: 'cm²', factor: 0.0001 },
                    'dm2': { name: 'dm²', factor: 0.01 },
                    'm2': { name: 'm²', factor: 1 },
                    'km2': { name: 'km²', factor: 1000000 },
                    'ha': { name: 'hectare', factor: 10000 },
                    'a': { name: 'are', factor: 100 },
                    
                    // Imperial
                    'in2': { name: 'square inch', factor: 0.00064516 },
                    'ft2': { name: 'square foot', factor: 0.092903 },
                    'yd2': { name: 'square yard', factor: 0.836127 },
                    'acre': { name: 'acre', factor: 4046.86 },
                    'mi2': { name: 'square mile', factor: 2589988 }
                }
            },
            
            energy: {
                name: 'Energy',
                units: {
                    // Basic
                    'j': { name: 'Joule', factor: 1 },
                    'kj': { name: 'kiloJoule', factor: 1000 },
                    'mj': { name: 'megaJoule', factor: 1000000 },
                    'cal': { name: 'calorie', factor: 4.184 },
                    'kcal': { name: 'kilocalorie', factor: 4184 },
                    
                    // Electrical
                    'kwh': { name: 'kWh', factor: 3600000 },
                    'wh': { name: 'Wh', factor: 3600 },
                    
                    // Other
                    'btu': { name: 'BTU', factor: 1055.06 },
                    'erg': { name: 'erg', factor: 0.0000001 }
                }
            }
        };
    }
    
    initializeQuickConversions() {
        return {
            length: [
                { from: 'in', to: 'cm', value: 1, label: '1 inch = ? cm' },
                { from: 'ft', to: 'm', value: 1, label: '1 foot = ? m' },
                { from: 'mi', to: 'km', value: 1, label: '1 mile = ? km' },
                { from: 'au', to: 'km', value: 1, label: '1 AU = ? km' }
            ],
            weight: [
                { from: 'lb', to: 'kg', value: 1, label: '1 pound = ? kg' },
                { from: 'kg', to: 'lb', value: 1, label: '1 kg = ? pounds' },
                { from: 'oz', to: 'g', value: 1, label: '1 ounce = ? g' },
                { from: 'g', to: 'oz', value: 100, label: '100 g = ? ounces' }
            ],
            volume: [
                { from: 'gal', to: 'l', value: 1, label: '1 gallon = ? L' },
                { from: 'l', to: 'gal', value: 1, label: '1 liter = ? gallon' },
                { from: 'cup', to: 'ml', value: 1, label: '1 cup = ? ml' },
                { from: 'ml', to: 'fl_oz', value: 100, label: '100 ml = ? fl. oz' }
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
                { from: 'c', to: 'kms', value: 1, label: 'speed of light = ? km/s' }
            ],
            pressure: [
                { from: 'bar', to: 'psi', value: 1, label: '1 bar = ? PSI' },
                { from: 'atm', to: 'kpa', value: 1, label: '1 atm = ? kPa' },
                { from: 'mmhg', to: 'kpa', value: 100, label: '100 mmHg = ? kPa' },
                { from: 'psi', to: 'bar', value: 15, label: '15 PSI = ? bar' }
            ],
            area: [
                { from: 'm2', to: 'a', value: 100, label: '100 m² = ? are' },
                { from: 'ha', to: 'm2', value: 1, label: '1 hectare = ? m²' },
                { from: 'acre', to: 'ha', value: 1, label: '1 acre = ? ha' },
                { from: 'ft2', to: 'm2', value: 100, label: '100 ft² = ? m²' }
            ],
            energy: [
                { from: 'kwh', to: 'mj', value: 1, label: '1 kWh = ? MJ' },
                { from: 'kcal', to: 'kj', value: 1, label: '1 kcal = ? kJ' },
                { from: 'cal', to: 'j', value: 1, label: '1 calorie = ? J' },
                { from: 'btu', to: 'kj', value: 1, label: '1 BTU = ? kJ' }
            ]
        };
    }
    
    init() {
        this.bindEvents();
        this.updateCategory('length');
    }
    
    bindEvents() {
        // Categories
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateCategory(e.target.dataset.category);
            });
        });
        
        // Input
        document.getElementById('input-value').addEventListener('input', () => {
            this.convert();
        });
        
        // Units
        document.getElementById('from-unit').addEventListener('change', () => {
            this.convert();
        });
        
        document.getElementById('to-unit').addEventListener('change', () => {
            this.convert();
        });
        
        // Swap units
        document.getElementById('swap-btn').addEventListener('click', () => {
            this.swapUnits();
        });
    }
    
    updateCategory(category) {
        this.currentCategory = category;
        
        // Active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Populate units
        this.populateUnits();
        
        // Quick conversions
        this.updateQuickConversions();
        
        // Convert
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
        
        // Default selection
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
            resultDisplay.textContent = 'Enter a value to convert';
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
            resultDisplay.textContent = 'Conversion error';
        }
    }
    
    convertStandard(value, fromUnit, toUnit) {
        const units = this.conversions[this.currentCategory].units;
        
        if (!units[fromUnit] || !units[toUnit]) return null;
        
        // Convert to base unit then to target
        const baseValue = value * units[fromUnit].factor;
        return baseValue / units[toUnit].factor;
    }
    
    convertTemperature(value, fromUnit, toUnit) {
        // Convert to Celsius
        let celsius;
        switch (fromUnit) {
            case 'c': celsius = value; break;
            case 'f': celsius = (value - 32) * 5/9; break;
            case 'k': celsius = value - 273.15; break;
            case 'r': celsius = (value - 491.67) * 5/9; break;
            default: return null;
        }
        
        // Convert from Celsius to target
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
        
        // Swap units
        const tempUnit = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = tempUnit;
        
        // Swap values
        const tempValue = inputValue.value;
        inputValue.value = outputValue.value;
        
        // Convert
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

// Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
    new UnitConverter();
});