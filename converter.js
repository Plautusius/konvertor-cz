// Převodník jednotek - JavaScript logika
class UnitConverter {
    constructor() {
        this.currentCategory = 'length';
        this.conversions = this.initializeConversions();
        this.unitInfo = this.initializeUnitInfo();
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
                    'sah': { name: 'sáh', factor: 1.8965 },
                    'loket': { name: 'loket', factor: 0.594 },
                    'stopa_ceska': { name: 'česká stopa', factor: 0.296 }
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
            }
        };
    }
    
    initializeUnitInfo() {
        return {
            length: [
                { name: 'Palec (inch)', description: 'Anglická jednotka délky, používá se ve stavebnictví, průmyslu a elektronice. 1 palec = 2,54 cm' },
                { name: 'Stopa (foot)', description: 'Anglická jednotka délky, běžná v USA a UK. Používá se v letectví, sportu a stavebnictví. 1 stopa = 30,48 cm' },
                { name: 'Míle', description: 'Dlouhá vzdálenost v anglo-amerických zemích. Používá se pro měření tras a rychlosti. 1 míle = 1,609 km' },
                { name: 'Sáh', description: 'Historická česká jednotka, měřila se rozpětím paží. Používala se v zemědělství a lesnictví. 1 sáh = 1,897 m' },
                { name: 'Yard', description: 'Anglická jednotka, často pro sport (golf, americký fotbal). 1 yard = 3 stopy = 91,44 cm' },
                { name: 'Námořní míle', description: 'Mezinárodní jednotka vzdálenosti v námořnictví a letectví. 1 nmi = 1852 m' }
            ],
            weight: [
                { name: 'Libra (pound)', description: 'Základní jednotka hmotnosti v USA a UK. Používá se pro vážení osob, potravin a zboží. 1 libra = 453,6 g' },
                { name: 'Unce (ounce)', description: 'Malá jednotka hmotnosti, běžná v kuchyni a při vážení drahých kovů. 1 unce = 28,35 g' },
                { name: 'Stone', description: 'Britská jednotka pro hmotnost osob. Používá se hlavně ve Velké Británii. 1 stone = 6,35 kg' },
                { name: 'Lot', description: 'Historická česká jednotka, používala se pro drahé kovy a koření. 1 lot = 17,5 g' },
                { name: 'Tuna (t)', description: 'Velká jednotka hmotnosti pro náklad, lodi a průmysl. 1 tuna = 1000 kg' },
                { name: 'Česká libra', description: 'Historická česká jednotka, lehčí než anglická libra. 1 česká libra = 560 g' }
            ],
            volume: [
                { name: 'Galon (US)', description: 'Americká jednotka objemu pro kapaliny, používá se u pohonných hmot a nápojů. 1 galon = 3,785 l' },
                { name: 'Fl. unce (US)', description: 'Malá jednotka objemu, běžná v kuchyni a kosmetice. 1 fl. unce = 29,6 ml' },
                { name: 'Šálek (US cup)', description: 'Kuchyňská odměrka v amerických receptech. 1 šálek = 237 ml' },
                { name: 'Žejdlík', description: 'Historická česká jednotka pro tekutiny, používala se v hospodách a domácnostech. 1 žejdlík = 0,354 l' },
                { name: 'Pinta (US)', description: 'Americká jednotka objemu pro mléko a nápoje. 1 pinta = 473 ml' },
                { name: 'Korec', description: 'Historická česká jednotka pro obilniny a suché látky. 1 korec = 93,6 l' }
            ],
            temperature: [
                { name: 'Fahrenheit (°F)', description: 'Teplotní stupnice používaná v USA. 0°F = mrazící bod solného roztoku. 32°F = bod mrazu vody' },
                { name: 'Kelvin (K)', description: 'Absolutní teplotní stupnice pro vědu. 0 K = absolutní nula (-273,15°C). Nepoužívá se symbol °' },
                { name: 'Rankine (°R)', description: 'Americká absolutní teplotní stupnice. 0°R = absolutní nula. Používá se v inženýrství' },
                { name: 'Celsius (°C)', description: 'Nejběžnější teplotní stupnice. 0°C = bod mrazu vody, 100°C = bod varu vody' },
                { name: 'Absolutní nula', description: 'Nejnižší možná teplota ve vesmíru. 0 K = -273,15°C' },
                { name: 'Pokojová teplota', description: 'Komfortní teplota v interieru. Obvykle 20-22°C (68-72°F)' }
            ],
            speed: [
                { name: 'MPH (míle za hodinu)', description: 'Rychlost v anglo-amerických zemích. Používá se v USA a UK pro auta. 1 mph = 1,609 km/h' },
                { name: 'Uzel (knot)', description: 'Rychlost v námořnictví a letectví. 1 uzel = 1 námořní míle za hodinu = 1,852 km/h' },
                { name: 'Mach', description: 'Rychlost vzhledem k rychlosti zvuku (při 20°C ≈ 343 m/s). Mach 1 = rychlost zvuku' },
                { name: 'Rychlost světla (c)', description: 'Nejvyšší možná rychlost ve vesmíru. c = 299 792 458 m/s ve vakuu' },
                { name: 'Kilometr za sekundu', description: 'Kosmická rychlost pro rakety a planety. 1 km/s = 3600 km/h' },
                { name: 'Metr za sekundu', description: 'Fyzikální jednotka rychlosti v SI systému. 1 m/s = 3,6 km/h' }
            ],
            pressure: [
                { name: 'Bar', description: 'Jednotka tlaku blízká atmosférickému tlaku. Používá se u pneumatik a hydrauliky. 1 bar ≈ 1 atm' },
                { name: 'PSI', description: 'Americká jednotka tlaku (libra na čtvereční palec). Používá se u pneumatik v USA. 1 PSI = 6895 Pa' },
                { name: 'mmHg', description: 'Tlak rtuťového sloupce, používá se v medicíně pro krevní tlak. 1 mmHg = 133 Pa' },
                { name: 'Atmosféra (atm)', description: 'Standardní atmosférický tlak na hladině moře. 1 atm = 101 325 Pa' },
                { name: 'Pascal (Pa)', description: 'Základní jednotka tlaku v SI systému. Velmi malý tlak, 1 Pa = 1 N/m²' },
                { name: 'Kilopascal (kPa)', description: 'Praktická jednotka tlaku v meteorologii a technike. 1 kPa = 1000 Pa' }
            ],
            area: [
                { name: 'Hektar (ha)', description: 'Velká jednotka plochy pro pole a pozemky. 1 hektar = 10 000 m² = 100 arů' },
                { name: 'Ar (a)', description: 'Střední jednotka plochy, často pro zahrady a pozemky. 1 ar = 100 m²' },
                { name: 'Akr (acre)', description: 'Anglo-americká jednotka plochy pro zemědělství. 1 akr = 4047 m² ≈ 0,4 ha' },
                { name: 'Čtvereční stopa (ft²)', description: 'Malá anglo-americká jednotka plochy pro místnosti. 1 ft² = 929 cm²' },
                { name: 'Čtvereční metr (m²)', description: 'Základní jednotka plochy. Plocha čtverce o straně 1 metr' },
                { name: 'Čtvereční kilometr', description: 'Velká jednotka plochy pro města a kráje. 1 km² = 100 hektarů' }
            ],
            energy: [
                { name: 'Kilowatthodina (kWh)', description: 'Jednotka elektrické energie na účtech za elektřinu. 1 kWh = energie 1kW po dobu 1 hodiny' },
                { name: 'Kilokalorie (kcal)', description: 'Jednotka energie v potravinách. 1 kcal = energie na ohřátí 1 kg vody o 1°C' },
                { name: 'BTU', description: 'Britská tepelná jednotka, používá se u klimatizací a topení. 1 BTU = 1055 J' },
                { name: 'Joule (J)', description: 'Základní jednotka energie pojmenovaná po Jamesi Joulovi. 1 J = 1 W·s' },
                { name: 'Megajoule (MJ)', description: 'Velká jednotka energie pro průmysl a dopravu. 1 MJ = 1 000 000 J' },
                { name: 'Kalorie (cal)', description: 'Malá kalorie, energie na ohřátí 1 g vody o 1°C. 1 cal = 4,184 J' }
            ],
            
            time: [
                { name: 'Milisekunda (ms)', description: 'Krátký časový úsek používaný v elektronice a sportu. 1 ms = 0,001 s' },
                { name: 'Mikrosekunda (μs)', description: 'Velmi krátký čas pro počítače a elektroniku. 1 μs = 0,000001 s' },
                { name: 'Týden', description: 'Sedmidenní období. 1 týden = 7 dní = 168 hodin = 604 800 sekund' },
                { name: 'Rok (průměrný)', description: 'Astronomický rok zahrnuje přestupné roky. 1 rok = 365,25 dne = 31 557 600 s' },
                { name: 'Nanosekunda (ns)', description: 'Extrémně krátký čas v počítačích a fyzice. 1 ns = 0,000000001 s' },
                { name: 'Den', description: 'Doba jedné rotace Země kolem osy. 1 den = 24 hodin = 86 400 sekund' }
            ],
            
            data: [
                { name: 'Gigabyte (GB)', description: 'Desetinná datová jednotka (1000³). Používá se u úložišť a přenosů dat. 1 GB = 1 000 MB' },
                { name: 'Gibibyte (GiB)', description: 'Binární datová jednotka (1024³). Používá se v operačních systémech. 1 GiB = 1024 MiB' },
                { name: 'Terabyte (TB)', description: 'Velká datová jednotka pro pevné disky a servery. 1 TB = 1000 GB' },
                { name: 'Bit', description: 'Nejmenší jednotka informace v počítačích. 8 bitů = 1 byte' },
                { name: 'Petabyte (PB)', description: 'Obrovská datová jednotka pro datová centra. 1 PB = 1000 TB' },
                { name: 'Byte (B)', description: 'Základní počítačová jednotka dat. 1 B = 8 bitů, ukládá 1 znak' }
            ],
            
            power: [
                { name: 'Kilowatt (kW)', description: 'Jednotka elektrického výkonu. Používá se u spotřebičů a motorů. 1 kW = 1000 W' },
                { name: 'Koňská síla (HP)', description: 'Jednotka mechanického výkonu motorů. Rozlišuje se metrická (735 W) a americká (746 W)' },
                { name: 'Megawatt (MW)', description: 'Velká jednotka výkonu pro elektrárny a průmysl. 1 MW = 1000 kW' },
                { name: 'Watt (W)', description: 'Základní jednotka výkonu pojmenovaná po Jamesi Wattovi. 1 W = 1 J/s' },
                { name: 'Milliwatt (mW)', description: 'Malý výkon pro elektroniku a lasery. 1 mW = 0,001 W' },
                { name: 'Gigawatt (GW)', description: 'Obrovský výkon elektráren a zemí. 1 GW = 1 000 000 000 W' }
            ],
            
            angle: [
                { name: 'Radián (rad)', description: 'Matematická jednotka úhlu. π rad = 180°. Používá se ve vyšší matematice a fyzice' },
                { name: 'Gradián (gon)', description: 'Desetinná jednotka úhlu. 1 gon = 0,9°. Celý kruh = 400 gon. Používá se v geodézii' },
                { name: 'Úhlová minuta (′)', description: 'Jemná jednotka úhlu. 1° = 60′. Používá se v astronomii a navigaci' },
                { name: 'Otáčka (turn)', description: 'Úplná otáčka = 360° = 2π rad. Používá se u rotací a motorů' },
                { name: 'Stupeň (°)', description: 'Nejběžnější jednotka úhlu. Celý kruh = 360°' },
                { name: 'Úhlová vteřina (″)', description: 'Velmi jemná jednotka úhlu. 1′ = 60″. Používá se v přesné navigaci' }
            ],
            
            frequency: [
                { name: 'Hertz (Hz)', description: 'Základní jednotka frekvence. 1 Hz = 1 kmit za sekundu. Používá se v elektronice' },
                { name: 'Kilohertz (kHz)', description: 'Střední frekvence pro rádio AM a zvuk. 1 kHz = 1000 Hz. Slyšitelný rozsah: 20 Hz - 20 kHz' },
                { name: 'Megahertz (MHz)', description: 'Vysoká frekvence pro rádio FM, WiFi a procesory. 1 MHz = 1 000 000 Hz' },
                { name: 'Otáčky za minutu (rpm)', description: 'Rychlost rotace motorů, větrníků a disků. 1 rpm = 1/60 Hz' },
                { name: 'Gigahertz (GHz)', description: 'Velmi vysoká frekvence procesů a mikrovln. 1 GHz = 1 000 000 000 Hz' },
                { name: 'Frekvence sítě', description: 'Frekvence elektrické sítě. V Evropě 50 Hz, v USA 60 Hz' }
            ],
            
            force: [
                { name: 'Newton (N)', description: 'Základní jednotka síly pojmenovaná po Isaacovi Newtonovi. 1 N ≈ síla 100g hmoty' },
                { name: 'Kilogram-síla (kgf)', description: 'Síla působící na 1 kg hmoty v gravitačním poli Země. 1 kgf = 9,807 N' },
                { name: 'Kilonewton (kN)', description: 'Velká síla používaná ve stavebnictví a strojním inženýrství. 1 kN = 1000 N' },
                { name: 'Dyne (dyn)', description: 'Malá jednotka síly v CGS systému, používá se ve fyzice. 1 dyn = 10⁻⁵ N' },
                { name: 'Meganewton (MN)', description: 'Obrovská síla v inženýrství a kosmonautice. 1 MN = 1 000 000 N' },
                { name: 'Tahání (trakce)', description: 'Praktická síla u vozidel a strojů. Měří se v newtonech' }
            ],
            
            electric_voltage: [
                { name: 'Volt (V)', description: 'Základní jednotka elektrického napětí. Baterie: 1,5V, zásuvka: 230V' },
                { name: 'Kilovolt (kV)', description: 'Vysoké napětí pro vedenia a rozvod elektrické energie. 1 kV = 1000 V' },
                { name: 'Milivolt (mV)', description: 'Malé napětí v elektronice a senzorech. 1 mV = 0,001 V' },
                { name: 'Napětí (obecně)', description: 'Elektrický potenciál mezi dvěma body. Měří se voltmetrem' },
                { name: 'Batterie 12V', description: 'Standardní napětí automobilových baterií a nízkovoltových systémů' },
                { name: 'Vysokoteplotní vedenia', description: 'Přenos elektrické energie na velké vzdálenosti. 110 kV - 750 kV' }
            ],
            
            electric_current: [
                { name: 'Ampér (A)', description: 'Základní jednotka elektrického proudu. Domací pojístkae: 16A, 25A' },
                { name: 'Miliampér (mA)', description: 'Malý proud v elektronice a zařízeních na baterie. 1 mA = 0,001 A' },
                { name: 'Kiloampér (kA)', description: 'Velký proud v průmyslu a zkratech. 1 kA = 1000 A' },
                { name: 'Proud (obecně)', description: 'Tok elektrických nábojů vodičem. Měří se ampérmetrem' },
                { name: 'Mikroampér (μA)', description: 'Velmi malý proud v čipů a přesných přístrojů. 1 μA = 0,000001 A' },
                { name: 'Domací proud', description: 'Typický proud v domácnosti. Žárovka: 0,4A, mikrovlnka: 10A' }
            ],
            
            electric_resistance: [
                { name: 'Ohm (Ω)', description: 'Základní jednotka elektrického odporu pojmenovaná po G. S. Ohmovi' },
                { name: 'Kiloohm (kΩ)', description: 'Střední odpor v elektronice, hodnoty rezistorů. 1 kΩ = 1000 Ω' },
                { name: 'Megaohm (MΩ)', description: 'Velký odpor pro izolační materiály. 1 MΩ = 1 000 000 Ω' },
                { name: 'Odpor (obecně)', description: 'Míra odporu proti průtoku elektrického proudu' },
                { name: 'Milliohm (mΩ)', description: 'Velmi malý odpor u vodičů a kontaktů. 1 mΩ = 0,001 Ω' },
                { name: 'Gigaohm (GΩ)', description: 'Obrovský odpor u izolátorů. 1 GΩ = 1 000 000 000 Ω' }
            ],
            
            electric_charge: [
                { name: 'Coulomb (C)', description: 'Základní jednotka elektrického náboje pojmenovaná po C. A. Coulombovi' },
                { name: 'Ampérhodina (Ah)', description: 'Kapacita baterií - kolik proudu da baterie za hodinu. 1 Ah = 3600 C' },
                { name: 'Miliampérhodina (mAh)', description: 'Kapacita malých baterií (telefony, hodiny). 1 mAh = 3,6 C' },
                { name: 'Kiloampérhodina (kAh)', description: 'Kapacita velkých baterií (auta, elektrárny). 1 kAh = 3 600 000 C' },
                { name: 'Watthodina (Wh)', description: 'Energie uložená v bateriích. mAh × napětí = Wh' },
                { name: 'Elektron', description: 'Základní elektrický náboj. 1 C = 6,24 × 10¹⁸ elektronů' }
            ],
            
            fuel: [
                { name: 'MPG (US)', description: 'Americký způsob měření spotřeby. Více MPG = úspornější auto. 1 US galon = 3,785 l' },
                { name: 'MPG (Imperial)', description: 'Britský způsob měření spotřeby. Imperial galon je větší než US galon. 1 imp gal = 4,546 l' },
                { name: 'l/100 km', description: 'Evropský způsob měření spotřeby. Méně litrů = úspornější auto. Opačná logika než MPG' },
                { name: 'km/l', description: 'Kolik kilometrů ujede auto s 1 litrem paliva. Více km/l = úspornější auto' },
                { name: 'Spotřeba CNG', description: 'Spotřeba stlačeného zemního plynu. Měří se v kg/100km nebo m³/100km' },
                { name: 'Hybridní spotřeba', description: 'Kombinovaná spotřeba elektrické a fosilní energie u hybridů' }
            ]
        };
    }
    
    init() {
        this.bindEvents();
        this.hydrateFromUrl();
        this.updateCategory(this.currentCategory || 'length');
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
        
        // Informace o jednotkách
        this.updateUnitInfo();
        
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
        } else if (this.currentCategory === 'fuel') {
            result = this.convertFuel(inputValue, fromUnit, toUnit);
        } else {
            result = this.convertStandard(inputValue, fromUnit, toUnit);
        }
        
        if (result !== null) {
            const rounded = this.roundResult(result);
            outputElement.value = rounded;
            
            const fromName = this.conversions[this.currentCategory].units[fromUnit].name;
            const toName = this.conversions[this.currentCategory].units[toUnit].name;
            
            resultDisplay.innerHTML = `<strong>${inputValue} ${fromName} = ${rounded} ${toName}</strong>`;
            
            // Update URL parameters for sharing
            const params = new URLSearchParams({
                cat: this.currentCategory,
                from: fromUnit,
                to: toUnit,
                v: inputValue || ''
            });
            history.replaceState(null, '', '?' + params.toString());
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
    
    hydrateFromUrl() {
        const p = new URLSearchParams(location.search);
        const cat = p.get('cat'), from = p.get('from'), to = p.get('to'), v = p.get('v');
        if (cat && this.conversions[cat]) this.currentCategory = cat;
        
        setTimeout(() => {
            this.populateUnits();
            const fs = document.getElementById('from-unit');
            const ts = document.getElementById('to-unit');
            if (from) fs.value = from;
            if (to) ts.value = to;
            if (v !== null) document.getElementById('input-value').value = v;
            this.convert();
        }, 50);
    }
}

// Inicializace po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    // Malá pauza pro jistotu, že DOM je připraven
    setTimeout(() => {
        window.converter = new UnitConverter();
    }, 10);
});