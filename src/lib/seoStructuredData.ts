/**
 * CANE'S COFFEE - SCHEMA.ORG STRUCTURED DATA GENERATOR
 * 
 * Generates verified JSON-LD graphs according to Google Search Central
 * LocalBusiness, CafeOrCoffeeShop, Bakery, WebSite, Menu, and FAQPage guidelines.
 */

import { SEO_CONFIG } from '../config/seoConfig';
import { SITE_DATA } from '../data/siteData';

export function generateStructuredData() {
  // 1. Menu Items Schema (Structured Menu for Cafe & Bakery)
  const coffeeMenuItems = SITE_DATA.coffeeSection.items.map((item) => ({
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    offers: {
      '@type': 'Offer',
      price: item.price.replace('$', ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    suitableForDiet: 'https://schema.org/VegetarianDiet',
  }));

  const bakeryMenuItems = SITE_DATA.bakerySection.items.map((item) => ({
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    offers: {
      '@type': 'Offer',
      price: item.price.replace('$', ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    suitableForDiet: item.dietary?.includes('Gluten-Free')
      ? 'https://schema.org/GlutenFreeDiet'
      : item.dietary?.includes('Vegan')
      ? 'https://schema.org/VeganDiet'
      : 'https://schema.org/VegetarianDiet',
  }));

  const menuSchema = {
    '@type': 'Menu',
    name: "Cane's Coffee & Bakery Daily Menu",
    url: `${SEO_CONFIG.siteUrl}/#menu`,
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Specialty Espresso & Brewed Coffee',
        description: 'Roasted weekly in micro-batches. Single-origin coffees and espresso classics.',
        hasMenuItem: coffeeMenuItems,
      },
      {
        '@type': 'MenuSection',
        name: 'Fresh Morning Bakery & Artisan Breads',
        description: 'Baked fresh in-house at 6:00 AM daily with French cultured butter and stone-ground flour.',
        hasMenuItem: bakeryMenuItems,
      },
    ],
  };

  // 2. Opening Hours Specification for Local Business
  const openingHoursSpec = SEO_CONFIG.openingHoursFormatted.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes,
  }));

  // 3. Primary LocalBusiness Schema (@type: ["CafeOrCoffeeShop", "Bakery"])
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['CafeOrCoffeeShop', 'Bakery'],
    '@id': `${SEO_CONFIG.siteUrl}/#business`,
    name: SEO_CONFIG.businessName,
    legalName: SEO_CONFIG.legalName,
    url: SEO_CONFIG.siteUrl,
    logo: SEO_CONFIG.logoImage,
    image: [
      SEO_CONFIG.defaultShareImage,
      SITE_DATA.hero.baristaPhoto,
      SITE_DATA.hero.cupWithBeansPhoto,
    ],
    description: SEO_CONFIG.description,
    telephone: SEO_CONFIG.phone,
    priceRange: SEO_CONFIG.priceRange,
    servesCuisine: SEO_CONFIG.servesCuisine,
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Apple Pay, Google Pay',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.address.streetAddress,
      addressLocality: SEO_CONFIG.address.addressLocality,
      addressRegion: SEO_CONFIG.address.addressRegion,
      postalCode: SEO_CONFIG.address.postalCode,
      addressCountry: SEO_CONFIG.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geo.latitude,
      longitude: SEO_CONFIG.geo.longitude,
    },
    hasMap: SEO_CONFIG.googleMapsUrl,
    openingHoursSpecification: openingHoursSpec,
    hasMenu: menuSchema,
    sameAs: [
      SEO_CONFIG.socialLinks.instagram,
      SEO_CONFIG.socialLinks.facebook,
      SEO_CONFIG.socialLinks.tiktok,
      SEO_CONFIG.socialLinks.twitter,
    ].filter(Boolean),
    areaServed: {
      '@type': 'City',
      name: SEO_CONFIG.city,
    },

    /*
     * ========================================================================
     * TODO-SEO: REVIEW & AGGREGATE RATING GUIDELINES:
     * NEVER INVENT FAKE REVIEWS OR AGGREGATE RATINGS!
     * Google's spam policies strictly penalize websites using fake review stars.
     * Once you collect genuine customer reviews via Google Business Profile
     * or third-party verified platforms, you can uncomment the block below:
     * 
     * aggregateRating: {
     *   '@type': 'AggregateRating',
     *   ratingValue: '4.9', // TODO-SEO: Replace with real average score from verified reviews
     *   reviewCount: '142', // TODO-SEO: Replace with real review count
     *   bestRating: '5',
     *   worstRating: '1'
     * },
     * ========================================================================
     */
  };

  // 4. WebSite Schema
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}/#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.businessName,
    alternateName: "Cane's Coffee Cafe & Bakery",
    description: SEO_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // 5. FAQPage Schema for Rich Search Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SEO_CONFIG.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // 6. BreadcrumbList Schema for hierarchical search appearance
  const generateBreadcrumbSchema = (sectionName?: string, sectionPath?: string) => {
    const itemListElement: Array<{
      '@type': string;
      position: number;
      name: string;
      item: string;
    }> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SEO_CONFIG.siteUrl,
      },
    ];

    if (sectionName && sectionPath && sectionPath !== '/') {
      itemListElement.push({
        '@type': 'ListItem',
        position: 2,
        name: sectionName,
        item: `${SEO_CONFIG.siteUrl.replace(/\/$/, '')}${sectionPath.startsWith('/') ? sectionPath : '/' + sectionPath}`,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    };
  };

  return {
    localBusinessSchema,
    webSiteSchema,
    faqSchema,
    generateBreadcrumbSchema,
  };
}
