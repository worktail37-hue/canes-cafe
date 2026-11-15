/**
 * CANE'S COFFEE - CENTRAL SEO & LOCAL BUSINESS CONFIGURATION
 * 
 * Every SEO meta tag, JSON-LD schema block, sitemap entry, and on-page NAP
 * (Name, Address, Phone) citation reads directly from this single file.
 * 
 * ============================================================================
 * INSTRUCTIONS FOR USER / DEVELOPER:
 * Search for "TODO-SEO:" in this project to quickly locate all values that must
 * be swapped with real production data before launching your domain.
 * ============================================================================
 */

export interface SeoConfig {
  siteUrl: string;
  businessName: string;
  legalName: string;
  tagline: string;
  taglineWithLocation: string;
  description: string;
  city: string;
  state: string;
  stateCode: string;
  neighborhood: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneRaw: string;
  email: string;
  priceRange: string;
  servesCuisine: string[];
  themeColor: string;
  address: {
    streetAddress: string;
    suite?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  openingHoursFormatted: {
    days: string;
    time: string;
    opens: string;
    closes: string;
    dayOfWeek: string[];
  }[];
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
    twitter: string;
  };
  defaultShareImage: string;
  logoImage: string;
  keywords: {
    primary: string[];
    secondary: string[];
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

export const SEO_CONFIG: SeoConfig = {
  // TODO-SEO: Replace with your actual live custom domain (e.g., https://www.canescoffee.com)
  siteUrl: 'https://www.canescoffee.example',

  // Brand Name & Legal Identity
  businessName: "Cane's Serve",
  legalName: "Cane's Serve LLC",
  tagline: "Specialty Coffee, Artisan Bakery, Fresh Pasta & Sides",

  // Local Intent Headline for SEO Title Tag
  // TODO-SEO: Replace [CITY] with your store's home city (e.g., "Portland, OR")
  taglineWithLocation: "Cane's Serve | Western Cafe, Coffee, Bakery & Pasta in [CITY]",

  // Compelling meta description (140-160 chars) with local keyword & clear call-to-action
  // TODO-SEO: Replace [CITY] and [NEIGHBORHOOD] with your verified locale
  description: "Western-style artisanal cafe serving specialty coffee, slow-fermented breads, handcrafted pasta, and crispy sides in [CITY]. Visit us at [CITY AND EXACT ADDRESS].",

  // Location Identifiers
  // TODO-SEO: Replace with your business city
  city: "[CITY]",
  // TODO-SEO: Replace with your state name
  state: "[STATE]",
  // TODO-SEO: Replace with your 2-letter state abbreviation
  stateCode: "[ST]",
  // TODO-SEO: Replace with your neighborhood / district
  neighborhood: "[NEIGHBORHOOD]",
  // TODO-SEO: Replace with your ZIP / postal code
  postalCode: "[POSTAL CODE]",
  country: "US",

  // Contact Information (Consistent NAP across Google Business Profile, Apple Maps & Yelp)
  // TODO-SEO: Replace with your real business phone number
  phone: "[VERIFIED PHONE]",
  // TODO-SEO: Replace with raw phone for tel: links (e.g., +15550000000)
  phoneRaw: "[VERIFIED PHONE]",
  // TODO-SEO: Replace with your public contact email
  email: "hello@canescafe.example",

  // Schema.org Price Range & Cuisine
  priceRange: "$$",
  servesCuisine: [
    "Coffee",
    "Specialty Espresso",
    "Artisan Bakery",
    "Sourdough Bread",
    "Handcrafted Pasta",
    "Fries & Sides",
    "Western Cafe Cuisine"
  ],

  // Brand Palette Espresso Brown
  themeColor: "#3B332D",

  // Verified Physical Store Address (PostalAddress for Schema.org & NAP consistency)
  // TODO-SEO: Replace with your exact storefront address
  address: {
    streetAddress: "[CITY AND EXACT ADDRESS]",
    suite: "Suite 101",
    addressLocality: "[CITY]",
    addressRegion: "[STATE]",
    postalCode: "[POSTAL CODE]",
    addressCountry: "US",
  },

  // Geo Coordinates (Exact store latitude and longitude for Google Maps and Local SEO)
  // TODO-SEO: Replace with your store's precise latitude and longitude
  geo: {
    latitude: 45.523064,
    longitude: -122.676483,
  },

  // Google Maps Directions link
  // TODO-SEO: Replace with your verified Google Maps listing / CID URL
  googleMapsUrl: "https://maps.google.com/?q=[CITY+AND+EXACT+ADDRESS]",

  // Optional embed URL for interactive map
  // TODO-SEO: If embedding Google Maps iframe, paste your embed URL here
  googleMapsEmbedUrl: "",

  // Standard Store Opening Hours (also converted into schema OpeningHoursSpecification)
  // TODO-SEO: Adjust these opening & closing times to match your actual operating hours
  openingHoursFormatted: [
    {
      days: "Monday – Friday",
      time: "6:30 AM – 6:00 PM",
      opens: "06:30",
      closes: "18:00",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    {
      days: "Saturday",
      time: "7:00 AM – 7:00 PM",
      opens: "07:00",
      closes: "19:00",
      dayOfWeek: ["Saturday"],
    },
    {
      days: "Sunday",
      time: "7:30 AM – 5:00 PM",
      opens: "07:30",
      closes: "17:00",
      dayOfWeek: ["Sunday"],
    },
  ],

  // Social Links (Used for Schema.org 'sameAs' property to link knowledge graph)
  // TODO-SEO: Update with your authentic social media profile URLs
  socialLinks: {
    instagram: "https://instagram.com/[VERIFIED_LINKS]",
    facebook: "https://facebook.com/[VERIFIED_LINKS]",
    tiktok: "https://tiktok.com/@[VERIFIED_LINKS]",
    twitter: "https://x.com/[VERIFIED_LINKS]",
  },

  // Open Graph & Twitter Social Card Image (Recommended size: 1200x630px, < 300KB)
  // TODO-SEO: Replace with high-resolution branded 1200x630 photo showing cafe storefront or signature drink
  defaultShareImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&h=630&q=85",

  // Brand Logo for Schema.org (Square or 1:1 format recommended)
  // TODO-SEO: Upload your transparent SVG or PNG logo to /public/logo.png
  logoImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=512&h=512&q=85",

  // Target Keywords
  keywords: {
    // Primary local intent keywords
    primary: [
      "coffee shop [CITY]",
      "bakery [CITY]",
      "cafe near me",
      "best coffee in [CITY]",
      "best cappuccino in [CITY]",
      "artisan bakery [CITY]",
      "specialty coffee [NEIGHBORHOOD]",
    ],
    // Secondary product & feature keywords
    secondary: [
      "fresh pastries [CITY]",
      "specialty coffee",
      "latte art",
      "freshly roasted beans",
      "sourdough bread [CITY]",
      "burnt basque cheesecake",
      "single origin pour over",
      "micro batch roaster",
      "morning bakery near me",
      "custom cakes [CITY]",
    ],
  },

  // Frequently Asked Questions (FAQ) - Used for On-Page Accordion and FAQPage Schema
  faq: [
    {
      question: "What are your opening hours and when are pastries freshly baked?",
      answer: "We open Monday through Friday from 6:30 AM to 6:00 PM, Saturday from 7:00 AM to 7:00 PM, and Sunday from 7:30 AM to 5:00 PM. Our bakers start at 4:00 AM, and our warm first batch of viennoiseries and sourdough loaves hits the display counter right as doors open at 6:30 AM, with a second fresh bake at 1:00 PM.",
    },
    {
      question: "Where is Cane's Serve located in [CITY], and is parking available?",
      answer: "We are located at [CITY AND EXACT ADDRESS] in [NEIGHBORHOOD], [CITY]. Street parking is conveniently available, and a customer parking garage is located half a block away. Bicycle racks are available directly out front on our patio.",
    },
    {
      question: "Are your croissants and breads baked fresh in-house daily?",
      answer: "Yes, 100% of our breads and viennoiseries are baked from scratch every morning. We use slow wild levain fermentation (up to 36 hours for our country sourdough) and premium European cultured butter.",
    },
    {
      question: "Do you offer vegan, dairy-free, and gluten-conscious options?",
      answer: "Yes. We offer organic oat and almond milk for all coffee drinks. Our menu includes vegan sourdough focaccia, plant-based pasta options, and gluten-conscious dishes clearly noted on our menu.",
    },
    {
      question: "Do I need to make a reservation or order online before visiting?",
      answer: "No reservations or advance online ordering are needed! We are a welcoming, walk-in Western cafe and bistro. Simply come by, find a cozy seat, and enjoy our coffee, bakery treats, handcrafted pastas, and golden sides directly at the counter or table.",
    },
    {
      question: "What savory pasta dishes and sides do you serve?",
      answer: "We prepare handcrafted fresh pasta dishes daily — including Truffle Tagliolini, slow-simmered Rigatoni Bolognese, and Basil Genovese Pesto Gnocchi — alongside double-fried Rosemary Parmesan Fries, Truffle Frites, and fresh garden sides.",
    },
  ],
};

/**
 * Image Naming Convention Guide for Real Assets:
 * ---------------------------------------------
 * When uploading real photos to replace the placeholders, name the files descriptively:
 * - canes-coffee-storefront-[city].jpg
 * - canes-specialty-velvet-latte-art.jpg
 * - canes-fresh-baked-butter-croissant.jpg
 * - canes-country-sourdough-loaf.jpg
 * - canes-giesen-drum-coffee-roasting.jpg
 * - canes-coffee-interior-cozy-seating.jpg
 * - canes-og-share-card-1200x630.jpg
 * This helps Google Image Search index and rank your visual assets locally.
 */
