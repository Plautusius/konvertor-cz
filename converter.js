// Převodník jednotek - JavaScript logika
class UnitConverter {
    constructor() {
        this.currentCategory = 'length';
        this.conversions = this.initializeConversions();
        this.unitInfo = this.initializeUnitInfo();
        this.unitAliases = this.initializeAliases();
        this.unitHistories = this.initializeUnitHistories();
        this.storageKey = 'konvertor_state';
        this.themeKey = 'konvertor_theme';
        
        // Vyčistit staré cache při upgradu
        localStorage.removeItem('cnb_rates_v1');
        
        this.init();
        this.setupAutoRefresh(); // Nastav automatické obnovování kurůz
    }


    // Mapa českých názvů měn
    getCurrencyNamesCZ() {
        return {
            'EUR': 'euro',
            'USD': 'americký dolar',
            'GBP': 'britská libra',
            'JPY': 'japonský jen',
            'CHF': 'švýcarský frank',
            'CAD': 'kanadský dolar',
            'AUD': 'australský dolar',
            'NOK': 'norská koruna',
            'SEK': 'švédská koruna',
            'DKK': 'dánská koruna',
            'PLN': 'polský zlotý',
            'HUF': 'maďarský forint',
            'RUB': 'ruský rubl',
            'CNY': 'čínský juan',
            'TRY': 'turecká lira',
            'ILS': 'izraelský šekel',
            'KRW': 'jihokorejský won',
            'SGD': 'singapurský dolar',
            'HKD': 'hongkongský dolar',
            'NZD': 'novozélandský dolar',
            'MXN': 'mexické peso',
            'ZAR': 'jihoafrický rand',
            'BRL': 'brazilský real',
            'INR': 'indická rupie',
            'THB': 'thajský baht',
            'MYR': 'malajsijský ringgit',
            'PHP': 'filipínské peso',
            'IDR': 'indonéská rupie',
            'RON': 'rumunský leu',
            'BGN': 'bulharský lev',
            'HRK': 'chorvatská kuna',
            'ISK': 'islandská koruna',
            'CZK': 'česká koruna'
        };
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
                    'mil': { name: 'mil (tisícina palce)', factor: 0.0000254 }, // pro tloušťky fólií
                    
                    // Astronomické
                    'au': { name: 'astronomická jednotka', factor: 149597870700 },
                    'ly': { name: 'světelný rok', factor: 9460730472580800 },
                    
                    // České historické
                    'sah': { name: 'sáh', factor: 1.896484 },
                    'loket': { name: 'loket', factor: 0.593 },
                    'stopa_ceska': { name: 'vídeňská stopa', factor: 0.316081 }
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
                    'oz': { name: 'unce', factor: 0.028349523125 },
                    'lb': { name: 'libra', factor: 0.45359237 },
                    'st': { name: 'stone', factor: 6.35029318 },
                    
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
                    'ft3': { name: 'ft³', factor: 28.316846592 },
                    'yd3': { name: 'yd³', factor: 764.554857984 },
                    
                    // Anglické
                    'fl_oz': { name: 'fl. unce (US)', factor: 0.0295735 },
                    'cup': { name: 'šálek (US)', factor: 0.236588 },
                    'pt': { name: 'pinta (US)', factor: 0.473176 },
                    'qt': { name: 'quart (US)', factor: 0.946353 },
                    'gal': { name: 'galon (US)', factor: 3.78541 },
                    
                    // České historické
                    'korec': { name: 'korec', factor: 93.6 },
                    'zeidlik': { name: 'žejdlík', factor: 0.354 }
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
                    'mach': { name: 'Mach (≈20 °C)', factor: 343 },
                    'c': { name: 'rychlost světla', factor: 299792458 }
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
                    'acre': { name: 'akr', factor: 4046.8564224 },
                    'mi2': { name: 'čtvereční míle', factor: 2589988.110336 }
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
            },
            
            // --- NOVÉ KATEGORIE ---
            
            time: {
                name: 'Čas',
                units: {
                    'ns':  { name: 'nanosekunda', factor: 1e-9 },
                    'μs':  { name: 'mikrosekunda', factor: 1e-6 },
                    'ms':  { name: 'milisekunda', factor: 1e-3 },
                    's':   { name: 'sekunda', factor: 1 },
                    'min': { name: 'minuta', factor: 60 },
                    'h':   { name: 'hodina', factor: 3600 },
                    'day': { name: 'den', factor: 86400 },
                    'week':{ name: 'týden', factor: 604800 },
                    // průměrné hodnoty (astronomický rok)
                    'month_avg': { name: 'měsíc (prům.)', factor: 2629800 },   // ~30.44 dne
                    'year': { name: 'rok (prům.)', factor: 31557600 }          // ~365.25 dne
                }
            },
            
            data: {
                name: 'Data',
                // Základní jednotka = byte (B)
                units: {
                    'b':   { name: 'bit (b)', factor: 0.125 }, // 1 b = 1/8 B
                    'B':   { name: 'byte (B)', factor: 1 },
                    // SI
                    'kB':  { name: 'kilobajt (kB, 10³)', factor: 1e3 },
                    'MB':  { name: 'megabajt (MB, 10⁶)', factor: 1e6 },
                    'GB':  { name: 'gigabajt (GB, 10⁹)', factor: 1e9 },
                    'TB':  { name: 'terabajt (TB, 10¹²)', factor: 1e12 },
                    // Binární
                    'KiB': { name: 'kibibajt (KiB, 2¹⁰)', factor: 1024 },
                    'MiB': { name: 'mebibajt (MiB, 2²⁰)', factor: 1024**2 },
                    'GiB': { name: 'gibibajt (GiB, 2³⁰)', factor: 1024**3 },
                    'TiB': { name: 'tibibajt (TiB, 2⁴⁰)', factor: 1024**4 }
                }
            },
            
            power: {
                name: 'Výkon',
                // Základ = watt (W)
                units: {
                    'mW': { name: 'mW', factor: 1e-3 },
                    'W':  { name: 'W',  factor: 1 },
                    'kW': { name: 'kW', factor: 1e3 },
                    'MW': { name: 'MW', factor: 1e6 },
                    'GW': { name: 'GW', factor: 1e9 },
                    'HP': { name: 'koňská síla (HP)', factor: 745.6998715822702 }, // alias pro HPus
                    'HPm': { name: 'koňská síla (metrická)', factor: 735.49875 },
                    'HPus': { name: 'horsepower (US mech.)', factor: 745.6998715822702 }
                }
            },
            
            angle: {
                name: 'Úhel',
                // Základ = radián (rad)
                units: {
                    'rad': { name: 'radián', factor: 1 },
                    'deg': { name: 'stupeň (°)', factor: Math.PI / 180 },
                    'gon': { name: 'gradián (gon)', factor: Math.PI / 200 },
                    'arcmin': { name: 'úhlová minuta (′)', factor: (Math.PI / 180) / 60 },
                    'arcsec': { name: 'úhlová vteřina (″)', factor: (Math.PI / 180) / 3600 },
                    'turn': { name: 'otáčka', factor: 2 * Math.PI }
                }
            },
            
            frequency: {
                name: 'Frekvence',
                // Základ = hertz (Hz)
                units: {
                    'Hz':  { name: 'Hz', factor: 1 },
                    'kHz': { name: 'kHz', factor: 1e3 },
                    'MHz': { name: 'MHz', factor: 1e6 },
                    'GHz': { name: 'GHz', factor: 1e9 },
                    'rpm': { name: 'otáčky/min (rpm)', factor: 1/60 } // 1 rpm = 1/60 Hz
                }
            },
            
            force: {
                name: 'Síla',
                // Základ = newton (N)
                units: {
                    'N':  { name: 'newton (N)', factor: 1 },
                    'kN': { name: 'kilonewton (kN)', factor: 1e3 },
                    'dyn': { name: 'dyne (dyn)', factor: 1e-5 },
                    'kgf': { name: 'kilogram-síla (kgf)', factor: 9.80665 }
                }
            },
            
            electric_voltage: {
                name: 'Napětí',
                // Základ = volt (V)
                units: {
                    'mV': { name: 'mV', factor: 1e-3 },
                    'V':  { name: 'V',  factor: 1 },
                    'kV': { name: 'kV', factor: 1e3 }
                }
            },
            
            electric_current: {
                name: 'Proud',
                // Základ = ampér (A)
                units: {
                    'mA': { name: 'mA', factor: 1e-3 },
                    'A':  { name: 'A',  factor: 1 },
                    'kA': { name: 'kA', factor: 1e3 }
                }
            },
            
            electric_resistance: {
                name: 'Odpor',
                // Základ = ohm (Ω)
                units: {
                    'Ω':   { name: 'ohm (Ω)', factor: 1 },
                    'kΩ':  { name: 'kiloohm (kΩ)', factor: 1e3 },
                    'MΩ':  { name: 'megaohm (MΩ)', factor: 1e6 }
                }
            },
            
            electric_charge: {
                name: 'Náboj / Kapacita',
                // Základ = coulomb (C)
                units: {
                    'C':   { name: 'coulomb (C)', factor: 1 },
                    'mAh': { name: 'miliampérhodina (mAh)', factor: 3.6 },     // 1 mAh = 3.6 C
                    'Ah':  { name: 'ampérhodina (Ah)', factor: 3600 },         // 1 Ah  = 3600 C
                    'kAh': { name: 'kiloampérhodina (kAh)', factor: 3.6e6 }
                }
            },
            
            fuel: {
                name: 'Spotřeba paliva',
                // TAHLE KATEGORIE NENÍ LINEÁRNÍ -> bude mít speciální převod (viz bod 3)
                // Jako "base" budeme interně používat km/l
                units: {
                    'kmpl': { name: 'km/l (účinnost)', factor: 1 },
                    'l100': { name: 'l/100 km', factor: null }, // speciální případ (inverzní)
                    'mpg_us':  { name: 'mpg (US)',  factor: 1.609344 / 3.785411784 }, // ≈0.4251437075 km/l
                    'mpg_imp': { name: 'mpg (Imp.)',factor: 1.609344 / 4.54609 }      // ≈0.354006043 km/l
                }
            },
            
            currency: {
                name: 'Měna',
                units: {
                    // Naplní se dynamicky z ČNB (EUR, USD, GBP, …)
                    'CZK': { name: 'česká koruna (CZK)', amount: 1, rateCzk: 1 }
                },
                meta: {
                    source: 'CNB',
                    lastUpdated: null
                }
            },

            // === NOVÉ KATEGORIE PRO ŘEMESLNÍKY ===

            wire_gauge: {
                name: 'Průřez vodičů (AWG)',
                // AWG (American Wire Gauge) - nelinerární, speciální převod
                units: {
                    // AWG čísla (čím vyšší číslo, tím tenčí drát)
                    'AWG_0000': { name: 'AWG 0000 (4/0)', factor: 107.2193 }, // mm²
                    'AWG_000': { name: 'AWG 000 (3/0)', factor: 85.0288 },
                    'AWG_00': { name: 'AWG 00 (2/0)', factor: 67.4309 },
                    'AWG_0': { name: 'AWG 0 (1/0)', factor: 53.4751 },
                    'AWG_1': { name: 'AWG 1', factor: 42.4077 },
                    'AWG_2': { name: 'AWG 2', factor: 33.6308 },
                    'AWG_4': { name: 'AWG 4', factor: 21.1506 },
                    'AWG_6': { name: 'AWG 6', factor: 13.3018 },
                    'AWG_8': { name: 'AWG 8', factor: 8.3656 },
                    'AWG_10': { name: 'AWG 10', factor: 5.2612 },
                    'AWG_12': { name: 'AWG 12', factor: 3.3088 },
                    'AWG_14': { name: 'AWG 14', factor: 2.0809 },
                    'AWG_16': { name: 'AWG 16', factor: 1.3087 },
                    'AWG_18': { name: 'AWG 18', factor: 0.8230 },
                    'AWG_20': { name: 'AWG 20', factor: 0.5176 },
                    'AWG_22': { name: 'AWG 22', factor: 0.3255 },
                    'AWG_24': { name: 'AWG 24', factor: 0.2047 },
                    // Metrické průřezy
                    'mm2_0_5': { name: '0.5 mm²', factor: 0.5 },
                    'mm2_0_75': { name: '0.75 mm²', factor: 0.75 },
                    'mm2_1': { name: '1 mm²', factor: 1.0 },
                    'mm2_1_5': { name: '1.5 mm²', factor: 1.5 },
                    'mm2_2_5': { name: '2.5 mm²', factor: 2.5 },
                    'mm2_4': { name: '4 mm²', factor: 4.0 },
                    'mm2_6': { name: '6 mm²', factor: 6.0 },
                    'mm2_10': { name: '10 mm²', factor: 10.0 },
                    'mm2_16': { name: '16 mm²', factor: 16.0 },
                    'mm2_25': { name: '25 mm²', factor: 25.0 },
                    'mm2_35': { name: '35 mm²', factor: 35.0 },
                    'mm2_50': { name: '50 mm²', factor: 50.0 }
                }
            },


            flow_rate: {
                name: 'Průtok',
                // Základní jednotka: litr/minuta
                units: {
                    'l_min': { name: 'l/min', factor: 1 },
                    'l_h': { name: 'l/h', factor: 1/60 },
                    'l_s': { name: 'l/s', factor: 60 },
                    'gal_min_us': { name: 'gal/min (US)', factor: 3.785411784 },
                    'gal_h_us': { name: 'gal/h (US)', factor: 3.785411784/60 },
                    'gpm': { name: 'GPM (US)', factor: 3.785411784 }, // alias for gal/min
                    'cfm': { name: 'CFM (ft³/min)', factor: 28.316846592 },
                    'm3_h': { name: 'm³/h', factor: 1000/60 },
                    'm3_s': { name: 'm³/s', factor: 60000 }
                }
            },

            torque: {
                name: 'Krouticí moment',
                // Základní jednotka: N⋅m
                units: {
                    'Nm': { name: 'N⋅m', factor: 1 },
                    'kgfm': { name: 'kgf⋅m', factor: 9.80665 },
                    'ftlb': { name: 'ft⋅lb', factor: 1.3558179483314004 },
                    'inlb': { name: 'in⋅lb', factor: 0.1129848290276167 },
                    'inoz': { name: 'in⋅oz', factor: 0.007061552 },
                    'dNm': { name: 'dN⋅m', factor: 0.1 },
                    'cNm': { name: 'cN⋅m', factor: 0.01 }
                }
            },

            // === NOVÉ UŽITEČNÉ KATEGORIE ===

            cooking: {
                name: 'Kuchyňské míry',
                // Základní jednotka: mililitr (ml)
                units: {
                    // Metrické
                    'ml': { name: 'mililitr (ml)', factor: 1 },
                    'cl': { name: 'centilitr (cl)', factor: 10 },
                    'dl': { name: 'decilitr (dl)', factor: 100 },
                    'l': { name: 'litr (l)', factor: 1000 },

                    // Americké kuchyňské
                    'tsp': { name: 'čajová lžička (tsp)', factor: 4.92892 }, // US teaspoon
                    'tbsp': { name: 'polévková lžíce (tbsp)', factor: 14.7868 }, // US tablespoon
                    'fl_oz_us': { name: 'fluid ounce US (fl oz)', factor: 29.5735 },
                    'cup_us': { name: 'šálek US (cup)', factor: 236.588 },
                    'pint_us': { name: 'pinta US (pt)', factor: 473.176 },
                    'quart_us': { name: 'quart US (qt)', factor: 946.353 },
                    'gallon_us': { name: 'galon US (gal)', factor: 3785.41 },

                    // Britské kuchyňské
                    'tsp_uk': { name: 'čajová lžička UK', factor: 5.91939 },
                    'tbsp_uk': { name: 'polévková lžíce UK', factor: 17.7582 },
                    'fl_oz_uk': { name: 'fluid ounce UK', factor: 28.4131 },
                    'cup_uk': { name: 'šálek UK', factor: 284.131 },

                    // České tradiční
                    'lzice': { name: 'polévková lžíce (cca 15ml)', factor: 15 },
                    'lzicka': { name: 'čajová lžička (cca 5ml)', factor: 5 },
                    'salek_cz': { name: 'šálek český (cca 250ml)', factor: 250 }
                }
            },

            pressure_general: {
                name: 'Tlak (obecný)',
                // Základní jednotka: hektopascal (hPa)
                units: {
                    'hPa': { name: 'hektopascal (hPa)', factor: 1 },
                    'mb': { name: 'milibar (mb)', factor: 1 }, // 1 hPa = 1 mb
                    'Pa': { name: 'pascal (Pa)', factor: 0.01 },
                    'kPa': { name: 'kilopascal (kPa)', factor: 10 },
                    'mmHg': { name: 'milimetr rtuti (mmHg)', factor: 1.33322 },
                    'torr': { name: 'torr', factor: 1.33322 }, // 1 torr = 1 mmHg
                    'inHg': { name: 'palec rtuti (inHg)', factor: 33.8639 },
                    'atm': { name: 'atmosféra (atm)', factor: 1013.25 },
                    'bar': { name: 'bar', factor: 1000 },
                    'psi': { name: 'PSI (lb/in²)', factor: 68.9476 }
                }
            },

            concentration: {
                name: 'Koncentrace roztoků',
                // Základní jednotka: mg/L
                units: {
                    'mg_l': { name: 'miligramy na litr (mg/L)', factor: 1 },
                    'g_l': { name: 'gramy na litr (g/L)', factor: 1000 },
                    'kg_m3': { name: 'kilogramy na metr krychlový (kg/m³)', factor: 1000 },
                    'ppm': { name: 'parts per million (ppm)', factor: 1 }, // 1 ppm = 1 mg/L pro vodné roztoky
                    'ppb': { name: 'parts per billion (ppb)', factor: 0.001 },
                    'percent_w_v': { name: 'procenta hmotnost/objem (%w/v)', factor: 10000 }, // 1% w/v = 10000 mg/L
                    'percent_w_w': { name: 'procenta hmotnost/hmotnost (%w/w)', factor: 10000 }, // přibližně pro vodné roztoky
                    'g_100ml': { name: 'gramy na 100 ml (g/100ml)', factor: 10000 },
                    'ug_l': { name: 'mikrogramy na litr (μg/L)', factor: 0.001 },
                    'ug_ml': { name: 'mikrogramy na mililitr (μg/ml)', factor: 1 },
                    'mg_ml': { name: 'miligramy na mililitr (mg/ml)', factor: 1000 },
                    'g_ml': { name: 'gramy na mililitr (g/ml)', factor: 1000000 }
                }
            }

        };
    }
    
    initializeUnitInfo() {
        return {
            length: [
                { name: 'Palec historie', description: 'Původně šířka palce muže. Král Anglie Edward II (1324): 1 palec = 3 zrna ječmene vedle sebe. Od 1959 přesně 2,54 cm' },
                { name: 'Stopa ze Sumeru', description: 'První stopa ≈ 2575 př. Kr. v Sumerské říši: 26,45 cm. Římská stopa: 29,6 cm. Anglická stopa od 1959: přesně 30,48 cm' },
                { name: 'Římská míle', description: 'Mille passus = 1000 dvojkroků římských vojáků. 1 dvojkrok = 5 stop = 1,48 m. Celkem 1000 × 1,48 m ≈ 1,48 km. Základ pro moderní míli' },
                { name: 'Sáh český', description: 'Historická česká jednotka, měřila se rozpětím paží. Používala se v zemědělství a lesnictví. 1 sáh ≈ 1,8965 m' },
                { name: 'Yard od krále', description: 'Legenda: král Anglie Henry I (1100-1135) definoval yard jako vzdálenost od nosu k palci natažené paže. 1 yard = 3 stopy = 91,44 cm' },
                { name: 'Námořní míle 1929', description: 'Mezinárodně stanovena 1929: 1 nmi = přesně 1852 m. Odpovídá 1 minutě zeměpisné šířky. Letectví a námořnictví po celém světě' }
            ],
            weight: [
                { name: 'Římská libra', description: 'Libra pondo = váha na vahách. Starověký Řím: 327 g. Libra = 12 uncií. Odtud symbol £ pro britskou libru (peníze)!' },
                { name: 'Karolinská libra', description: 'Karel Veliký (800 n.l.): nová libra 406,5 g. Různé země různé hodnoty: Anglie 454g, Česko 513g, Troy (lékárny) 373g' },
                { name: 'Anglická libra od 1959', description: 'Mezinárodní standardizace: 1 lb = přesně 0,45359237 kg. Dnes USA, UK, Kanada. 14 liber = 1 stone (kámen)' },
                { name: 'Lot český', description: 'Historická česká jednotka, používala se pro drahé kovy a koření. 1 lot = 17,5 g. Přesné vážení zlata a stříbra' },
                { name: 'Unce trojská', description: 'Troy ounce pro drahé kovy od středověku. 1 troy oz = 31,1 g (normální oz = 28,35 g). Zlato a stříbro dodnes!' },
                { name: 'Česká libra', description: 'Historická česká jednotka, lehčí než anglická libra. 1 česká libra = 560 g. Používala se do zavedení metrického systému' }
            ],
            volume: [
                { name: 'Galon pro víno a pivo', description: 'Anglie měla 3 galony: víno (231 in³), pivo (282 in³), obilí. Královna Anne 1706: Wine Gallon. USA = wine galon 3,785 l' },
                { name: 'Imperial galon 1824', description: 'Británie 1824: sjednocení na 1 imperial galon = 4,546 l. Větší než US galon! Proto rozdíl MPG (UK) vs MPG (US)' },
                { name: 'Fluid ounce historie', description: 'Tekutá unce: 1/128 US galonu = 29,6 ml. Imperial fl oz = 1/160 imp galonu = 28,4 ml. Rozdíl kvůli rozdílným galonům!' },
                { name: 'Žejdlík český', description: 'Historická česká jednotka pro tekutiny, používala se v hospodách a domácnostech. 1 žejdlík = 0,354 l ≈ půllitr piva' },
                { name: 'Pinta piva', description: 'UK pinta = 568 ml (1/8 imperial galonu). US pinta = 473 ml (1/8 US galonu). Britové dostanou v hospodě o 20% víc!' },
                { name: 'Korec český', description: 'Historická česká jednotka pro obilniny a suché látky. 1 korec = 93,6 l. Velká nádoba na obilí a zrno' }
            ],
            temperature: [
                { name: 'Daniel Fahrenheit (1686-1736)', description: 'Německý fyzik. V roce 1714 vyrobil první rtuťový teploměr. V roce 1724 publikoval svou teplotní stupnici v Londýně' },
                { name: 'Fahrenheit stupnice 1724', description: 'Původní 3 body: 0°F = led+voda+sůl, 30°F = tání ledu, 90°F = teplota lidského těla. Později překalibrováno na 32°F a 96°F' },
                { name: 'William Thomson (1824-1907)', description: 'Irský fyzik Lord Kelvin. V roce 1848 navrhl absolutní teplotní stupnici. Určil absolutní nulu na -273,15°C' },
                { name: 'Anders Celsius (1701-1744)', description: 'Švédský astronom. V roce 1742 publikoval stupnici OBRÁCENĚ: 0°C = var vody, 100°C = led! V roce 1744 otočeno do dnešní podoby' },
                { name: 'Kelvin od 1848', description: 'Absolutní stupnice založená na termodynamice. 0 K = absolutní nula, nejnižší možná teplota. Od 2019 definováno Boltzmannovou konstantou' },
                { name: 'Rankine stupnice', description: 'Americká absolutní stupnice (1859). Používá Fahrenheitovy stupně od absolutní nuly. 0°R = -459,67°F. Strojní inženýrství v USA' }
            ],
            speed: [
                { name: 'MPH historie', description: 'Míle za hodinu od 19. století s nástupem železnice a aut. UK rychlostní limit 1865: 2 mph ve městě! Dnes USA/UK stále mph' },
                { name: 'Uzel z provazu', description: 'Námořníci měřili rychlost provazem s uzly po 14,4 m a přesýpacími hodinami 28 s. Kolik uzlů prošlo rukou = rychlost v uzlech!' },
                { name: 'Ernst Mach (1838-1916)', description: 'Český fyzik z Brna. Zkoumal nadzvukové střely a rázové vlny. V roce 1888 vyfotografoval nadzvukový projektil!' },
                { name: 'Machovo číslo od 1929', description: 'Poměr rychlosti k rychlosti zvuku. Mach 1 = 1225 km/h (závisí na teplotě). Chuck Yeager 1947: první člověk Mach 1,05!' },
                { name: 'Rychlost světla Einstein', description: 'Albert Einstein 1905: c = konstanta = 299 792 458 m/s. Nic nejede rychleji! Základní pilíř relativity' },
                { name: 'Kosmické rychlosti', description: '1. kosmická: 7,9 km/s (orbita). 2. kosmická: 11,2 km/s (opustit Zemi). 3. kosmická: 16,7 km/s (opustit sluneční soustavu)' }
            ],
            pressure_general: [
                { name: 'Torricelliho barometr 1643', description: 'Evangelista Torricelli vynalezl rtuťový barometr. Sloupec rtuti 760 mm = atmosférický tlak. Odtud mmHg (milimetry rtuti)!' },
                { name: 'Pascal (Pa) od 1971', description: 'Pojmenováno po Blaise Pascalovi (1623-1662), francouzský matematik. Zkoumal tlak a vakuum. 1 Pa = 1 N/m², velmi malý tlak' },
                { name: 'Atmosféra a potápěči', description: '1 atm = tlak na hladině. Každých 10 m hluboko = +1 atm. 30 m hloubka = 4 atm celkem! Proto dekomprese při vy plovávání' },
                { name: 'PSI v pneumatikách', description: 'Pounds per Square Inch. Auto: 32-35 PSI. Kolo: 40-65 PSI. Náklaďák: 80-100 PSI. Tlak ovlivňuje spotřebu paliva!' },
                { name: 'Krevní tlak mmHg', description: '120/80 mmHg = normální. 140/90+ = hypertenze. Přístroj měří tlak rtuťového sloupce, i když dnes digitální. Historický odkaz!' },
                { name: 'Bar od 1909', description: 'Bar ≈ tlak atmosféry na hladině moře. Potápění: +1 bar každých 10 m. Pneumatiky: 2-2,5 bar. Espresso káva: 9 bar tlaku!' }
            ],
            cooking: [
                { name: 'Fannie Farmer 1896', description: 'Americká kuchařka zavedla standardní odměrky (cups, tsp, tbsp) do receptů. Předtím "špetka", "hrst" - nepřesné!' },
                { name: 'Teaspoon (tsp) historie', description: 'Čajová lžička pro servírování čaje 18. století. USA standardizace: 1 tsp = přesně 4,93 ml. UK tsp = 5,9 ml. Rozdíl!' },
                { name: 'Cup (šálek) 1896', description: 'Fannie Farmer definovala 1 cup = 8 fl oz = 236,6 ml. Změnil vaření v USA! Receptybez vah, jen odměrkami' },
                { name: 'Tablespoon (tbsp) = 3 tsp', description: 'Polévková lžíce. 1 tbsp = 14,79 ml = přesně 3 čajové lžičky. Praktický poměr pro zdvojnásobování receptů' },
                { name: 'Metrické dl v Evropě', description: 'Evropské recepty: decilitry (dl) a gramy (g). Přesnější než cups! 1 dl = 100 ml. Střední Evropa preferuje váhy' },
                { name: 'Britské vs US míry', description: 'UK cup = 284 ml (1/2 pinty). US cup = 237 ml. Stejný recept, jiný výsledek! Proto převodníky nezbytné' }
            ],
            area: [
                { name: 'Acre od středověku', description: 'Akr = plocha, kterou pár volů zorá za den. ≈ 4047 m². Variabilní podle půdy! Standardizováno až 1800s' },
                { name: 'Hektar od 1795', description: 'Hekt-are = 100 arů. Francouzská revoluce zavedla metrický systém. 1 ha = 10 000 m² = čtverec 100×100 m. Racionální!' },
                { name: 'Ar praktický', description: '1 ar = 100 m² = čtverec 10×10 m. Perfektní pro zahrádky a malé pozemky. Běžně se říká "sotka"' },
                { name: 'Fotbalové hřiště', description: 'Standardní hřiště: 105×68 m = 7140 m² ≈ 0,714 ha. Často se používá jako srovnání ("10 fotbalových hřišť")' },
                { name: 'Česká republika', description: 'Plocha ČR: 78 866 km². Praha: 496 km². Pardubice: 82 km². Brno: 230 km². 1 km² = 100 ha = 10 000 arů' },
                { name: 'Acre vs hektar USA', description: 'USA farmáři stále používají acres. 1 acre = 0,405 ha. Farma 160 acres = 64,7 ha. UK postupně přechází na hektary' }
            ],
            energy: [
                { name: 'James Joule (1818-1889)', description: 'Anglický fyzik, pivovarník. V roce 1843 objevil mechanický ekvivalent tepla: 838 ft-lb = ohřátí 1 libry vody o 1°F' },
                { name: 'Joule experiment 1843', description: 'Joule měřil teplo z klesající závaží otáčející lopatky ve vodě. Zjistil přesnou konverzi mezi mechanickou prací a teplem' },
                { name: 'Jednotka Joule od 1889', description: 'Pojmenována po Jamesi Joulovi. 1 J = síla 1 newton na dráze 1 metr. Základní jednotka energie, práce a tepla v SI' },
                { name: 'Kilowatthodina (kWh)', description: 'Praktická jednotka elektřiny. 1 kWh = spotřebič 1000 W běží 1 hodinu. Průměrná domácnost ČR: 2000-4000 kWh/rok' },
                { name: 'Kalorie vs. kilokalorie', description: 'Potravinová "kalorie" = vlastně kilokalorie! 1 kcal = 4184 J. Čokoláda 100g ≈ 500 kcal = 2,1 MJ energie' },
                { name: 'BTU (British Thermal Unit)', description: 'Anglická jednotka od 19. století. 1 BTU = teplo na ohřátí 1 libry vody o 1°F. Klimatizace: 5000-18000 BTU' }
            ],
            
            time: [
                { name: 'Sekunda od Babylonu', description: 'Babyloňané (1500 př.Kr.): 60 sekund = 1 minuta, 60 minut = 1 hodina. Sexagesimální systém dodnes! Od 1967 atomové hodiny' },
                { name: 'Den = rotace Země', description: '1 den = 24 hodin = 86 400 sekund. Ale Země zpomaluje! Den před 400 mil. let = 22 hodin. Měsíc se vzdaluje 3,8 cm/rok' },
                { name: 'Rok a přestupné roky', description: 'Země oběh kolem Slunce: 365,2422 dne. Gregoriánský kalendář 1582: přestupný každé 4 roky (kromě století). Chyba 1 den za 3236 let!' },
                { name: 'Milisekunda v sportu', description: 'Usain Bolt 100m: 9,58 s = 9580 ms. Olympiáda měří na 1 ms přesně! Mrknutí oka = 100-150 ms. Lidská reakce = 200-300 ms' },
                { name: 'Nanosekunda v počítačích', description: 'Rychlost světla: 30 cm za 1 ns! CPU 3 GHz = 3 miliardy cyklů/s = 0,33 ns/cyklus. GPS potřebuje ns přesnost!' },
                { name: 'Atomová sekunda 1967', description: 'Sekunda = 9 192 631 770 period záření cesium-133. Nejpřesnější! Atomové hodiny: chyba 1 s za 100 milionů let' }
            ],
            
            data: [
                { name: 'Claude Shannon (1916-2001)', description: 'Americký matematik. V roce 1948 publikoval "Matematickou teorii komunikace" - založil teorii informace' },
                { name: 'Bit od 1948', description: 'Shannon zkrátil "binary digit" na "bit". Nejmenší informace: 0 nebo 1. Základ vší digitální technologie!' },
                { name: 'Byte = 8 bitů', description: 'Historicky: počet bitů pro 1 znak. Dnes standard: 1 byte = 8 bitů = 256 možných hodnot (0-255)' },
                { name: 'GB vs GiB chaos', description: 'Marketing: 1 GB = 1000 MB. Windows: 1 GiB = 1024 MiB. Flash disk "128 GB" = vlastně 119 GiB! Proto nesedí velikosti' },
                { name: 'Vývoj úložišť', description: '1956: první HDD 5 MB = 1 tuna! 1980: 5 MB floppy. 2000: 20 GB HDD. 2010: 500 GB. 2024: 20 TB SSD. Růst 4 000 000×!' },
                { name: 'Internet data', description: 'YouTube: 500 hod videa/min = 1 PB/den. Google: 15 exabytů dat. Celý internet 2024: ≈ 100 zettabytů (100 000 000 PB!)' }
            ],
            
            power: [
                { name: 'James Watt (1736-1819)', description: 'Skotský vynálezce, zdokonalil parní stroj. V roce 1782 získal patent na dvojčinný parní stroj, který spustil průmyslovou revoluci' },
                { name: 'Koňská síla od 1780s', description: 'Watt potřeboval srovnat výkon parních strojů s koňmi. Odhadl: 1 kůň = 33 000 ft-lb/min. Metrická HP = 735 W, americká = 746 W' },
                { name: 'Jednotka Watt od 1889', description: 'Pojmenována po Jamesi Wattovi. 1 W = 1 joule za sekundu. Přijata jako SI jednotka výkonu v roce 1960' },
                { name: 'Světelná vs. elektrická', description: 'Starší žárovka 60W → 800 lumenů. LED žárovka 10W → stejné světlo! Moderní technologie = menší spotřeba energie' },
                { name: 'Výkon elektráren', description: 'Jaderná elektrárna Dukovany: 4× 510 MW = 2040 MW. Temelín: 4× 1000 MW. Výkon celého Česka: ≈ 20 GW' },
                { name: 'Mikrovlnka vs. lednička', description: 'Mikrovlnka: 800-1200 W (krátce). Lednička: 100-200 W (non-stop). Lednička spotřebuje za rok více elektřiny!' }
            ],
            
            angle: [
                { name: '360° od Babylonu', description: 'Babyloňané (1500 př.Kr.): kruh = 360° (blízko 365 dnů roku). Dělitelné 2,3,4,5,6,8,9,10,12,15... Geniální volba!' },
                { name: 'Stupeň, minuta, vteřina', description: '1° = 60′ (minut), 1′ = 60″ (vteřin). Sexagesimální jako čas! Navigace: 1″ na rovníku ≈ 31 m. GPS přesnost!' },
                { name: 'Radián od matematiky', description: 'Přirozená jednotka: obvod kruhu = 2π r. Celý kruh = 2π rad ≈ 6,283 rad. 1 rad ≈ 57,3°. Fyzika a kalkuluse výhradně radiány!' },
                { name: 'Gradián francouzský', description: 'Francouzská revoluce 1793: desetinný systém! 1 gon = 1/400 kruhu = 0,9°. Pravý úhel = 100 gon. Geodézie ve Francii dodnes' },
                { name: 'Mil vojenský', description: 'NATO mil: 1/6400 kruhu. SSSR mil: 1/6000. Dělostřelectvo: úhel × vzdálenost = korekce. 1 mil na 1 km ≈ 1 m odchylky!' },
                { name: 'Turn (otáčka)', description: '1 turn = 360° = 2π rad = 1 plná otáčka. Jednoduché! Motory: 3000 RPM = 50 otáček za sekundu = 50 turns/s' }
            ],
            
            frequency: [
                { name: 'Heinrich Hertz (1857-1894)', description: 'Německý fyzik. V roce 1887 první experimentálně dokázal existenci elektromagnetických vln předpovězených Maxwellem' },
                { name: 'Hertzův experiment 1887', description: 'Vytvořil rádio vlny pomocí elektrických obvodů. Dokázal, že mají stejnou rychlost jako světlo. Položil základy rádia!' },
                { name: 'Jednotka Hertz od 1930', description: 'Pojmenována po Heinrichu Hertzovi. 1 Hz = 1 cyklus za sekundu. Měří frekvenci, kmitání, otáčení' },
                { name: 'Lidské ucho 20 Hz - 20 kHz', description: 'Infrazvuk <20 Hz: necítíme. Bass 60-250 Hz. Lidský hlas 85-255 Hz. Vysoké tóny >2 kHz. Ultrazvuk >20 kHz: netopýři, psi' },
                { name: 'Rádiové frekvence', description: 'AM rádio: 530-1700 kHz. FM rádio: 88-108 MHz. WiFi: 2,4 nebo 5 GHz. Mobily 4G: 800-2600 MHz. 5G: až 39 GHz' },
                { name: 'Procesory počítačů', description: 'Intel 8086 (1978): 5-10 MHz. Pentium (1993): 60-200 MHz. Moderní CPU (2024): 3-5 GHz. Vzrůst 1000×!' }
            ],
            
            force: [
                { name: 'Isaac Newton (1642-1727)', description: 'Anglický fyzik a matematik. V roce 1687 publikoval Principia Mathematica - základ klasické mechaniky a gravitační teorie' },
                { name: 'Principia Mathematica 1687', description: 'Newton formuloval 3 pohybové zákony a zákon gravitace. Zjistil, že pád jablka a orbita Měsíce mají stejnou příčinu!' },
                { name: 'Newtonovy zákony pohybu', description: '1. Setrvačnost 2. F=ma (síla=hmotnost×zrychlení) 3. Akce=reakce. Základ pro celou fyziku a inženýrství' },
                { name: 'Jednotka Newton od 1948', description: '1 N = síla která zrychlí 1 kg o 1 m/s². Průměrné jablko váží ≈ 1 N. Síla ruky při stisknutí ≈ 200-400 N' },
                { name: 'Gravitace na planetách', description: 'Země: 9,81 N/kg. Měsíc: 1,62 N/kg (6× slabší). Jupiter: 24,8 N/kg (2,5× silnější). Na Měsíci vyskočíš 6× výš!' },
                { name: 'Tah raketových motorů', description: 'Falcon 9: 7607 kN. Saturn V (Apollo): 35 100 kN! Space Shuttle: 12 500 kN. Síla potřebná k opuštění Země' }
            ],

            wire_gauge: [
                { name: 'AWG historie (19. století)', description: 'Číslování AWG vzniklo z počtu tažení drátu při výrobě. Čím víckrát byl drát tažen, tím byl tenčí a měl vyšší číslo AWG' },
                { name: 'Inverzní systém AWG', description: 'Menší číslo AWG = tlustší vodič. AWG 10 (5,26 mm²) je silnější než AWG 20 (0,52 mm²). Opačné než metrický systém!' },
                { name: 'Logaritmická stupnice', description: 'Každé snížení o 3 AWG = dvojnásobný průřez. Např. 2× vodič AWG 14 ≈ 1× vodič AWG 11. Geniální matematický systém' },
                { name: 'AWG vs metrický systém', description: 'V Evropě používáme mm² (větší číslo = větší průřez). V USA a Asii stále dominuje AWG. Potřebné převodní tabulky' },
                { name: 'Typické použití AWG', description: 'AWG 24-28 = síťové kabely, AWG 18-22 = repro kabely, AWG 10-14 = domácí instalace, AWG 0000 = silové rozvody' },
                { name: 'Standard ASTM B258', description: 'Oficiální standard definuje poměr průměrů jako 39. odmocninu z 92 ≈ 1,123. Každý AWG stupeň přesně definován' }
            ],

            flow_rate: [
                { name: 'Historie čerpadel', description: 'První čerpadla pocházejí ze starověku a sloužila hlavně k přepravě vody. Poháněla je lidská nebo zvířecí síla' },
                { name: 'GPM (Gallon per Minute)', description: 'Americká jednotka průtoku kapalin. 1 GPM = 3,785 l/min. Běžná u čerpadel a vodních filtrů v USA' },
                { name: 'CFM (Cubic Feet per Minute)', description: 'Jednotka průtoku vzduchu. 1 CFM = 28,3 l/min. Klíčová pro ventilátor PC, kompresor vzduchu a klimatizace' },
                { name: 'Sprcha vs. vana', description: 'Moderní sprcha: 6-10 L/min, úsporná: 5 L/min. Plnění vany: 15-20 L/min. Sprchování šetří až 60% vody' },
                { name: 'Pneumatika a SCFM', description: 'SCFM = standardní CFM (při 20°C, 1 atm). Pneumatická čerpadla spotřebují 10-25 SCFM na každý GPM čerpané kapaliny' },
                { name: 'Hasiči a průtok', description: 'Profesionální hasičská hadice: 400-1500 l/min (100-400 GPM). Letecká cisterna: až 12 000 l/min při hašení požárů' }
            ],

            torque: [
                { name: 'Moment vs. výkon', description: 'Točivý moment = okamžitá síla motoru při akceleraci. Výkon (kW) = moment × otáčky. Vyšší moment = lepší zrychlení auta' },
                { name: 'Utahovací moment kol', description: 'Šrouby kol auta: 110-120 Nm. Příliš utažené = prasklé šrouby. Málo utažené = uvolnění kola při jízdě. Kritické pro bezpečnost' },
                { name: 'Dynamometr měření', description: 'Moment se měří dynamometrem - zařízení s pružinou nebo tenzometrem a stupnicí. Digitální momentový klíč pípne při dosažení momenta' },
                { name: 'Foot-pound (ft⋅lb)', description: 'Americká jednotka momentu. 1 ft⋅lb = 1,356 N⋅m. V USA se tabulky momentů uvádějí v ft-lb místo Nm' },
                { name: 'Diesel vs. benzín', description: 'Dieselové motory mají vyšší točivý moment při nízkých otáčkách. Benzínové vyšší výkon při vysokých otáčkách' },
                { name: 'Kilogram-síla metr', description: 'Starší jednotka momentu. 1 kgf⋅m = 9,807 N⋅m. Stará nářadí a manuály používají kgf⋅m místo N⋅m' }
            ],

            concentration: [
                { name: 'PPM v ekologii', description: 'Parts Per Million. CO₂ v atmosféře 1750: 280 ppm. Dnes (2024): 420 ppm! Oteplování. 1 ppm = 1 mg látky na 1 L vody' },
                { name: 'Pitná voda normy', description: 'Pitná voda ČR: dusičnany max 50 mg/L, arsen max 0,01 mg/L = 10 ppb. Zdravotní limity přísné! Chlor 0,1-0,3 mg/L' },
                { name: 'Procenta alkoholu', description: 'Pivo 4% = 4 g alkoholu na 100 ml = 40 g/L. Víno 12% = 120 g/L. Vodka 40% = 400 g/L. Čím víc %, tím víc alkoholu' },
                { name: 'PPB ultra-čisté látky', description: 'Parts Per Billion. Čipy vyžadují vodu <1 ppb nečistot! 1 ppb = 1 μg/L. Jako 1 vteřina v 32 letech. Extrémní čistota!' },
                { name: 'Promile alkoholu', description: 'Limit řidiče ČR: 0,0‰ = 0 g/L krve. Jiné země: 0,5‰ = 0,5 g alkoholu na 1 L krve. 2‰ = silně opilý, 4‰ = smrtelné' },
                { name: 'Sůl v moři', description: 'Moře: 35 g/L = 3,5% soli. Mrtvé moře: 340 g/L = 34%! Nejvíce slané. Lidské tělo: 9 g/L = 0,9% fyziologický roztok' }
            ],

            electric_voltage: [
                { name: 'Alessandro Volta (1745-1827)', description: 'Italský fyzik, vynálezce první baterie. V roce 1799 sestavil Voltův sloup - první trvalý zdroj elektrického proudu' },
                { name: 'Voltův sloup 1799', description: 'První baterie na světě! Měděné a zinkové disky s textilií nasáklou kyselinou. Položil základy elektrochemie' },
                { name: 'Napětí vs. proud', description: 'Napětí = tlak elektřiny (volt), proud = množství (ampér). Analogie: voda v hadici - tlak vs. průtok' },
                { name: 'Běžná napětí', description: 'Baterie AA: 1,5V, USB: 5V, auto: 12V, zásuvka EU: 230V, zásuvka USA: 110V, vlak: 3000V, vysoké vedení: 400 kV' },
                { name: 'Nebezpečí napětí', description: 'Do 50V = bezpečné, 110-230V = smrtelné při dotyku, nad 1000V = smrtelné na dálku (oblak elektřiny)' },
                { name: 'Blesk a napětí', description: 'Blesk má napětí až 100 milionů voltů! Trvá jen milisekundy, ale obsahuje obrovskou energii. Proto hromosvody' }
            ],
            
            electric_current: [
                { name: 'André-Marie Ampère (1775-1836)', description: 'Francouzský fyzik, zakladatel elektrodynamiky. První rozlišil napětí a proud. Vynalezl elektromagnet a solenoid' },
                { name: 'Jednotka ampér od 1881', description: 'Ampér pojmenován po Ampèrovi jako pocta jeho objevům v elektromagnetismu. Používá se dodnes jako základní jednotka SI' },
                { name: 'Proud vs. napětí', description: 'Proud = kolik elektřiny teče (ampér). Napětí = tlak elektřiny (volt). Proud zabíjí, ne napětí! 0,1A = smrtelné' },
                { name: 'Domácí spotřebiče', description: 'LED žárovka: 0,1A, lednice: 1-2A, mikrovlnka: 10A, rychlovarná konvice: 10-13A, svářečka: 20-30A' },
                { name: 'Pojistky a jističe', description: 'Domácí jistič: 10-25A. Při přetížení vypne obvod. Zkrat v zásuvce = proud přes 1000A, jistič vypne za 0,01s' },
                { name: 'Smrtelné proudy', description: '1 mA = cítíte, 10 mA = bolest, 30 mA = ochromení svalů, 100 mA = zástava srdce. Proudový chránič vypne při 30 mA' }
            ],
            
            electric_resistance: [
                { name: 'Georg Ohm (1789-1854)', description: 'Německý fyzik, objevil Ohmův zákon v roce 1826. Německo jeho objev odmítlo, uznal ho až Londýn v 1841' },
                { name: 'Ohmův zákon (1826)', description: 'U = R × I (napětí = odpor × proud). Základní zákon elektřiny! Dnes triviální, v roce 1826 revoluční objev' },
                { name: 'Jednotka ohm (1881)', description: 'Mezinárodní kongres v Paříži 1881 pojmenoval jednotku odporu ohm (Ω). Řecké omega na počest Georga Ohma' },
                { name: 'Barevné kódy rezistorů', description: 'Rezistory mají barevné proužky: hnědá-černá-červená = 1000 Ω = 1 kΩ. Každá barva = jiná číslice' },
                { name: 'Odpor materiálů', description: 'Měď: 0,017 Ω/m, hliník: 0,028 Ω/m, uhlík: 10-50 Ω/m, guma: 10¹³ Ω/m (izolant), stříbro: nejnižší odpor' },
                { name: 'Supravodiče a odpor', description: 'Při teplotě blízko absolutní nuly (-273°C) některé materiály mají nulový odpor! Proud teče věčně bez ztrát' }
            ],
            
            electric_charge: [
                { name: 'Charles Coulomb (1736-1806)', description: 'Francouzský fyzik. V roce 1785 objevil zákon elektrostatické síly pomocí torzních vah. Coulombův zákon popisuje přitahování nábojů' },
                { name: 'Coulombův zákon 1785', description: 'Síla mezi náboji = k × Q₁Q₂/r². Stejné náboje se odpuzují, opačné přitahují. Fundamentální zákon elektřiny!' },
                { name: 'Jednotka Coulomb od 1880', description: 'Pojmenována po Coulombovi. 1 C = náboj přenesený proudem 1 A za 1 sekundu. 1 C = 6,24×10¹⁸ elektronů' },
                { name: 'Baterie telefonu', description: 'iPhone 14: 3279 mAh při 3,8V = 12,5 Wh. Samsung S23: 3900 mAh při 3,85V = 15 Wh. Kapacita = jak dlouho vydrží' },
                { name: 'Elektromobil baterie', description: 'Tesla Model 3: 50-82 kWh. Škoda Enyaq: 58-82 kWh. Dojezd ≈ 400-600 km. 1 kWh ≈ 4-6 km jízdy' },
                { name: 'Blesk elektrický náboj', description: 'Jeden blesk přenese 1-50 coulombů náboje! Proud až 200 000 ampérů, ale trvá jen 0,0002 sekundy. Proto často přežít' }
            ],
            
            fuel: [
                { name: 'MPG logika USA', description: 'Miles Per Gallon: kolik mil na 1 galon. VÍC MPG = úspornější! Ford Model T (1908): 25 MPG. Moderní auto: 30-40 MPG' },
                { name: 'L/100km Evropa', description: 'Litry na 100 km. MÉNĚ l/100km = úspornější! Opačná logika než MPG! Standardní auto dnes: 5-7 l/100km. SUV: 8-12 l/100km' },
                { name: 'Převod MPG ↔ l/100km', description: 'Vzorec: l/100km = 235 ÷ MPG (US). Např. 30 MPG = 7,8 l/100km. Proto USA auta vypadají úsporněji - jiná jednotka!' },
                { name: 'Imperial vs US MPG', description: 'UK galon větší (4,546 l) než US (3,785 l). 30 MPG (UK) = 25 MPG (US). Proto UK čísla lepší! Matoucí při porovnávání' },
                { name: 'CNG a LPG spotřeba', description: 'CNG (zemní plyn): kg/100km nebo m³/100km. LPG (propan-butan): l/100km. Levnější než benzín, ale větší spotřeba objemově' },
                { name: 'Elektromobily kWh/100km', description: 'Tesla Model 3: 15 kWh/100km. Škoda Enyaq: 17-19 kWh/100km. 1 kWh ≈ 0,3 l benzínu. Elektřina 3-4× efektivnější!' }
            ],

            currency: [
                { name: 'Euro (EUR)', description: 'Oficiální měna 20 z 27 zemí EU. Zavedeno 1999 bezhotovostně, 2002 v hotovosti. Používá se i v Andoře, Monaku, San Marinu a Vatikánu' },
                { name: 'Americký dolar (USD)', description: 'Světová rezervní měna od roku 1945. Centrální banky drží 59 % rezerv v dolarech. Používá se v mezinárodním obchodě a obchodování ropy' },
                { name: 'Britská libra (GBP)', description: 'Nejstarší nepřetržitě používaná měna na světě, historie přes 1000 let. První země se zlatým standardem (1816). Symbol £ pochází z latinského libra' },
                { name: 'Švýcarský frank (CHF)', description: 'Bezpečný přístav pro investory díky politické neutralitě a ekonomické stabilitě Švýcarska. Oblíbená měna v době finanční nestability' },
                { name: 'Japonský jen (JPY)', description: 'Třetí nejobchodovanější měna světa. Historicky nízké úrokové sazby činí jen oblíbenou měnou pro carry trade (půjčky za nízký úrok)' },
                { name: 'Kurzy ČNB', description: 'Česká národní banka denně publikuje kurzy 30+ světových měn. Kurzy vychází z mezibankovního trhu a jsou platné pro celý den' }
            ]
        };
    }

    initializeUnitHistories() {
        return {
            // === DÉLKOVÉ JEDNOTKY ===
            'm': {
                name: 'Metr',
                origin: 'Francie, 1795',
                history: 'Původně definován jako 1/10 000 000 kvarta zemského poledníku procházejícího Paříží. Název pochází z řeckého "metron" (míra). Oficiálně přijat francouzskou vládou v roce 1795 během Francouzské revoluce jako součást metrického systému.',
                inventor: 'Francouzská akademie věd',
                purpose: 'Univerzální jednotka délky nezávislá na lidském těle',
                modernUse: 'Základní jednotka SI, používána celosvětově kromě USA, Libérie a Myanmaru'
            },
            'cm': {
                name: 'Centimetr',
                origin: 'Francie, 1795',
                history: 'Stá část metru. Vznikl současně s metrickým systémem jako praktická jednotka pro každodenní měření. Prefix "centi-" znamená setinu.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Praktická jednotka pro běžná měření',
                modernUse: 'Široce používán v Evropě a Asii pro měření výšky, délky objektů'
            },
            'mm': {
                name: 'Milimetr',
                origin: 'Francie, 1795',
                history: 'Tisícina metru. Prefix "milli-" označuje tisícinu. Stal se standardem pro přesná technická měření.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Přesná technická měření',
                modernUse: 'Strojírenství, elektronika, stavebnictví, meteorologie (srážky)'
            },
            'km': {
                name: 'Kilometr',
                origin: 'Francie, 1795',
                history: 'Tisíc metrů. Prefix "kilo-" označuje tisíc. Rychle se stal standardem pro měření velkých vzdáleností.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Měření velkých vzdáleností',
                modernUse: 'Doprava, geografie, atletika, všechny země kromě USA/UK'
            },
            'in': {
                name: 'Palec (Inch)',
                origin: 'Anglie, 14. století',
                history: 'Původně šířka palce krále Eduarda II. (1327). Standardizován jako délka tří ječných zrn postavených za sebou. Oficiálně definován jako 25,4 mm v roce 1959 mezinárodní dohodou.',
                inventor: 'Anglický král Eduard II.',
                purpose: 'Královský standard pro obchod a řemesla',
                modernUse: 'USA, UK, Kanada - elektronika, pneumatiky, obrazovky'
            },
            'ft': {
                name: 'Stopa (Foot)',
                origin: 'Starověký Egypt, 3000 př. n. l.',
                history: 'Délka lidské nohy. Římané ji rozdělili na 12 uncií (předchůdce palců). Římská stopa měřila ~296 mm. Anglická stopa byla standardizována králem Jindřichem I. v roce 1101.',
                inventor: 'Starověké civilizace',
                purpose: 'Praktické měření založené na lidském těle',
                modernUse: 'USA, UK - stavebnictví, letectví, výška osob'
            },
            'yd': {
                name: 'Yard',
                origin: 'Anglie, 12. století',
                history: 'Původně vzdálenost od špičky nosu krále Jindřicha I. po konec jeho natažené ruky. Standardizován ve 14. století jako 3 stopy. Název od anglického "gird" (opásání).',
                inventor: 'Anglický král Jindřich I.',
                purpose: 'Standardizace obchodu s textiliemi',
                modernUse: 'USA, UK - fotbal, golf, textilní průmysl'
            },
            'mi': {
                name: 'Míle (Mile)',
                origin: 'Římská říše, 1. století př. n. l.',
                history: 'Z latinského "mille passus" (tisíc kroků římské legie). Jeden krok = 5 stop, míle = 5000 stop. Alžběta I. v roce 1592 změnila na 5280 stop (8 furlongů).',
                inventor: 'Římská legie',
                purpose: 'Měření pochodových vzdáleností',
                modernUse: 'USA, UK - doprava, atletika, námořnictví'
            },

            // === HMOTNOSTNÍ JEDNOTKY ===
            'kg': {
                name: 'Kilogram',
                origin: 'Francie, 1795',
                history: 'Původně "grave" - hmotnost litru vody při 4°C. Přejmenován na kilogram v roce 1795. Až do roku 2019 definován platinovo-iridiovou vahou v Paříži, nyní pomocí Planckovy konstanty.',
                inventor: 'Francouzská národní konvent',
                purpose: 'Univerzální standard hmotnosti',
                modernUse: 'Základní jednotka SI, celosvětový standard kromě USA'
            },
            'g': {
                name: 'Gram',
                origin: 'Francie, 1795',
                history: 'Z řeckého "gramma" (malá váha). Původně definován jako hmotnost kubického centimetru vody při 4°C. Tisícina kilogramu.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Praktické vážení malých předmětů',
                modernUse: 'Kuchyně, lékařství, věda, klenoty'
            },
            'μg': {
                name: 'Mikrogram',
                origin: 'Věda, 20. století',
                history: 'Miliontina gramu. Používán v lékařství a farmacii pro přesné dávkování léků. Vitamin D doporučená denní dávka: 10-20 μg. Některé léky mají účinnost již při dávce jednotek μg.',
                inventor: 'Vědecká a farmaceutická komunita',
                purpose: 'Měření velmi malých hmotností',
                modernUse: 'Farmacie, lékařství, toxikologie, analytická chemie'
            },
            'lb': {
                name: 'Libra (Pound)',
                origin: 'Římská říše, 3. století př. n. l.',
                history: 'Z latinského "libra pondo" (váha v librách), odtud značka "lb". Římská libra vážila ~327 g. Anglická **avoirdupois libra** měla různé definice až do **International Yard and Pound Agreement (1959)**, kdy byla mezinárodně standardizována jako přesně **0,45359237 kg** (453,59237 g). Starší britské definice: 1878 (453,59265 g), 1898 (453,59243 g).',
                inventor: 'Starověký Řím',
                purpose: 'Obchod s drahými kovy a zbožím',
                modernUse: 'USA, UK - váha osob, potraviny, sport (box)'
            },
            'oz': {
                name: 'Unce (Ounce)',
                origin: 'Římská říše, 1. století',
                history: 'Z latinského "uncia" (dvanáctina). Původně 1/12 římské libry. Avoirdupois unce (28,35 g) se používá běžně, troy unce (31,1 g) pro drahé kovy.',
                inventor: 'Římský systém měr',
                purpose: 'Obchod s drahými kovy a kořením',
                modernUse: 'USA, UK - potraviny, zlato, stříbro, parfumy'
            },

            // === TEPLOTNÍ STUPNICE ===
            'temperature_c': {
                name: 'Celsius',
                origin: 'Švédsko, 1742',
                history: 'Anders Celsius původně definoval 0°C jako bod varu vody a 100°C jako bod tání ledu. Po jeho smrti Carl Linnaeus (1745) stupnici obrátil na současnou podobu.',
                inventor: 'Anders Celsius',
                purpose: 'Vědecké měření teploty',
                modernUse: 'Celosvětový standard kromě USA - meteorologie, věda, kuchyně'
            },
            'f': {
                name: 'Fahrenheit',
                origin: 'Polsko/Holandsko, 1724',
                history: 'Daniel Gabriel Fahrenheit (1686-1736) nastavil 0°F jako teplotu nejchladnější zimy v Gdaňsku a 96°F jako teplotu lidského těla. Později přeškálováno: 32°F = tání ledu, 212°F = var vody.',
                inventor: 'Daniel Gabriel Fahrenheit',
                purpose: 'Přesné měření teplot bez záporných hodnot',
                modernUse: 'Hlavně USA - meteorologie, lékařství, kuchyně'
            },
            'k': {
                name: 'Kelvin',
                origin: 'Skotsko, 1848',
                history: 'William Thomson (Lord Kelvin) navrhl absolutní teplotní stupnici začínající na absolutní nule (-273,15°C). Publikováno v práci "On an Absolute Thermometric Scale".',
                inventor: 'William Thomson (Lord Kelvin)',
                purpose: 'Vědecké měření absolutní teploty',
                modernUse: 'Věda, fyzika, astronomie - základní jednotka SI'
            },

            // === MĚNY (vybrané historické) ===
            'USD': {
                name: 'Americký dolar',
                origin: 'USA, 1792',
                history: 'Název od německého "Thaler" (tolar). Coinage Act z roku 1792 ustanovil dolar jako oficiální měnu USA. Založen na španělském dolaru, který byl mezinárodní obchodní měnou.',
                inventor: 'Alexander Hamilton, první ministr financí USA',
                purpose: 'Jednotná národní měna nezávislých USA',
                modernUse: 'Dominantní světová rezervní měna, mezinárodní obchod'
            },
            'EUR': {
                name: 'Euro',
                origin: 'Evropa, 1999',
                history: 'Zavedeno jako účetní měna v roce 1999, fyzické mince a bankovky od roku 2002. Název navržen v roce 1995. Největší měnová reforma v historii.',
                inventor: 'Evropská unie',
                purpose: 'Jednotná měna pro evropskou integraci',
                modernUse: '19 zemí EU, druhá nejdůležitější rezervní měna světa'
            },
            'GBP': {
                name: 'Britská libra',
                origin: 'Anglie, 8. století',
                history: 'Nejstarší měna světa stále v používání. Původně hmotnost jedné libry stříbra. Symbol £ pochází z latinského "libra". Desetinná soustava zavedena až v roce 1971.',
                inventor: 'Král Offa z Mercie',
                purpose: 'Standardizace obchodu ve středověké Anglii',
                modernUse: 'Velká Británie, Gibraltar, Falklandy'
            },

            // === OBJEMOVÉ JEDNOTKY ===
            'l': {
                name: 'Litr',
                origin: 'Francie, 1795',
                history: 'Původně definován jako objem jednoho kilogramu vody při 4°C. Název pochází z francouzského "litron". V letech 1901-1964 přesně definován hmotností vody, poté vrácen k objemové definici.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Praktická jednotka objemu pro kapaliny',
                modernUse: 'Celosvětový standard pro kapaliny, paliva, nápoje'
            },
            'ml': {
                name: 'Mililitr',
                origin: 'Francie, 1795',
                history: 'Tisícina litru. Vznikl současně s metrickým systémem. Stejný objem jako kubický centimetr (cm³).',
                inventor: 'Francouzský metrický systém',
                purpose: 'Přesné dávkování malých objemů',
                modernUse: 'Lékařství, kuchyně, kosmetika, laboratoře'
            },
            'gal': {
                name: 'Americký galon',
                origin: 'Anglie/USA, středověk/1824',
                history: 'Původně objem osmi liber pšenice. Název pochází ze staré normanské francouzštiny (galun, galon) a má románský původ - nejedná se o řecké slovo. US galon (3,785 l) založen na Queen Anne wine gallonu z roku 1707. Imperial galon (4,546 l) standardizován v roce 1824.',
                inventor: 'Středověká Anglie',
                purpose: 'Obchod s vínem, pivem a obilím',
                modernUse: 'USA - paliva, mléko, nápoje; UK - paliva'
            },
            'qt': {
                name: 'Kvart (Quart)',
                origin: 'Anglie, středověk',
                history: 'Čtvrtina galonu. Název z francouzského "quart" (čtvrtina). Používán od středověku pro obchod s kapalinami.',
                inventor: 'Středověká Anglie',
                purpose: 'Praktické měření čtvrtiny galonu',
                modernUse: 'USA - mléko, motorové oleje, nápoje'
            },
            'pt': {
                name: 'Pinta (Pint)',
                origin: 'Anglie, 14. století',
                history: 'Původně z francouského "pinte". Polovina kvartu (čtvrt galonu). Anglická pinta = 568 ml, americká = 473 ml.',
                inventor: 'Středověká Francie/Anglie',
                purpose: 'Obchod s pivem a mlékem',
                modernUse: 'UK, Irsko - pivo; USA - mléko, zmrzlina'
            },

            // === TLAKOVÉ JEDNOTKY ===
            'pa': {
                name: 'Pascal',
                origin: 'Francie, 1971',
                history: 'Pojmenován po Blaise Pascalovi (1623-1662), průkopníku hydrodynamiky. Přijat jako SI jednotka tlaku 14. Generální konferencí vah a měr v roce 1971.',
                inventor: 'SI systém (na počest Blaise Pascala)',
                purpose: 'Standardní vědecká jednotka tlaku',
                modernUse: 'Věda, inženýrství, meteorologie jako hektopascal (hPa)'
            },
            'bar': {
                name: 'Bar',
                origin: 'Norsko, 1906',
                history: 'Zaveden v roce **1906** norským meteorologem **Vilhelmem Bjerknesem**, zakladatelem moderní předpovědi počasí. Název pochází z řečtiny "baros" (váha). Definován jako **100 000 pascalů** (100 kPa). Původně byl definován jako 1 megadyn/cm². Používán v meteorologii (milibar = hPa), průmyslu a technice.',
                inventor: 'Vilhelm Bjerknes (1906)',
                purpose: 'Meteorologické měření atmosférického tlaku',
                modernUse: 'Hydraulika, pneumatika, meteorologie, automobilové pneumatiky'
            },
            'psi': {
                name: 'PSI (Libra na čtvereční palec)',
                origin: 'USA/UK, moderní inženýrství (19.-20. století)',
                history: 'Jednotka tlaku odvozená z avoirdupois libry a palce. Ačkoli avoirdupois libra pochází ze 14. století, samotná jednotka psi vznikla až s rozvojem moderního inženýrství v 19. století. Fakticky definována se standardizací libry a palce (1 psi = 1 lbf/sq in). Mezinárodně standardizována v roce 1959.',
                inventor: 'Moderní inženýrství (19. století)',
                purpose: 'Praktické měření tlaku v technických aplikacích',
                modernUse: 'USA, UK - pneumatiky, hydraulika, kompresory'
            },
            'mmhg': {
                name: 'Milimetr rtuti',
                origin: 'Itálie, 1643',
                history: 'Založeno na rtuťovém barometru Evangelisty Torricelliho (1643), studenta Galilea. Jeden mmHg odpovídá tlaku sloupce rtuti vysokého 1 mm.',
                inventor: 'Evangelista Torricelli',
                purpose: 'Měření atmosférického tlaku a vakua',
                modernUse: 'Lékařství (krevní tlak), fyzika, meteorologie'
            },

            // === ENERGETICKÉ JEDNOTKY ===
            'j': {
                name: 'Joule',
                origin: 'Anglie, 1889',
                history: 'Pojmenován po anglickém fyzikovi Jamesi Prescott Joulovi (1818-1889), který prokázal ekvivalenci mechanické práce a tepla. Přijat jako SI jednotka energie.',
                inventor: 'James Prescott Joule',
                purpose: 'Měření energie, práce a tepla',
                modernUse: 'Základní SI jednotka pro všechny formy energie'
            },
            'cal': {
                name: 'Kalorie',
                origin: 'Francie, 1824',
                history: 'Z latinského "calor" (teplo). Definována francouzským fyzikem Nicolas Clément-Desormesem jako teplo potřebné k ohřátí 1 gramu vody o 1°C.',
                inventor: 'Nicolas Clément-Desormes',
                purpose: 'Měření tepelné energie v potravinách',
                modernUse: 'Výživa (kcal), starší fyzikální aplikace'
            },
            'kwh': {
                name: 'Kilowatthodina',
                origin: 'Německo/USA, konec 19. století',
                history: 'Vznikla s rozvojem elektrifikace. Oliver B. Shallenberger vyvinul pro Westinghouse **ampere-hour meter v roce 1888** a následně **watt-hour meter v roce 1894**, který umožnil přesné měření elektrické energie (výkon × čas). Kilowatthodina se stala celosvětovým standardem pro měření a účtování spotřeby elektřiny. 1 kWh = 3,6 MJ = 860 kcal.',
                inventor: 'Oliver B. Shallenberger (watt-hour meter, Westinghouse 1894)',
                purpose: 'Měření spotřeby elektrické energie',
                modernUse: 'Celosvětový standard pro účtování elektřiny'
            },

            // === RYCHLOSTNÍ JEDNOTKY ===
            'ms': {
                name: 'Metr za sekundu',
                origin: 'SI systém, 1960',
                history: 'Odvozená SI jednotka rychlosti. Kombinuje základní jednotku délky (metr) a času (sekunda).',
                inventor: 'SI systém',
                purpose: 'Vědecké měření rychlosti',
                modernUse: 'Fyzika, inženýrství, meteorologie (rychlost větru)'
            },
            'kmh': {
                name: 'Kilometr za hodinu',
                origin: 'Evropa, 19. století',
                history: 'Vznikla s rozvojem železniční dopravy. Praktická jednotka pro rychlosti vozidel používající metrický systém.',
                inventor: 'Evropský dopravní systém',
                purpose: 'Měření rychlosti dopravních prostředků',
                modernUse: 'Celosvětový standard rychlosti kromě USA/UK'
            },
            'mph': {
                name: 'Míle za hodinu',
                origin: 'Anglie, 18. století',
                history: 'První běžné použití s **poštovními kočáry v 18. století** (dokument z 1825 zmiňuje 20 mph). Kombinuje římskou míli s hodinovou měrkou času. S příchodem **železnic v raném 19. století** se stala standardem pro měření rychlosti v anglicky mluvících zemích.',
                inventor: 'Anglický dopravní systém',
                purpose: 'Měření rychlosti v imperiálním systému',
                modernUse: 'USA, UK - doprava, letectví'
            },

            // === KUCHYŇSKÉ JEDNOTKY ===
            'tsp': {
                name: 'Čajová lžička',
                origin: 'Anglie, 18. století',
                history: 'Standardizována pro konzistentní recepty. Původně velikost skutečné čajové lžičky používané při servírování čaje.',
                inventor: 'Anglická kuchyňská tradice',
                purpose: 'Přesné dávkování koření a malých množství',
                modernUse: 'Kuchyně celosvětově - recepty, lékařství'
            },
            'tbsp': {
                name: 'Polévková lžíce',
                origin: 'Anglie, 18. století',
                history: 'Standardizována jako trojnásobek čajové lžičky. Původně velikost lžíce používané pro servírování polévky.',
                inventor: 'Anglická kuchyňská tradice',
                purpose: 'Dávkování středních množství v kuchyni',
                modernUse: 'Kuchyně, recepty - 3× větší než čajová lžička'
            },
            'cup': {
                name: 'Šálek (Cup)',
                origin: 'USA, 19. století',
                history: 'Americká standardizace na 8 tekutých uncí (236,6 ml). Britský imperial cup = 284 ml. Původně velikost obvyklého čajového šálku.',
                inventor: 'Americký kuchyňský systém',
                purpose: 'Pohodlné měření větších objemů v kuchyni',
                modernUse: 'USA, Kanada - pečení, vaření, káva'
            },

            // === PLOŠNÉ JEDNOTKY ===
            'm2': {
                name: 'Čtvereční metr',
                origin: 'Francie, 1795',
                history: 'Odvozená jednotka z metru. Vznikla s metrickým systémem během Francouzské revoluce. Moderní definice vázaná na rychlost světla od roku 1983.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Standardní měření plochy',
                modernUse: 'Celosvětový standard pro plochy kromě USA/UK'
            },
            'ha': {
                name: 'Hektar',
                origin: 'Francie, 1795',
                history: 'Zavedeno s metrickým systémem. Název z prefixu "hekto-" (sto) a základní jednotky "ar" (100 m²). Ar pochází z latinského "area" (plocha).',
                inventor: 'Francouzský metrický systém',
                purpose: 'Praktické měření velkých pozemků',
                modernUse: 'Zemědělství, lesnictví, územní plánování celosvětově'
            },
            'acre': {
                name: 'Akr',
                origin: 'Anglie, středověk',
                history: 'Z latinského "ager" (pole) → staroangličtina "aecer". Původně plocha, kterou dokázal jeden rolník **zorat za den pomocí páru volů** (ideálně 8 volů). Tvar akru (dlouhý a úzký, **1 furlong × 1 chain** = 220×22 yardů) odpovídal výdrži volů. **Eduard I. (1272-1307)** zahájil standardizaci jako **4 rody × 40 rodů**. Finální definice: **Weights and Measures Act 1878** - přesně **4840 čtverečních yardů**.',
                inventor: 'Anglosaské zemědělství',
                purpose: 'Praktické měření orné půdy',
                modernUse: 'USA, UK, Kanada - zemědělství, nemovitosti'
            },
            'ft2': {
                name: 'Čtvereční stopa',
                origin: 'Anglie, středověk',
                history: 'Odvozeno z lineární stopy. Používáno v anglickém systému měr pro menší plochy než akr.',
                inventor: 'Anglický imperiální systém',
                purpose: 'Měření místností a menších ploch',
                modernUse: 'USA, UK - stavebnictví, interiéry, nemovitosti'
            },

            // === ELEKTRICKÉ JEDNOTKY ===
            'v': {
                name: 'Volt',
                origin: 'Itálie, 1881',
                history: 'Pojmenován po Alessandro Voltovi (1745-1827), italském fyzikovi, který vynalezl první baterii - voltaický sloupec v roce 1799. Formálně definován International Electrical Congress v roce 1881.',
                inventor: 'Alessandro Volta',
                purpose: 'Měření elektrického napětí',
                modernUse: 'Základní elektrická jednotka - elektronika, energetika'
            },
            'a': {
                name: 'Ampér',
                origin: 'Francie, 1881',
                history: 'Pojmenován po André-Marie Ampèrovi (1775-1836), francouzském fyzikovi a matematikovi, který objevil souvislost mezi elektřinou a magnetismem po Oerstedově demonstraci v roce 1820. Mezinárodně přijat jako jednotka proudu v roce 1881 na International Electrical Congress.',
                inventor: 'André-Marie Ampère',
                purpose: 'Měření elektrického proudu',
                modernUse: 'Základní jednotka SI pro elektrický proud od roku 1954 (10. CGPM)'
            },
            'w': {
                name: 'Watt',
                origin: 'Anglie, 1882',
                history: 'Pojmenován po Jamesu Wattovi (1736-1819), skotském vynálezci, který vylepšil parní stroj v roce 1776. Navržen C. William Siemensem v roce 1882 jako jednotka výkonu.',
                inventor: 'James Watt',
                purpose: 'Měření elektrického výkonu',
                modernUse: 'Celosvětový standard pro výkon - spotřebiče, motory'
            },
            'ohm': {
                name: 'Ohm',
                origin: 'Německo, 1881',
                history: 'Pojmenován po Georgu Simonu Ohmovi (1789-1854), německém fyzikovi, který objevil Ohmův zákon (V = I × R) v roce 1827. Formálně přijat v roce 1881.',
                inventor: 'Georg Simon Ohm',
                purpose: 'Měření elektrického odporu',
                modernUse: 'Elektronika, elektrotechnika - rezistory, vodiče'
            },

            // === DALŠÍ SPECIALIZOVANÉ JEDNOTKY ===
            'hz': {
                name: 'Hertz',
                origin: 'Německo, 1930',
                history: 'Pojmenován po Heinrichu Hertzi (1857-1894), německém fyzikovi, který jako první dokázal existenci elektromagnetických vln v roce 1886. Přijat jako SI jednotka v roce 1960.',
                inventor: 'Heinrich Hertz',
                purpose: 'Měření frekvence',
                modernUse: 'Elektronika, telekomunikace, hudba, fyzika'
            },
            'n': {
                name: 'Newton',
                origin: 'Anglie, 1946/1948',
                history: 'Pojmenován po Sir Isaac Newtonovi (1643-1727), anglickém fyzikovi a matematikovi, který formuloval zákony mechaniky v Principia Mathematica (1687). Jednotka síly **standardizována CGPM v roce 1946**, název **"newton" oficiálně přijat 9. CGPM v roce 1948**. Začleněno do SI v roce 1960.',
                inventor: 'Isaac Newton (koncept), CGPM (standardizace 1946/1948)',
                purpose: 'Měření síly',
                modernUse: 'Fyzika, inženýrství - gravitace, mechanika'
            },
            'torr': {
                name: 'Torr',
                origin: 'Itálie, 1954',
                history: 'Pojmenován po Evangelistovi Torricellim (1608-1647), italském fyzikovi, studentu Galilea, který vynalezl rtuťový barometr v roce 1643. Termín "torr" poprvé zaznamenán 1945-50. **Formálně definován v roce 1954** (10. CGPM) jako **1/760 standardní atmosféry** = 101325/760 Pa ≈ 133.322 Pa. Téměř identický s mmHg, ale přesně definován.',
                inventor: 'Evangelista Torricelli (barometr 1643), jednotka standardizována 1954',
                purpose: 'Přesné měření tlaku a vakua',
                modernUse: 'Vakuová technika, fyzika, lékařské přístroje'
            },

            // === DALŠÍ TLAKOVÉ JEDNOTKY ===
            'hpa': {
                name: 'Hektopascal',
                origin: 'Meteorologie, 1929/1971',
                history: 'Vznikl jako náhrada za milibar v meteorologii. 1 hPa = 1 mbar = 100 Pa. Prefixem "hekto-" (sto) se dosáhlo praktické velikosti pro atmosférický tlak.',
                inventor: 'Mezinárodní meteorologická organizace',
                purpose: 'Meteorologické měření atmosférického tlaku',
                modernUse: 'Meteorologie, letectví, předpověď počasí celosvětově'
            },
            'kpa': {
                name: 'Kilopascal',
                origin: 'SI systém, 1971',
                history: 'Tisícinásobek pascalu. Praktičtější než pascal pro technické aplikace. Široce používán v inženýrství a průmyslu.',
                inventor: 'SI systém',
                purpose: 'Praktické technické měření tlaku',
                modernUse: 'Inženýrství, pneumatika, hydraulika, materiálové testování'
            },
            'atm': {
                name: 'Atmosféra',
                origin: 'Francie, 1954',
                history: 'Standardní atmosféra definována jako přesně 101 325 Pa. Reprezentuje průměrný atmosférický tlak na hladině moře při 15°C.',
                inventor: '10. Generální konference vah a měr',
                purpose: 'Referenční standard pro atmosférický tlak',
                modernUse: 'Věda, potápění, vysokotlaké aplikace'
            },

            // === VÝKONOVÉ JEDNOTKY ===
            'kw': {
                name: 'Kilowatt',
                origin: 'SI systém, 1960',
                history: 'Tisícinásobek wattu. Stal se standardní jednotkou pro výkon spotřebičů a motorů. Běžně používán na štítcích spotřebičů.',
                inventor: 'SI systém',
                purpose: 'Praktické měření výkonu spotřebičů',
                modernUse: 'Domácí spotřebiče, motory, solární panely'
            },
            'hp': {
                name: 'Koňská síla',
                origin: 'Anglie, 1782',
                history: 'James Watt potřeboval porovnat výkon svého parního stroje s koňmi. Definoval jako práci potřebnou k vytažení 550 liber na 1 stopu za 1 sekundu (≈ 746 W).',
                inventor: 'James Watt',
                purpose: 'Marketing parních strojů proti koňské síle',
                modernUse: 'Automobilový průmysl, motory, USA/UK'
            },
            'hpm': {
                name: 'Metrická koňská síla',
                origin: 'Kontinentální Evropa, 19. století',
                history: 'Evropská standardizace koňské síly. Definována jako 735,5 W (75 kgf⋅m/s). Mírně odlišná od americké HP.',
                inventor: 'Evropské technické standardy',
                purpose: 'Harmonizace výkonu v metrickém systému',
                modernUse: 'Evropa, Asie - automobilový průmysl'
            },

            // === ÚHLOVÉ JEDNOTKY ===
            'deg': {
                name: 'Stupeň',
                origin: 'Starověký Babylon, cca 2000 př. n. l.',
                history: 'Babylóňané rozdělili kruh na 360 částí podle délky roku (360 dní). Číslo 360 má mnoho dělitelů, což usnadňuje výpočty.',
                inventor: 'Babylónští astronomové',
                purpose: 'Praktické dělení kruhu pro astronomii',
                modernUse: 'Navigace, geografie, technika, běžné použití'
            },
            'rad': {
                name: 'Radián',
                origin: 'Irsko, 1873',
                history: 'Zavedl James Thomson (bratr lorda Kelvina). Radián je úhel, při kterém délka oblouku rovná poloměru kruhu. 2π rad = 360°.',
                inventor: 'James Thomson',
                purpose: 'Matematické a fyzikální výpočty',
                modernUse: 'Matematika, fyzika, inženýrství - základní SI jednotka'
            },
            'gon': {
                name: 'Gradián (Gon)',
                origin: 'Francie, 1792',
                history: 'Součást metrického systému během Francouzské revoluce. Kruh dělen na 400 gradů pro snadnější decimální počítání.',
                inventor: 'Francouzský revoluční metrický systém',
                purpose: 'Decimální alternativa ke stupňům',
                modernUse: 'Geodézie, stavebnictví v Evropě'
            },

            // === ENERGETICKÉ JEDNOTKY ===
            'kcal': {
                name: 'Kilokalorie',
                origin: 'Francie, 1824',
                history: 'Tisíc kalorií. Energie potřebná k ohřátí 1 kg vody o 1°C. Přes pokles ve fyzice zůstává standard ve výživě.',
                inventor: 'Nicolas Clément-Desormes',
                purpose: 'Měření energie v potravinách',
                modernUse: 'Výživa, dietologie, označování potravin celosvětově'
            },
            'btu': {
                name: 'British Thermal Unit',
                origin: 'Velká Británie, 19. století',
                history: 'Energie potřebná k ohřátí 1 libry vody o 1°F (přesně z 63°F na 64°F). Termín "thermal unit" použil **William Rankine** v práci o parních strojích (1850s-1880s). BTU jako standard přijali britští inženýři kolem **1897**. Používá se v USA a UK pro klimatizaci, vytápění a plynové spotřebiče. 1 BTU ≈ 1055 J.',
                inventor: 'William John Macquorn Rankine (termální teorie, 1850s), standardizováno ~1897',
                purpose: 'Měření tepelné energie',
                modernUse: 'USA, UK - klimatizace, vytápění, plynové spotřebiče'
            },

            // === KONCENTRACE A CHEMICKÉ JEDNOTKY ===
            'ppm': {
                name: 'Parts per million',
                origin: 'USA, 20. století',
                history: 'Bezrozměrná jednotka koncentrace znamenající "částic na milion". Populární s rozvojem analytické chemie a ekologie. Pro vodné roztoky: 1 ppm = 1 mg/L.',
                inventor: 'Analytická chemie',
                purpose: 'Měření velmi malých koncentrací',
                modernUse: 'Analýza vody, kontrola znečištění, kvalita vzduchu'
            },
            'mg_l': {
                name: 'Milligram na litr',
                origin: 'Metrický systém, 19. století',
                history: 'Kombinace metrických jednotek hmotnosti a objemu. Standardní laboratorní jednotka pro koncentrace ve vodných roztocích. Odpovídá ppm pro vodu.',
                inventor: 'Laboratorní chemie',
                purpose: 'Přesné laboratorní měření koncentrací',
                modernUse: 'Laboratoře, kontrola kvality vody, farmacie'
            },
            'g_l': {
                name: 'Gram na litr',
                origin: 'Metrický systém, 19. století',
                history: 'Praktická jednotka pro koncentrovanější roztoky. Tisíckrát větší než mg/L. Často používána v průmyslové chemii.',
                inventor: 'Průmyslová chemie',
                purpose: 'Měření středních koncentrací',
                modernUse: 'Průmysl, chemická výroba, hnojiva'
            },
            'percent_w_v': {
                name: 'Procenta hmotnost/objem',
                origin: 'Farmaceutický průmysl, 19. století',
                history: 'Udává gramy látky ve 100 ml roztoku. Standardizováno pro farmaceutické preparáty kvůli snadnému dávkování.',
                inventor: 'Farmaceutická standardizace',
                purpose: 'Přesné dávkování léků a roztoků',
                modernUse: 'Farmacie, zdravotnictví, kosmetika'
            },

            // === PRŮTOK ===
            'cfm': {
                name: 'CFM (Cubic Feet per Minute)',
                origin: 'USA, 20. století',
                history: 'Kubická stopa za minutu. Standardizováno s rozvojem klimatizace (Willis Carrier, 1902).',
                inventor: 'HVAC standardy (Willis Carrier - otec klimatizace, 1902)',
                purpose: 'Měření průtoku vzduchu ve ventilačních systémech',
                modernUse: 'Klimatizace, ventilátory PC, kompresory, průmyslová ventilace'
            },
            'gpm': {
                name: 'GPM (Gallons per Minute)',
                origin: 'USA, 19. století',
                history: 'Galony za minutu. Standard od doby vodovodních systémů (New York, 1842).',
                inventor: 'Americké vodovody (Croton Aqueduct, NYC 1842)',
                purpose: 'Měření průtoku vody v potrubích',
                modernUse: 'Čerpadla, vodovody, zavlažování, hasičské hadice'
            },
            'l_min': {
                name: 'Litr za minutu',
                origin: 'Evropa, 20. století',
                history: 'Metrická jednotka průtoku. Běžně používána v Evropě pro měření průtoku kapalin v technických aplikacích.',
                inventor: 'Evropský metrický systém',
                purpose: 'Praktické měření průtoku',
                modernUse: 'Čerpadla, vodovody, průmysl, lékařské přístroje'
            },

            // === RYCHLOST ===
            'kn': {
                name: 'Uzel (Knot)',
                origin: 'Námořnictvo, 16-17. století',
                history: '**Chip log metoda** (provaz s uzly) používaná od **konce 16. století**. Termín **"knot"** (uzel) se však objevil až v **17. století**. Log-and-line vznikl v Anglii kolem 1574. Uzly byly vzdáleny **47 stop 3 palce** (14,4 m) a měřilo se **30sekundovými přesýpacími hodinami**. Námořní míle za hodinu.',
                inventor: 'Nizozemští a angličtí námořníci (1574-1600s)',
                purpose: 'Měření rychlosti lodí',
                modernUse: 'Námořní a letecká navigace celosvětově'
            },
            'kms': {
                name: 'Kilometr za sekundu',
                origin: 'Věda, 20. století',
                history: 'Používaná pro velmi vysoké rychlosti v astronomii a fyzice. Úniková rychlost ze Země je 11,2 km/s.',
                inventor: 'Vědecká komunita',
                purpose: 'Měření kosmických a extrémních rychlostí',
                modernUse: 'Astronomie, kosmonautika, fyzika částic'
            },
            'speed_c': {
                name: 'Rychlost světla',
                origin: 'Fyzika, 1676-1983',
                history: 'První měření Oleem Rømerem (1676) pozorováním měsíců Jupiteru. Albert Einstein (1905) ve speciální teorii relativity stanovil c jako fundamentální fyzikální konstantu - maximální rychlost ve vesmíru. Přesně definována jako 299 792 458 m/s. Od roku 1983 (17. CGPM) je metr definován pomocí rychlosti světla: 1 metr = vzdálenost, kterou světlo urazí za 1/299 792 458 sekundy ve vakuu.',
                inventor: 'Ole Rømer (první měření 1676), Albert Einstein (konstanta 1905)',
                purpose: 'Fundamentální fyzikální konstanta',
                modernUse: 'Fyzika, astronomie, definice metru (od 1983)'
            },

            // === DÉLKY ===
            'nm': {
                name: 'Nanometr',
                origin: 'Věda, 20. století',
                history: 'Miliardtina metru. Používaná v mikroskopii a nanotechnologii. Viditelné světlo má vlnovou délku 380-750 nm.',
                inventor: 'Vědecká komunita',
                purpose: 'Měření na atomární úrovni',
                modernUse: 'Nanotechnologie, optika, biologie, čipy'
            },
            'μm': {
                name: 'Mikrometr',
                origin: 'Věda, 19.-20. století',
                history: 'Miliontina metru. Používán v mikroskopii od vynálezu optického mikroskopu. Lidské buňky mají typicky 10-100 μm. Bakterie: 1-10 μm. Průměr lidského vlasu: ~70 μm.',
                inventor: 'Vědecká komunita',
                purpose: 'Měření mikroskopických objektů',
                modernUse: 'Mikroskopie, biologie, výroba čipů, filtrace'
            },
            'nmi': {
                name: 'Námořní míle',
                origin: 'Mezinárodní dohoda, 1929',
                history: 'Přesně 1852 m. Odpovídá jedné minutě zeměpisné šířky. Používaná námořnictvem a letectvím.',
                inventor: 'Mezinárodní hydrografická organizace',
                purpose: 'Navigace na moři a ve vzduchu',
                modernUse: 'Námořní a letecká navigace'
            },
            'au': {
                name: 'Astronomická jednotka',
                origin: 'Astronomie, 17. století',
                history: 'Střední vzdálenost Země od Slunce. V roce 2012 přesně definována jako 149 597 870 700 metrů.',
                inventor: 'Astronomové',
                purpose: 'Měření vzdáleností v sluneční soustavě',
                modernUse: 'Astronomie, planetární věda'
            },
            'ly': {
                name: 'Světelný rok',
                origin: 'Německo, 1851',
                history: 'Termín **"světelný rok"** poprvé použil **Otto Eduard Vincenz Ule** v německém populárně astronomickém článku v roce **1851**. Vysvětlil jej srovnáním s "Wegstunde" (hodina chůze). Předchůdce: **Friedrich Bessel** v roce 1838 změřil vzdálenost ke hvězdě 61 Cygni a uvedl, že světlo trvá 10,3 let. Vzdálenost, kterou světlo urazí za rok (≈9,46 bilionu km).',
                inventor: 'Otto Ule (termín, 1851), Friedrich Bessel (inspirace, 1838)',
                purpose: 'Měření kosmických vzdáleností',
                modernUse: 'Astronomie, astrofyzika - mezihvězdné vzdálenosti'
            },

            // === HMOTNOSTI ===
            'mg': {
                name: 'Miligram',
                origin: 'Francie, 1795',
                history: 'Tisícina gramu. Používaný hlavně ve farmacii pro přesné dávkování léků.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Přesné vážení malých množství',
                modernUse: 'Farmacie, laboratoře'
            },
            'dkg': {
                name: 'Dekagram',
                origin: 'Střední Evropa, 19. století',
                history: 'Deset gramů. Běžný ve střední Evropě (Česko, Rakousko) v kuchyni.',
                inventor: 'Rakousko-Uhersko',
                purpose: 'Praktická jednotka pro vážení',
                modernUse: 'Kuchyně ve střední Evropě'
            },
            't': {
                name: 'Tuna',
                origin: 'Francie, 1795',
                history: 'Tisíc kilogramů. Používaná pro vážení velkých nákladů a lodí.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Měření velkých hmotností',
                modernUse: 'Nákladní doprava, průmysl'
            },
            'st': {
                name: 'Stone',
                origin: 'Anglie, středověk',
                history: 'Anglická jednotka rovná 14 librám (6,35 kg). Používaná ve Velké Británii pro měření hmotnosti lidí.',
                inventor: 'Středověká Anglie',
                purpose: 'Měření hmotnosti osob',
                modernUse: 'UK, Irsko - váha osob'
            },

            // === OBJEMY ===
            'cl': {
                name: 'Centilitr',
                origin: 'Francie, 1795',
                history: 'Setina litru (10 ml). Používaný v barech pro míchané nápoje.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Měření malých objemů',
                modernUse: 'Bary, gastronomie'
            },
            'dl': {
                name: 'Decilitr',
                origin: 'Francie, 1795',
                history: 'Desetina litru (100 ml). Běžný v receptech ve střední Evropě.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Praktické měření v kuchyni',
                modernUse: 'Kuchyně, recepty v EU'
            },
            'hl': {
                name: 'Hektolitr',
                origin: 'Francie, 1795',
                history: 'Sto litrů. Používaný v pivovarnictví a zemědělství.',
                inventor: 'Francouzský metrický systém',
                purpose: 'Měření velkých objemů',
                modernUse: 'Pivovarnictví, vinařství'
            },

            // === TEPLOTA ===
            'r': {
                name: 'Rankine',
                origin: 'Skotsko, 1859',
                history: 'William Rankine vytvořil absolutní stupnici s Fahrenheitovými stupni. 0°R = absolutní nula.',
                inventor: 'William Rankine',
                purpose: 'Absolutní teplota pro USA inženýrství',
                modernUse: 'Americké strojní inženýrství'
            },

            // === PLOCHA ===
            'mm2': {
                name: 'Čtvereční milimetr',
                origin: 'Francie, 1795',
                history: 'Vznikl jako odvozená jednotka metrického systému schváleného ve Francii v roce 1795. Gabriel Mouton navrhl v roce 1670 decimální systém měření.',
                inventor: 'Francouzská akademie věd',
                purpose: 'Měření malých ploch v jednotném metrickém systému',
                modernUse: 'Průřezy drátů, elektronika, technické výkresy'
            },

            // === MĚNA ===
            'CZK': {
                name: 'Česká koruna',
                origin: 'Česká republika, 1993',
                history: 'Zavedena 8. února 1993 po rozpadu Československa. Název "koruna" má hlubší historii - po rozpadu Rakouska-Uherska v roce 1918 bylo Československo jediným nástupnickým státem, který si ponechal název měny.',
                inventor: 'Česká národní banka',
                purpose: 'Samostatná měna nově vzniklé České republiky',
                modernUse: 'Oficiální měna ČR, jedna z osmi měn EU'
            },

            // === DATA ===
            'b': {
                name: 'Bit',
                origin: 'USA, 1948',
                history: 'Termín "bit" (zkratka z "binary digit") poprvé použil Claude E. Shannon ve své práci "Matematická teorie komunikace" v roce 1948. Shannon připsal autorství názvu Johnu W. Tukeymu, který zkratku použil v interním memorandu Bell Labs 9. ledna 1947.',
                inventor: 'Claude Shannon (teorie), John W. Tukey (název)',
                purpose: 'Základní jednotka informace v binárním systému',
                modernUse: 'Měření digitálních dat, přenosové rychlosti, kapacity pamětí'
            },

            // === ELEKTRICKÝ PROUD ===
            'mA': {
                name: 'Miliampér',
                origin: 'Francie, 1881',
                history: 'Tisícina ampéru, pojmenovaného po André-Marie Ampèrovi (1775-1836), zakladateli elektrodynamiky. Mezinárodní konvence v roce 1881 ustanovila ampér jako standardní jednotku proudu.',
                inventor: 'André-Marie Ampère (koncept)',
                purpose: 'Měření menších elektrických proudů',
                modernUse: 'Elektronika, nabíječky, medicínské přístroje'
            },

            // === ELEKTRICKÝ NÁBOJ ===
            'C': {
                name: 'Coulomb',
                origin: 'Francie, 1785',
                history: 'Pojmenován po Charles-Augustinu de Coulombovi, který v roce 1785 publikoval práce o elektřině. Vynalezl torzní váhy pro měření malých nábojů. Coulombův zákon publikován 1785-89, jednotka pojmenována v roce 1880.',
                inventor: 'Charles-Augustin de Coulomb',
                purpose: 'Měření elektrostatických sil a elektrického náboje',
                modernUse: 'SI jednotka náboje, výpočty kapacity baterií'
            },

            // === ELEKTRICKÉ NAPĚTÍ ===
            'mV': {
                name: 'Milivolt',
                origin: 'Itálie, 1800',
                history: 'Tisícina voltu, pojmenovaného po Alessandru Voltovi (1745-1827). Volta vynalezl voltaický článek (první baterii) v roce 1799 a předvedl ho Napoleonovi v roce 1801. Jednotka volt pojmenována v roce 1881.',
                inventor: 'Alessandro Volta',
                purpose: 'Měření elektromotorické síly z baterie',
                modernUse: 'Měření malých napětí v elektronice, senzorech, medicíně'
            },

            // === SÍLA ===
            'N': {
                name: 'Newton',
                origin: 'Anglie, 1687/1948',
                history: 'Pojmenován po Isaacu Newtonovi na počest jeho práce v mechanice, zejména druhého pohybového zákona z Principia Mathematica (1687). Jednotka síly navržena 1873, oficiálně přijat název "newton" v roce 1948.',
                inventor: 'Isaac Newton (koncept síly), CGPM (standardizace)',
                purpose: 'Vyjádření síly podle Newtonových zákonů pohybu',
                modernUse: 'Standardní SI jednotka síly ve fyzice a inženýrství'
            },

            // === FREKVENCE ===
            'Hz': {
                name: 'Hertz',
                origin: 'Německo, 1930/1960',
                history: 'Pojmenován po Heinrichu Hertzovi (1857-1894), který v letech **1886-1889 dokázal existenci elektromagnetických vln** (publikace 1887). Jednotka frekvence **ustanovena IEC v roce 1930** (některé zdroje 1933 nebo 1935). Oficiálně **přijata CGPM jako SI jednotka v roce 1960**, nahradila "cycles per second".',
                inventor: 'Heinrich Hertz (koncept EM vln), IEC (jednotka 1930)',
                purpose: 'Měření frekvence elektromagnetických vln, kmitání',
                modernUse: 'Jednotka frekvence pro rádiové vlny, procesory, zvuk, světlo'
            },

            // === SPOTŘEBA PALIVA ===
            'kmpl': {
                name: 'Kilometr na litr',
                origin: 'Metrické země, 20. století',
                history: 'Vznikl jako přirozená jednotka spotřeby paliva v zemích používajících metrický systém na začátku 20. století s rozvojem automobilismu. Používá se zejména v Japonsku, Indii a asijských zemích.',
                inventor: 'Přirozený vývoj v metrických zemích',
                purpose: 'Měření efektivity spotřeby paliva',
                modernUse: 'Japonsko, Indie, Asie (v Evropě se více používá l/100 km)'
            },

            // === VÝKON ===
            'mW': {
                name: 'Miliwatt',
                origin: 'Skotsko/Anglie, 1882',
                history: 'Tisícina wattu, pojmenovaného po Jamesi Wattovi (1736-1819), který v roce 1776 vylepšil parní stroj. Název "watt" navrhl C. William Siemens v roce 1882. Mezinárodní definice přijata v roce 1908.',
                inventor: 'James Watt (koncept), C. William Siemens (název)',
                purpose: 'Měření výkonu přenášeného elektrickým proudem',
                modernUse: 'Malé elektrické výkony, lasery (5 mW), LED, signály (dBm)'
            },

            // === TLAK ===
            'hPa': {
                name: 'Hektopascal',
                origin: 'Francie, 1909/1986',
                history: 'Pojmenován po Blaise Pascalovi, francouzském matematikovi. Jednotka "bar" zavedena fyzikem Napierem Shawem v roce 1909. Světová meteorologická organizace v roce 1986 nařídila nahradit milibar hektopascalem (1 hPa = 1 mbar).',
                inventor: 'Blaise Pascal (koncept), Napier Shaw (bar), WMO (hPa)',
                purpose: 'Praktické měření atmosférického tlaku',
                modernUse: 'Standardní jednotka v meteorologii (průměr 1013,25 hPa)'
            },

            // === ČAS ===
            'ns': {
                name: 'Nanosekunda',
                origin: 'Mezinárodní (SI), 1949+',
                history: 'Miliardtina sekundy. Praktické využití umožnil vývoj atomových hodin - první v roce 1949 s přesností 2 ms/den, v roce 1975 hodiny NIST-7 dosáhly přesnosti 0,5 ns/den.',
                inventor: 'Vývoj atomových hodin (kolektivní práce)',
                purpose: 'Měření extrémně krátkých časových intervalů',
                modernUse: 'GPS navigace (1 ns = 30 cm), telekomunikace, lasery, elektronika'
            },
            'μs': {
                name: 'Mikrosekunda',
                origin: 'Věda, 20. století',
                history: 'Miliontina sekundy. Používána v elektronice a počítačové vědě. Rychlost světla urazí za 1 μs přibližně 300 metrů. Typický čas přístupu k RAM paměti: ~0,1 μs. Blesk svitu (blesk fotoaparátu): ~1 μs.',
                inventor: 'Vědecká a technická komunita',
                purpose: 'Měření velmi krátkých časových intervalů',
                modernUse: 'Elektronika, fyzika, počítače, fotografie'
            },

            // === MOMENT SÍLY ===
            'Nm': {
                name: 'Newtonmetr',
                origin: 'Anglie, 1884',
                history: 'Jednotka momentu síly (torque). Termín "torque" (z latinského torquēre = "kroutit") navrhl James Thomson a poprvé se objevil v tisku v dubnu 1884. Použil ho Silvanus P. Thompson v publikaci o dynamoelektrických strojích.',
                inventor: 'James Thomson (termín torque, 1884)',
                purpose: 'Měření otáčivého momentu (kroutícího účinku) síly',
                modernUse: 'Dotahovací momenty šroubů, výkon motorů, převodovky'
            },

            // === AWG PRŮŘEZY VODIČŮ ===
            'AWG_0000': {
                name: 'AWG 0000 (4/0)',
                origin: 'USA, 1857',
                history: 'AWG systém standardizován v roce 1857, vychází ze sady průvlaků vyvinutých firmou Brown & Sharpe v roce 1855.',
                inventor: 'Brown & Sharpe Company',
                purpose: 'Standardizace velkých průměrů vodičů',
                modernUse: 'Silnoproudé aplikace, bateriové kabely'
            },

            // Pokračování souboru - přidám všechny chybějící jednotky v dalším kroku
            // Celkem 142 jednotek k doplnění

            // ČÁST 1: ZÁKLADNÍ JEDNOTKY

            // Délka
            'dm': { name: 'Decimetr', origin: 'Francie, 1795', history: 'Desetina metru. Vznikl společně s metrickým systémem během Francouzské revoluce. Francouzská Národní akademie věd (včetně Lavoisiera, Laplacea) vytvořila desetinný systém jednotek založený na přírodních konstantách. Prefix "deci-" (z lat. decimus = desetina) byl standardizován v roce 1795. Decimetr se stal praktickou jednotkou pro každodenní měření v řemeslech a domácnosti.', inventor: 'Francouzská Akademie věd (1795)', purpose: 'Praktické měření', modernUse: 'Kuchyně, kutilství, školství' },
            'sah': { name: 'Sáh', origin: 'Slovanské země, středověk', history: 'Délka rozepjatých paží dospělého muže (od špičky jedné ruky ke špičce druhé). Název pochází z praslovanského "sęgъ" (dosah). **Staročeský sáh** měřil 3 české lokte = **1,779 m**. **Vídeňský sáh** (Wiener Klafter) měřil přesně **1,896484 m** (= 6 vídeňských stop) a byl zaveden císařským patentem Marie Terezie **1. ledna 1765** jako základní délková jednotka rakouské měrné soustavy. Používán pro měření provazů, lan, textilií, hloubky studní a v lesnictví. Anglický ekvivalent "fathom" (6 stop = 1,8288 m) se dodnes používá v námořnictvu pro měření hloubky vody. Zrušen zákonem z 23.7.1871 s účinností od 1.1.1876.', inventor: 'Slovanská lidová měření (vídeňský standardizován 1765)', purpose: 'Měření délek textilií a provazů', modernUse: 'Historická jednotka, námořnictvo (anglický fathom)' },
            'loket': { name: 'Loket', origin: 'Starověk, všechny kultury', history: 'Vzdálenost od lokte po konec prostředníčku nebo špičky prstů. Jedna z nejstarších jednotek - používána již ve starém Egyptě (královský loket = 52,4 cm), Mezopotámii a Bibli. **Český (pražský) loket** měřil přesně **59,3 cm** (0,593 m) a byl standardizován již roku **1268 za Přemysla Otakara II.** pro celé České království. Etalon českého lokte byl osazen na Novoměstské radnici v Praze. V roce **1760 zavedla Marie Terezie vídeňský loket** (77,8 cm) jako součást rakouského systému měr. V roce 1765 byl na Staroměstské radnici osazen etalon vídeňského lokte. Obě jednotky byly zrušeny s nástupem metrického systému (zákon z 23.7.1871, platný od 1.1.1876).', inventor: 'Starověké civilizace (Egypt, Babylon)', purpose: 'Měření látek a textilií', modernUse: 'Historická jednotka' },
            'stopa_ceska': { name: 'Vídeňská stopa', origin: 'Rakousko, 1765', history: 'Délka lidské nohy. **Vídeňská stopa** (německy "Wiener Fuß" nebo "střevíc") měřila přesně **31,6081 cm** (0,316081 m) a byla zavedena v českých zemích císařským patentem Marie Terezie **1. ledna 1765** jako součást rakouské měrné soustavy. Dělila se na 12 palců (palec = 2,634 cm). Používána v architektuře, stavebnictví a zeměměřictví. Vztah k dalším jednotkám: 1 sáh = 6 stop = 1,896 m. Zrušena zákonem z 23. července 1871 s účinností od 1. ledna 1876 přechodem na metrický systém v celém Rakousku-Uhersku.', inventor: 'Rakouská měrná soustava (Marie Terezie, 1765)', purpose: 'Oficiální délková jednotka', modernUse: 'Historická jednotka' },
            'mil': { name: 'Mil', origin: 'USA, 19. století', history: 'Tisícina palce (0,0254 mm). Používaná od doby měření lakových vrstev.', inventor: 'Americký systém (odvozeno z palce)', purpose: 'Měření tenkých vrstev', modernUse: 'Plasty, laky, fólie' },

            // Hmotnost
            'lot': { name: 'Lot', origin: 'Střední Evropa, středověk', history: 'Starověká jednotka odvozená z římské uncie. Český lot (plný název "vídeňský loth") měřil přesně 17,5 g (1/32 libry) a byl standardizován za Marie Terezie roku 1761. Používán primárně pro vážení vzácných kovů (zlato, stříbro), drahokamů, perel a drahého koření. V lékárenství existoval ještě "lékárnický lot" o váze 16,6 g. Název pochází z germánského "hlūt" (kus, část). Zrušen s přechodem na metrický systém 1.1.1876.', inventor: 'Středověké obchodní systémy (standardizováno 1761)', purpose: 'Obchod se vzácnými komoditami', modernUse: 'Historická jednotka' },
            'libra_ceska': { name: 'Česká libra', origin: 'České země, středověk', history: 'Vídeňská libra (německy "Wiener Pfund") vážila 560,06 g (přesně 560,012 g) a dělila se na 32 lotů. Původ sahá až k římské libře (libra pondo = váha v librách, odtud značka lb). Standardizována za Marie Terezie císařským patentem z 13. prosince 1761. Etalony (vzorové závaží) byly umístěny v jednotlivých zemských hlavních městech. Oficiální hmotnostní jednotka v českých zemích až do zákona o zavedení metrického systému (23.7.1871, platnost od 1.1.1876). Symbol £ pro britskou libru i libru jako měnu pochází z latinského slova "libra".', inventor: 'Římská říše / České království (standardizováno 1761)', purpose: 'Obchod a řemesla', modernUse: 'Historická jednotka' },
            'kt': { name: 'Kilotuna', origin: 'Nukleární fyzika, 1945', history: 'Ekvivalent výbušné síly tisíce tun TNT (trinitrotoluenu). Jednotka zavedena během projektu Manhattan (1942-1945) pro porovnání síly jaderných zbraní s konvenčními výbušninami. První atomová bomba Trinity (16. července 1945) měla sílu cca 22 kt TNT. Bomby svržené na Hirošimu (Little Boy, 6.8.1945) a Nagasaki (Fat Man, 9.8.1945) měly sílu přibližně 15 kt a 21 kt. Dnes se používá i v seismologii pro měření energie zemětřesení.', inventor: 'Projekt Manhattan (1942-1945)', purpose: 'Měření síly jaderných explozí', modernUse: 'Vojenství, seismologie' },

            // Objem
            'korec': { name: 'Korec', origin: 'České země, středověk', history: 'Staročeská objemová jednotka pro sypké látky (obilí, zrno, mouku). Vídeňský korec (Wiener Metze) měřil přesně 61,487 litrů, pražský korec byl větší - 93,592 litrů. Název pochází ze slova "koř" (nádoba). Standardizován za Marie Terezie roku 1756. Korec se dělil na 4 čtvrtky (strýchy). Používán pro obchod s obilím na trzích. Až do 19. století byl korec používán i jako plošná míra - označoval plochu, na kterou se vyselo jedno korec zrna (cca 2880 m²). Zrušen zákonem o metrických mírách z roku 1876.', inventor: 'České království (standardizováno 1756)', purpose: 'Obchod s obilím', modernUse: 'Historická jednotka' },
            'zeidlik': { name: 'Žejdlík', origin: 'České země, středověk', history: 'Staročeská pivní míra, také psaná jako "žídlík" či "seidl". Měřila přesně 0,354 litru (1/4 vídeňského pintu). Název přejat z bavorského "Seidel" (džbánek, malá nádoba). Oblíbená míra ve středověkých i renesančních hospodách a pivnicích. Větší míry byly: půllitr (0,707 l) a pintu (1,415 l). Po zavedení metrického systému roku 1876 se pivní míry převedly na půllitr (0,5 l), který se používá dodnes. Žejdlík je dodnes historickým názvem pro malé pivo (dnes cca 0,3 l).', inventor: 'České pivovarnictví / Bavorský vliv', purpose: 'Podávání piva', modernUse: 'Historická jednotka' },

            // ČÁST 2: SI NÁSOBKY A DÍLY

            // Čas - pokračování
            's': { name: 'Sekunda', origin: 'Babylon/1967', history: 'Původně definována jako 1/86400 dne (1/60 × 1/60 × 1/24). Latinské "secunda" znamená "druhé dělení" (po minutě = "první dělení"). **První sekundové ručičky** se objevily na německých hodinách již v **15. století** (cca 1560), ale nebyly běžné kvůli nízké přesnosti tehdejších hodin. Sekundové ručičky se staly běžnými až po vynálezu **kyvadlových hodin (1656-1657)**, které umožnily přesné měření sekund. **Atomová definice** (1967): sekunda je doba trvání **9 192 631 770** period záření cézia-133. Atomové hodiny mají přesnost lepší než 1 sekunda za 100 milionů let.', inventor: 'Babylón (sexagesimální systém), Christiaan Huygens (kyvadlové hodiny 1657), BIPM (atomová definice 1967)', purpose: 'Základní jednotka času', modernUse: 'Všechny časové aplikace' },
            'min': { name: 'Minuta', origin: 'Babylon, 1500 př.Kr.', history: '60 sekund. Latinské "minuta" znamená "zmenšená" (část). Babylónské sexagesimální (šedesátkové) číslování přežilo dodnes v měření času a úhlů. První mechanické hodiny s minutovou ručičkou se objevily v 16. století. Dělení hodiny na 60 minut odpovídá babylónskému dělení kruhu na 360 stupňů (6 × 60). Babylóňané používali šedesátkovou soustavu, protože 60 je dělitelné mnoha čísly (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60).', inventor: 'Babylónští astronomové (cca 1500 př.Kr.)', purpose: 'Dělení hodiny', modernUse: 'Běžné měření času' },
            'h': { name: 'Hodina', origin: 'Egypt, 1500 př.Kr.', history: '60 minut (3600 sekund). Starověcí Egypťané rozdělili denní i noční dobu na 12 částí každou (celkem 24 hodin). Dělení na 12 pravděpodobně odpovídalo 12 lunárním měsícům v roce. První sluneční hodiny se používaly již kolem roku 1500 př.Kr. Mechanické hodiny s hodinovou ručičkou se objevily ve 14. století v Evropě. Název "hodina" pochází ze staroslověnského "godina" (vhodný čas, doba).', inventor: 'Starověký Egypt (cca 1500 př.Kr.)', purpose: 'Dělení dne a noci', modernUse: 'Všechny časové systémy' },
            'day': { name: 'Den', origin: 'Astronomie, pravěk', history: 'Přirozená perioda rotace Země kolem své osy (přibližně 24 hodin, přesně 23h 56m 4s hvězdného času). Solární den (od poledne k poledni) trvá přesně 24 hodin kvůli korekci na oběh Země kolem Slunce. V pravěku byl den nejpřirozenější jednotkou času - střídání světla a tmy. Délka dne se mění s ročními obdobími, proto Egypťané zavedli rovnocenné hodiny. Dnes je definován atomově - den obsahuje 86 400 sekund (високосné sekundy).', inventor: 'Přirozený cyklus (rotace Země)', purpose: 'Organizace času', modernUse: 'Kalendáře, plánování' },
            'week': { name: 'Týden', origin: 'Babylon, cca 600 př.Kr.', history: 'Sedmidenní cyklus. Babylóňané poznali sedm pohyblivých nebeských těles viditelných pouhým okem: Slunce, Měsíc, Mars, Merkur, Jupiter, Venuše, Saturn. Proto byl týden 7 dní - každý den pojmenovali podle jedné "planety". Židé převzali sedmidenní týden do biblické tradice (sedmý den - sabat jako den odpočinku). Římané přejali babylónský systém a pojmenovali dny podle svých božstev (Monday = den Měsíce, Tuesday = den Marta atd.). Konstantin Veliký uzákonil 7denní týden v roce 321 n.l.', inventor: 'Babylóňané (cca 600 př.Kr.)', purpose: 'Organizace měsíce', modernUse: 'Pracovní cyklus, kalendáře' },
            'month_avg': { name: 'Měsíc průměrný', origin: 'Astronomie, starověk', history: 'Původně podle lunárního cyklu - doba mezi dvěma novoluními (synodický měsíc = 29,53 dne). Starověké kalendáře byly lunární (založené na Měsíci). Název "měsíc" přímo odkazuje na Měsíc. Gregoriánský kalendář (1582) standardizoval měsíce na 28-31 dní (průměr 30,44 dne) bez vazby na fáze Měsíce, což umožňuje solární rok 365,25 dne rozdělit na 12 měsíců. Julius Caesar zavedl Juliánský kalendář v roce 46 př.Kr., kde rozložil dny do měsíců téměř stejně jako dnes.', inventor: 'Starověké kalendáře (lunární)', purpose: 'Dlouhodobé plánování', modernUse: 'Kalendáře, finance' },
            'year': { name: 'Rok', origin: 'Astronomie, pravěk', history: 'Tropický rok - doba oběhu Země kolem Slunce (**365,24219 dne** = 365 dní 5h 48m **45s**). Starověké civilizace pozorovaly opakující se roční cykly ročních období. Egypťané používali 365denní rok již kolem 4000 př.Kr. Julius Caesar zavedl přestupné roky (každý 4. rok) v roce 46 př.Kr. Papež Řehoř XIII. reformoval kalendář v roce 1582 - Gregoriánský kalendář vynechává přestupný rok u století nedělitelných 400 (1700, 1800, 1900 ne, 2000 ano). Díky tomu je průměrný gregoriánský rok **365,2425 dne**, což odpovídá tropickému roku s přesností 1 den za 3236 let.', inventor: 'Přirozený cyklus (oběh Země kolem Slunce)', purpose: 'Dlouhodobá organizace času', modernUse: 'Kalendáře, historie' },

            // Úhel
            'arcmin': { name: 'Úhlová minuta', origin: 'Astronomie, starověk', history: 'Jedna šedesátina stupně (1° = 60′). Stejně jako časová minuta, odvozena od babylónského sexagesimálního systému. Babylóňané rozdělili kruh na 360 stupňů (přibližně dní v roce) a každý stupeň na 60 minut. Používána již starověkými astronomy pro přesné měření poloh hvězd a planet. Symbol ′ (čárka) pochází z latinského "pars minuta prima" (první malá část). Úhlová minuta odpovídá vzdálenosti přibližně 1,85 km na rovníku Země. Lidské oko s perfektním zrakem dokáže rozlišit detaily velikosti asi 1 úhlové minuty.', inventor: 'Babylónští astronomové (cca 1500 př.Kr.)', purpose: 'Přesné měření úhlů', modernUse: 'Astronomie, geodézie, optika' },
            'arcsec': { name: 'Úhlová vteřina', origin: 'Astronomie, středověk', history: 'Jedna šedesátina úhlové minuty (1′ = 60″), tedy 1/3600 stupně. Symbol ″ (dvě čárky) pochází z latinského "pars minuta secunda" (druhá malá část). Extrémně malá jednotka - úhlová vteřina odpovídá vzdálenosti jen 31 metrů na rovníku Země. První astronomové, kteří měřili s takovou přesností, byli Tycho Brahe (1546-1601) a Johannes Kepler (1571-1630). Moderní teleskopy dosahují rozlišení pod 0,01 úhlové vteřiny. Hubbleův vesmírný dalekohled má rozlišení přibližně 0,05″.', inventor: 'Středověká astronomie (Tycho Brahe, 16. stol.)', purpose: 'Velmi přesná měření úhlů', modernUse: 'Astronomie, geodézie' },
            'turn': { name: 'Otáčka', origin: 'Matematika, 20. století', history: 'Úhel celého kruhu - 1 otáčka = 360° = 2π radiánů = 400 gonů. Intuitivní jednotka používaná zejména v programování a robotice, kde vyjadřuje počet otáček. Například 0,5 otáčky = 180°, 0,25 otáčky = 90°. V CSS3 se používá jednotka "turn" pro rotace. V některých jazycích známá jako "revolution" nebo "rotation". Výhodou je přímočarost - 1 otáčka motoru = 1 turn, bez nutnosti převodu na stupně či radiány. V průmyslové automatizaci běžně používána pro programování robotických ramen.', inventor: 'Moderní matematika a programování (20. století)', purpose: 'Jednoduché vyjádření rotací', modernUse: 'Programování, robotika, CSS' },

            // ČÁST 3: Plocha
            'cm2': { name: 'Čtvereční centimetr', origin: 'Francie, 1795', history: 'Druhá mocnina centimetru (1 cm × 1 cm = 1 cm²). Odvozená jednotka metrického systému. Praktická pro měření malých ploch - papíru, technických výkresů, kožních lézí v medicíně. V CGS systému (centimetr-gram-sekunda) používaném ve fyzice do poloviny 20. století byl cm² základní plošnou jednotkou. Dnes v SI systému je preferován metr čtvereční (m²), ale cm² zůstává v běžném použití pro svou praktičnost při měření malých objektů.', inventor: 'Francouzský metrický systém (1795)', purpose: 'Měření malých ploch', modernUse: 'Technické výkresy, lékařství, školství' },
            'dm2': { name: 'Čtvereční decimetr', origin: 'Francie, 1795', history: 'Druhá mocnina decimetru (1 dm × 1 dm = 100 cm²). Praktická jednotka pro měření středních ploch v každodenním životě. Odpovídá přibližně ploše dlaně dospělého člověka. Používána například pro výpočet spotřeby barev při malování (laky se často uvádějí v množství potřebném na dm²), v kutilství a řemeslech. Ve školství se používá pro názornou výuku plošného obsahu - děti si mohou snadno představit dm² jako čtverec o straně 10 cm.', inventor: 'Francouzský metrický systém (1795)', purpose: 'Měření středních ploch', modernUse: 'Kutilství, školství, malířství' },
            'km2': { name: 'Čtvereční kilometr', origin: 'Francie, 1795', history: 'Druhá mocnina kilometru (1 km × 1 km = 1 000 000 m² = 100 hektarů). Standardní jednotka pro měření velkých ploch - měst, států, jezer, lesů. Jeden km² odpovídá čtverci o straně 1 km. Pro srovnání: Vatikán má rozlohu 0,44 km², Praha má 496 km², Česká republika 78 871 km². V mezinárodních statistikách a geografii je km² univerzální jednotkou. Menší státy někdy uvádějí rozlohu i v hektarech, ale km² je preferovaná mezinárodní norma.', inventor: 'Francouzský metrický systém (1795)', purpose: 'Měření území', modernUse: 'Geografie, katastr, statistika' },
            'in2': { name: 'Čtvereční palec', origin: 'Anglie, středověk', history: 'Druhá mocnina palce (1 in × 1 in = 6,4516 cm²). Odvozena z lineárního palce standardizovaného králem Eduardem II. (1 palec = 3 ječná zrna). Používána v technických aplikacích v USA a UK - měření průřezu kabelů, plochy tiskové hlavy, velikosti disků (např. 3,5" disketa má plochu ~15 in²), elektronických součástek na desce plošných spojů (PCB). V automobilovém průmyslu se v in² vyjadřuje průřez sacího potrubí motoru.', inventor: 'Anglický systém (středověk)', purpose: 'Měření malých ploch', modernUse: 'USA, UK - technické aplikace, elektronika' },
            'yd2': { name: 'Čtvereční yard', origin: 'Anglie, středověk', history: 'Druhá mocnina yardu (1 yd × 1 yd = 9 čtverečních stop = 0,836 m²). Yard byl původně vzdálenost od špičky nosu krále Jindřicha I. po konec jeho natažené paže. Čtvereční yard se používá především v textilním průmyslu pro měření látek, koberců a tapet. V USA a UK se běžně používá pro prodej kobercování - cena je uváděna za yd². Také se používá v zemědělství pro měření menších ploch pozemků.', inventor: 'Anglický systém (středověk)', purpose: 'Měření středních ploch', modernUse: 'USA, UK - textilie, koberce, tapety' },
            'mi2': { name: 'Čtvereční míle', origin: 'Římská říše/Anglie', history: 'Druhá mocnina míle (1 mi × 1 mi = 640 akrů = 2,59 km²). Římská míle (mille passus = tisíc kroků) byla přibližně 1,48 km. Anglická míle byla standardizována Alžbětou I. v roce 1592 na 5280 stop. Čtvereční míle se používá v USA pro měření rozlohy států, krajů (counties), národních parků a velkých pozemků. Například Texas má rozlohu 268 596 mi². V UK se od roku 1995 postupně přechází na km², ale mi² se stále používá v historických kontextech.', inventor: 'Římský/Anglický systém', purpose: 'Měření velkých území', modernUse: 'USA, UK - katastr, geografie' },

            // ČÁST 4: Data
            'B': { name: 'Byte', origin: 'USA, 1956', history: 'Osmice bitů. Termín vytvořil Werner Buchholz v IBM v roce 1956.', inventor: 'Werner Buchholz (IBM)', purpose: 'Základní jednotka počítačové paměti', modernUse: 'Veškerá informatika' },
            'kB': { name: 'Kilobajt', origin: 'IEC 60027-2, 1960s', history: '1000 bajtů (dekadický systém). Standardizováno IEC pro kapacitu disků.', inventor: 'IEC (International Electrotechnical Commission)', purpose: 'Měření větších dat', modernUse: 'Soubory, paměť' },
            'MB': { name: 'Megabajt', origin: 'IEC standard, 1970s', history: '1 000 000 bajtů. Dekadický standard pro diskové kapacity.', inventor: 'IEC (mezinárodní standard IEC 60027-2)', purpose: 'Měření souborů a médií', modernUse: 'Dokumenty, obrázky' },
            'GB': { name: 'Gigabajt', origin: 'IEC standard, 1980s', history: '1 000 000 000 bajtů. Dekadický standard pro velké disky.', inventor: 'IEC (International Electrotechnical Commission)', purpose: 'Kapacita disků', modernUse: 'Disky, filmy, hry' },
            'TB': { name: 'Terabajt', origin: 'IEC standard, 2000s', history: '1 000 000 000 000 bajtů. Pro moderní velkokapacitní disky.', inventor: 'IEC (mezinárodní elektrotechnická komise)', purpose: 'Velké datové úložiště', modernUse: 'Servery, zálohy, úložiště' },
            'KiB': { name: 'Kibibajt', origin: 'IEC standard, 1998', history: '1024 bajtů (2¹⁰). Binární prefix proti zmatení s kB.', inventor: 'IEC (International Electrotechnical Commission)', purpose: 'Přesné binární jednotky', modernUse: 'Technická dokumentace, RAM' },
            'MiB': { name: 'Mebibajt', origin: 'IEC standard, 1998', history: '1 048 576 bajtů (2²⁰). Skutečná velikost "megabajtu" v pamětech.', inventor: 'IEC', purpose: 'Přesné vyjádření paměti', modernUse: 'RAM, cache, technická spec' },
            'GiB': { name: 'Gibibajt', origin: 'IEC standard, 1998', history: '1 073 741 824 bajtů (2³⁰).', inventor: 'IEC', purpose: 'Skutečná kapacita paměti', modernUse: 'RAM, SSD, technické spec' },
            'TiB': { name: 'Tebibajt', origin: 'IEC standard, 1998', history: '1 099 511 627 776 bajtů (2⁴⁰).', inventor: 'IEC', purpose: 'Velké binární kapacity', modernUse: 'Datová centra, velké disky' },

            // ČÁST 5: Elektrické jednotky - pokračování
            'A': { name: 'Ampér', origin: 'Francie, 1881', history: 'Základní jednotka elektrického proudu. André-Marie Ampère (1775-1836).', inventor: 'André-Marie Ampère', purpose: 'Měření elektrického proudu', modernUse: 'Veškerá elektrotechnika' },
            'kA': { name: 'Kiloampér', origin: 'Odvozeno od Ampér (1881)', history: 'Tisíc ampérů. Pro velmi silné proudy v průmyslových aplikacích.', inventor: 'André-Marie Ampère (základ 1775-1836), SI prefix', purpose: 'Měření velmi silných proudů', modernUse: 'Hliníkárny, výkonová elektronika' },
            'V': { name: 'Volt', origin: 'Itálie, 1881', history: 'Alessandro Volta (1745-1827). Jednotka elektrického napětí.', inventor: 'Alessandro Volta', purpose: 'Měření napětí', modernUse: 'Veškerá elektrotechnika' },
            'kV': { name: 'Kilovolt', origin: 'Odvozeno od Volt (1881)', history: 'Tisíc voltů. Používá se pro vysokonapěťové sítě.', inventor: 'Alessandro Volta (základ 1745-1827), SI prefix', purpose: 'Vysokonapěťové sítě', modernUse: 'Rozvodny, vedení VN, elektrárny' },
            'Ω': { name: 'Ohm', origin: 'Německo, 1881', history: 'Georg Simon Ohm (1789-1854). Ohmův zákon V = I×R (1827).', inventor: 'Georg Simon Ohm', purpose: 'Měření elektrického odporu', modernUse: 'Elektronika, rezistory' },
            'kΩ': { name: 'Kiloohm', origin: 'Odvozeno od Ohm (1827)', history: 'Tisíc ohmů. Násobek jednotky pojmenované po G. S. Ohmovi.', inventor: 'Georg Simon Ohm (Ohmův zákon 1827), prefix zaveden IEC', purpose: 'Střední hodnoty odporů', modernUse: 'Elektronické obvody' },
            'MΩ': { name: 'Megaohm', origin: 'Odvozeno od Ohm (1827)', history: 'Milion ohmů. Používá se pro izolace a vysokoimpedanční měření.', inventor: 'Georg Simon Ohm (základ 1827), mezinárodní SI systém (prefix)', purpose: 'Vysoké odpory', modernUse: 'Izolační odpory, vysokoimpedanční obvody' },
            'mAh': { name: 'Miliampérhodina', origin: 'Odvozeno od Ah, 20. století', history: 'Kapacita baterie. Používá se od doby Li-ion baterií (Sony, 1991).', inventor: 'Odvozeno z Ampérhodiny (Gaston Planté, 1859 - první akumulátor)', purpose: 'Kapacita baterií', modernUse: 'Mobilní telefony, powerbanky' },
            'Ah': { name: 'Ampérhodina', origin: 'Odvozeno od akumulátoru, 1859', history: 'Kapacita baterie. Odvozeno od olověného akumulátoru G. Plantého (1859).', inventor: 'Gaston Planté (první dobíjecí akumulátor 1859)', purpose: 'Kapacita velkých baterií', modernUse: 'Autobaterie, solární systémy' },
            'kAh': { name: 'Kiloampérhodina', origin: 'Průmyslové baterie, 20. století', history: 'Tisíc ampérhodin. Pro velké bateriové systémy elektromobilů.', inventor: 'Odvozeno z Ah (Gaston Planté)', purpose: 'Velmi velké kapacity', modernUse: 'Elektromobily, záložní zdroje' },

            // ČÁST 6: Energie, Síla, Frekvence
            'kj': { name: 'Kilojoule', origin: 'SI systém, 20. století', history: 'Tisíc joulů (1 kJ = 1000 J). Násobek základní jednotky energie pojmenované po Jamesi Prescott Joulovi. Kilojoule se stal standardní jednotkou pro označování energetického obsahu potravin v Evropě, Austrálii a Novém Zélandu (ve direktivě EU 90/496/EHS z roku 1990). 1 kilojoule = 0,239 kilokalorií. Průměrný dospělý člověk potřebuje denně kolem 8 000 - 10 000 kJ (2000-2400 kcal). Jeden gram tuku obsahuje přibližně 37 kJ, sacharidů a bílkovin po 17 kJ.', inventor: 'SI systém (odvozeno z joule)', purpose: 'Energie v potravinách', modernUse: 'Nutriční tabulky, sport, dietetika' },
            'mj': { name: 'Megajoule', origin: 'SI systém, 20. století', history: 'Milion joulů (1 MJ = 1 000 000 J). Používá se pro vyjádření velkého množství energie - výbušniny, průmyslové procesy, paliva. 1 litr benzinu obsahuje přibližně 32 MJ energie. Výbušná síla TNT je 4,184 MJ/kg. Pro srovnání: 1 kilowatthodina (kWh) elektřiny = 3,6 MJ. Megajoule se také používá v energetice pro vyjádření účinnosti sluneční radiace (sluneční ozáření se měří v MJ/m² za den). Průměrný roční příkon sluneční energie v České republice je přibližně 1000 kWh/m² = 3600 MJ/m².', inventor: 'SI systém (odvozeno z joule)', purpose: 'Průmyslová energie', modernUse: 'Výbušniny, energetika, paliva' },
            'wh': { name: 'Watthodina', origin: 'Elektrotechnika, konec 19. stol.', history: 'Watt × hodina. Odvozeno od jednotky James Watt (1736-1819).', inventor: 'James Watt (základ), elektrifikace (kombinace s časem)', purpose: 'Měření malé spotřeby', modernUse: 'Baterie, malé spotřebiče' },
            'erg': { name: 'Erg', origin: 'Fyzika, 1873', history: 'Starší jednotka energie v CGS systému (centimetr-gram-sekunda). Název pochází z řeckého "ergon" (práce). 1 erg = 10⁻⁷ joulu = 1 dyne × centimetr. Zavedena British Association for the Advancement of Science v roce 1873. V CGS systému byl erg základní jednotkou energie a práce, zatímco v SI systému ho nahradil joule (1 J = 10⁷ erg). Používán zejména v astrofyzice a mechanice tekutin. I když je dnes CGS systém považován za zastaralý, erg se stále občas objevuje ve starší vědecké literatuře.', inventor: 'CGS systém (British Association, 1873)', purpose: 'Fyzikální výpočty', modernUse: 'Starší fyzikální literatura, historie vědy' },

            'kN': { name: 'Kilonewton', origin: 'SI systém, 1948', history: 'Tisíc newtonů (1 kN = 1000 N). Praktická jednotka síly pro větší zatížení. Pojmenována po Isaacu Newtonovi. Používá se v konstrukci mostů, budov a zdvihací techniky. Pro představu: 1 kN odpovídá přibližně tíze 100 kg (přesně 101,97 kg). Nosnost lan u horolezců se udává v kN - typické lano vydrží 20-25 kN. Automobilové pásy mají pevnost v tahu kolem 150-200 kN. V letectví se vztlaková síla motorů udává v kilonewtonech - například Boeing 737 má motory s tahem přibližně 110 kN každý.', inventor: 'SI systém (odvozeno z newton)', purpose: 'Stavební a strojní síly', modernUse: 'Stavebnictví, zdvihací technika, horolezectví' },
            'dyn': { name: 'Dyne', origin: 'CGS systém, 1873', history: 'Jednotka síly v CGS systému. Název z řeckého "dynamis" (síla, moc). 1 dyne = 10⁻⁵ newtonu = síla potřebná k urychlení hmotnosti 1 gramu zrychlením 1 cm/s². Zavedena British Association for the Advancement of Science v roce 1873 společně s ergem. V CGS systému byl dyne základní jednotkou síly. Ve fyzice byl CGS systém postupně nahrazen SI systémem v druhé polovině 20. století, ale dyne se stále objevuje v některých starších učebnicích a vědeckých publikacích.', inventor: 'CGS systém (British Association, 1873)', purpose: 'Fyzikální výpočty', modernUse: 'Starší fyzikální literatura' },
            'kgf': { name: 'Kilogram-síla', origin: 'Technický systém, 19. stol.', history: 'Síla působící na hmotnost 1 kg v normálním gravitačním poli Země (9,80665 m/s²). 1 kgf = 9,80665 N ≈ 9,807 N. Používán v technickém systému jednotek (MKS - metr, kilogram-síla, sekunda) před nástupem SI systému. Symbol byl "kp" (kilopond) nebo "kgf". Široce používán v mechanice, strojírenství a konstrukci až do 70. let 20. století. Dnes nahrazen newtonem, ale stále se objevuje ve starších technických normách, katalozích nářadí (momentové klíče) a automobilové dokumentaci z období před rokem 1980.', inventor: 'Technický systém jednotek (19. století)', purpose: 'Technické aplikace', modernUse: 'Starší technické normy, historická data' },

            'kHz': { name: 'Kilohertz', origin: 'Odvozeno od Hertz (1930)', history: 'Tisíc hertzů. Jednotka pojmenovaná po H. Hertzovi (1857-1894).', inventor: 'Heinrich Hertz (elektromagnetické vlny 1887), prefix SI', purpose: 'Rádiové frekvence', modernUse: 'AM rádio, zvukové kmitočty' },
            'MHz': { name: 'Megahertz', origin: 'Odvozeno od Hertz (1930)', history: 'Milion hertzů. Používá se od začátku FM rádia (1930s).', inventor: 'Heinrich Hertz (základ 1887), mezinárodní SI systém', purpose: 'Vyšší frekvence', modernUse: 'FM rádio, procesory, WiFi' },
            'GHz': { name: 'Gigahertz', origin: 'Odvozeno od Hertz (1930)', history: 'Miliarda hertzů. Používá se od éry procesorů Intel Pentium 4 (2000).', inventor: 'Heinrich Hertz (základ 1857-1894), SI prefix', purpose: 'Velmi vysoké frekvence', modernUse: 'Procesory, mikrovlny, 5G' },
            'rpm': { name: 'Otáčky za minutu', origin: 'Strojírenství, 19. stol.', history: 'Revolutions per minute. Standardizováno s příchodem parních strojů (James Watt).', inventor: 'Průmyslová revoluce (J. Watt, 18. stol.)', purpose: 'Rychlost otáčení', modernUse: 'Motory, vrtačky, CD/DVD' },

            // ČÁST 7: Průtok, Paliva, Výkon
            'l_h': { name: 'Litr za hodinu', origin: 'Hydraulika, 20. století', history: 'Malý průtok kapalin. Odvozeno od metrického systému (1795).', inventor: 'Francouzský metrický systém (základ litru)', purpose: 'Pomalý průtok', modernUse: 'Kapání, malá čerpadla' },
            'l_s': { name: 'Litr za sekundu', origin: 'Hydraulika, 20. století', history: 'Rychlý průtok kapalin. Odvozeno od SI jednotek (l, s).', inventor: 'SI systém (odvozená jednotka)', purpose: 'Velký průtok', modernUse: 'Čištění odpadních vod, řeky' },
            'gal_min_us': { name: 'Galon za minutu (US)', origin: 'USA, 19. století', history: 'US galony za minutu. Standard pro vodní čerpadla.', inventor: 'Americký vodohospodářský systém', purpose: 'Průtok vody', modernUse: 'USA - čerpadla, vodovody' },
            'gal_h_us': { name: 'Galon za hodinu (US)', origin: 'USA, 19. století', history: 'US galony za hodinu. Pro měření pomalého průtoku.', inventor: 'Americká hydraulika (odvozeno z US galonu)', purpose: 'Malý průtok', modernUse: 'USA - kapání, injektory' },
            'm3_h': { name: 'Metr krychlový za hodinu', origin: 'SI systém, 20. století', history: 'Velký objemový průtok. SI odvozená jednotka.', inventor: 'Mezinárodní SI systém', purpose: 'Velké průtoky', modernUse: 'Čistírny, velká čerpadla' },
            'm3_s': { name: 'Metr krychlový za sekundu', origin: 'Hydrologie, 20. století', history: 'Extrémně velký průtok. Řeky.', inventor: 'Hydrologie', purpose: 'Průtoky řek', modernUse: 'Říční toky, velké čistírny' },

            'l100': { name: 'Litr na 100 km', origin: 'Evropa, 20. století', history: 'Evropský standard spotřeby paliva. Přijat DIN 70030 (1972).', inventor: 'DIN (německý standard 70030, 1972)', purpose: 'Spotřeba paliva', modernUse: 'Evropa - všechna vozidla' },
            'mpg_us': { name: 'Míle na galon (US)', origin: 'USA, začátek 20. století', history: 'US míle na US galon. Americký standard od éry Modelu T (1908).', inventor: 'Americký automobilový průmysl (Henry Ford)', purpose: 'Efektivita paliva', modernUse: 'USA - všechna vozidla' },
            'mpg_imp': { name: 'Míle na galon (Imperial)', origin: 'UK, začátek 20. století', history: 'UK míle na imperial galon (větší než US). Britský standard.', inventor: 'Britský automobilový průmysl', purpose: 'Efektivita paliva', modernUse: 'UK - vozidla' },

            'W': { name: 'Watt', origin: 'Anglie, 1882', history: 'James Watt (1736-1819). Základní jednotka výkonu.', inventor: 'James Watt', purpose: 'Měření výkonu', modernUse: 'Veškerá energetika' },
            'kW': { name: 'Kilowatt', origin: 'Odvozeno od Watt (1882)', history: 'Tisíc wattů. Násobek jednotky pojmenované po J. Wattovi.', inventor: 'James Watt (základ 1736-1819), SI prefix', purpose: 'Výkon spotřebičů', modernUse: 'Domácnosti, motory' },
            'MW': { name: 'Megawatt', origin: 'Odvozeno od Watt (1882)', history: 'Milion wattů. Používá se od doby velkých elektráren (1900s).', inventor: 'James Watt (základ), mezinárodní SI systém', purpose: 'Velké výkony', modernUse: 'Elektrárny, velké motory' },
            'GW': { name: 'Gigawatt', origin: 'Odvozeno od Watt (1882)', history: 'Miliarda wattů. Pro jaderné a velké vodní elektrárny.', inventor: 'James Watt (základ 1736-1819), SI prefix giga-', purpose: 'Obrovské výkony', modernUse: 'Jaderné elektrárny, velké vodní elektrárny' },
            'HP': { name: 'Koňská síla (mechanická)', origin: 'Anglie, 1782', history: 'James Watt (1782). 550 ft-lb/s = 745,7 W.', inventor: 'James Watt', purpose: 'Srovnání s koňmi', modernUse: 'USA, UK - motory' },
            'HPm': { name: 'Koňská síla (metrická)', origin: 'Evropa, 19. století', history: '75 kgf⋅m/s = 735,5 W. Mírně odlišná od HP.', inventor: 'Evropské technické standardy', purpose: 'Metrická alternativa HP', modernUse: 'Evropa - automobily' },
            'HPus': { name: 'Horsepower (US mechanická)', origin: 'USA, 19. století', history: 'Stejná jako HP (745,7 W). Americký termín.', inventor: 'James Watt', purpose: 'Americký standard', modernUse: 'USA - motory' },

            // ČÁST 8: Tlak, Rychlost, Moment
            'mb': { name: 'Milibar', origin: 'Meteorologie, 1909', history: 'Tisícina baru. Starší meteorologická jednotka. 1 mb = 1 hPa.', inventor: 'Napier Shaw', purpose: 'Atmosférický tlak', modernUse: 'Starší meteorologické mapy' },
            'Pa': { name: 'Pascal', origin: 'Francie, 1971', history: 'Blaise Pascal (1623-1662). SI jednotka tlaku.', inventor: 'Blaise Pascal', purpose: 'Vědecké měření tlaku', modernUse: 'Fyzika, inženýrství' },
            'kPa': { name: 'Kilopascal', origin: 'SI systém, 1971', history: 'Tisíc pascalů. Praktičtější než Pa.', inventor: 'SI systém', purpose: 'Technické aplikace', modernUse: 'Pneumatiky, hydraulika' },
            'mmHg': { name: 'Milimetr rtuti', origin: 'Itálie, 1643', history: 'Torricelli (1643). Rtuťový barometr. 1 mmHg = 1 torr.', inventor: 'Evangelista Torricelli', purpose: 'Atmosférický tlak', modernUse: 'Lékařství - krevní tlak' },
            'inHg': { name: 'Palec rtuti', origin: 'USA, 19. století', history: 'Palce rtuti. Americká meteorologie.', inventor: 'Americká meteorologie', purpose: 'Atmosférický tlak', modernUse: 'USA - meteorologie, letectví' },

            'mach': { name: 'Mach', origin: 'Rakousko, 1929', history: 'Ernst Mach (1838-1916). Poměr k rychlosti zvuku (≈343 m/s při 20°C).', inventor: 'Ernst Mach', purpose: 'Nadzvukové rychlosti', modernUse: 'Letectví, rakety' },

            'kgfm': { name: 'Kilogram-síla metr', origin: 'Technický systém, 19. stol.', history: 'Kilogram-síla × metr. Starší jednotka momentu.', inventor: 'Technický systém', purpose: 'Krouticí moment', modernUse: 'Starší technické normy' },
            'ftlb': { name: 'Stopa-libra', origin: 'USA, UK, 19. století', history: 'Foot-pound. Imperální jednotka momentu.', inventor: 'Imperiální systém', purpose: 'Krouticí moment', modernUse: 'USA, UK - utahování šroubů' },
            'inlb': { name: 'Palec-libra', origin: 'USA, UK, 19. století', history: 'Inch-pound. Malé momenty.', inventor: 'Imperiální systém', purpose: 'Malé momenty', modernUse: 'USA, UK - jemné šrouby' },
            'inoz': { name: 'Palec-unce', origin: 'USA, UK, 19. století', history: 'Inch-ounce. Velmi malé momenty.', inventor: 'Imperiální systém', purpose: 'Velmi malé momenty', modernUse: 'USA, UK - elektronika' },
            'dNm': { name: 'Decinewtonmetr', origin: 'SI systém, 20. století', history: 'Desetina newtonmetru.', inventor: 'SI systém', purpose: 'Malé momenty', modernUse: 'Precizní mechanika' },
            'cNm': { name: 'Centinewtonmetr', origin: 'SI systém, 20. století', history: 'Setina newtonmetru.', inventor: 'SI systém', purpose: 'Velmi malé momenty', modernUse: 'Precizní přístroje' },

            // ČÁST 9: Objem
            'cm3': { name: 'Kubický centimetr', origin: 'Francie, 1795', history: 'Třetí mocnina centimetru. 1 cm³ = 1 ml.', inventor: 'Francouzský metrický systém', purpose: 'Malé objemy', modernUse: 'Motory, medicína' },
            'dm3': { name: 'Kubický decimetr', origin: 'Francie, 1795', history: 'Třetí mocnina decimetru. 1 dm³ = 1 litr.', inventor: 'Francouzský metrický systém', purpose: 'Střední objemy', modernUse: 'Ekvivalent litru' },
            'm3': { name: 'Metr krychlový', origin: 'Francie, 1795', history: 'Třetí mocnina metru. 1000 litrů.', inventor: 'Francouzský metrický systém', purpose: 'Velké objemy', modernUse: 'Stavebnictví, nádrže, plyn' },
            'ft3': { name: 'Kubická stopa', origin: 'Anglie, středověk', history: 'Třetí mocnina stopy. Imperiální systém.', inventor: 'Anglický systém', purpose: 'Objemy v imperiálním systému', modernUse: 'USA, UK - stavebnictví' },
            'yd3': { name: 'Kubický yard', origin: 'Anglie, středověk', history: 'Třetí mocnina yardu. Velké objemy.', inventor: 'Anglický systém', purpose: 'Velké stavební objemy', modernUse: 'USA, UK - beton, zemina' },
            'fl_oz': { name: 'Tekutá unce (US)', origin: 'USA, 19. století', history: '1/128 US galonu = 29,57 ml.', inventor: 'Americký systém', purpose: 'Malé objemy tekutin', modernUse: 'USA - kuchyně, farmacie' },

            // ČÁST 10: Kuchyně
            'fl_oz_us': { name: 'Fluid ounce US', origin: 'USA, 19. století', history: '29,57 ml. US tekutá unce.', inventor: 'Americký kuchyňský systém', purpose: 'Kuchyňské míry', modernUse: 'USA - recepty' },
            'cup_us': { name: 'Šálek US', origin: 'USA, 19. století', history: '236,6 ml. 8 US fluid ounces.', inventor: 'Americký kuchyňský systém', purpose: 'Kuchyňské míry', modernUse: 'USA - pečení, vaření' },
            'pint_us': { name: 'Pinta US', origin: 'USA, 19. století', history: '473,2 ml. 2 US cupy.', inventor: 'Americký systém', purpose: 'Větší kuchyňské míry', modernUse: 'USA - mléko, zmrzlina' },
            'quart_us': { name: 'Kvart US', origin: 'USA, 19. století', history: '946,4 ml. 4 US cupy.', inventor: 'Americký systém', purpose: 'Velké kuchyňské míry', modernUse: 'USA - tekutiny, oleje' },
            'gallon_us': { name: 'Galon US', origin: 'USA, 1707/1824', history: '3,785 l. US galon (menší než imperial).', inventor: 'Americký systém', purpose: 'Velké objemy', modernUse: 'USA - mléko, paliva' },
            'tsp_uk': { name: 'Čajová lžička UK', origin: 'UK, 18. století', history: '5,92 ml. Britská čajová lžička (větší než US).', inventor: 'Britský kuchyňský systém', purpose: 'Malé dávky', modernUse: 'UK - recepty' },
            'tbsp_uk': { name: 'Polévková lžíce UK', origin: 'UK, 18. století', history: '17,76 ml. Britská polévková lžíce.', inventor: 'Britský kuchyňský systém', purpose: 'Střední dávky', modernUse: 'UK - recepty' },
            'fl_oz_uk': { name: 'Fluid ounce UK', origin: 'UK, 1824', history: '28,41 ml. Imperial fluid ounce.', inventor: 'Britský imperiální systém', purpose: 'Kuchyňské míry', modernUse: 'UK - recepty' },
            'cup_uk': { name: 'Šálek UK', origin: 'UK, 19. století', history: '284,1 ml. Imperial cup (10 fl oz).', inventor: 'Britský systém', purpose: 'Kuchyňské míry', modernUse: 'UK - čaj, vaření' },
            'lzice': { name: 'Polévková lžíce', origin: 'České země, tradice', history: 'Česká polévková lžíce cca 15 ml.', inventor: 'Česká kuchyňská tradice', purpose: 'Kuchyňské dávkování', modernUse: 'České recepty' },
            'lzicka': { name: 'Čajová lžička', origin: 'České země, tradice', history: 'Česká čajová lžička cca 5 ml.', inventor: 'Česká kuchyňská tradice', purpose: 'Malé dávky', modernUse: 'České recepty, léky' },
            'salek_cz': { name: 'Šálek český', origin: 'České země, tradice', history: 'Český šálek cca 250 ml.', inventor: 'Česká kuchyňská tradice', purpose: 'Tekutiny v kuchyni', modernUse: 'České recepty' },

            // ČÁST 11: Koncentrace
            'kg_m3': { name: 'Kilogram na metr krychlový', origin: 'SI systém, 20. století', history: 'Hustota. kg/m³. SI jednotka hustoty.', inventor: 'SI systém', purpose: 'Měření hustoty', modernUse: 'Fyzika, materiálové inženýrství' },
            'ppb': { name: 'Parts per billion', origin: 'Analytická chemie, 20. stol.', history: 'Částic na miliardu. Pro extrémně malé koncentrace.', inventor: 'Analytická chemie', purpose: 'Ultra-nízké koncentrace', modernUse: 'Toxikologie, ekologie' },
            'percent_w_w': { name: 'Procenta hmotnost/hmotnost', origin: 'Chemie, 19. století', history: 'Gramy látky na 100 g roztoku.', inventor: 'Analytická chemie', purpose: 'Koncentrace pevných látek', modernUse: 'Chemie, průmysl' },
            'g_100ml': { name: 'Gramy na 100 ml', origin: 'Chemie, 19. století', history: 'Gramy rozpuštěné látky ve 100 ml.', inventor: 'Analytická chemie', purpose: 'Koncentrace roztoků', modernUse: 'Laboratoře, farmacie' },
            'ug_l': { name: 'Mikrogramy na litr', origin: 'Analytická chemie, 20. stol.', history: 'Tisícina mg/L. Pro velmi nízké koncentrace.', inventor: 'Analytická chemie', purpose: 'Stopové koncentrace', modernUse: 'Pitná voda, ekologie' },
            'ug_ml': { name: 'Mikrogramy na mililitr', origin: 'Analytická chemie, 20. stol.', history: 'Tisícina mg/ml. Malé koncentrace.', inventor: 'Analytická chemie', purpose: 'Nízké koncentrace', modernUse: 'Farmacie, laboratoře' },
            'mg_ml': { name: 'Miligramy na mililitr', origin: 'Farmacie, 20. století', history: 'mg/ml. Standardizováno Farmakopejí USA (USP) pro injekce.', inventor: 'USP (United States Pharmacopeia, 1820)', purpose: 'Léčiva, injekce', modernUse: 'Farmacie, medicína' },
            'g_ml': { name: 'Gramy na mililitr', origin: 'Chemie, 20. století', history: 'Vysoké koncentrace. Odvozeno od hustoty vody (1 g/ml při 4°C).', inventor: 'Metrický systém (Antoine Lavoisier, 1795)', purpose: 'Koncentrované roztoky', modernUse: 'Průmyslová chemie' },

            // ČÁST 12: AWG vodiče
            'AWG_000': { name: 'AWG 000 (3/0)', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 10,4 mm.', inventor: 'Brown & Sharpe', purpose: 'Velké vodiče', modernUse: 'Silnoproud' },
            'AWG_00': { name: 'AWG 00 (2/0)', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 9,27 mm.', inventor: 'Brown & Sharpe', purpose: 'Velké vodiče', modernUse: 'Silnoproud' },
            'AWG_0': { name: 'AWG 0 (1/0)', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 8,25 mm.', inventor: 'Brown & Sharpe', purpose: 'Velké vodiče', modernUse: 'Silnoproud' },
            'AWG_1': { name: 'AWG 1', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 7,35 mm.', inventor: 'Brown & Sharpe', purpose: 'Velké vodiče', modernUse: 'Silnoproud' },
            'AWG_2': { name: 'AWG 2', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 6,54 mm.', inventor: 'Brown & Sharpe', purpose: 'Velké vodiče', modernUse: 'Silnoproud' },
            'AWG_4': { name: 'AWG 4', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 5,19 mm.', inventor: 'Brown & Sharpe', purpose: 'Střední vodiče', modernUse: 'Rozvody' },
            'AWG_6': { name: 'AWG 6', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 4,11 mm.', inventor: 'Brown & Sharpe', purpose: 'Střední vodiče', modernUse: 'Rozvody' },
            'AWG_8': { name: 'AWG 8', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 3,26 mm.', inventor: 'Brown & Sharpe', purpose: 'Střední vodiče', modernUse: 'Rozvody' },
            'AWG_10': { name: 'AWG 10', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 2,59 mm.', inventor: 'Brown & Sharpe', purpose: 'Běžné vodiče', modernUse: 'Instalace' },
            'AWG_12': { name: 'AWG 12', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 2,05 mm.', inventor: 'Brown & Sharpe', purpose: 'Běžné vodiče', modernUse: 'Domácí instalace' },
            'AWG_14': { name: 'AWG 14', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 1,63 mm.', inventor: 'Brown & Sharpe', purpose: 'Běžné vodiče', modernUse: 'Domácí instalace' },
            'AWG_16': { name: 'AWG 16', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 1,29 mm.', inventor: 'Brown & Sharpe', purpose: 'Tenké vodiče', modernUse: 'Nízkonapěťové obvody' },
            'AWG_18': { name: 'AWG 18', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 1,02 mm.', inventor: 'Brown & Sharpe', purpose: 'Tenké vodiče', modernUse: 'Elektronika' },
            'AWG_20': { name: 'AWG 20', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 0,812 mm.', inventor: 'Brown & Sharpe', purpose: 'Tenké vodiče', modernUse: 'Elektronika' },
            'AWG_22': { name: 'AWG 22', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 0,644 mm.', inventor: 'Brown & Sharpe', purpose: 'Velmi tenké vodiče', modernUse: 'Signálové kabely' },
            'AWG_24': { name: 'AWG 24', origin: 'USA, 1857', history: 'Brown & Sharpe 1857. Průměr 0,511 mm.', inventor: 'Brown & Sharpe', purpose: 'Velmi tenké vodiče', modernUse: 'Datové kabely, telefony' },

            'mm2_0_5': { name: '0.5 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 0,5 mm².', inventor: 'Evropské normy', purpose: 'Malé průřezy', modernUse: 'Slaboproud, signály' },
            'mm2_0_75': { name: '0.75 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 0,75 mm²', inventor: 'Evropské normy', purpose: 'Malé průřezy', modernUse: 'Osvětlení, slaboproud' },
            'mm2_1': { name: '1 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 1 mm².', inventor: 'Evropské normy', purpose: 'Běžné průřezy', modernUse: 'Osvětlení' },
            'mm2_1_5': { name: '1.5 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 1,5 mm². Běžné osvětlení.', inventor: 'Evropské normy', purpose: 'Běžné rozvody', modernUse: 'Osvětlovací obvody' },
            'mm2_2_5': { name: '2.5 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 2,5 mm². Zásuvky.', inventor: 'Evropské normy', purpose: 'Zásuvkové obvody', modernUse: 'Domácí zásuvky' },
            'mm2_4': { name: '4 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 4 mm². Silnější zátěž.', inventor: 'Evropské normy', purpose: 'Silnější obvody', modernUse: 'Sporáky, bojlery' },
            'mm2_6': { name: '6 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 6 mm². Velké spotřebiče.', inventor: 'Evropské normy', purpose: 'Velké spotřebiče', modernUse: 'Sporáky, koupelnové rozvody' },
            'mm2_10': { name: '10 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 10 mm². Hlavní rozvody.', inventor: 'Evropské normy', purpose: 'Hlavní přívody', modernUse: 'Hlavní rozvody bytů' },
            'mm2_16': { name: '16 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 16 mm². Silné rozvody.', inventor: 'Evropské normy', purpose: 'Silné rozvody', modernUse: 'Hlavní přívody domů' },
            'mm2_25': { name: '25 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 25 mm². Velmi silné rozvody.', inventor: 'Evropské normy', purpose: 'Velmi silné rozvody', modernUse: 'Průmysl, hlavní rozvody' },
            'mm2_35': { name: '35 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 35 mm². Průmyslové rozvody.', inventor: 'Evropské normy', purpose: 'Průmyslové rozvody', modernUse: 'Průmysl, velké objekty' },
            'mm2_50': { name: '50 mm²', origin: 'Evropa, metrický standard', history: 'Metrický průřez 50 mm². Velmi silné průmyslové rozvody.', inventor: 'Evropské normy', purpose: 'Silnoproudé rozvody', modernUse: 'Průmysl, velké spotřebiče' },

            // ČÁST 13: MĚNY (CURRENCY)
            'CZK': {
                name: 'Česká koruna',
                origin: 'Československo/Česko, 1919/1993',
                history: 'První československá koruna zavedena 10. dubna 1919 jako nástupce rakousko-uherské koruny. Po rozpadu Československa vznikla 8. února 1993 samostatná česká koruna. Platební prostředek ČR. Dělí se na 100 haléřů (10h a 20h vyřazeny 2003, 50h vyřazeny 2008).',
                inventor: 'Alois Rašín (ministr financí, 1919)',
                purpose: 'Národní měna Československa, později České republiky',
                modernUse: 'Oficiální měna ČR, haléře z oběhu od 2008'
            },
            'EUR': {
                name: 'Euro',
                origin: 'Evropská unie, 1999/2002',
                history: 'Společná měna EU, zavedena jako bezhotovostní 1. ledna 1999, jako hotovost 1. ledna 2002. Symbol € pochází z řeckého písmene epsilon (Ε) odkazujícího na kolébku evropské civilizace. Nahradila národní měny 20 zemí eurozóny. Řídí Evropská centrální banka ve Frankfurtu.',
                inventor: 'Evropská unie, Maastrichtská smlouva (1992)',
                purpose: 'Společná měna EU pro ekonomickou integraci',
                modernUse: '20 zemí EU, druhá nejpoužívanější měna světa'
            },
            'USD': {
                name: 'Americký dolar',
                origin: 'USA, 1792',
                history: 'Coinage Act (1792) zavedl dolar jako oficiální měnu USA. Symbol $ pochází ze španělského peso. Název "dolar" z německého "tolar" (stříbrná mince z Jáchymova). Od 1944 (Bretton Woods) světová rezervní měna. 1971 opuštění zlatého standardu (Nixon Shock). Dělí se na 100 centů.',
                inventor: 'Kongres USA, Alexander Hamilton (ministr financí)',
                purpose: 'Národní měna USA',
                modernUse: 'Světová rezervní měna, obchod s ropou a zlatem'
            },
            'GBP': {
                name: 'Britská libra',
                origin: 'Anglie, cca 775 n.l.',
                history: 'Nejstarší měna světa v aktivním používání. Původně libra stříbra (240 stříbrných penníků). Symbol £ z latinského "libra". 1971 decimalizace (1 libra = 100 pencí místo 240). Bretton Woods 1944-1971. Dříve zlatý standard (1816-1931). ISO kód GBP = Great Britain Pound.',
                inventor: 'Anglosaské království (král Offa z Mercie)',
                purpose: 'Národní měna Anglie, později UK',
                modernUse: 'Oficiální měna UK a závislých území, 4. nejobchodovanější měna'
            },
            'JPY': {
                name: 'Japonský jen',
                origin: 'Japonsko, 1871',
                history: 'Meiji vláda zavedla jen (円 = kruh) Zákonem o nové měně (1871) namísto feudálního systému. Inspirován zlatým standardem USA a desítkovým systémem. Původně 1 jen = 1,5 g čistého zlata. Po 2. světové válce pevný kurz 360 JPY/USD (1949-1971), poté plovoucí. Bez drobných mincí (nejmenší 1 jen).',
                inventor: 'Meiji vláda, Ōkuma Shigenobu (ministr financí)',
                purpose: 'Modernizace japonské ekonomiky, nahrazení feudálního systému',
                modernUse: 'Oficiální měna Japonska, 3. nejobchodovanější měna světa'
            },
            'CHF': {
                name: 'Švýcarský frank',
                origin: 'Švýcarsko, 1850',
                history: 'Federální měnový zákon (1850) sjednotil 25 různých měn švýcarských kantonů. Název "frank" z latiny "Francorum Rex" (král Franků). Přímá paramenost se zlatem do 1999. Považován za bezpečnou investici ("safe haven"). Symbol CHF = Confoederatio Helvetica Franc. 1 frank = 100 rappů (centimů).',
                inventor: 'Švýcarská konfederace (federální parlament)',
                purpose: 'Sjednocení měnového systému švýcarských kantonů',
                modernUse: 'Oficiální měna Švýcarska a Lichtenštejnska, bezpečná investice'
            },
            'CAD': {
                name: 'Kanadský dolar',
                origin: 'Kanada, 1858',
                history: 'Přijat kanadským parlamentem v roce 1858 jako desítková měna (100 centů). Nahradil kanadský libru. 1871 zaveden Uniform Currency Act (jednotná měna). 1933 založena Bank of Canada. Symbol $ sdílený s USD, často C$ pro rozlišení. 1970 plovoucí kurz. Přezdívka "loonie" podle ptáka na minci 1 CAD.',
                inventor: 'Kanadský parlament, Province of Canada Act (1858)',
                purpose: 'Desítková měna pro zjednodušení obchodu',
                modernUse: 'Oficiální měna Kanady, 6. nejobchodovanější měna, komoditní měna'
            },
            'AUD': {
                name: 'Australský dolar',
                origin: 'Austrálie, 1966',
                history: 'Zavedena 14. února 1966, nahradila australskou libru v poměru 2:1 (1 libra = 2 dolary). Původní návrh nazývat měnu "royal" zamítnut referendem. Přechod na desítkový systém (100 centů). 1983 plovoucí kurz. Polymer bankovky (první na světě, 1988). Přezdívka "Aussie".',
                inventor: 'Australská vláda, Reserve Bank of Australia',
                purpose: 'Modernizace měny, desítkový systém místo libry',
                modernUse: 'Oficiální měna Austrálie, Kiribati, Nauru, Tuvalu; 5. nejobchodovanější měna'
            },
            'NOK': {
                name: 'Norská koruna',
                origin: 'Norsko, 1875',
                history: 'Zavedena zákonem z 17. dubna 1875 jako součást Skandinavské měnové unie (1873-1914) se Švédskem a Dánskem. Nahradila norský speciedaler (4 korony = 1 speciedaler). Původně zlatý standard. Symbol kr. 1 koruna = 100 øre. Norsko není v EU, používá NOK místo EUR.',
                inventor: 'Norský parlament (Storting), Skandinavská měnová unie',
                purpose: 'Sjednocení měn severských zemí, zlatý standard',
                modernUse: 'Oficiální měna Norska, silná díky ropě a plynu'
            },
            'SEK': {
                name: 'Švédská koruna',
                origin: 'Švédsko, 1873',
                history: 'Založena Riksdagským rozhodnutím 30. května 1873 při vstupu do Skandinavské měnové unie. Nahradila riksdaler riksmynt (1 riksdaler = 4 koruny). Symbol kr. 1 koruna = 100 öre. Švédsko v EU od 1995, ale odmítlo euro v referendu 2003. Zlatý standard do 1931.',
                inventor: 'Švédský parlament (Riksdag), Skandinavská měnová unie',
                purpose: 'Sjednocení severských měn, modernizace',
                modernUse: 'Oficiální měna Švédska, i přes členství v EU'
            },
            'DKK': {
                name: 'Dánská koruna',
                origin: 'Dánsko, 1875',
                history: 'Zavedena 1. ledna 1875 jako třetí člen Skandinavské měnové unie. Nahradila dánský rigsdaler. Symbol kr. 1 koruna = 100 øre. Po rozpadu unie 1914 pokračovala jako samostatná měna. Dánsko v EU, ale euro nepřijalo (opt-out klauzule, referendum 2000). ERM II mechanismus (pevný kurz k EUR).',
                inventor: 'Dánský parlament, Skandinavská měnová unie',
                purpose: 'Společná měna severských zemí',
                modernUse: 'Oficiální měna Dánska, Grónska, Faerských ostrovů'
            },
            'PLN': {
                name: 'Polský zlotý',
                origin: 'Polsko, 1924/1995',
                history: 'Název z "złoto" (zlato). První zlotý 1924. Denominace 1995: nový zlotý (10000 starých = 1 nový). Symbol zł. 1 złoty = 100 groszy. Polsko v EU od 2004, euro dosud nepřijalo. Významná historie hyperinflace (1989-1990) vyřešená Balcerowiczovým plánem.',
                inventor: 'Władysław Grabski (ministr financí, 1924)',
                purpose: 'Stabilizace polské ekonomiky po hyperinflaci 20. let',
                modernUse: 'Oficiální měna Polska, stabilní měna střední Evropy'
            },
            'HUF': {
                name: 'Maďarský forint',
                origin: 'Maďarsko, 1946',
                history: 'Zavedena 1. srpna 1946 po nejhorší hyperinflaci v historii (pengő). Název ze středověké florentské zlaté mince "fiorino d\'oro". Symbol Ft. Nejmenší jednotka 1 forint (bez drobných). Maďarsko v EU od 2004, euro dosud nepřijato. Rekordní hyperinflace pengő: 41,9 kvadrilionů % měsíčně (1946).',
                inventor: 'Maďarská vláda po 2. světové válce',
                purpose: 'Ukončení hyperinflace pengő',
                modernUse: 'Oficiální měna Maďarska'
            },
            'RUB': {
                name: 'Ruský rubl',
                origin: 'Rusko, cca 1300/1998',
                history: 'Jedna z nejstarších měn (13. století). Název z "rub" (sekat), původně kusek stříbra. Sovětský rubl 1922-1991. Denominace 1998: nový rubl (1000 starých = 1 nový). Symbol ₽ (officiálně od 2014). 1 rubl = 100 kopejek. Silně ovlivněna cenami ropy a mezinárodními sankcemi.',
                inventor: 'Ruská říše (středověk), denominace 1998: vláda Jelcina',
                purpose: 'Národní měna Ruska',
                modernUse: 'Oficiální měna Ruska, Abcházie, Jižní Osetie'
            },
            'CNY': {
                name: 'Čínský juan (renminbi)',
                origin: 'Čína, 1949',
                history: 'Lidová banka Číny (1948) zavedla renminbi (人民币 = lidové peníze). Yuan (元) je jednotka. Symbol ¥ (sdílený s JPY), nebo CN¥. 1 yuan = 10 jiao = 100 fen. ISO kód CNY (Chinese Yuan). Dlouho pevný kurz k USD, od 2005 řízený plovoucí. Druhá největší ekonomika světa.',
                inventor: 'Lidová banka Číny (1948)',
                purpose: 'Měna komunistické Číny po revoluci 1949',
                modernUse: 'Oficiální měna ČLR, roste jako rezervní měna'
            },
            'TRY': {
                name: 'Turecká lira',
                origin: 'Osmanská říše/Turecko, 1844/2005',
                history: 'Původní lira zavedena 1844 v Osmanské říši. Název z italské liry. Denominace 2005: nová turecká lira (1 milion starých = 1 nová), "nová" vypuštěna 2009. Symbol ₺. 1 lira = 100 kuruş. Vysoká inflace 1970-2001 (100% ročně), stabilizace 2000s, opět problémy 2018-2023.',
                inventor: 'Osmanská říše (sultán Abdülmecid I, 1844)',
                purpose: 'Modernizace osmanské ekonomiky',
                modernUse: 'Oficiální měna Turecka a Severního Kypru'
            },
            'ILS': {
                name: 'Izraelský šekel',
                origin: 'Izrael, 1980/1985',
                history: 'Šekel (שקל) je biblická měrná jednotka. Starý šekel 1980, nový šekel (ILS) 1985 po hyperinflaci (1000 starých = 1 nový). Symbol ₪ kombinuje hebrejská písmena ש (shin) a ח (het). 1 šekel = 100 agorot. Úspěšná stabilizace: inflace z 445% (1984) na 1% (1986).',
                inventor: 'Banka Izraele (1980/1985)',
                purpose: 'Nahrazení liry, ukončení hyperinflace (denominace 1985)',
                modernUse: 'Oficiální měna Izraele a Palestiny'
            },
            'KRW': {
                name: 'Jihokorejský won',
                origin: 'Jižní Korea, 1945/1962',
                history: 'Won (원/圓 = kulatý) z čínského yuan. První won 1945 po japonské okupaci. Hyperinflace korejské války → denominace 1953 (100:1). Druhá denominace 1962 (10:1) = současný won. Symbol ₩. Bez drobných (1 won nejmenší). Silná ekonomika (Samsung, Hyundai), "asijský tygr".',
                inventor: 'Banka Koreje (1950)',
                purpose: 'Národní měna po osvobození od Japonska',
                modernUse: 'Oficiální měna Jižní Koreje, silná ekonomika'
            },
            'SGD': {
                name: 'Singapurský dolar',
                origin: 'Singapur, 1967',
                history: 'Zavedena 7. června 1967, nahradila malajský a britský bornejský dolar. Symbol S$. 1 dolar = 100 centů. Vzájemná směnitelnost s brunejským dolarem 1:1 (od 1967). Řídí Monetary Authority of Singapore (MAS). Jedna z nejstabilnějších měn Asie. Polymer bankovky.',
                inventor: 'Board of Commissioners of Currency Singapore (1967)',
                purpose: 'Vlastní měna po odtržení od Malajsie (1965)',
                modernUse: 'Oficiální měna Singapuru, finanční centrum Asie'
            },
            'HKD': {
                name: 'Hongkongský dolar',
                origin: 'Hongkong, 1863',
                history: 'Zavedena 1863 pod britskou správou, nahradila různé zahraniční měny. Symbol HK$. Pevný kurz k USD (7,75-7,85 HKD/USD od 1983). Unikátní systém: 3 komerční banky emitují vlastní bankovky (HSBC, Standard Chartered, Bank of China). Po předání Číně (1997) status zachován ("jeden stát, dva systémy").',
                inventor: 'Britská koloniální správa Hongkongu',
                purpose: 'Standardizace měny pro britský obchod v Asii',
                modernUse: 'Oficiální měna Hongkongu, finanční centrum'
            },
            'NZD': {
                name: 'Novozélandský dolar',
                origin: 'Nový Zéland, 1967',
                history: 'Zavedena 10. července 1967, nahradila novozélandskou libru (1 libra = 2 dolary). Symbol NZ$ nebo $. 1 dolar = 100 centů. 1985 plovoucí kurz. 1999 polymer bankovky. Přezdívka "kiwi" podle ptáka na minci 1 NZD. Komoditní měna (zemědělství, mléčné výrobky).',
                inventor: 'Reserve Bank of New Zealand',
                purpose: 'Desítkový systém místo libry',
                modernUse: 'Oficiální měna Nového Zélandu, Cookových ostrovů, Niue, Tokelau, Pitcairnu'
            },
            'MXN': {
                name: 'Mexické peso',
                origin: 'Mexiko, 1863/1993',
                history: 'Původní peso 1863, název ze španělského "peso de ocho reales" (8 reálů). Symbol $ (původ symbolu dolaru!). Denominace 1993: nové peso (1000 starých = 1 nové), "nové" vypuštěno 1996. 1 peso = 100 centavos. Velká devalvace 1994 (Tequila krize). Třetí nejobchodovanější měna Ameriky.',
                inventor: 'Mexická republika (1863)',
                purpose: 'Národní měna po kolonializmu',
                modernUse: 'Oficiální měna Mexika, 15. nejobchodovanější měna světa'
            },
            'ZAR': {
                name: 'Jihoafrický rand',
                origin: 'Jižní Afrika, 1961',
                history: 'Zavedena 14. února 1961, nahradila jihoafrickou libru (1 libra = 2 randy). Název z "Witwatersrand" (řetězec kopců s největšími zásobami zlata). Symbol R. 1 rand = 100 centů. Ovlivněna cenami zlata a platiny (velký producent). Silné výkyvy kvůli politice a komoditním cenám.',
                inventor: 'Jihoafrická centrální banka',
                purpose: 'Desítková měna po vzniku republiky (opuštění Commonwealthu)',
                modernUse: 'Oficiální měna JAR a společné měnové oblasti (Lesotho, Svazijsko, Namibie)'
            },
            'BRL': {
                name: 'Brazilský real',
                origin: 'Brazílie, 1994',
                history: 'Zavedena 1. července 1994 v rámci Plano Real (plán proti hyperinflaci). Název z portugalského "real" (královský), historická měna portugalské říše. Symbol R$. 1 real = 100 centavos. Nahradila cruzeiro real po sérii hyperinflací. Úspěšná stabilizace: inflace z 2477% (1993) na 9% (1995). Největší ekonomika Latinské Ameriky.',
                inventor: 'Fernando Henrique Cardoso (ministr financí, později prezident)',
                purpose: 'Ukončení chronické hyperinflace',
                modernUse: 'Oficiální měna Brazílie, 19. nejobchodovanější měna'
            },
            'INR': {
                name: 'Indická rupie',
                origin: 'Indie, cca 1540/1947',
                history: 'Název z sanskrtu "rūpya" (stříbro). Sher Shah Suri zavedl stříbrnou rupii 1540. Moderní rupie od nezávislosti 1947. Symbol ₹ (oficiálně od 2010). 1 rupie = 100 paise. Indická ekonomika třetí největší (PPP). Desetinná soustava 1957. Velký černý trh a vysoké denominace (500, 2000 ₹ zrušeny 2016).',
                inventor: 'Sher Shah Suri (1540), moderna: Reserve Bank of India (1935)',
                purpose: 'Standardizace měny v Indii',
                modernUse: 'Oficiální měna Indie, rychle rostoucí ekonomika'
            },
            'THB': {
                name: 'Thajský baht',
                origin: 'Thajsko, 1897',
                history: 'Zavedena králem Chulalongkornem (Rama V) v roce 1897. Název "baht" (บาท) je tradiční jednotka váhy (15 g). Symbol ฿. 1 baht = 100 satang. Pevný kurz k USD (25 baht) do asijské krize 1997 → plovoucí, devalvace 50%. Centrální banka of Thailand založena 1942.',
                inventor: 'Král Chulalongkorn (Rama V)',
                purpose: 'Modernizace měnového systému Siamu',
                modernUse: 'Oficiální měna Thajska'
            },
            'MYR': {
                name: 'Malajsijský ringgit',
                origin: 'Malajsie, 1967',
                history: 'Zavedena 12. června 1967 (před tím malajský a britský bornejský dolar). Název "ringgit" znamená "zubaté okraje" (mincí). Symbol RM. 1 ringgit = 100 sen. Pevný kurz k USD 1998-2005 (3,80 RM/USD) po asijské krizi, pak plovoucí. Polymer bankovky od 2012.',
                inventor: 'Bank Negara Malaysia (centrální banka)',
                purpose: 'Vlastní měna federace Malajsie',
                modernUse: 'Oficiální měna Malajsie'
            },
            'PHP': {
                name: 'Filipínské peso',
                origin: 'Filipíny, 1852',
                history: 'Původně španělské peso (kolonie 1521-1898). Americká okupace 1898 → filipínský peso pod USA. Nezávislost 1946 → vlastní emisní banka. Symbol ₱. 1 peso = 100 centavos. Velká inflace po 2. světové válce. Denominace 1967 (2 staré = 1 nové). Název z "peso de ocho" (8 reálů).',
                inventor: 'Bangko Sentral ng Pilipinas (centrální banka, 1993)',
                purpose: 'Národní měna po kolonialismu',
                modernUse: 'Oficiální měna Filipín'
            },
            'IDR': {
                name: 'Indonéská rupie',
                origin: 'Indonésie, 1946',
                history: 'Zavedena během indonéské národní revoluce proti Nizozemsku. Název z indické rupie. Symbol Rp. Nominálně 1 rupie = 100 sen (ale prakticky nepoužíváno). Velmi vysoké denominace kvůli inflaci (největší bankovka 100000 Rp). Asijská krize 1998: ztráta 80% hodnoty. ISO kód IDR = Indonesian Rupiah.',
                inventor: 'Vláda Indonéské republiky (1946)',
                purpose: 'Měna nezávislé Indonésie',
                modernUse: 'Oficiální měna Indonésie, velké denominace'
            },
            'RON': {
                name: 'Rumunský leu',
                origin: 'Rumunsko, 1867/2005',
                history: 'Zavedena 1867, název z nizozemského "leeuw" (lev), zobrazený na mincích. Symbol lei (plural). 1 leu = 100 bani. Denominace 2005: nový leu (10000 starých = 1 nový). Rumunsko v EU od 2007, plánuje přijetí eura. Vysoká inflace 1990s vyřešena denominací. Stabilní měna od vstupu do EU.',
                inventor: 'Alexandru Ioan Cuza (rumunský kníže, 1867)',
                purpose: 'Moderní měna sjednoceného Rumunska',
                modernUse: 'Oficiální měna Rumunska, kandidát na euro'
            },
            'BGN': {
                name: 'Bulharský lev',
                origin: 'Bulharsko, 1881/1999',
                history: 'První lev 1881 po osvobození od Osmanů. Název "lev" (лев) = lev. 1 lev = 100 stotinek. Denominace 1999: nový lev (1000 starých = 1 nový) po hyperinflaci 1990s. Pevný kurz k EUR (1,95583 BGN/EUR) v přípravě na euro. Bulharsko v EU od 2007. Symbol лв.',
                inventor: 'Bulharská národní banka (1879)',
                purpose: 'Měna nezávislého Bulharska',
                modernUse: 'Oficiální měna Bulharska, pevný kurz k EUR'
            },
            'HRK': {
                name: 'Chorvatská kuna',
                origin: 'Chorvatsko, 1994',
                history: 'Zavedena 30. května 1994, nahradila chorvatský dinár po hyperinflaci. Název "kuna" (= kuna lesní) ze středověku, kdy se kunami platilo. Symbol kn. 1 kuna = 100 lipa (lípa). Nahrazena eurem 1. ledna 2023 (kurz 7,53450 HRK/EUR). Jedna z posledních nových měn před přechodem na euro.',
                inventor: 'Chorvatská národní banka',
                purpose: 'Stabilní měna po válce a rozpadu Jugoslávie',
                modernUse: 'Nahrazena eurem 2023, již neplatná'
            },
            'ISK': {
                name: 'Islandská koruna',
                origin: 'Island, 1918/1981',
                history: 'První koruna 1918 po osamostatnění od Dánska. Druhá koruna 1981 (100 starých = 1 nová). Symbol kr. Nominálně 1 koruna = 100 aurar (prakticky nepoužívány). Finanční krize 2008: kolaps bank, devalvace 50%, kapitálové kontroly do 2017. Nejmenší měna s plovoucím kurzem (populace 380000). Vysoká inflace historicky.',
                inventor: 'Islandská centrální banka (Seðlabanki Íslands, 1961)',
                purpose: 'Měna nezávislého Islandu',
                modernUse: 'Oficiální měna Islandu, volatilní'
            }
        };
    }

    initializeAliases() {
        return {
            // resistance
            'ohm': 'Ω', 'kohm': 'kΩ', 'mohm': 'MΩ',
            // micro-variants
            'um': 'μm', 'us': 'μs', 'ug': 'μg', 'ul': 'μl',
            // data (case-insensitive fallbacks)
            'kb': 'kB', 'mb': 'MB', 'gb': 'GB', 'tb': 'TB',
            // additional common aliases
            'micro': 'μ', 'omega': 'Ω'
        };
    }
    
    normalizeUnitKey(u) {
        if (!u) return u;
        const key = u.trim().toLowerCase();
        return this.unitAliases[key] || u;
    }
    
    init() {
        this.initTheme();
        this.bindEvents();
        
        // Priorita: URL params > localStorage > default
        const params = this.hydrateFromUrl();
        const savedState = this.loadState();
        
        // Určit kategorii
        let targetCategory = 'length';
        if (params.cat && this.conversions[params.cat]) {
            targetCategory = params.cat;
        } else if (savedState && savedState.category && this.conversions[savedState.category]) {
            targetCategory = savedState.category;
        }
        
        this.currentCategory = targetCategory;
        this.updateCategory(targetCategory);
        
        // Určit jednotky a hodnotu
        let fromUnit = null, toUnit = null, inputValue = '';
        
        if (params && (params.from || params.to || params.v !== null)) {
            // URL má přednost
            fromUnit = this.normalizeUnitKey(params.from);
            toUnit = this.normalizeUnitKey(params.to);
            inputValue = params.v || '';
        } else if (savedState) {
            // Použít uložený stav
            fromUnit = this.normalizeUnitKey(savedState.fromUnit);
            toUnit = this.normalizeUnitKey(savedState.toUnit);
            inputValue = savedState.lastValue || '';
        }
        
        // Aplikovat hodnoty
        const fs = document.getElementById('from-unit');
        const ts = document.getElementById('to-unit');
        const inputEl = document.getElementById('input-value');
        
        if (fromUnit && this.conversions[this.currentCategory].units[fromUnit]) {
            fs.value = fromUnit;
        }
        if (toUnit && this.conversions[this.currentCategory].units[toUnit]) {
            ts.value = toUnit;
        }
        if (inputValue) {
            inputEl.value = inputValue;
        }
        
        // Provést převod pokud máme data
        if (fromUnit || toUnit || inputValue) {
            this.convert();
        }
        
        // Označit jako inicializováno pro analytics
        this.isInitialized = true;
    }
    
    bindEvents() {
        // Kategorie
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateCategory(e.currentTarget.dataset.category);
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
        
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Copy to clipboard
        const copyBtn = document.getElementById('copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyResult();
            });
        }

        // Tlačítko kalkulačky
        const calcAddBtn = document.getElementById('calc-add-btn');
        if (calcAddBtn) {
            calcAddBtn.addEventListener('click', () => {
                this.addToCalculator();
            });
        }

        // Historie jednotek tlačítka
        const fromUnitHistory = document.getElementById('from-unit-history');
        if (fromUnitHistory) {
            fromUnitHistory.addEventListener('click', () => {
                const fromUnit = document.getElementById('from-unit').value;
                this.showUnitHistory(fromUnit);
            });
        }

        const toUnitHistory = document.getElementById('to-unit-history');
        if (toUnitHistory) {
            toUnitHistory.addEventListener('click', () => {
                const toUnit = document.getElementById('to-unit').value;
                this.showUnitHistory(toUnit);
            });
        }

        const encyclopediaClose = document.getElementById('encyclopedia-close');
        if (encyclopediaClose) {
            encyclopediaClose.addEventListener('click', () => {
                this.closeEncyclopedia();
            });
        }
    }
    
    updateCategory(category) {
        const oldCategory = this.currentCategory;
        this.currentCategory = category;
        
        // Analytics tracking pro změnu kategorie
        if (oldCategory && oldCategory !== category && typeof window.trackCategorySwitch === 'function') {
            window.trackCategorySwitch(category, oldCategory);
        }
        
        // Aktivní tlačítko + ARIA
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
            btn.setAttribute('aria-pressed', btn.dataset.category === category ? 'true' : 'false');
        });
        
        // Pro měny načti kurzy ČNB - NEVOLEJ populateUnits() hned
        if (category === 'currency') {
            // Zobraz loading stav
            const fromSelect = document.getElementById('from-unit');
            const toSelect = document.getElementById('to-unit');
            if (fromSelect) {
                fromSelect.innerHTML = '<option>Načítám kurzy ČNB...</option>';
                fromSelect.disabled = true;
            }
            if (toSelect) {
                toSelect.innerHTML = '<option>Načítám kurzy ČNB...</option>';
                toSelect.disabled = true;
            }
            
            this.loadCnbRates().then(() => {
                this.populateUnits();
                this.updateCurrencyInfo(); // Aktualizuj info o kurzech
                // Znovu povol selecty
                if (fromSelect) fromSelect.disabled = false;
                if (toSelect) toSelect.disabled = false;
            }).catch(error => {
                console.error('Chyba při načítání kurzů:', error);
                this.populateUnits(); // Zkus i bez kurzů
                this.updateCurrencyInfo(); // Aktualizuj info i při chybě
                // Znovu povol selecty i při chybě
                if (fromSelect) fromSelect.disabled = false;
                if (toSelect) toSelect.disabled = false;
            });
            
            // DŮLEŽITÉ: Nevol populateUnits() zde - počkej na loadCnbRates()
        } else {
            // Naplnění jednotek pro ostatní kategorie
            this.populateUnits();
        }
        
        // Informace o jednotkách
        this.updateUnitInfo();
        
        // Currency info (pro měny)
        this.updateCurrencyInfo();

        // Převod
        this.convert();
    }
    
    updateCurrencyInfo() {
        const currencyInfo = document.getElementById('currency-info');
        const currencyInfoText = document.getElementById('currency-info-text');
        const refreshBtn = document.getElementById('refresh-rates-btn');
        
        if (!currencyInfo || !currencyInfoText) return;
        
        if (this.currentCategory === 'currency') {
            const meta = this.conversions.currency.meta;
            let infoText = '';
            
            if (meta.lastUpdated === 'starší cache') {
                infoText = '📅 Kurzy ČNB - starší cache data';
            } else if (meta.lastUpdated) {
                infoText = `📅 Kurzy ČNB platné k ${meta.lastUpdated}`;
            } else {
                infoText = '📅 Kurzy ČNB';
            }
            
            currencyInfoText.textContent = infoText;
            currencyInfo.style.display = 'block';
            
            // Nastav refresh handler jen jednou
            if (refreshBtn && !refreshBtn._handlerSet) {
                refreshBtn._handlerSet = true;
                refreshBtn.addEventListener('click', async () => {
                    refreshBtn.disabled = true;
                    refreshBtn.textContent = '⏳ Načítám...';
                    
                    try {
                        // Vymaž cache a načti fresh data
                        localStorage.removeItem('cnb_rates_v2');
                        await this.loadCnbRates();
                        this.populateUnits();
                        this.updateCurrencyInfo();
                        
                        // Přepočítej bez ukládání do historie (jen refresh kurzu)
                        this.skipHistorySave = true;
                        this.convert();
                        this.skipHistorySave = false;
                        
                        console.log('✅ Kurzy úspěšně obnoveny');
                    } catch (error) {
                        console.error('❌ Chyba při obnovení kurzů:', error);
                    } finally {
                        refreshBtn.disabled = false;
                        refreshBtn.textContent = '🔄 Obnovit';
                    }
                });
            }
        } else {
            currencyInfo.style.display = 'none';
        }
    }
    
    populateUnits() {
        const fromSelect = document.getElementById('from-unit');
        const toSelect = document.getElementById('to-unit');
        const units = this.conversions[this.currentCategory].units;
        
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';
        
        Object.keys(units)
            .sort((a,b) => (units[a].name || a).localeCompare(units[b].name || b, 'cs'))
            .forEach(key => {
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
        } else if (this.currentCategory === 'time') {
            fromSelect.value = 'h'; 
            toSelect.value = 'min';
        } else if (this.currentCategory === 'data') {
            fromSelect.value = 'GB'; 
            toSelect.value = 'GiB';
        } else if (this.currentCategory === 'power') {
            fromSelect.value = 'kW'; 
            toSelect.value = 'HPm';
        } else if (this.currentCategory === 'angle') {
            fromSelect.value = 'deg'; 
            toSelect.value = 'rad';
        } else if (this.currentCategory === 'frequency') {
            fromSelect.value = 'rpm'; 
            toSelect.value = 'Hz';
        } else if (this.currentCategory === 'force') {
            fromSelect.value = 'kgf'; 
            toSelect.value = 'N';
        } else if (this.currentCategory === 'electric_voltage') {
            fromSelect.value = 'kV'; 
            toSelect.value = 'V';
        } else if (this.currentCategory === 'electric_current') {
            fromSelect.value = 'A'; 
            toSelect.value = 'mA';
        } else if (this.currentCategory === 'electric_resistance') {
            fromSelect.value = 'MΩ'; 
            toSelect.value = 'kΩ';
        } else if (this.currentCategory === 'electric_charge') {
            fromSelect.value = 'Ah'; 
            toSelect.value = 'C';
        } else if (this.currentCategory === 'fuel') {
            fromSelect.value = 'l100'; 
            toSelect.value = 'mpg_us';
        } else if (this.currentCategory === 'currency') {
            // Kontrluj, zda EUR existuje v selectu
            const hasEUR = fromSelect.querySelector('option[value="EUR"]');
            const hasCZK = toSelect.querySelector('option[value="CZK"]');
            
            if (hasEUR) fromSelect.value = 'EUR';
            if (hasCZK) toSelect.value = 'CZK';
            
            // Pokud EUR není k dispozici, použij první dostupnou měnu (ne CZK)
            if (!hasEUR && fromSelect.options.length > 1) {
                for (let i = 0; i < fromSelect.options.length; i++) {
                    if (fromSelect.options[i].value !== 'CZK') {
                        fromSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        } else {
            toSelect.selectedIndex = 1;
        }
        
        // Po nastavení default hodnot zkus převod pro currency
        if (this.currentCategory === 'currency') {
            const inputElement = document.getElementById('input-value');
            if (inputElement && !inputElement.value) {
                inputElement.value = '1';
            }
            this.convert();
        }
    }
    
    convert() {
        try {
            const inputElement = document.getElementById('input-value');
            const outputElement = document.getElementById('output-value');
            const resultDisplay = document.getElementById('result-display');
            
            // Validace elementů
            if (!inputElement || !outputElement || !resultDisplay) {
                console.error('Chybí potřebné DOM elementy');
                return;
            }
            
            // CZ: tolerantní parsování (1 234,56 i 1,234.56)
            const inputValue = this.parseAmount(inputElement.value || '');
            const fromUnit = document.getElementById('from-unit')?.value;
            const toUnit = document.getElementById('to-unit')?.value;
            
            // Rozšířená validace vstupů
            const validationResult = this.validateInput(inputValue, fromUnit, toUnit);
            if (!validationResult.isValid) {
                outputElement.value = '';
                const resultText = document.getElementById('result-text');
                const copyBtn = document.getElementById('copy-btn');
                
                if (resultText) {
                    resultText.textContent = validationResult.message;
                }
                if (copyBtn) {
                    copyBtn.style.display = 'none';
                }

                // Skrýt tlačítko kalkulačky
                const calcAddBtn = document.getElementById('calc-add-btn');
                if (calcAddBtn) {
                    calcAddBtn.style.display = 'none';
                }
                
                resultDisplay.style.borderColor = 'var(--error-color)';
                return;
            }
            
            let result;
            
            if (this.currentCategory === 'temperature') {
                result = this.convertTemperature(inputValue, fromUnit, toUnit);
            } else if (this.currentCategory === 'fuel') {
                result = this.convertFuel(inputValue, fromUnit, toUnit);
            } else if (this.currentCategory === 'currency') {
                result = this.convertCurrency(inputValue, fromUnit, toUnit);
            } else {
                result = this.convertStandard(inputValue, fromUnit, toUnit);
            }
            
            if (result !== null && isFinite(result)) {
                const rounded = this.roundResult(result);
                outputElement.value = rounded;
                
                const fromName = this.conversions[this.currentCategory].units[fromUnit]?.name || fromUnit;
                const toName = this.conversions[this.currentCategory].units[toUnit]?.name || toUnit;
                
                const resultText = document.getElementById('result-text');
                const copyBtn = document.getElementById('copy-btn');
                
                if (resultText) {
                    resultText.innerHTML = `<strong>${inputValue} ${fromName} = ${rounded} ${toName}</strong>`;
                }
                if (copyBtn) {
                    copyBtn.style.display = 'flex';
                    copyBtn.setAttribute('data-result', `${inputValue} ${fromName} = ${rounded} ${toName}`);
                }

                // Zobrazit tlačítko kalkulačky
                const calcAddBtn = document.getElementById('calc-add-btn');
                if (calcAddBtn) {
                    calcAddBtn.style.display = 'flex';
                    calcAddBtn.setAttribute('data-value', rounded);
                }
                
                resultDisplay.style.borderColor = 'var(--success-color)';
                this.currentResult = `${inputValue} ${fromName} = ${rounded} ${toName}`;

                // Uložit stav
                this.saveState();

                // Analytics tracking
                if (typeof window.trackConversion === 'function') {
                    window.trackConversion(this.currentCategory, fromName, toName, inputValue);
                }
                
                // Update URL parameters for sharing
                try {
                    const params = new URLSearchParams({
                        cat: this.currentCategory,
                        from: fromUnit,
                        to: toUnit,
                        v: inputValue || ''
                    });
                    history.replaceState(null, '', '?' + params.toString());
                } catch (urlError) {
                    console.warn('Nepodařilo se aktualizovat URL:', urlError);
                }
            } else {
                outputElement.value = '';
                const resultText = document.getElementById('result-text');
                const copyBtn = document.getElementById('copy-btn');
                
                if (resultText) {
                    resultText.textContent = 'Chyba při převodu - neplatný výsledek';
                }
                if (copyBtn) {
                    copyBtn.style.display = 'none';
                }
                
                resultDisplay.style.borderColor = 'var(--error-color)';
            }
        } catch (error) {
            console.error('Chyba při převodu:', error);
            console.error('Stack trace:', error.stack);
            const outputElement = document.getElementById('output-value');
            const resultDisplay = document.getElementById('result-display');
            const resultText = document.getElementById('result-text');
            const copyBtn = document.getElementById('copy-btn');
            
            if (outputElement) outputElement.value = '';
            if (resultText) {
                resultText.textContent = 'Nastala neočekávaná chyba';
            }
            if (copyBtn) {
                copyBtn.style.display = 'none';
            }
            if (resultDisplay) {
                resultDisplay.style.borderColor = 'var(--error-color)';
            }
        }
    }
    
    validateInput(inputValue, fromUnit, toUnit) {
        // Kontrola prázdného pole
        const rawInput = document.getElementById('input-value')?.value?.trim();
        const normalized = (rawInput || '').replace(',', '.');
        const candidate = Number(normalized);
        
        if (!rawInput) {
            return { isValid: false, message: 'Zadejte hodnotu pro převod' };
        }
        
        // Kontrola neplatného čísla
        if (isNaN(candidate) || !isFinite(candidate)) {
            return { isValid: false, message: 'Zadejte platné číslo (např. 123 nebo 12,5)' };
        }
        
        // Kontrola jednotek
        if (!fromUnit || !toUnit) {
            return { isValid: false, message: 'Vyberte jednotky pro převod' };
        }
        
        // Kontrola existence jednotek v aktuální kategorii
        const units = this.conversions[this.currentCategory]?.units;
        if (!units || !units[fromUnit] || !units[toUnit]) {
            return { isValid: false, message: 'Neplatné jednotky pro aktuální kategorii' };
        }
        
        // Kontrola rozumných limitů (zabránění overflow)
        if (Math.abs(inputValue) > 1e15) {
            return { isValid: false, message: 'Hodnota je příliš velká (max: 1,000,000,000,000,000)' };
        }
        
        // Kontrola záporných hodnot u specifických kategorií
        if (inputValue < 0) {
            const negativeNotAllowed = ['weight', 'volume', 'area', 'energy', 'data', 'power'];
            if (negativeNotAllowed.includes(this.currentCategory)) {
                const categoryName = this.conversions[this.currentCategory].name.toLowerCase();
                return { isValid: false, message: `Záporné hodnoty nejsou povoleny u kategorie ${categoryName}` };
            }
        }
        
        return { isValid: true };
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
    
    // --- NOVÁ METODA PRO PALIVO ---
    convertFuel(value, fromUnit, toUnit) {
        const units = this.conversions['fuel'].units;

        // 1) Do "base" (km/l)
        let baseKmpl;
        if (fromUnit === 'l100') {
            if (value === 0) return null;           // ochrana před dělením nulou
            baseKmpl = 100 / value;
        } else {
            // ostatní jsou lineární vůči km/l (factor = kolik km/l je 1 jednotka)
            baseKmpl = value * units[fromUnit].factor;
        }

        // 2) Z "base" do cíle
        if (toUnit === 'l100') {
            if (baseKmpl === 0) return null;
            return 100 / baseKmpl;
        } else {
            return baseKmpl / units[toUnit].factor;
        }
    }
    
    // Český formát čísel s tolerantním parsováním vstupu
    parseAmount(str) {
        if (typeof str === 'number') return str;
        if (!str) return 0;
        try {
            return Number(String(str).trim().replace(/\s/g, '').replace(',', '.'));
        } catch (e) {
            console.warn('parseAmount error:', e);
            return 0;
        }
    }
    
    formatNumber(value) {
        const fmt = new Intl.NumberFormat('cs-CZ', { 
            maximumFractionDigits: 4,
            useGrouping: true 
        });
        return fmt.format(value);
    }
    
    // Helper metody pro error handling
    showErrorMessage(message) {
        // Můžeme přidat toast notifikaci nebo inline error
        console.warn('Conversion error:', message);
    }
    
    clearErrorMessage() {
        // Vyčisti případné error zprávy
    }
    
    roundResult(value) {
        if (Math.abs(value) >= 1000000) {
            return value.toExponential(3);
        } else if (Math.abs(value) >= 1000) {
            return this.formatNumber(Math.round(value * 100) / 100);
        } else if (Math.abs(value) >= 1) {
            return this.formatNumber(Math.round(value * 10000) / 10000);
        } else {
            return this.formatNumber(parseFloat(value.toFixed(8)));
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
    
    updateUnitInfo() {
        const container = document.getElementById('unit-info');
        const infos = this.unitInfo[this.currentCategory] || [];
        
        container.innerHTML = '';
        
        infos.forEach(info => {
            const card = document.createElement('div');
            card.className = 'unit-info-card';
            card.innerHTML = `
                <div class="unit-name">${info.name}</div>
                <div class="unit-description">${info.description}</div>
            `;
            
            container.appendChild(card);
        });
    }
    
    // localStorage metody pro ukládání stavu
    saveState() {
        try {
            const state = {
                category: this.currentCategory,
                fromUnit: document.getElementById('from-unit')?.value,
                toUnit: document.getElementById('to-unit')?.value,
                lastValue: document.getElementById('input-value')?.value,
                timestamp: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (error) {
            console.warn('Nepodařilo se uložit stav:', error);
        }
    }
    
    loadState() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const state = JSON.parse(saved);
                // Obnovit stav pouze pokud je novější než 24 hodin
                if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
                    return state;
                }
            }
        } catch (error) {
            console.warn('Nepodařilo se načíst stav:', error);
        }
        return null;
    }

    // Theme management
    initTheme() {
        const savedTheme = localStorage.getItem(this.themeKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.setTheme(theme);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.themeKey, theme);

        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        const themeToggle = document.getElementById('theme-toggle');

        if (sunIcon && moonIcon && themeToggle) {
            if (theme === 'dark') {
                // Dark mode - show sun icon
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
                themeToggle.classList.add('active');
                themeToggle.title = 'Přepnout na světlý režim';
            } else {
                // Light mode - show moon icon
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
                themeToggle.classList.remove('active');
                themeToggle.title = 'Přepnout na tmavý režim';
            }
        }

        // Analytics tracking pro theme toggle (pouze při manuální změně)
        if (typeof window.trackThemeToggle === 'function' && this.isInitialized) {
            window.trackThemeToggle(theme);
        }
    }
    
    // Copy to clipboard functionality
    async copyResult() {
        const copyBtn = document.getElementById('copy-btn');
        const result = this.currentResult || copyBtn?.getAttribute('data-result');
        
        if (!result) return;
        
        try {
            await navigator.clipboard.writeText(result);
            
            // Visual feedback
            copyBtn.textContent = '✅';
            copyBtn.classList.add('copied');
            copyBtn.title = 'Zkopírováno!';
            
            // Analytics tracking
            if (typeof window.trackCopyResult === 'function') {
                window.trackCopyResult();
            }
            
            setTimeout(() => {
                copyBtn.textContent = '📋';
                copyBtn.classList.remove('copied');
                copyBtn.title = 'Kopírovat výsledek';
            }, 2000);
            
        } catch (error) {
            console.warn('Nepodařilo se zkopírovat:', error);
            
            // Fallback pro starší browsery
            const textArea = document.createElement('textarea');
            textArea.value = result;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                copyBtn.textContent = '✅';
                copyBtn.title = 'Zkopírováno!';
                
                setTimeout(() => {
                    copyBtn.textContent = '📋';
                    copyBtn.title = 'Kopírovat výsledek';
                }, 2000);
            } catch (fallbackError) {
                console.error('Kopírování selhalo:', fallbackError);
            }
            
            document.body.removeChild(textArea);
        }
    }

    addToCalculator() {
        const calcAddBtn = document.getElementById('calc-add-btn');
        const value = calcAddBtn?.getAttribute('data-value');
        const compactCalc = document.getElementById('compact-calculator');

        if (!value) return;

        try {
            // Zobraz kompaktní kalkulačku
            if (compactCalc) {
                compactCalc.style.display = 'block';
            }

            // Přidej hodnotu do kalkulačky
            if (window.calculator) {
                window.calculator.addToDisplay(value);
            }

            // Visual feedback
            calcAddBtn.textContent = '✅';
            calcAddBtn.title = 'Přidáno do kalkulačky!';
            calcAddBtn.style.background = 'var(--success-color)';

            setTimeout(() => {
                calcAddBtn.textContent = '🧮';
                calcAddBtn.title = 'Přidat do kalkulačky';
                calcAddBtn.style.background = 'var(--button-bg)';
            }, 2000);

        } catch (error) {
            console.warn('Nepodařilo se přidat do kalkulačky:', error);
        }
    }
    hydrateFromUrl() {
        const p = new URLSearchParams(location.search);
        return {
            cat: p.get('cat'),
            from: p.get('from'),
            to: p.get('to'),
            v: p.get('v')
        };
    }
    
    // Kompatibilní bridge metoda pro zpětnou kompatibilitu
    switchCategory(category) {
        if (typeof this.updateCategory === 'function') {
            return this.updateCategory(category);
        }
        // nouzový fallback, kdyby updateCategory nebyla:
        this.currentCategory = category;
        this.populateUnits?.();
        this.convert?.();
    }

    // Převod měn přes CZK podle ČNB kurzů
    convertCurrency(value, fromCode, toCode) {
        const rates = this.cnbRates;
        if (!rates || !rates[fromCode] || !rates[toCode]) return null;

        // CNB dává: rateCzk = kolik CZK za 'amount' jednotek měny
        const from = rates[fromCode]; // { amount, rateCzk }
        const to   = rates[toCode];

        // Převod z 'from' do CZK:
        // 1 from = (rateCzk / amount) CZK
        const czkPerFrom = from.rateCzk / from.amount;

        // 1 to = (rateCzk / amount) CZK  =>  1 CZK = amount / rateCzk to-jednotek
        const toPerCzk = to.amount / to.rateCzk;

        // value[from] -> CZK -> to
        return value * czkPerFrom * toPerCzk;
    }
    
    // ČNB kurzy - načítání s cache
    async loadCnbRates(dateStr) {
        // dateStr volitelně 'YYYY-MM-DD' – když nenecháš, ČNB vrátí poslední dostupný pracovní den
        const cacheKey = 'cnb_rates_v2';
        const cache = JSON.parse(localStorage.getItem(cacheKey) || 'null');
        const today = new Date().toISOString().slice(0,10);

        // použij cache, pokud je z téhož dne vyhlášení
        if (cache && cache.validFor === today) {
            this.cnbRates = cache.rates;
            
            // DŮLEŽITÉ: I při cache musíme aktualizovat conversions.currency.units
            this.conversions.currency.units = {};
            Object.entries(cache.rates).forEach(([code, d]) => {
                this.conversions.currency.units[code] = {
                    name: d.name || code,
                    amount: d.amount,
                    rateCzk: d.rateCzk
                };
            });
            this.conversions.currency.meta.lastUpdated = cache.validFor || today;
            
            return cache.rates;
        }

        let data; // ← důležité: připravit předem

        try {
            // CORS Proxy - ČNB API nemá správné CORS hlavičky
            const baseUrl = dateStr 
                ? `https://api.cnb.cz/cnbapi/exrates/daily?date=${dateStr}`
                : 'https://api.cnb.cz/cnbapi/exrates/daily';
            
            // Zkusíme několik CORS proxy služeb
            const proxies = [
                `https://api.allorigins.win/get?url=${encodeURIComponent(baseUrl)}`,
                `https://corsproxy.io/?${encodeURIComponent(baseUrl)}`,
                `https://cors-anywhere.herokuapp.com/${baseUrl}`
            ];
            
            let jsonData = null;
            let lastError = null;
            
            for (const proxyUrl of proxies) {
                try {
                    console.log('🏦 Zkouším proxy:', proxyUrl);
                    
                    const jsonRes = await fetch(proxyUrl, { 
                        cache: 'no-store',
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    console.log('🏦 Proxy response status:', jsonRes.status);
                    
                    if (!jsonRes.ok) throw new Error(`Proxy failed: ${jsonRes.status}`);
                    
                    const proxyResponse = await jsonRes.json();
                    
                    // allorigins.win wrappuje data v contents
                    if (proxyResponse.contents) {
                        jsonData = JSON.parse(proxyResponse.contents);
                    } else {
                        jsonData = proxyResponse;
                    }
                    
                    console.log('✅ Úspěch přes proxy!');
                    break;
                    
                } catch (error) {
                    console.log('❌ Proxy selhala:', error.message);
                    lastError = error;
                    continue;
                }
            }
            
            if (!jsonData) {
                throw lastError || new Error('Všechny proxy selhaly');
            }
            
            console.log('🏦 ČNB API data:', jsonData);
            
            // Parse nového JSON formátu ČNB
            const rates = [];
            if (jsonData.rates && Array.isArray(jsonData.rates)) {
                jsonData.rates.forEach(rate => {
                    rates.push({
                        country: rate.country,
                        currency: rate.currency,
                        amount: Number(rate.amount),       // např. JPY 100
                        code: rate.currencyCode,
                        rate: Number(rate.rate)            // CZK za 'amount' jednotek
                    });
                });
            }
            
            // datum vyhlášení (kdy kurz platí) – pokud chybí, spadni na today
            const validFor = (jsonData.rates && jsonData.rates[0] && jsonData.rates[0].validFor) || today;
            data = { rates, validFor };

            // map na { code: { amount, rateCzk, name, ... } }
            const map = { CZK: { amount: 1, rateCzk: 1, name: 'česká koruna (CZK)' } };
            const currencyNamesCZ = this.getCurrencyNamesCZ();

            data.rates.forEach(r => {
                const czechName = currencyNamesCZ[r.code] || r.currency.toLowerCase();
                map[r.code] = {
                    amount: r.amount,
                    rateCzk: r.rate,                       // POZOR: je to CZK za 'amount'; ve výpočtu dělíme 'amount'
                    name: `${czechName} (${r.code})`,
                    country: r.country
                };
            });

            this.cnbRates = map;
            
            // propsat do UI slovníku měn
            this.conversions.currency.units = {};
            Object.entries(map).forEach(([code, d]) => {
                this.conversions.currency.units[code] = {
                    name: d.name || code,
                    amount: d.amount,
                    rateCzk: d.rateCzk
                };
            });
            this.conversions.currency.meta.lastUpdated = data.validFor;

            // uložit cache podle skutečného data kurzu
            localStorage.setItem(cacheKey, JSON.stringify({
                date: today,        // kdy jsme to načetli
                validFor: data.validFor, // kdy platí kurz ČNB
                rates: map
            }));

            console.log('✅ ČNB kurzy úspěšně načteny:', Object.keys(map).length, 'měn');
            console.log('💰 EUR kurz:', map.EUR?.rateCzk, 'CZK');

            return map;
        } catch (error) {
            console.error('❌ Chyba při načítání ČNB kurzů:', error);
            console.error('🔄 Používám fallback...');
            // Fallback na cache, i když je starší
            if (cache && cache.rates) {
                this.cnbRates = cache.rates;
                
                // Aktualizovat conversions.currency.units i při fallback
                this.conversions.currency.units = {};
                Object.entries(cache.rates).forEach(([code, data]) => {
                    this.conversions.currency.units[code] = {
                        name: data.name || `${code}`,
                        amount: data.amount,
                        rateCzk: data.rateCzk
                    };
                });
                this.conversions.currency.meta.lastUpdated = cache.validFor || 'starší cache';
                
                return cache.rates;
            }
            
            // Finální fallback - statické kurzy (aproximace)
            const staticRates = {
                CZK: { amount: 1, rateCzk: 1, name: 'česká koruna (CZK)' },
                EUR: { amount: 1, rateCzk: 25.5, name: 'euro (EUR)' },
                USD: { amount: 1, rateCzk: 23.2, name: 'americký dolar (USD)' },
                GBP: { amount: 1, rateCzk: 29.8, name: 'britská libra (GBP)' },
                CHF: { amount: 1, rateCzk: 26.1, name: 'švýcarský frank (CHF)' },
                JPY: { amount: 100, rateCzk: 15.8, name: 'japonský jen (JPY)' },
                PLN: { amount: 1, rateCzk: 5.9, name: 'polský zlotý (PLN)' },
                HUF: { amount: 100, rateCzk: 6.2, name: 'maďarský forint (HUF)' },
                NOK: { amount: 1, rateCzk: 2.2, name: 'norská koruna (NOK)' },
                SEK: { amount: 1, rateCzk: 2.3, name: 'švédská koruna (SEK)' },
                DKK: { amount: 1, rateCzk: 3.4, name: 'dánská koruna (DKK)' }
            };
            
            this.cnbRates = staticRates;
            this.conversions.currency.units = {};
            Object.entries(staticRates).forEach(([code, data]) => {
                this.conversions.currency.units[code] = {
                    name: data.name,
                    amount: data.amount,
                    rateCzk: data.rateCzk
                };
            });
            this.conversions.currency.meta.lastUpdated = today; // Použij dnešní datum
            
            return staticRates;
        }
    }
    
    // Auto-refresh kurzů každý pracovní den ve 14:35 (Evropa/Praha)
    setupAutoRefresh() {
        const TZ = 'Europe/Prague';
        
        const nextRefreshMs = () => {
            const now = new Date();
            const prgNow = new Date(now.toLocaleString('en-CA', { timeZone: TZ }));
            const target = new Date(prgNow);
            
            // Nastav čas na 14:35
            target.setHours(14, 35, 0, 0);
            
            // Pokud už je po 14:35 dnes, nastav zítra
            if (prgNow > target) {
                target.setDate(target.getDate() + 1);
            }
            
            // Přeskoč víkendy (0=neděle, 6=sobota)
            while ([0, 6].includes(target.getDay())) {
                target.setDate(target.getDate() + 1);
            }
            
            return target.getTime() - prgNow.getTime();
        };
        
        const scheduleRefresh = async () => {
            try {
                console.log('🔄 Auto-refresh: Načítám nové ČNB kurzy...');
                await this.loadCnbRates();
                
                if (this.currentCategory === 'currency') {
                    this.populateUnits();
                    this.updateCurrencyInfo();
                    
                    // Přepočítej bez ukládání do historie (jen refresh kurzu)
                    this.skipHistorySave = true;
                    this.convert();
                    this.skipHistorySave = false;
                }
                
                console.log('✅ Auto-refresh: Kurzy úspěšně aktualizovány');
            } catch (error) {
                console.error('❌ Auto-refresh: Chyba při aktualizaci kurzů:', error);
            }
            
            // Naplánuj další refresh za 24h (jeden pokus denně)
            setTimeout(scheduleRefresh, 24 * 60 * 60 * 1000);
        };
        
        // Naplánuj první refresh
        const msToNext = nextRefreshMs();
        console.log(`🏦 Auto-refresh naplánován za ${Math.round(msToNext / 1000 / 60)} minut`);
        
        setTimeout(() => {
            scheduleRefresh();
        }, msToNext);
    }

    showUnitHistory(unitKey) {
        // Try category-specific key first (e.g., "temperature_c"), then fallback to unitKey
        const categorySpecificKey = `${this.currentCategory}_${unitKey}`;
        const unitHistory = this.unitHistories[categorySpecificKey] || this.unitHistories[unitKey];
        const units = this.conversions[this.currentCategory]?.units;

        if (!unitHistory && !units?.[unitKey]) {
            console.warn('Historie jednotky nenalezena:', unitKey, 'category:', this.currentCategory);
            return;
        }

        const encyclopedia = document.getElementById('unit-encyclopedia');
        const unitNameSpan = document.getElementById('encyclopedia-unit-name');
        const content = document.getElementById('encyclopedia-content');

        if (!encyclopedia || !unitNameSpan || !content) return;

        // Název jednotky
        const unitName = units?.[unitKey]?.name || unitKey;
        unitNameSpan.textContent = `Historie jednotky: ${unitName}`;

        // Obsah encyklopedie
        if (unitHistory) {
            content.innerHTML = `
                <div class="encyclopedia-section">
                    <h4>Historie a původ</h4>
                    <p>${unitHistory.history}</p>
                </div>

                <div class="encyclopedia-meta">
                    <div class="encyclopedia-meta-item">
                        <strong>Původ:</strong>
                        ${unitHistory.origin}
                    </div>
                    <div class="encyclopedia-meta-item">
                        <strong>Vynálezce:</strong>
                        ${unitHistory.inventor}
                    </div>
                    <div class="encyclopedia-meta-item">
                        <strong>Účel:</strong>
                        ${unitHistory.purpose}
                    </div>
                    <div class="encyclopedia-meta-item">
                        <strong>Moderní použití:</strong>
                        ${unitHistory.modernUse}
                    </div>
                </div>
            `;
        } else {
            // Fallback pro jednotky bez historie
            content.innerHTML = `
                <div class="encyclopedia-section">
                    <h4>Informace o jednotce</h4>
                    <p>Tato jednotka je součástí ${this.conversions[this.currentCategory].name.toLowerCase()} měřicího systému.</p>
                    <p>Historie této jednotky zatím není v naší databázi k dispozici.</p>
                </div>

                <div class="encyclopedia-meta">
                    <div class="encyclopedia-meta-item">
                        <strong>📊 Kategorie:</strong>
                        ${this.conversions[this.currentCategory].name}
                    </div>
                    <div class="encyclopedia-meta-item">
                        <strong>📋 Název:</strong>
                        ${unitName}
                    </div>
                </div>
            `;
        }

        // Zobrazit encyklopedii
        encyclopedia.classList.add('show');

        // Scroll na encyklopedii
        setTimeout(() => {
            encyclopedia.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);

        // Analytics tracking
        if (typeof window.trackUnitHistoryView === 'function') {
            window.trackUnitHistoryView(unitKey, this.currentCategory);
        }
    }

    closeEncyclopedia() {
        const encyclopedia = document.getElementById('unit-encyclopedia');
        if (encyclopedia) {
            encyclopedia.classList.remove('show');
        }
    }
}

// === SEPARÁTNÍ KALKULAČKA ===
class Calculator {
    constructor() {
        this.display = '';
        this.result = '';
        this.shouldClearDisplay = false;
        this.init();
    }

    init() {
        // Najdi elementy pro kompaktní kalkulačku
        this.displayElement = document.getElementById('calc-display-compact');
        this.resultElement = document.getElementById('calc-result-compact');

        if (!this.displayElement || !this.resultElement) {
            console.warn('Kalkulačka: chybí DOM elementy');
            return;
        }

        // Bind události
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        // Tlačítka kalkulačky (všechny typy)
        document.querySelectorAll('.calc-btn, .calc-btn-small, .calc-btn-num, .calc-btn-op, .calc-btn-equals, .calc-btn-sci, .calc-btn-control').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleButtonClick(btn);
            });
        });

        // Zavírání kompaktní kalkulačky
        document.getElementById('calc-toggle')?.addEventListener('click', () => {
            const compactCalc = document.getElementById('compact-calculator');
            if (compactCalc) {
                compactCalc.style.display = 'none';
            }
        });

        // Klávesnice
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // Integrace s převodníkem (kompaktní verze)
        document.getElementById('add-to-converter-compact')?.addEventListener('click', () => {
            this.addToConverter();
        });

        document.getElementById('add-from-converter-compact')?.addEventListener('click', () => {
            this.addFromConverter();
        });
    }

    handleButtonClick(btn) {
        const value = btn.dataset.value;
        const action = btn.dataset.action;

        if (value) {
            this.addToDisplay(value);
        } else if (action) {
            this.handleAction(action);
        }
    }

    handleKeyPress(e) {
        // Jen pokud je focus na kalkulačce
        if (!e.target.closest('.calculator-section')) return;

        const key = e.key;
        e.preventDefault();

        if (/[0-9.]/.test(key)) {
            this.addToDisplay(key);
        } else if (['+', '-', '*', '/', '(', ')'].includes(key)) {
            this.addToDisplay(key);
        } else if (key === 'Enter' || key === '=') {
            this.handleAction('equals');
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.handleAction('clear');
        } else if (key === 'Backspace') {
            this.handleAction('backspace');
        }
    }

    addToDisplay(value) {
        if (this.shouldClearDisplay) {
            this.display = '';
            this.shouldClearDisplay = false;
        }

        // Kontrola operátorů - nahraď pokud už nějaký je na konci
        if (/[+\-*/^]/.test(value)) {
            // Pokud už na konci je operátor
            if (/[+\-*/^]$/.test(this.display)) {
                // Speciální případ: mínus po +, *, /, ^ (pro záporné číslo jako 5*-3)
                if (value === '-' && /[+*/^]$/.test(this.display)) {
                    this.display += value; // Přidej mínus pro záporné číslo
                }
                // Speciální případ: mínus po mínus (nahraď)
                else if (value === '-' && /-$/.test(this.display)) {
                    this.display = this.display.slice(0, -1) + value; // Nahraď
                }
                // Všechny ostatní případy - nahraď poslední operátor
                else {
                    this.display = this.display.slice(0, -1) + value;
                }
            } else {
                // Normálně přidej operátor
                this.display += value;
            }
        } else {
            // Přidej číslo nebo jinou hodnotu
            this.display += value;
        }

        this.updateDisplay();
        this.calculateResult();
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.display = '';
                this.result = '';
                this.updateDisplay();
                this.updateResult();
                break;

            case 'backspace':
                this.display = this.display.slice(0, -1);
                this.updateDisplay();
                this.calculateResult();
                break;

            case 'equals':
                // Zkusíme vypočítat výsledek pokud ještě není
                if (this.result === '' && this.display !== '') {
                    this.calculateResult();
                }

                // Použijeme výsledek pokud je validní - TEPRVE TEĎ přesuneme do display
                if (this.result !== '' && !isNaN(this.result) && isFinite(this.result)) {
                    this.display = this.result.toString();
                    this.shouldClearDisplay = true; // Připrav pro další operaci
                    this.updateDisplay();
                    this.result = '';  // Vymaž result aby se neopakoval
                    this.updateResult();
                }
                break;
        }
    }

    calculateResult() {
        if (!this.display) {
            this.result = '';
            this.updateResult();
            return;
        }

        try {
            // Rozšířená evaluace s vědeckými funkcemi
            let expression = this.display
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/abs\(/g, 'Math.abs(')
                .replace(/π/g, 'Math.PI')
                .replace(/pi/g, 'Math.PI')
                .replace(/e(?![0-9])/g, 'Math.E')
                .replace(/\^/g, '**');

            // Rozšířená bezpečnostní kontrola pro vědecké funkce
            if (!/^[0-9+\-*/.()MathPIEsincoqrwtabflupg\s^]*$/.test(expression)) {
                this.result = '';
                this.updateResult();
                return;
            }

            // Použij Function pro bezpečnou evaluaci
            const result = new Function('Math', `"use strict"; return (${expression})`)(Math);

            if (isNaN(result) || !isFinite(result)) {
                this.result = '';
            } else {
                this.result = result;
            }
        } catch (error) {
            console.warn('Calculator error:', error);
            this.result = '';
        }

        this.updateResult();
    }

    updateDisplay() {
        if (this.displayElement) {
            // Jednoduše zobraz display bez formátování - interní logika zůstane v číslech
            this.displayElement.value = this.display;
        }
    }

    updateResult() {
        if (this.resultElement) {
            if (this.result !== '' && !isNaN(this.result)) {
                const cleanResult = parseFloat(this.result.toFixed(10));
                this.resultElement.textContent = `= ${this.formatNumber(cleanResult)}`;
                this.resultElement.style.opacity = '1';
            } else {
                this.resultElement.textContent = '';
                this.resultElement.style.opacity = '0.5';
            }
        }
    }

    formatNumber(num) {
        if (Math.abs(num) < 0.0001 || Math.abs(num) > 1e6) {
            return num.toExponential(4);
        }
        // České oddělování tisíců s lepším zaokrouhlením
        const cleaned = parseFloat(num.toFixed(10)); // Oprav floating point chyby
        const formatted = cleaned.toString();
        return this.addThousandsSeparators(formatted);
    }

    addThousandsSeparators(numStr) {
        const parts = numStr.split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];

        // Přidej mezery každé 3 číslice zprava
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
    }

    parseFormattedNumber(str) {
        // Odstraň mezery a nahraď čárku tečkou pro parsing
        return str.replace(/\s/g, '').replace(',', '.');
    }

    addToConverter() {
        const value = this.result !== '' ? this.result : this.display;
        if (value && window.converter) {
            const inputElement = document.getElementById('input-value');
            if (inputElement) {
                inputElement.value = value;
                inputElement.focus();
                window.converter.convert();
                this.showNotification('📤 Hodnota přidána do převodníku');
            }
        }
    }

    addFromConverter() {
        if (window.converter) {
            const outputElement = document.getElementById('output-value');
            const inputElement = document.getElementById('input-value');

            const outputValue = outputElement?.value || '';
            const inputValue = inputElement?.value || '';

            // Nejprve zkus výsledek (output), pak vstup (input)
            let valueToAdd = null;

            if (outputValue.trim()) {
                const cleanValue = this.parseFormattedNumber(outputValue);
                const numValue = parseFloat(cleanValue);
                if (!isNaN(numValue)) {
                    valueToAdd = numValue.toString();
                }
            }

            if (!valueToAdd && inputValue.trim()) {
                const cleanValue = this.parseFormattedNumber(inputValue);
                const numValue = parseFloat(cleanValue);
                if (!isNaN(numValue)) {
                    valueToAdd = numValue.toString();
                }
            }

            if (valueToAdd) {
                // Inteligentní přidání hodnoty
                this.smartAddValue(valueToAdd);
                this.showNotification('📥 Hodnota přidána z převodníku');
            }
        }
    }

    smartAddValue(value) {
        const currentDisplay = this.display.trim();

        // Pokud je displej prázdný nebo obsahuje jen "0"
        if (!currentDisplay || currentDisplay === '0') {
            this.display = value;
            this.shouldClearDisplay = false;
        }
        // Pokud je posledním znakem operátor (+, -, *, /, ^) nebo otevírací závorka
        else if (/[+\-*/^(]$/.test(currentDisplay)) {
            this.display += value;
        }
        // Pokud displej obsahuje jen číslo (žádný operátor nebo funkce)
        else if (/^[\d.,\s]*$/.test(currentDisplay)) {
            this.display = value;
            this.shouldClearDisplay = false;
        }
        // Pokud už obsahuje operátor ale nekončí operátorem - NEDĚL NIC (nelze přidat)
        else if (/[+\-*/^]/.test(currentDisplay) && !/[+\-*/^(]$/.test(currentDisplay)) {
            // Neděl nic - výraz už je kompletní a nekončí operátorem
            this.showNotification('⚠️ Nelze přidat - výraz není připraven');
            return;
        }
        // Ve všech ostatních případech přidej na konec
        else {
            this.display += value;
        }

        this.updateDisplay();
        this.calculateResult();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 1000;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.style.opacity = '1', 10);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Inicializace po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    // Malá pauza pro jistotu, že DOM je připraven
    setTimeout(() => {
        window.converter = new UnitConverter();
        window.calculator = new Calculator();
    }, 10);
});