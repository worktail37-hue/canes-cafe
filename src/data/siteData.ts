/**
 * CENTRAL SITE CONTENT & VERIFIED BUSINESS SPECIFICATION
 * 
 * Edit all text, items, verified hours, contact details, and images here.
 * Placeholders [CAFE NAME], [CITY AND EXACT ADDRESS], [VERIFIED PHONE],
 * [VERIFIED HOURS], and [VERIFIED LINKS] can be easily customized.
 */

export interface CoffeeItem {
  id: string;
  name: string;
  subtitle: string;
  volume: string;
  price: string;
  rating: number;
  reviewsCount: number;
  tag: string;
  image: string;
  description: string;
  dietary?: string;
}

export interface BakeryItem {
  id: string;
  name: string;
  category: 'pastries' | 'cakes' | 'breads';
  price: string;
  image: string;
  description: string;
  dietary?: string;
  freshTime?: string;
}

export interface PastaItem {
  id: string;
  name: string;
  category: 'pasta';
  price: string;
  image: string;
  description: string;
  dietary?: string;
  originNotes?: string;
}

export interface SideItem {
  id: string;
  name: string;
  category: 'sides';
  price: string;
  image: string;
  description: string;
  dietary?: string;
  dip?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'food' | 'coffee' | 'bakery' | 'interior';
  categoryLabel: string;
  url: string;
  alt: string;
  caption: string;
}

export interface FeaturedCategory {
  id: string;
  title: string;
  kicker: string;
  description: string;
  itemCount: string;
  image: string;
  filterTarget: 'coffee' | 'bakery' | 'pasta' | 'sides';
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface RoastLevel {
  id: string;
  name: string;
  profile: string;
  origin: string;
  elevation: string;
  process: string;
  notes: string[];
  description: string;
  image: string;
}

export interface BeanOrigin {
  id: string;
  name: string;
  roastId: string;
  country: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  elevation: string;
  process: string;
  variety: string;
  roastProfile: 'Light' | 'Medium' | 'Dark';
  flavorNotes: string[];
  harvestSeason: string;
  farmOrCoop: string;
  description: string;
  brewMethod: string;
  pricePerBag: string;
  image: string;
  inStock: boolean;
}

export const SITE_DATA = {
  brand: {
    name: "CANE'S SERVE",
    tagline: "Specialty Coffee, Artisan Bakery, Fresh Pasta & Sides",
    descriptor: "Western-Style Cafe, Bakery & Bistro",
    est: "EST. 2026",
  },

  navigation: [
    { label: "Home", href: "#hero" },
    { label: "Featured", href: "#categories" },
    { label: "Coffee Bar", href: "#our-coffee" },
    { label: "Pasta & Sides", href: "#pastas-and-sides" },
    { label: "Our Story", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Location", href: "#location" },
  ],

  hero: {
    headlineTop: "CRAFTED WITH",
    headlineBottom: "INTENTION",
    subtext:
      "A neighborhood Western-style cafe celebrating single-origin coffees, slow-fermented wild sourdoughs, fresh handcrafted pastas, and golden hand-cut fries.",
    searchPlaceholder: "Explore coffee, sourdough, fresh pasta, or sides...",
    baristaPhoto:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    cupWithBeansPhoto:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    stats: [
      { label: "Single-Origin Coffees", value: "8+ Roasts" },
      { label: "Fresh Bakes Daily", value: "6:00 AM" },
      { label: "Fresh Extruded Pasta", value: "Handcrafted" },
      { label: "Kennebec Fries", value: "Double-Fried" },
    ],
  },

  ticker: [
    "SPECIALTY ESPRESSO",
    "HANDCRAFTED TAGLIOLINI",
    "COUNTRY SOURDOUGH",
    "ROSEMARY PARMESAN FRIES",
    "RIGATONI BOLOGNESE",
    "BURNT BASQUE CHEESECAKE",
    "20-HR COLD BREW",
    "TRUFFLE FRITES",
    "BUTTER CROISSANT",
    "CACIO E PEPE",
    "DOUBLE CORTADO",
    "ROASTED GARLIC FOCACCIA",
  ],

  featuredCategories: [
    {
      id: "cat-coffee",
      title: "Specialty Coffee Bar",
      kicker: "Direct Trade Micro-Lots",
      description: "Dialed-in espresso, velvety flat whites, single-origin pour overs, and 20-hour cold-steeped brew.",
      itemCount: "7 Selections",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      filterTarget: "coffee",
    },
    {
      id: "cat-bakery",
      title: "Artisan Bakery & Breads",
      kicker: "Stone-Deck Hearth Bakes",
      description: "36-hour slow-fermented wild sourdough loaves, 81-layer flaky butter croissants, and burnt Basque cheesecakes.",
      itemCount: "6 Selections",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      filterTarget: "bakery",
    },
    {
      id: "cat-pasta",
      title: "Handcrafted Pasta",
      kicker: "Fresh Bronze-Die Dough",
      description: "House-made ribbons and extruded pastas tossed in rich slow-braised ragu, summer truffle butter, or fresh pesto.",
      itemCount: "6 Selections",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
      filterTarget: "pasta",
    },
    {
      id: "cat-sides",
      title: "Crispy Fries & House Sides",
      kicker: "Hand-Cut & Double-Fried",
      description: "Rosemary parmesan Kennebec fries, white truffle frites, golden herbed polenta cubes, and crisp heirloom salads.",
      itemCount: "6 Selections",
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
      filterTarget: "sides",
    },
  ] as FeaturedCategory[],

  coffeeSection: {
    title: "COFFEE BAR",
    subtitle:
      "Crafted with precision on custom multi-boiler machinery. Roasted fresh weekly to reveal vibrant origin nuances.",
    items: [
      {
        id: "c1",
        name: "VELVET LATTE",
        subtitle: "House Signature",
        volume: "240 ml",
        price: "$4.80",
        rating: 4.9,
        reviewsCount: 128,
        tag: "Bestseller",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
        description: "Double espresso gently folded into textured oat or whole milk with sweet hazelnut and toffee undertones.",
        dietary: "Vegetarian · Dairy or Oat (Dairy-Free Option)",
      },
      {
        id: "c2",
        name: "CLASSIC CAPPUCCINO",
        subtitle: "Traditional 1:1:1",
        volume: "180 ml",
        price: "$4.50",
        rating: 4.8,
        reviewsCount: 94,
        tag: "House Classic",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
        description: "Equal thirds of rich espresso, sweet steamed milk, and dense micro-aerated foam dusted with cacao.",
        dietary: "Vegetarian · Oat Milk Option",
      },
      {
        id: "c3",
        name: "DOUBLE CORTADO",
        subtitle: "Equal Balance",
        volume: "130 ml",
        price: "$4.20",
        rating: 4.9,
        reviewsCount: 86,
        tag: "Barista Favorite",
        image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
        description: "Two ristretto shots softened with an equal pour of velvety milk in a heavy Gibraltar glass.",
        dietary: "Vegetarian · Oat Milk Option",
      },
      {
        id: "c4",
        name: "COLD BREW RESERVE",
        subtitle: "20-Hour Slow Drip",
        volume: "320 ml",
        price: "$5.20",
        rating: 4.8,
        reviewsCount: 110,
        tag: "Ultra Smooth",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
        description: "Single-origin beans steeped chilled for 20 hours. Deep chocolate clarity with exceptionally low acidity.",
        dietary: "Vegan · Dairy-Free · Gluten-Free",
      },
      {
        id: "c5",
        name: "PURE FLAT WHITE",
        subtitle: "Antipodean Cut",
        volume: "160 ml",
        price: "$4.60",
        rating: 4.8,
        reviewsCount: 102,
        tag: "Silky",
        image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80",
        description: "Double ristretto crowned with glossy micro-foam, delivering intense espresso flavor with a rounded finish.",
        dietary: "Vegetarian · Oat Milk Option",
      },
      {
        id: "c6",
        name: "SINGLE ORIGIN POUR-OVER",
        subtitle: "Manual V60 Extraction",
        volume: "300 ml",
        price: "$5.60",
        rating: 4.9,
        reviewsCount: 74,
        tag: "Single Estate",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
        description: "Hand-poured Ethiopian or Colombian micro-lot highlighting floral jasmine, stone fruit, and bright bergamot notes.",
        dietary: "Vegan · Dairy-Free · Gluten-Free",
      },
    ] as CoffeeItem[],
  },

  bakerySection: {
    title: "BAKERY & ARTISAN BREAD",
    subtitle:
      "Hand-shaped before dawn and pulled hot from stone-deck ovens. Made with natural wild sourdough culture and European butter.",
    items: [
      {
        id: "b1",
        name: "BUTTER CROISSANT",
        category: "pastries",
        price: "$3.90",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
        description: "Flaky, honeycomb interior layered with 81 folds of PDO Normandy cultured butter and French flour.",
        dietary: "Vegetarian",
        freshTime: "Baked 6:00 AM",
      },
      {
        id: "b2",
        name: "CARDAMOM CINNAMON KNOT",
        category: "pastries",
        price: "$4.40",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        description: "Braided Scandinavian dough enriched with freshly ground green cardamom pods, brown sugar, and pearl sugar.",
        dietary: "House Favorite",
        freshTime: "Baked 6:30 AM",
      },
      {
        id: "b3",
        name: "COUNTRY SOURDOUGH LOAF",
        category: "breads",
        price: "$7.50",
        image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80",
        description: "36-hour wild-levain whole grain loaf with caramelized blistered crust, deep malt aroma, and custardy crumb.",
        dietary: "Vegan · Wild Ferment",
        freshTime: "Baked 7:00 AM",
      },
      {
        id: "b4",
        name: "ROSEMARY & SEA SALT FOCACCIA",
        category: "breads",
        price: "$5.80",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
        description: "Extra virgin olive oil dough generously dimpled with fresh rosemary sprigs, roasted garlic cloves, and Maldon flakes.",
        dietary: "Vegan",
        freshTime: "Warm Cut",
      },
      {
        id: "b5",
        name: "BURNT BASQUE CHEESECAKE",
        category: "cakes",
        price: "$6.50",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
        description: "Caramelized charred exterior yielding to an ultra-creamy, molten center scented with real Tahitian vanilla beans.",
        dietary: "Gluten-Free Friendly",
        freshTime: "Chilled Slice",
      },
      {
        id: "b6",
        name: "PAIN AU CHOCOLAT",
        category: "pastries",
        price: "$4.20",
        image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=600&q=80",
        description: "Crisp laminated butter pastry enveloping two batons of 66% single-origin French dark chocolate.",
        dietary: "Vegetarian",
        freshTime: "Baked 6:30 AM",
      },
    ] as BakeryItem[],
  },

  pastaSection: {
    title: "HANDCRAFTED FRESH PASTA",
    subtitle:
      "Bronze-die extruded and hand-rolled daily using organic durum semolina and pasture-raised eggs. Cooked strictly al dente.",
    items: [
      {
        id: "p1",
        name: "TRUFFLE TAGLIOLINI",
        category: "pasta",
        price: "$17.50",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
        description: "Delicate fresh egg ribbons tossed in white truffle butter emulsion, 24-month aged Parmigiano Reggiano, and cracked pepper.",
        dietary: "Vegetarian",
        originNotes: "Fresh extruded egg pasta",
      },
      {
        id: "p2",
        name: "RIGATONI BOLOGNESE",
        category: "pasta",
        price: "$16.80",
        image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=600&q=80",
        description: "Ridged bronze-die rigatoni coated in slow-braised beef, pork, and pancetta ragù with San Marzano tomatoes and Grana Padano.",
        dietary: "Slow Braised",
        originNotes: "6-hour simmered sauce",
      },
      {
        id: "p3",
        name: "CACIO E PEPE BUCATINI",
        category: "pasta",
        price: "$15.20",
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80",
        description: "Hollow bucatini tossed with toasted Tellicherry black pepper and creamy emulsified Pecorino Romano cheese broth.",
        dietary: "Vegetarian",
        originNotes: "Roman classic",
      },
      {
        id: "p4",
        name: "BASIL GENOVESE GNOCCHI",
        category: "pasta",
        price: "$16.40",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
        description: "Pillow-soft hand-rolled potato gnocchi tossed in aromatic Ligurian basil pesto, toasted pine nuts, and dollops of sheep's milk ricotta.",
        dietary: "Vegetarian",
        originNotes: "Hand-rolled daily",
      },
      {
        id: "p5",
        name: "SPICY VODKA RIGATONI",
        category: "pasta",
        price: "$15.90",
        image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=600&q=80",
        description: "House-made rigatoni in a fiery tomato vodka cream sauce with Calabrian chilies, sweet basil, and shaved pecorino.",
        dietary: "Vegetarian",
        originNotes: "Calabrian chili kick",
      },
      {
        id: "p6",
        name: "WILD MUSHROOM PAPPARDELLE",
        category: "pasta",
        price: "$17.20",
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80",
        description: "Wide ribbon egg pasta with pan-seared chanterelle and cremini mushrooms, garlic herb white wine glaze, and fresh thyme.",
        dietary: "Vegetarian",
        originNotes: "Forest mushrooms",
      },
    ] as PastaItem[],
  },

  sidesSection: {
    title: "CRISPY FRIES & SIDES",
    subtitle:
      "Hand-cut Idaho Kennebec potatoes double-fried in clean sunflower oil, accompanied by house-whipped aiolis and fresh accompaniments.",
    items: [
      {
        id: "s1",
        name: "ROSEMARY PARMESAN FRIES",
        category: "sides",
        price: "$6.80",
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
        description: "Crispy double-fried hand-cut Kennebec potatoes tossed with fresh garden rosemary needles, coarse sea salt, and aged Parmigiano Reggiano.",
        dietary: "Vegetarian · Gluten-Free Friendly",
        dip: "Garlic roasted aioli",
      },
      {
        id: "s2",
        name: "TRUFFLE PARMESAN FRITES",
        category: "sides",
        price: "$7.90",
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600&q=80",
        description: "Golden shoestring frites drizzled with aromatic white truffle oil, fine snipped chives, and Pecorino shavings.",
        dietary: "Vegetarian · Gluten-Free Friendly",
        dip: "Smoked black pepper mayo",
      },
      {
        id: "s3",
        name: "CRISPY HERBED POLENTA BITES",
        category: "sides",
        price: "$7.20",
        image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
        description: "Golden-crusted polenta cubes infused with rosemary and thyme, finished with grated cheese and served with warm marinara.",
        dietary: "Vegetarian · Gluten-Free Friendly",
        dip: "San Marzano marinara",
      },
      {
        id: "s4",
        name: "HEIRLOOM CAFE GREEN SALAD",
        category: "sides",
        price: "$8.40",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
        description: "Crisp baby gem lettuce, watermelon radishes, cucumber ribbons, and toasted Oregon hazelnuts in a light lemon-shallot vinaigrette.",
        dietary: "Vegan · Dairy-Free · Gluten-Free",
        dip: "House vinaigrette",
      },
      {
        id: "s5",
        name: "WARM GARLIC FOCACCIA SLICE",
        category: "sides",
        price: "$4.50",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
        description: "Thick sourdough focaccia slice pan-toasted with roasted garlic herb butter and crunchy sea salt.",
        dietary: "Vegetarian",
        dip: "Extra virgin olive oil",
      },
      {
        id: "s6",
        name: "SPICED ROASTED CAULIFLOWER",
        category: "sides",
        price: "$7.50",
        image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80",
        description: "Oven-caramelized spiced cauliflower florets with toasted cumin, lemon tahini drizzle, and fresh mint.",
        dietary: "Vegan · Gluten-Free",
        dip: "Lemon tahini",
      },
    ] as SideItem[],
  },

  gallerySection: {
    title: "MOMENTS AT THE CAFE",
    subtitle:
      "A peek into our espresso bar, stone ovens, fresh pasta board, and sunlit seating. Click any photo to expand in full detail.",
    photos: [
      {
        id: "g1",
        title: "Truffle Tagliolini Plating",
        category: "food",
        categoryLabel: "Pasta",
        url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
        alt: "Freshly tossed truffle tagliolini pasta with parmigiano shavings on rustic ceramic plate",
        caption: "Handcrafted tagliolini ribbons tossed in white truffle butter emulsion.",
      },
      {
        id: "g2",
        title: "Morning Espresso Extraction",
        category: "coffee",
        categoryLabel: "Coffee",
        url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
        alt: "Barista pulling fresh single-origin espresso with thick golden hazelnut crema",
        caption: "Single-origin Ethiopian Yirgacheffe pulled at 9 bars of pressure.",
      },
      {
        id: "g3",
        title: "Golden Sourdough Loaf Slice",
        category: "bakery",
        categoryLabel: "Bakery",
        url: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=85",
        alt: "Country sourdough loaf cut open revealing open airy crumb and blistered crust",
        caption: "36-hour slow wild levain fermentation with stone-ground flours.",
      },
      {
        id: "g4",
        title: "Rosemary Parmesan Kennebec Fries",
        category: "food",
        categoryLabel: "Sides",
        url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=85",
        alt: "Crispy double-fried hand-cut french fries tossed with rosemary and parmesan",
        caption: "Hand-cut Idaho Kennebec potatoes double-fried to golden perfection.",
      },
      {
        id: "g5",
        title: "Flaky Butter Croissant Layers",
        category: "bakery",
        categoryLabel: "Bakery",
        url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85",
        alt: "Freshly baked butter croissant showing delicate flaky pastry layers",
        caption: "81 laminated layers of pure Normandy cultured butter.",
      },
      {
        id: "g6",
        title: "Slow-Braised Rigatoni Bolognese",
        category: "food",
        categoryLabel: "Pasta",
        url: "https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=1200&q=85",
        alt: "Bronze-die rigatoni pasta coated in rich slow-simmered bolognese meat sauce",
        caption: "Rich three-meat ragù simmered slowly with San Marzano tomatoes.",
      },
      {
        id: "g7",
        title: "Warm Wooden Cafe Interior",
        category: "interior",
        categoryLabel: "Atmosphere",
        url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85",
        alt: "Cozy Western cafe seating with warm wood tables and soft ambient lighting",
        caption: "Natural daylight, vintage oak seating, and the aroma of roasted coffee.",
      },
      {
        id: "g8",
        title: "Artisanal Velvet Latte Art",
        category: "coffee",
        categoryLabel: "Coffee",
        url: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=85",
        alt: "Ceramic cup with detailed rosetta latte art on smooth velvet microfoam",
        caption: "Silky micro-foam poured over double-shot espresso.",
      },
    ] as GalleryPhoto[],
  },

  storySection: {
    title: "OUR PHILOSOPHY",
    kicker: "The Modern Western Cafe",
    headline: "HONEST FOOD & UNCOMPROMISED CRAFT",
    lead: "We created CANE'S SERVE to bring together the quiet discipline of a third-wave coffee bar with the soul-nourishing warmth of an all-day bakery and fresh pasta house.",
    paragraphs: [
      "Every morning starts before dawn with our bakers kneading natural levain doughs and pulling crisp butter croissants from the stone-deck ovens. By mid-morning, the pasta board begins rolling fresh ribbons of tagliolini and extruding ridged rigatoni through traditional bronze dies.",
      "We source our single-origin coffees directly from heritage estates above 1,700 meters, ensuring farmers receive fair premiums. From our hand-cut double-fried Kennebec potatoes to our 36-hour sourdough loaves, nothing is rushed and nothing comes from a pre-made mix.",
      "Whether you are dropping in for a 10-minute espresso at our zinc bar, sharing a bowl of truffle tagliolini with friends, or picking up a warm country loaf on your evening walk home, you are always welcome here.",
    ],
    pillars: [
      {
        title: "Direct-Trade Terroir",
        description: "Ethically sourced micro-lot beans roasted in small batches to preserve floral clarity and fruit sweetness.",
      },
      {
        title: "36-Hour Wild Levain",
        description: "Stone-ground flours and natural slow wild fermentation for enhanced digestibility and complex flavor.",
      },
      {
        title: "Bronze-Die Extrusion",
        description: "Pasta made daily with organic semolina, creating rough micro-textured surfaces that grip every sauce.",
      },
      {
        title: "Hand-Cut Potatoes",
        description: "Locally sourced Kennebec russets, soaked and double-fried in clean sunflower oil with garden herbs.",
      },
    ],
  },

  roastingSection: {
    title: "OUR ROASTING PHILOSOPHY",
    subtitle: "Cast-iron drum micro-roasts honoring terroir and high-altitude origins.",
    roasts: [
      {
        id: "light",
        name: "YIRGACHEFFE LOT #4",
        profile: "Light Roast",
        origin: "Gedeo Zone, Ethiopia",
        elevation: "1,950m",
        process: "Washed Heirloom",
        notes: ["Jasmine", "Bergamot", "Peach Tea"],
        description: "Delicate floral perfume with sparkling stone fruit acidity and crisp honeyed finish.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "medium",
        name: "HUILA MONTEBLANCO",
        profile: "Medium Roast",
        origin: "San Agustín, Colombia",
        elevation: "1,850m",
        process: "Extended Washed",
        notes: ["Toffee", "Red Apple", "Praline"],
        description: "Juicy sweet crispness layered over smooth melted caramel and buttery macadamia.",
        image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "dark",
        name: "GAYO HIGHLANDS RESERVE",
        profile: "Dark Roast",
        origin: "Aceh Province, Sumatra",
        elevation: "1,550m",
        process: "Wet-Hulled Organic",
        notes: ["Dark Cocoa", "Cedar", "Molasses"],
        description: "Heavy syrupy body with spicy nutmeg undertones, smoky cacao, and virtually zero acidity.",
        image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80",
      },
    ] as RoastLevel[],
  },

  beanOrigins: [
    {
      id: "bo-ethiopia",
      name: "Ethiopia Yirgacheffe Konga Lot #4",
      roastId: "light",
      country: "Ethiopia",
      region: "Gedeo Zone, Yirgacheffe",
      coordinates: [6.1629, 38.2058],
      elevation: "1,950m – 2,200m",
      process: "Fully Washed & Raised African Bed Sun-Dried",
      variety: "Indigenous Kurume & Dega Heirlooms",
      roastProfile: "Light",
      flavorNotes: ["Jasmine Blossoms", "Bergamot", "White Peach", "Honeyed Earl Grey"],
      harvestSeason: "November – February",
      farmOrCoop: "Konga Smallholder Washing Station, Gedeo",
      description: "Grown at soaring elevations where cold highland nights slow cherry maturation. Delivers an ethereal cup with vibrant floral aromatics, sparkling stone fruit acidity, and lingering bergamot sweetness.",
      brewMethod: "V60 Pour-Over · Chemex (1:16 ratio)",
      pricePerBag: "$18.50 / 250g",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      inStock: true,
    },
    {
      id: "bo-colombia",
      name: "Colombia Huila Finca Monteblanco",
      roastId: "medium",
      country: "Colombia",
      region: "San Agustín, Southern Huila",
      coordinates: [1.8812, -76.2694],
      elevation: "1,800m – 1,950m",
      process: "Extended Cold-Fermentation Washed",
      variety: "Pink Bourbon & Caturra",
      roastProfile: "Medium",
      flavorNotes: ["Crisp Red Apple", "Toffee Caramel", "Milk Chocolate", "Toasted Praline"],
      harvestSeason: "May – August",
      farmOrCoop: "Finca Monteblanco · Producer Rodrigo Sanchez",
      description: "Perched above the winding headwaters of the Magdalena River on rich volcanic soil. Expert cold-fermentation amplifies sweet orchard fruit acidity while maintaining a silky, butter-praline finish.",
      brewMethod: "Aeropress · Balanced Flat White Espresso",
      pricePerBag: "$17.50 / 250g",
      image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=600&q=80",
      inStock: true,
    },
    {
      id: "bo-sumatra",
      name: "Sumatra Gayo Highlands Reserve",
      roastId: "dark",
      country: "Indonesia",
      region: "Lake Laut Tawar, Central Aceh, Sumatra",
      coordinates: [4.6293, 96.8451],
      elevation: "1,450m – 1,600m",
      process: "Traditional Giling Basah (Triple-Sorted Wet-Hulled)",
      variety: "Ateng & Typica Varieties",
      roastProfile: "Dark",
      flavorNotes: ["85% Dark Cocoa", "Smoky Cedar", "Black Molasses", "Sweet Nutmeg"],
      harvestSeason: "October – January",
      farmOrCoop: "Ketiara Women-Led Smallholder Cooperative",
      description: "Cultivated in volcanic humus under tropical rainforest canopies. Wet-hulling produces an unctuous syrupy body, deep cedarwood aromatics, rich cocoa sweetness, and virtually zero astringency.",
      brewMethod: "French Press · Moka Pot · 20-Hour Cold Brew",
      pricePerBag: "$18.00 / 250g",
      image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80",
      inStock: true,
    },
    {
      id: "bo-guatemala",
      name: "Guatemala Antigua Pastoral Finca Medina",
      roastId: "medium",
      country: "Guatemala",
      region: "Panchoy Valley, Antigua",
      coordinates: [14.5586, -90.7295],
      elevation: "1,600m – 1,750m",
      process: "Mountain Spring Washed & Patio Sun-Dried",
      variety: "Bourbon & Red Catuai",
      roastProfile: "Medium",
      flavorNotes: ["Candied Blood Orange", "Bittersweet Cocoa", "Roasted Almond", "Brown Butter"],
      harvestSeason: "January – April",
      farmOrCoop: "Finca Medina Heritage Estate (Rainforest Alliance)",
      description: "Surrounded by volcanoes Agua, Fuego, and Acatenango. Mineral-dense volcanic pumice, shade-tree canopy, and cool mountain breezes foster slow-ripened cherries with rich chocolate complexity.",
      brewMethod: "Batch Drip · Cafe Cortado Base",
      pricePerBag: "$17.00 / 250g",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
      inStock: true,
    },
    {
      id: "bo-kenya",
      name: "Kenya Nyeri Peaberry Gakuyu-ini",
      roastId: "light",
      country: "Kenya",
      region: "Aberdare Mountain Range, Nyeri County",
      coordinates: [-0.4197, 36.9507],
      elevation: "1,750m – 2,050m",
      process: "Double 24-Hour Fermentation & Washed with River Water",
      variety: "SL-28 & SL-34 Peaberry (Single Round Seeds)",
      roastProfile: "Light",
      flavorNotes: ["Blackcurrant Wine", "Ruby Grapefruit", "Red Currant", "Sparkling Muscovado"],
      harvestSeason: "November – January",
      farmOrCoop: "Gakuyu-ini Wet Mill · Thirikwa Farmers Coop",
      description: "Rare single-cherry peaberry seeds that receive dense nutrient concentration. Features electrifying phosphoric acidity, deep red currant notes, and a long, sparkling berry wine finish.",
      brewMethod: "Kalita Wave 185 · Japanese Flash Iced Filter",
      pricePerBag: "$19.50 / 250g",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
      inStock: true,
    },
    {
      id: "bo-costarica",
      name: "Costa Rica Tarrazú La Pastora Honey",
      roastId: "medium",
      country: "Costa Rica",
      region: "San Marcos, Tarrazú Valley",
      coordinates: [9.6644, -84.0286],
      elevation: "1,700m – 1,850m",
      process: "Yellow Honey (50% Mucilage Retained)",
      variety: "Caturra & Villa Sarchi",
      roastProfile: "Medium",
      flavorNotes: ["Wildflower Honey", "Golden Raisin", "Ripe Damson Plum", "Graham Cracker"],
      harvestSeason: "December – March",
      farmOrCoop: "CoopeTarrazú Sustainable Micro-Lots",
      description: "Carefully pulped with fragrant cherry pectin intact, then turned hourly on raised solarium drying beds. Naturally sweet, clean honeycomb notes harmonize with silky stone fruit nuances.",
      brewMethod: "Siphon / Clever Dripper / Morning Filter",
      pricePerBag: "$18.00 / 250g",
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80",
      inStock: true,
    },
  ] as BeanOrigin[],

  reviewsSection: {
    title: "WHAT OUR GUESTS SAY",
    subtitle: "From morning espresso lovers to slow weekend pasta diners.",
    items: [
      {
        id: "r1",
        name: "Elena Rostova",
        location: "Artisan Quarter",
        role: "Architect & Regular",
        comment: "The sourdough and tagliolini are unmatched. Cane's brings the warmth of a true European cafe to our neighborhood.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "r2",
        name: "Marcus Vance",
        location: "Pearl District",
        role: "Coffee Roaster & Traveler",
        comment: "Their single origin pour-overs are dialed to perfection. The Huila medium roast is my weekly go-to bean.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "r3",
        name: "Sophie Chen",
        location: "Downtown",
        role: "Local Food Writer",
        comment: "The rosemary parmesan Kennebec fries and cardamom buns are worth the trip across town alone. Pure craft.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },

  ctaBanner: {
    headline: "YOUR PERFECT CUP AWAITS",
    subtext: "Step into the scent of roasted beans and warm ovens. Explore our handcrafted menu, enjoy a warm seat in our cafe, or get in touch with our team.",
    buttonText: "Explore Full Menu",
    secondaryText: "Visit & Contact",
    mosaic: [
      { title: "Velvet Latte", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80" },
      { title: "Country Sourdough", image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80" },
      { title: "Truffle Tagliolini", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80" },
      { title: "Kennebec Fries", image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80" },
    ],
  },

  locationSection: {
    title: "HOURS & LOCATION",
    subtitle: "Walk-ins warmly welcomed every day. No reservation or online order needed.",
    address: "[CITY AND EXACT ADDRESS]",
    city: "[CITY]",
    state: "[STATE]",
    phone: "[VERIFIED PHONE]",
    whatsapp: "+1 (555) 234-5678",
    hours: [
      { days: "Monday – Friday", time: "6:30 AM – 6:00 PM" },
      { days: "Saturday", time: "7:00 AM – 7:00 PM" },
      { days: "Sunday", time: "7:30 AM – 5:00 PM" },
    ],
    bakingSchedule: "Warm batches come out of the ovens at 6:30 AM and 1:00 PM daily.",
    kitchenSchedule: "Coffee and bakery service opens at 6:30 AM. Fresh pasta & hot savory sides served from 11:30 AM until close daily.",
    transitTips: "Street parking available along the block. Two-hour customer parking garage situated 50 meters away. Bike racks directly out front.",
  },

  footer: {
    blurb:
      "CANE'S SERVE is an independent Western-style cafe dedicated to specialty coffee, fresh bronze-die pasta, and crispy hand-cut sides.",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Featured Pillars", href: "#categories" },
          { label: "Coffee Bar", href: "#our-coffee" },
          { label: "Pasta's & Sides", href: "#pastas-and-sides" },
          { label: "Artisan Bakery", href: "#pastas-and-sides" },
          { label: "Cane's Stickers", href: "#stickers" },
        ],
      },
      {
        title: "About",
        links: [
          { label: "Our Story", href: "#story" },
          { label: "Roasting Craft", href: "#story" },
          { label: "Craft & Philosophy", href: "#story" },
          { label: "Photo Gallery", href: "#gallery" },
          { label: "Visiting FAQ", href: "#faq" },
        ],
      },
      {
        title: "Visit & Contact",
        links: [
          { label: "Hours & Directions", href: "#location" },
          { label: "Google Maps Route", href: "https://maps.google.com/?q=[CITY+AND+EXACT+ADDRESS]" },
          { label: "Call Us", href: "tel:[VERIFIED_PHONE]" },
          { label: "WhatsApp Enquiries", href: "https://wa.me/15552345678" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Instagram", href: "https://instagram.com/[VERIFIED_LINKS]" },
          { label: "Facebook", href: "https://facebook.com/[VERIFIED_LINKS]" },
          { label: "TikTok", href: "https://tiktok.com/@[VERIFIED_LINKS]" },
          { label: "X / Twitter", href: "https://x.com/[VERIFIED_LINKS]" },
        ],
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Accessibility Statement", href: "#" },
    ],
    copyright: "© 2026 CANE'S SERVE. All rights reserved.",
  },
};
