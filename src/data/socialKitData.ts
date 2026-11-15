/**
 * CANE'S SERVE - 20 VIRAL TRENDING STICKERS
 * Styled strictly after the user's uploaded reference aesthetics:
 * 1. Chunky hand-drawn organic comic lettering with heavy ink shadows (like "WEIRD")
 * 2. Vintage halftone dot-matrix / crosshatch screen print illustrations with cream die-cut sticker borders (like the Brain wearing headphones)
 * 3. Pop-culture, relatable humor positive to CANE'S SERVE
 * 4. Exactly 20 STICKERS only. All banners removed.
 */

export interface StickerItem {
  id: string;
  name: string;
  trendHook: string;
  quote: string;
  category: 'trending' | 'halftone' | 'retro-comic' | 'mood';
  width: number;
  height: number;
  description: string;
  svgContent: string;
}

export const SOCIAL_STICKERS: StickerItem[] = [
  // 1. BRAIN WITH HEADPHONES ON DOPAMINE (Direct aesthetic from user's image 2)
  {
    id: 'sticker-01',
    name: "Brain On Cane's Serve (100% Dopamine)",
    trendHook: 'Dopamine Hit',
    quote: "BRAIN ON CANE'S SERVE: 100% DOPAMINE",
    category: 'halftone',
    width: 440,
    height: 440,
    description: 'Vintage halftone screenprint brain with DJ headphones vibing on Cane\'s Serve espresso.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 440" width="440" height="440">
        <defs>
          <pattern id="htDots01" patternUnits="userSpaceOnUse" width="6" height="6">
            <circle cx="3" cy="3" r="1.8" fill="#1F1A16"/>
          </pattern>
          <pattern id="htCross01" patternUnits="userSpaceOnUse" width="8" height="8">
            <path d="M 0,4 L 8,4 M 4,0 L 4,8" stroke="#1F1A16" stroke-width="1.2"/>
          </pattern>
        </defs>

        <!-- Thick Die-Cut Cream Sticker Border Contour -->
        <path d="M 90,60 C 130,25 310,25 350,60 C 390,95 415,160 415,220 C 415,310 370,390 320,410 C 260,430 180,430 120,410 C 70,390 25,310 25,220 C 25,160 50,95 90,60 Z"
              fill="#FBF4DE" stroke="#2A231E" stroke-width="6" stroke-linejoin="round"/>

        <!-- Headband Arc -->
        <path d="M 90,190 C 85,100 140,55 220,55 C 300,55 355,100 350,190" fill="none" stroke="#2A231E" stroke-width="24" stroke-linecap="round"/>
        <path d="M 90,190 C 85,100 140,55 220,55 C 300,55 355,100 350,190" fill="none" stroke="#FBF4DE" stroke-width="8" stroke-dasharray="8 6"/>

        <!-- Halftone Brain Silhouette -->
        <g transform="translate(220, 230)">
          <!-- Left Hemisphere -->
          <path d="M -8,-90 C -60,-85 -105,-40 -105,20 C -105,75 -65,115 -10,125 C -5,70 -5,20 -8,-90 Z" fill="url(#htDots01)" stroke="#2A231E" stroke-width="3"/>
          <!-- Right Hemisphere -->
          <path d="M 8,-90 C 60,-85 105,-40 105,20 C 105,75 65,115 10,125 C 5,70 5,20 8,-90 Z" fill="url(#htDots01)" stroke="#2A231E" stroke-width="3"/>

          <!-- Brain Convolutions -->
          <path d="M -80,-20 Q -50,-40 -20,-20 T -70,30 T -20,60" fill="none" stroke="#2A231E" stroke-width="4" stroke-linecap="round"/>
          <path d="M 80,-20 Q 50,-40 20,-20 T 70,30 T 20,60" fill="none" stroke="#2A231E" stroke-width="4" stroke-linecap="round"/>
          <path d="M -60,-60 Q -30,-70 -15,-50" fill="none" stroke="#2A231E" stroke-width="4" stroke-linecap="round"/>
          <path d="M 60,-60 Q 30,-70 15,-50" fill="none" stroke="#2A231E" stroke-width="4" stroke-linecap="round"/>
        </g>

        <!-- Ear Cups (Left & Right) with Halftone Texture -->
        <rect x="52" y="165" width="46" height="95" rx="14" fill="#2A231E"/>
        <rect x="58" y="172" width="34" height="81" rx="10" fill="#FBF4DE"/>
        <rect x="62" y="176" width="26" height="73" rx="6" fill="url(#htCross01)"/>

        <rect x="342" y="165" width="46" height="95" rx="14" fill="#2A231E"/>
        <rect x="348" y="172" width="34" height="81" rx="10" fill="#FBF4DE"/>
        <rect x="352" y="176" width="26" height="73" rx="6" fill="url(#htCross01)"/>

        <!-- Relatable Humor Banner Badge -->
        <g transform="translate(220, 370)">
          <path d="M -175,-22 L 175,-22 L 165,22 L -165,22 Z" fill="#2A231E"/>
          <path d="M -172,-19 L 172,-19 L 162,19 L -162,19 Z" fill="#C9A24B"/>
          <text x="0" y="7" font-family="'Impact', 'Arial Black', sans-serif" font-size="16" font-weight="900" fill="#1F1A16" text-anchor="middle" letter-spacing="1">
            CANE'S SERVE = DOPAMINE
          </text>
        </g>
      </svg>
    `,
  },

  // 2. CHUNKY DRIPPING COMIC LETTERING (Direct aesthetic from user's image 1 "WEIRD")
  {
    id: 'sticker-02',
    name: "Pure Delusion & Cane's Serve",
    trendHook: 'Powered by Delusion',
    quote: "POWERED BY CANE'S SERVE & PURE DELUSION",
    category: 'retro-comic',
    width: 480,
    height: 230,
    description: 'Chunky organic dripping comic lettering with heavy rugged black drop shadow.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 230" width="480" height="230">
        <!-- Die-Cut Cream Outer Sticker Contour -->
        <path d="M 25,25 Q 240,5 455,25 Q 470,115 455,205 Q 240,225 25,205 Q 10,115 25,25 Z"
              fill="#F5ECD6" stroke="#1F1A16" stroke-width="6" stroke-linejoin="round"/>

        <!-- Rugged Heavy Drop Shadow Block -->
        <text x="245" y="98" font-family="'Impact', 'Arial Black', sans-serif" font-size="62" font-weight="900" fill="#1F1A16" text-anchor="middle" letter-spacing="3" transform="rotate(-2 240 95)">
          CANE'S SERVE
        </text>

        <!-- Front Organic Chunky Cream / Gold Lettering -->
        <text x="240" y="92" font-family="'Impact', 'Arial Black', sans-serif" font-size="62" font-weight="900" fill="#FAF6ED" stroke="#1F1A16" stroke-width="4" stroke-linejoin="round" text-anchor="middle" letter-spacing="3" transform="rotate(-2 240 95)">
          CANE'S SERVE
        </text>

        <!-- Relatable Humorous Trend Tagline -->
        <rect x="55" y="132" width="370" height="42" rx="8" fill="#1F1A16"/>
        <text x="240" y="159" font-family="'Impact', 'Arial Black', sans-serif" font-size="18" fill="#E6C875" text-anchor="middle" letter-spacing="1.5">
          ★ POWERED BY PURE DELUSION ★
        </text>

        <text x="240" y="196" font-family="monospace" font-size="11" font-weight="900" fill="#2A231E" text-anchor="middle" letter-spacing="3">
          100% HIGH OCTANE VIBES
        </text>
      </svg>
    `,
  },

  // 3. EMOTIONAL SUPPORT ICED LATTE
  {
    id: 'sticker-03',
    name: "Emotional Support Latte",
    trendHook: 'Emotional Support Item',
    quote: "DO NOT TALK TO ME BEFORE CANE'S SERVE",
    category: 'trending',
    width: 380,
    height: 440,
    description: 'Retro cool cartoon iced latte with vintage halftone shading and sunglasses.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 440" width="380" height="440">
        <defs>
          <pattern id="htDots03" patternUnits="userSpaceOnUse" width="5" height="5">
            <circle cx="2.5" cy="2.5" r="1.5" fill="#1F1A16"/>
          </pattern>
        </defs>

        <!-- Die-Cut Cream Outer Silhouette -->
        <path d="M 80,40 L 300,40 L 330,130 L 300,380 L 80,380 L 50,130 Z"
              fill="#FBF4DE" stroke="#2A231E" stroke-width="7" stroke-linejoin="round"/>

        <!-- Straw -->
        <rect x="230" y="15" width="22" height="95" rx="8" fill="#C9A24B" stroke="#2A231E" stroke-width="4" transform="rotate(16 240 50)"/>

        <!-- Cup Body -->
        <polygon points="90,120 290,120 270,360 110,360" fill="#FAF6ED" stroke="#2A231E" stroke-width="6"/>

        <!-- Halftone Liquid Level -->
        <polygon points="95,170 285,170 268,355 112,355" fill="url(#htDots03)"/>

        <!-- Dark Cool Sunglasses on Cup -->
        <path d="M 125,185 L 180,185 L 175,215 L 130,215 Z" fill="#1F1A16" stroke="#2A231E" stroke-width="3"/>
        <path d="M 200,185 L 255,185 L 250,215 L 205,215 Z" fill="#1F1A16" stroke="#2A231E" stroke-width="3"/>
        <line x1="180" y1="195" x2="200" y2="195" stroke="#1F1A16" stroke-width="4"/>

        <!-- Cane's Serve Wordmark Center Badge -->
        <rect x="110" y="245" width="160" height="55" rx="8" fill="#C9A24B" stroke="#2A231E" stroke-width="4"/>
        <text x="190" y="272" font-family="'Impact', sans-serif" font-size="20" font-weight="900" fill="#1F1A16" text-anchor="middle">
          CANE'S SERVE
        </text>
        <text x="190" y="291" font-family="monospace" font-size="9" font-weight="700" fill="#1F1A16" text-anchor="middle" letter-spacing="1">
          EMOTIONAL SUPPORT
        </text>

        <!-- Bottom Warning Label -->
        <text x="190" y="415" font-family="'Impact', sans-serif" font-size="14" fill="#1F1A16" text-anchor="middle" letter-spacing="1">
          DO NOT SPEAK TO ME BEFORE THIS
        </text>
      </svg>
    `,
  },

  // 4. MY ROMAN EMPIRE
  {
    id: 'sticker-04',
    name: "My Roman Empire is Cane's Serve",
    trendHook: 'My Roman Empire',
    quote: "MY ROMAN EMPIRE IS CANE'S SERVE PASTA",
    category: 'trending',
    width: 440,
    height: 380,
    description: 'Roman marble statue bust wearing sunglasses eating pasta with halftone texture.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 380" width="440" height="380">
        <defs>
          <pattern id="htDots04" patternUnits="userSpaceOnUse" width="6" height="6">
            <circle cx="3" cy="3" r="1.8" fill="#2A231E"/>
          </pattern>
        </defs>

        <!-- Die-Cut Cream Sticker Contour -->
        <path d="M 40,50 Q 220,10 400,50 Q 425,180 395,330 Q 220,370 45,330 Q 15,180 40,50 Z"
              fill="#F5ECD6" stroke="#2A231E" stroke-width="7" stroke-linejoin="round"/>

        <!-- Top Header Ribbon -->
        <rect x="55" y="45" width="330" height="40" rx="8" fill="#2A231E"/>
        <text x="220" y="71" font-family="'Impact', sans-serif" font-size="18" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          MY ROMAN EMPIRE?
        </text>

        <!-- Big Bold Chunky Text (Like WEIRD Image 1) -->
        <text x="224" y="148" font-family="'Impact', sans-serif" font-size="52" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>
        <text x="220" y="144" font-family="'Impact', sans-serif" font-size="52" fill="#FAF6ED" stroke="#1F1A16" stroke-width="3" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>

        <!-- Halftone Fork & Laurel Leaves -->
        <circle cx="220" cy="225" r="55" fill="url(#htDots04)"/>
        <circle cx="220" cy="225" r="48" fill="#F5ECD6" stroke="#2A231E" stroke-width="3"/>
        <text x="220" y="235" font-family="serif" font-size="34" font-weight="900" fill="#C9A24B" text-anchor="middle">🍝</text>

        <!-- Subtext -->
        <rect x="70" y="295" width="300" height="34" rx="6" fill="#C9A24B" stroke="#2A231E" stroke-width="2"/>
        <text x="220" y="318" font-family="'Impact', sans-serif" font-size="15" fill="#1F1A16" text-anchor="middle" letter-spacing="1">
          THINKING ABOUT TRUFFLE TAGLIOLINI 24/7
        </text>
      </svg>
    `,
  },

  // 5. LET HIM COOK
  {
    id: 'sticker-05',
    name: "Let Cane's Serve Cook",
    trendHook: 'Let Him Cook',
    quote: "HOLD ON... LET CANE'S SERVE COOK",
    category: 'trending',
    width: 420,
    height: 420,
    description: 'Chef hat with retro comic fire and pasta fork halftone illustration.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" width="420" height="420">
        <defs>
          <pattern id="htDots05" patternUnits="userSpaceOnUse" width="5" height="5">
            <circle cx="2.5" cy="2.5" r="1.6" fill="#1F1A16"/>
          </pattern>
        </defs>

        <!-- Die-Cut Cream Contour -->
        <circle cx="210" cy="210" r="195" fill="#FBF4DE" stroke="#2A231E" stroke-width="7"/>

        <!-- Flame Halftone Aura -->
        <path d="M 210,50 Q 250,110 280,85 Q 270,160 320,180 Q 260,200 280,260 Q 210,240 180,310 Q 170,230 110,220 Q 150,170 120,120 Q 180,140 210,50 Z"
              fill="url(#htDots05)" stroke="#2A231E" stroke-width="3"/>

        <!-- Chef Hat Silhouette -->
        <path d="M 160,200 C 130,170 140,110 180,110 C 190,80 230,80 240,110 C 280,110 290,170 260,200 Z" fill="#FAF6ED" stroke="#2A231E" stroke-width="4"/>
        <rect x="165" y="195" width="90" height="25" rx="4" fill="#C9A24B" stroke="#2A231E" stroke-width="3"/>

        <!-- Big Chunky Catchphrase -->
        <text x="214" y="274" font-family="'Impact', sans-serif" font-size="34" fill="#1F1A16" text-anchor="middle">
          HOLD ON...
        </text>
        <text x="210" y="270" font-family="'Impact', sans-serif" font-size="34" fill="#FAF6ED" stroke="#1F1A16" stroke-width="2.5" text-anchor="middle">
          HOLD ON...
        </text>

        <rect x="50" y="295" width="320" height="50" rx="10" fill="#2A231E"/>
        <text x="210" y="328" font-family="'Impact', sans-serif" font-size="22" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          LET CANE'S SERVE COOK
        </text>

        <text x="210" y="375" font-family="monospace" font-size="11" font-weight="900" fill="#2A231E" text-anchor="middle">
          ★ BRONZE-DIE PASTA PERFECTION ★
        </text>
      </svg>
    `,
  },

  // 6. CHEAPER THAN THERAPY
  {
    id: 'sticker-06',
    name: "Cheaper Than Therapy Prescription",
    trendHook: 'Cheaper Than Therapy',
    quote: "CANE'S SERVE: CHEAPER THAN THERAPY",
    category: 'mood',
    width: 440,
    height: 320,
    description: 'Retro pharmacy Rx label sticker with halftone stamp and coffee dosage.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" width="440" height="320">
        <!-- Die-Cut Cream Sticker Contour -->
        <rect x="15" y="15" width="410" height="290" rx="20" fill="#FBF4DE" stroke="#2A231E" stroke-width="7"/>

        <!-- Rx Header -->
        <rect x="35" y="35" width="370" height="50" rx="8" fill="#2A231E"/>
        <text x="60" y="70" font-family="serif" font-size="36" font-weight="900" fill="#C9A24B">℞</text>
        <text x="230" y="68" font-family="'Impact', sans-serif" font-size="24" fill="#FAF6ED" text-anchor="middle" letter-spacing="2">
          OFFICIAL PRESCRIPTION
        </text>

        <!-- Main Body -->
        <text x="220" y="130" font-family="'Impact', sans-serif" font-size="38" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>
        <text x="220" y="165" font-family="'Impact', sans-serif" font-size="24" fill="#C9A24B" stroke="#1F1A16" stroke-width="1.5" text-anchor="middle">
          ★ CHEAPER THAN THERAPY ★
        </text>

        <!-- Dosage Instructions -->
        <line x1="45" y1="185" x2="395" y2="185" stroke="#2A231E" stroke-width="2" stroke-dasharray="4 4"/>
        <text x="220" y="215" font-family="monospace" font-size="13" font-weight="700" fill="#2A231E" text-anchor="middle">
          DOSAGE: 1 DOUBLE ESPRESSO + 1 RIGATONI
        </text>
        <text x="220" y="238" font-family="monospace" font-size="11" fill="#8C7B6E" text-anchor="middle">
          REFILLS: UNLIMITED • NO COPAY REQUIRED
        </text>

        <rect x="90" y="255" width="260" height="28" rx="6" fill="#1F1A16"/>
        <text x="220" y="274" font-family="monospace" font-size="10" font-weight="900" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          100% CURE FOR BAD DAYS
        </text>
      </svg>
    `,
  },

  // 7. MAIN CHARACTER ENERGY
  {
    id: 'sticker-07',
    name: "Main Character Energy",
    trendHook: 'Main Character Energy',
    quote: "WALKING INTO CANE'S SERVE LIKE THE MAIN CHARACTER",
    category: 'trending',
    width: 440,
    height: 340,
    description: 'Chunky 70s retro bubble lettering with halftone starburst.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 340" width="440" height="340">
        <defs>
          <pattern id="htDots07" patternUnits="userSpaceOnUse" width="6" height="6">
            <circle cx="3" cy="3" r="2" fill="#2A231E"/>
          </pattern>
        </defs>

        <!-- Die-Cut Cream Contour -->
        <path d="M 30,50 Q 220,10 410,50 Q 430,170 410,290 Q 220,330 30,290 Q 10,170 30,50 Z"
              fill="#F5ECD6" stroke="#2A231E" stroke-width="7" stroke-linejoin="round"/>

        <!-- Halftone Sunburst Backdrop -->
        <circle cx="220" cy="170" r="110" fill="url(#htDots07)"/>

        <!-- Drop Shadow Layer -->
        <text x="224" y="114" font-family="'Impact', sans-serif" font-size="44" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          MAIN CHARACTER
        </text>
        <text x="220" y="110" font-family="'Impact', sans-serif" font-size="44" fill="#FAF6ED" stroke="#1F1A16" stroke-width="3" text-anchor="middle" letter-spacing="2">
          MAIN CHARACTER
        </text>

        <!-- Cane's Serve Centerpiece -->
        <rect x="70" y="135" width="300" height="60" rx="12" fill="#2A231E"/>
        <text x="220" y="177" font-family="'Impact', sans-serif" font-size="34" fill="#C9A24B" text-anchor="middle" letter-spacing="3">
          CANE'S SERVE
        </text>

        <!-- Relatable Punchline -->
        <text x="224" y="244" font-family="'Impact', sans-serif" font-size="26" fill="#1F1A16" text-anchor="middle">
          ENERGY UNLOCKED ⚡
        </text>
        <text x="220" y="240" font-family="'Impact', sans-serif" font-size="26" fill="#FAF6ED" stroke="#1F1A16" stroke-width="2" text-anchor="middle">
          ENERGY UNLOCKED ⚡
        </text>

        <text x="220" y="285" font-family="monospace" font-size="11" font-weight="900" fill="#2A231E" text-anchor="middle">
          SOUNDTRACK: 1960s ACOUSTIC FOLK
        </text>
      </svg>
    `,
  },

  // 8. SOCIAL BATTERY LOW
  {
    id: 'sticker-08',
    name: "Social Battery: 1% // Cane's Serve: 99%",
    trendHook: 'Social Battery',
    quote: "SOCIAL BATTERY AT 1% • RECHARGED BY CANE'S SERVE",
    category: 'mood',
    width: 440,
    height: 300,
    description: 'Vintage battery icon with lightning coffee bean and halftone charging bars.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 300" width="440" height="300">
        <!-- Die-Cut Cream Contour -->
        <rect x="15" y="15" width="410" height="270" rx="24" fill="#FBF4DE" stroke="#2A231E" stroke-width="7"/>

        <!-- Battery Outer Shell -->
        <rect x="45" y="45" width="320" height="80" rx="14" fill="#FAF6ED" stroke="#2A231E" stroke-width="5"/>
        <rect x="368" y="65" width="18" height="40" rx="4" fill="#2A231E"/>

        <!-- Charging Levels -->
        <rect x="55" y="55" width="60" height="60" rx="8" fill="#C9A24B" stroke="#2A231E" stroke-width="2"/>
        <rect x="120" y="55" width="60" height="60" rx="8" fill="#C9A24B" stroke="#2A231E" stroke-width="2"/>
        <rect x="185" y="55" width="60" height="60" rx="8" fill="#C9A24B" stroke="#2A231E" stroke-width="2"/>
        <rect x="250" y="55" width="60" height="60" rx="8" fill="#C9A24B" stroke="#2A231E" stroke-width="2"/>
        <rect x="315" y="55" width="40" height="60" rx="6" fill="#2A231E"/>

        <text x="220" y="165" font-family="'Impact', sans-serif" font-size="22" fill="#2A231E" text-anchor="middle">
          SOCIAL BATTERY: 1%
        </text>

        <!-- Solution Banner -->
        <rect x="50" y="185" width="340" height="52" rx="10" fill="#2A231E"/>
        <text x="220" y="220" font-family="'Impact', sans-serif" font-size="24" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE: 99% ⚡
        </text>

        <text x="220" y="265" font-family="monospace" font-size="10" font-weight="900" fill="#2A231E" text-anchor="middle" letter-spacing="1">
          FASTEST RECHARGE IN THE CITY
        </text>
      </svg>
    `,
  },

  // 9. CAFFEINE BEFORE CORTISOL
  {
    id: 'sticker-09',
    name: "Caffeine Before Cortisol",
    trendHook: 'Cortisol Awakening',
    quote: "CAFFEINE BEFORE CORTISOL • CANE'S SERVE RULES",
    category: 'mood',
    width: 420,
    height: 400,
    description: 'Retro hourglass with coffee dripping and halftone comic shading.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 400" width="420" height="400">
        <defs>
          <pattern id="htDots09" patternUnits="userSpaceOnUse" width="6" height="6">
            <circle cx="3" cy="3" r="2" fill="#1F1A16"/>
          </pattern>
        </defs>

        <!-- Die-Cut Cream Contour -->
        <circle cx="210" cy="200" r="185" fill="#F5ECD6" stroke="#2A231E" stroke-width="7"/>

        <!-- Halftone Circle -->
        <circle cx="210" cy="200" r="150" fill="url(#htDots09)"/>
        <circle cx="210" cy="200" r="135" fill="#FAF6ED" stroke="#2A231E" stroke-width="4"/>

        <text x="210" y="105" font-family="'Impact', sans-serif" font-size="26" fill="#1F1A16" text-anchor="middle" letter-spacing="1">
          CAFFEINE BEFORE
        </text>
        <text x="210" y="140" font-family="'Impact', sans-serif" font-size="34" fill="#C9A24B" stroke="#1F1A16" stroke-width="2" text-anchor="middle" letter-spacing="2">
          CORTISOL
        </text>

        <!-- Hourglass / Coffee Dripper -->
        <path d="M 170,160 L 250,160 L 210,210 L 250,260 L 170,260 L 210,210 Z" fill="#2A231E"/>
        <circle cx="210" cy="235" r="8" fill="#C9A24B"/>

        <!-- Brand Ribbon -->
        <rect x="60" y="280" width="300" height="48" rx="8" fill="#2A231E"/>
        <text x="210" y="312" font-family="'Impact', sans-serif" font-size="24" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>
        <text x="210" y="355" font-family="monospace" font-size="11" font-weight="900" fill="#2A231E" text-anchor="middle">
          MORNING CORTISOL PROTOCOL
        </text>
      </svg>
    `,
  },

  // 10. I WAS TOLD THERE WOULD BE PASTA
  {
    id: 'sticker-10',
    name: "I Was Told There Would Be Pasta",
    trendHook: 'I Was Told There Would Be...',
    quote: "I WAS TOLD THERE WOULD BE CANE'S SERVE PASTA",
    category: 'trending',
    width: 460,
    height: 320,
    description: 'Chunky vintage comic speech bubble with giant fork and twirled noodles.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 320" width="460" height="320">
        <!-- Die-Cut Cream Contour -->
        <path d="M 30,30 Q 230,10 430,30 Q 450,150 430,270 Q 230,290 30,270 Q 10,150 30,30 Z"
              fill="#FBF4DE" stroke="#2A231E" stroke-width="7" stroke-linejoin="round"/>

        <text x="230" y="80" font-family="'Impact', sans-serif" font-size="22" fill="#2A231E" text-anchor="middle" letter-spacing="1">
          I ONLY SHOWED UP BECAUSE...
        </text>

        <!-- Big Chunky Dripping Text (WEIRD style) -->
        <text x="234" y="144" font-family="'Impact', sans-serif" font-size="46" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>
        <text x="230" y="140" font-family="'Impact', sans-serif" font-size="46" fill="#FAF6ED" stroke="#1F1A16" stroke-width="3" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>

        <rect x="60" y="165" width="340" height="52" rx="10" fill="#2A231E"/>
        <text x="230" y="200" font-family="'Impact', sans-serif" font-size="24" fill="#C9A24B" text-anchor="middle" letter-spacing="2">
          PROMISED ME PASTA 🍝
        </text>

        <text x="230" y="250" font-family="monospace" font-size="11" font-weight="900" fill="#2A231E" text-anchor="middle">
          BRONZE-DIE TRUFFLE TAGLIOLINI ONLY
        </text>
      </svg>
    `,
  },

  // 11. LOCKED IN & AL DENTE
  {
    id: 'sticker-11',
    name: "Locked In & Al Dente",
    trendHook: 'Locked In',
    quote: "LOCKED IN AT CANE'S SERVE",
    category: 'trending',
    width: 380,
    height: 420,
    description: 'Vintage padlock mascot with pasta shackle and halftone comic texture.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 420" width="380" height="420">
        <defs>
          <pattern id="htDots11" patternUnits="userSpaceOnUse" width="5" height="5">
            <circle cx="2.5" cy="2.5" r="1.6" fill="#2A231E"/>
          </pattern>
        </defs>

        <!-- Die-Cut Cream Contour -->
        <rect x="25" y="25" width="330" height="370" rx="28" fill="#F5ECD6" stroke="#2A231E" stroke-width="7"/>

        <!-- Shackle -->
        <path d="M 120,160 L 120,90 C 120,50 260,50 260,90 L 260,160" fill="none" stroke="#2A231E" stroke-width="26" stroke-linecap="round"/>
        <path d="M 120,160 L 120,90 C 120,50 260,50 260,90 L 260,160" fill="none" stroke="#FAF6ED" stroke-width="12" stroke-linecap="round"/>

        <!-- Padlock Body -->
        <rect x="70" y="150" width="240" height="180" rx="20" fill="url(#htDots11)" stroke="#2A231E" stroke-width="5"/>
        <rect x="80" y="160" width="220" height="160" rx="14" fill="#FAF6ED" stroke="#2A231E" stroke-width="4"/>

        <!-- Keyhole -->
        <circle cx="190" cy="210" r="14" fill="#2A231E"/>
        <polygon points="183,210 197,210 200,245 180,245" fill="#2A231E"/>

        <text x="190" y="278" font-family="'Impact', sans-serif" font-size="28" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          LOCKED IN
        </text>

        <rect x="60" y="340" width="260" height="36" rx="8" fill="#2A231E"/>
        <text x="190" y="364" font-family="'Impact', sans-serif" font-size="16" fill="#E6C875" text-anchor="middle" letter-spacing="1.5">
          AT CANE'S SERVE
        </text>
      </svg>
    `,
  },

  // 12. NOT ADDICTED, JUST COMMITTED
  {
    id: 'sticker-12',
    name: "Not Addicted, Just Committed",
    trendHook: 'Not Addicted Just Committed',
    quote: "NOT ADDICTED TO CANE'S SERVE, JUST COMMITTED",
    category: 'mood',
    width: 440,
    height: 340,
    description: 'Skeleton hand raising a steaming ceramic cup with halftone screentone.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 340" width="440" height="340">
        <!-- Die-Cut Cream Contour -->
        <path d="M 30,30 Q 220,5 410,30 Q 430,170 410,310 Q 220,335 30,310 Q 10,170 30,30 Z"
              fill="#FBF4DE" stroke="#2A231E" stroke-width="7" stroke-linejoin="round"/>

        <text x="220" y="75" font-family="'Impact', sans-serif" font-size="22" fill="#2A231E" text-anchor="middle" letter-spacing="1">
          I'M NOT ADDICTED...
        </text>

        <text x="224" y="134" font-family="'Impact', sans-serif" font-size="44" fill="#1F1A16" text-anchor="middle">
          JUST COMMITTED
        </text>
        <text x="220" y="130" font-family="'Impact', sans-serif" font-size="44" fill="#C9A24B" stroke="#1F1A16" stroke-width="2.5" text-anchor="middle">
          JUST COMMITTED
        </text>

        <rect x="60" y="155" width="320" height="54" rx="10" fill="#2A231E"/>
        <text x="220" y="191" font-family="'Impact', sans-serif" font-size="26" fill="#FAF6ED" text-anchor="middle" letter-spacing="3">
          TO CANE'S SERVE ☕
        </text>

        <text x="220" y="240" font-family="monospace" font-size="12" font-weight="900" fill="#2A231E" text-anchor="middle">
          DEATH BEFORE DECAF
        </text>

        <rect x="110" y="260" width="220" height="26" rx="6" fill="#C9A24B"/>
        <text x="220" y="278" font-family="monospace" font-size="10" font-weight="900" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          5 CUPS DEEP &amp; VIBING
        </text>
      </svg>
    `,
  },

  // 13. NEURONS ACTIVATED (BRAIN HALFTONE VARIANT 2)
  {
    id: 'sticker-13',
    name: "Neurons Activated (First Sip)",
    trendHook: 'Neuron Activation',
    quote: "FIRST SIP OF CANE'S SERVE: NEURONS ACTIVATED",
    category: 'halftone',
    width: 420,
    height: 420,
    description: 'Halftone brain with lightning bolts and vintage comic shockwaves.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" width="420" height="420">
        <defs>
          <pattern id="htDots13" patternUnits="userSpaceOnUse" width="6" height="6">
            <circle cx="3" cy="3" r="2" fill="#2A231E"/>
          </pattern>
        </defs>

        <!-- Die-Cut Cream Contour -->
        <circle cx="210" cy="210" r="195" fill="#F5ECD6" stroke="#2A231E" stroke-width="7"/>

        <!-- Halftone Circle -->
        <circle cx="210" cy="180" r="110" fill="url(#htDots13)"/>

        <!-- Lightning Bolts -->
        <polygon points="120,100 150,140 135,145 165,190 130,165 145,160" fill="#C9A24B" stroke="#2A231E" stroke-width="2"/>
        <polygon points="300,100 270,140 285,145 255,190 290,165 275,160" fill="#C9A24B" stroke="#2A231E" stroke-width="2"/>

        <text x="210" y="80" font-family="'Impact', sans-serif" font-size="24" fill="#2A231E" text-anchor="middle">
          FIRST SIP JUST HIT
        </text>

        <!-- Brain Silhouette -->
        <circle cx="180" cy="180" r="50" fill="#FAF6ED" stroke="#2A231E" stroke-width="4"/>
        <circle cx="240" cy="180" r="50" fill="#FAF6ED" stroke="#2A231E" stroke-width="4"/>
        <text x="210" y="195" font-family="'Impact', sans-serif" font-size="34" fill="#2A231E" text-anchor="middle">⚡</text>

        <!-- Big Banner -->
        <rect x="40" y="270" width="340" height="56" rx="12" fill="#2A231E"/>
        <text x="210" y="307" font-family="'Impact', sans-serif" font-size="24" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE ACTIVATED
        </text>

        <text x="210" y="360" font-family="monospace" font-size="12" font-weight="900" fill="#2A231E" text-anchor="middle">
          ALL SYSTEMS FUNCTIONAL
        </text>
      </svg>
    `,
  },

  // 14. CERTIFIED BRAINROT-FREE
  {
    id: 'sticker-14',
    name: "Certified Brainrot-Free",
    trendHook: 'Brainrot Antidote',
    quote: "CANE'S SERVE: 100% CERTIFIED BRAINROT-FREE",
    category: 'trending',
    width: 440,
    height: 320,
    description: 'Vintage government certification seal parody for mindful coffee sipping.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" width="440" height="320">
        <!-- Die-Cut Cream Contour -->
        <rect x="15" y="15" width="410" height="290" rx="24" fill="#FBF4DE" stroke="#2A231E" stroke-width="7"/>

        <rect x="35" y="35" width="370" height="45" rx="8" fill="#2A231E"/>
        <text x="220" y="65" font-family="'Impact', sans-serif" font-size="20" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          ★ OFFICIAL INSPECTION SEAL ★
        </text>

        <text x="224" y="134" font-family="'Impact', sans-serif" font-size="42" fill="#1F1A16" text-anchor="middle">
          CANE'S SERVE
        </text>
        <text x="220" y="130" font-family="'Impact', sans-serif" font-size="42" fill="#FAF6ED" stroke="#1F1A16" stroke-width="2.5" text-anchor="middle">
          CANE'S SERVE
        </text>

        <rect x="65" y="150" width="310" height="50" rx="10" fill="#C9A24B" stroke="#2A231E" stroke-width="3"/>
        <text x="220" y="183" font-family="'Impact', sans-serif" font-size="22" fill="#1F1A16" text-anchor="middle" letter-spacing="1">
          100% BRAINROT-FREE ZONE
        </text>

        <text x="220" y="235" font-family="monospace" font-size="12" font-weight="900" fill="#2A231E" text-anchor="middle">
          REAL TALK • REAL FOOD • REAL COFFEE
        </text>
        <text x="220" y="265" font-family="monospace" font-size="10" fill="#8C7B6E" text-anchor="middle">
          TOUCHING GRASS SINCE 2026
        </text>
      </svg>
    `,
  },

  // 15. DUAL-WIELDING FORK & ESPRESSO
  {
    id: 'sticker-15',
    name: "Dual-Wielding at Cane's Serve",
    trendHook: 'Dual Wielding',
    quote: "DUAL-WIELDING FORK & DOUBLE SHOT AT CANE'S SERVE",
    category: 'trending',
    width: 440,
    height: 340,
    description: 'Vintage comic action badge showing double-handed coffee and pasta eating.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 340" width="440" height="340">
        <!-- Die-Cut Cream Contour -->
        <path d="M 30,30 Q 220,10 410,30 Q 430,170 410,310 Q 220,330 30,310 Q 10,170 30,30 Z"
              fill="#F5ECD6" stroke="#2A231E" stroke-width="7" stroke-linejoin="round"/>

        <text x="220" y="75" font-family="'Impact', sans-serif" font-size="24" fill="#2A231E" text-anchor="middle">
          ⚔️ DUAL-WIELDING ⚔️
        </text>

        <text x="224" y="134" font-family="'Impact', sans-serif" font-size="44" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>
        <text x="220" y="130" font-family="'Impact', sans-serif" font-size="44" fill="#FAF6ED" stroke="#1F1A16" stroke-width="3" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>

        <rect x="50" y="155" width="340" height="54" rx="10" fill="#2A231E"/>
        <text x="220" y="191" font-family="'Impact', sans-serif" font-size="22" fill="#E6C875" text-anchor="middle" letter-spacing="1">
          FORK IN LEFT • SHOT IN RIGHT
        </text>

        <text x="220" y="245" font-family="monospace" font-size="12" font-weight="900" fill="#2A231E" text-anchor="middle">
          MAXIMUM EFFICIENCY PROTOCOL
        </text>
        <text x="220" y="275" font-family="monospace" font-size="10" fill="#8C7B6E" text-anchor="middle">
          WHY CHOOSE WHEN YOU CAN HAVE BOTH?
        </text>
      </svg>
    `,
  },

  // 16. ZERO BAD VIBES DETECTED
  {
    id: 'sticker-16',
    name: "Zero Bad Vibes Detected",
    trendHook: 'Vibe Check Passed',
    quote: "ZERO BAD VIBES DETECTED AT CANE'S SERVE",
    category: 'mood',
    width: 420,
    height: 420,
    description: 'Retro radar screen with coffee bean blip and halftone scanlines.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" width="420" height="420">
        <defs>
          <pattern id="htDots16" patternUnits="userSpaceOnUse" width="6" height="6">
            <circle cx="3" cy="3" r="1.8" fill="#1F1A16"/>
          </pattern>
        </defs>

        <!-- Die-Cut Cream Contour -->
        <circle cx="210" cy="210" r="195" fill="#FBF4DE" stroke="#2A231E" stroke-width="7"/>

        <!-- Radar Outer Circle -->
        <circle cx="210" cy="180" r="115" fill="#FAF6ED" stroke="#2A231E" stroke-width="4"/>
        <circle cx="210" cy="180" r="80" fill="none" stroke="#2A231E" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="210" cy="180" r="45" fill="none" stroke="#2A231E" stroke-width="2"/>
        <line x1="210" y1="65" x2="210" y2="295" stroke="#2A231E" stroke-width="2"/>
        <line x1="95" y1="180" x2="325" y2="180" stroke="#2A231E" stroke-width="2"/>

        <!-- Coffee Bean Target Blip -->
        <ellipse cx="245" cy="145" rx="14" ry="10" fill="#C9A24B" stroke="#2A231E" stroke-width="2"/>

        <rect x="50" y="275" width="320" height="52" rx="10" fill="#2A231E"/>
        <text x="210" y="310" font-family="'Impact', sans-serif" font-size="22" fill="#E6C875" text-anchor="middle" letter-spacing="1">
          ZERO BAD VIBES DETECTED
        </text>

        <text x="210" y="358" font-family="'Impact', sans-serif" font-size="20" fill="#2A231E" text-anchor="middle">
          ★ CANE'S SERVE VIBE CHECK ★
        </text>
      </svg>
    `,
  },

  // 17. IT'S NOT A PHASE, IT'S CANE'S SERVE
  {
    id: 'sticker-17',
    name: "It's Not a Phase, It's Cane's Serve",
    trendHook: "It's Not a Phase",
    quote: "IT'S NOT A PHASE MOM, IT'S CANE'S SERVE",
    category: 'trending',
    width: 440,
    height: 320,
    description: 'Angsty retro comic gothic font sticker with cream die-cut border.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" width="440" height="320">
        <!-- Die-Cut Cream Contour -->
        <rect x="15" y="15" width="410" height="290" rx="20" fill="#F5ECD6" stroke="#2A231E" stroke-width="7"/>

        <text x="220" y="75" font-family="'Impact', sans-serif" font-size="22" fill="#2A231E" text-anchor="middle">
          "IT'S NOT A PHASE, MOM..."
        </text>

        <!-- Giant Rugged Chunky Wordmark -->
        <text x="224" y="144" font-family="'Impact', sans-serif" font-size="46" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>
        <text x="220" y="140" font-family="'Impact', sans-serif" font-size="46" fill="#FAF6ED" stroke="#1F1A16" stroke-width="3" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>

        <rect x="70" y="165" width="300" height="48" rx="8" fill="#2A231E"/>
        <text x="220" y="198" font-family="'Impact', sans-serif" font-size="22" fill="#C9A24B" text-anchor="middle" letter-spacing="1">
          IT'S MY WHOLE LIFESTYLE ☕
        </text>

        <text x="220" y="250" font-family="monospace" font-size="12" font-weight="900" fill="#2A231E" text-anchor="middle">
          ESPRESSO IN VEINS • PASTA IN HEART
        </text>
      </svg>
    `,
  },

  // 18. UNBOTHERED & CAFFEINATED
  {
    id: 'sticker-18',
    name: "Officially Unbothered",
    trendHook: 'Unbothered',
    quote: "UNBOTHERED, MOISTURIZED & FED BY CANE'S SERVE",
    category: 'mood',
    width: 440,
    height: 320,
    description: 'Chill sleeping cat curled around a warm mug with halftone texture.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" width="440" height="320">
        <!-- Die-Cut Cream Contour -->
        <rect x="15" y="15" width="410" height="290" rx="24" fill="#FBF4DE" stroke="#2A231E" stroke-width="7"/>

        <rect x="40" y="40" width="360" height="42" rx="8" fill="#2A231E"/>
        <text x="220" y="68" font-family="'Impact', sans-serif" font-size="20" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          STATUS: UNBOTHERED
        </text>

        <text x="224" y="134" font-family="'Impact', sans-serif" font-size="40" fill="#1F1A16" text-anchor="middle">
          FED &amp; CAFFEINATED
        </text>
        <text x="220" y="130" font-family="'Impact', sans-serif" font-size="40" fill="#FAF6ED" stroke="#1F1A16" stroke-width="2.5" text-anchor="middle">
          FED &amp; CAFFEINATED
        </text>

        <rect x="65" y="150" width="310" height="50" rx="10" fill="#C9A24B"/>
        <text x="220" y="184" font-family="'Impact', sans-serif" font-size="24" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          BY CANE'S SERVE
        </text>

        <text x="220" y="240" font-family="monospace" font-size="12" font-weight="900" fill="#2A231E" text-anchor="middle">
          PEACE OF MIND: 100%
        </text>
        <text x="220" y="265" font-family="monospace" font-size="10" fill="#8C7B6E" text-anchor="middle">
          DON'T TEXT, I'M SIPPING
        </text>
      </svg>
    `,
  },

  // 19. OVERTHINKING BUT CAFFEINATED
  {
    id: 'sticker-19',
    name: "Overthinking But Caffeinated",
    trendHook: 'Overthinking',
    quote: "OVERTHINKING AT 120 WPM THANKS TO CANE'S SERVE",
    category: 'mood',
    width: 440,
    height: 320,
    description: 'Retro typewriter font badge with coffee lightning bolts.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" width="440" height="320">
        <!-- Die-Cut Cream Contour -->
        <rect x="15" y="15" width="410" height="290" rx="20" fill="#F5ECD6" stroke="#2A231E" stroke-width="7"/>

        <text x="220" y="75" font-family="'Impact', sans-serif" font-size="22" fill="#2A231E" text-anchor="middle">
          OVERTHINKING EVERYTHING?
        </text>

        <text x="224" y="134" font-family="'Impact', sans-serif" font-size="42" fill="#1F1A16" text-anchor="middle">
          AT LEAST I'M AT
        </text>
        <text x="220" y="130" font-family="'Impact', sans-serif" font-size="42" fill="#FAF6ED" stroke="#1F1A16" stroke-width="2.5" text-anchor="middle">
          AT LEAST I'M AT
        </text>

        <rect x="55" y="150" width="330" height="54" rx="10" fill="#2A231E"/>
        <text x="220" y="187" font-family="'Impact', sans-serif" font-size="26" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE ☕
        </text>

        <text x="220" y="240" font-family="monospace" font-size="12" font-weight="900" fill="#2A231E" text-anchor="middle">
          OVERTHINKING IN HIGH DEFINITION
        </text>
        <text x="220" y="265" font-family="monospace" font-size="10" fill="#8C7B6E" text-anchor="middle">
          FAST BRAIN • WARM ESPRESSO
        </text>
      </svg>
    `,
  },

  // 20. PROCRASTINATING PROFESSIONALLY
  {
    id: 'sticker-20',
    name: "Procrastinating Professionally",
    trendHook: 'Procrastination Station',
    quote: "PROCRASTINATING PROFESSIONALLY AT CANE'S SERVE",
    category: 'trending',
    width: 440,
    height: 320,
    description: 'Chunky retro office badge declaring Cane\'s Serve as the official co-working hideout.',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" width="440" height="320">
        <!-- Die-Cut Cream Contour -->
        <rect x="15" y="15" width="410" height="290" rx="20" fill="#FBF4DE" stroke="#2A231E" stroke-width="7"/>

        <rect x="40" y="40" width="360" height="42" rx="8" fill="#2A231E"/>
        <text x="220" y="68" font-family="'Impact', sans-serif" font-size="20" fill="#E6C875" text-anchor="middle" letter-spacing="2">
          OFFICIALLY BUSY
        </text>

        <text x="224" y="134" font-family="'Impact', sans-serif" font-size="34" fill="#1F1A16" text-anchor="middle">
          PROCRASTINATING AT
        </text>
        <text x="220" y="130" font-family="'Impact', sans-serif" font-size="34" fill="#FAF6ED" stroke="#1F1A16" stroke-width="2" text-anchor="middle">
          PROCRASTINATING AT
        </text>

        <rect x="55" y="150" width="330" height="54" rx="10" fill="#C9A24B"/>
        <text x="220" y="187" font-family="'Impact', sans-serif" font-size="28" fill="#1F1A16" text-anchor="middle" letter-spacing="2">
          CANE'S SERVE
        </text>

        <text x="220" y="240" font-family="monospace" font-size="12" font-weight="900" fill="#2A231E" text-anchor="middle">
          "WORKING REMOTELY" (EATING PASTA)
        </text>
        <text x="220" y="265" font-family="monospace" font-size="10" fill="#8C7B6E" text-anchor="middle">
          OUT OF OFFICE • SEE YOU AT THE COUNTER
        </text>
      </svg>
    `,
  },
];
