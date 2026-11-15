import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { SEO_CONFIG } from '../config/seoConfig';
import { generateStructuredData } from '../lib/seoStructuredData';
import { NotFoundPage } from './NotFoundPage';

export interface SectionMetadata {
  id: string;
  name: string;
  routePath: string;
  hash: string;
  elementId: string;
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string[];
}

export const SECTIONS_METADATA: Record<string, SectionMetadata> = {
  hero: {
    id: 'hero',
    name: 'Home',
    routePath: '/',
    hash: '#hero',
    elementId: 'hero',
    title: SEO_CONFIG.taglineWithLocation,
    description: SEO_CONFIG.description,
    canonicalPath: '/',
    keywords: SEO_CONFIG.keywords.primary,
  },
  'pastas-and-sides': {
    id: 'pastas-and-sides',
    name: "Pasta's and Sides",
    routePath: '/pastas-and-sides',
    hash: '#pastas-and-sides',
    elementId: 'pastas-and-sides',
    title: `Handcrafted Pasta's and Sides | ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}`,
    description: `Bronze-die extruded artisan pastas, slow-simmered bolognese, and crispy double-fried Kennebec potato sides at ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}.`,
    canonicalPath: '/pastas-and-sides',
    keywords: [
      `fresh pasta ${SEO_CONFIG.city}`,
      'truffle tagliolini',
      'rigatoni bolognese',
      'cacio e pepe',
      'rosemary parmesan fries',
      'kennebec fries',
    ],
  },
  'our-coffee': {
    id: 'our-coffee',
    name: 'Specialty Coffee Menu',
    routePath: '/menu',
    hash: '#our-coffee',
    elementId: 'our-coffee',
    title: `Specialty Coffee Menu | ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}`,
    description: `Explore ${SEO_CONFIG.businessName} specialty espresso and pour-over menu in ${SEO_CONFIG.city}. Velvet lattes, cold brew reserve, and single-origin roasts.`,
    canonicalPath: '/menu',
    keywords: [
      `specialty coffee ${SEO_CONFIG.city}`,
      'espresso menu',
      'cappuccino',
      'pour over coffee',
      'cold brew',
    ],
  },
  bakery: {
    id: 'bakery',
    name: 'Fresh Bakery & Pastries',
    routePath: '/bakery',
    hash: '#bakery',
    elementId: 'bakery',
    title: `Fresh Bakery & Viennoiserie | ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}`,
    description: `Artisan sourdough loaves, cultured butter croissants, and burnt Basque cheesecake baked fresh daily at 6:00 AM in ${SEO_CONFIG.city}.`,
    canonicalPath: '/bakery',
    keywords: [
      `bakery ${SEO_CONFIG.city}`,
      'fresh croissants',
      'artisan sourdough',
      'morning pastries',
      'burnt basque cheesecake',
    ],
  },
  roasting: {
    id: 'roasting',
    name: 'Cast-Iron Roasting',
    routePath: '/roasting',
    hash: '#roasting',
    elementId: 'roasting',
    title: `Cast-Iron Micro-Batch Roasting | ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}`,
    description: `Discover artisanal micro-batch roasting on our vintage cast-iron drum honoring Ethiopian, Colombian, and Sumatran single origins in ${SEO_CONFIG.city}.`,
    canonicalPath: '/roasting',
    keywords: [
      `coffee roaster ${SEO_CONFIG.city}`,
      'single origin coffee',
      'micro batch roasting',
      'whole bean coffee',
    ],
  },
  about: {
    id: 'about',
    name: 'Our Story',
    routePath: '/about',
    hash: '#about',
    elementId: 'about',
    title: `Our Story & Roasting Craft | ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}`,
    description: `Learn how ${SEO_CONFIG.businessName} crafts micro-batch cast-iron roasts and slow-fermentation bakery favorites in ${SEO_CONFIG.neighborhood}, ${SEO_CONFIG.city}.`,
    canonicalPath: '/about',
    keywords: [
      `about ${SEO_CONFIG.businessName}`,
      `cafe history ${SEO_CONFIG.city}`,
      'coffee roasters story',
    ],
  },
  reviews: {
    id: 'reviews',
    name: 'Customer Reviews',
    routePath: '/reviews',
    hash: '#reviews',
    elementId: 'reviews',
    title: `Customer Reviews & Community | ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}`,
    description: `Read authentic guest impressions of ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}. Velvet lattes, fresh pastries, and warm neighborhood hospitality.`,
    canonicalPath: '/reviews',
    keywords: [
      `reviews ${SEO_CONFIG.businessName}`,
      `best coffee shop reviews ${SEO_CONFIG.city}`,
    ],
  },
  faq: {
    id: 'faq',
    name: 'Frequently Asked Questions',
    routePath: '/faq',
    hash: '#faq',
    elementId: 'faq',
    title: `Frequently Asked Questions & Hours | ${SEO_CONFIG.businessName}`,
    description: `Visiting ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}? Check store hours, parking, fresh baking schedule, vegan milk options, and preorder info.`,
    canonicalPath: '/faq',
    keywords: [
      `${SEO_CONFIG.businessName} hours`,
      `parking near coffee shop ${SEO_CONFIG.city}`,
      'fresh bakery schedule',
      'pre-order coffee',
    ],
  },
  'visit-us': {
    id: 'visit-us',
    name: 'Visit Us & Location',
    routePath: '/contact',
    hash: '#visit-us',
    elementId: 'visit-us',
    title: `Visit Us & Store Hours | ${SEO_CONFIG.businessName} in ${SEO_CONFIG.city}`,
    description: `Visit ${SEO_CONFIG.businessName} at ${SEO_CONFIG.address.streetAddress} in ${SEO_CONFIG.city}. Weekly store hours, phone, WhatsApp, and directions.`,
    canonicalPath: '/contact',
    keywords: [
      `coffee shop near me ${SEO_CONFIG.city}`,
      `directions to ${SEO_CONFIG.businessName}`,
      'cafe opening hours',
    ],
  },
  stickers: {
    id: 'stickers',
    name: "Cane's Stickers",
    routePath: '/stickers',
    hash: '#stickers',
    elementId: 'stickers',
    title: `CANE'S STICKERS | Viral Merch & Photo Overlays | ${SEO_CONFIG.businessName}`,
    description: `Official ${SEO_CONFIG.businessName} die-cut transparent PNG stickers with halftone and retro comic aesthetics. Drop them onto your photos & Instagram stories.`,
    canonicalPath: '/stickers',
    keywords: [
      `${SEO_CONFIG.businessName} stickers`,
      'viral cafe stickers',
      'instagram story stickers',
      'coffee stickers png',
    ],
  },
  'social-kit': {
    id: 'stickers',
    name: "Cane's Stickers",
    routePath: '/stickers',
    hash: '#stickers',
    elementId: 'stickers',
    title: `CANE'S STICKERS | Viral Merch | ${SEO_CONFIG.businessName}`,
    description: `Official ${SEO_CONFIG.businessName} die-cut transparent PNG stickers with halftone and retro comic aesthetics.`,
    canonicalPath: '/stickers',
    keywords: [`${SEO_CONFIG.businessName} stickers`],
  },
  admin: {
    id: 'admin',
    name: "Cane's Serve Manager",
    routePath: '/admin',
    hash: '#admin',
    elementId: 'admin-portal',
    title: `Cane's Serve Manager | Owner Dashboard`,
    description: `Administrative portal and customer lead management for Cane's Serve. Restricted exclusively to verified owner.`,
    canonicalPath: '/admin',
    keywords: [],
  },
};

// Route-to-Section mapping
const ROUTE_TO_SECTION_MAP: Record<string, string> = {
  '/': 'hero',
  '/owner': 'admin',
  '/admin': 'admin',
  '/manager': 'admin',
  '/menu': 'our-coffee',
  '/pastas-and-sides': 'pastas-and-sides',
  '/pasta': 'pastas-and-sides',
  '/sides': 'pastas-and-sides',
  '/catalog': 'pastas-and-sides',
  '/all-menu': 'pastas-and-sides',
  '/bakery': 'pastas-and-sides',
  '/roasting': 'about',
  '/stickers': 'stickers',
  '/social-kit': 'stickers',
  '/banners': 'stickers',
  '/about': 'about',
  '/reviews': 'reviews',
  '/faq': 'faq',
  '/contact': 'visit-us',
  '/visit': 'visit-us',
};

// Hash-to-Section mapping
const HASH_TO_SECTION_MAP: Record<string, string> = {
  '#hero': 'hero',
  '#owner': 'admin',
  '#admin': 'admin',
  '#manager': 'admin',
  '#pastas-and-sides': 'pastas-and-sides',
  '#pasta': 'pastas-and-sides',
  '#sides': 'pastas-and-sides',
  '#menu-catalog': 'pastas-and-sides',
  '#all-menu': 'pastas-and-sides',
  '#our-coffee': 'our-coffee',
  '#menu': 'our-coffee',
  '#bakery': 'pastas-and-sides',
  '#roasting': 'about',
  '#about': 'about',
  '#reviews': 'reviews',
  '#faq': 'faq',
  '#visit-us': 'visit-us',
  '#visit': 'visit-us',
  '#contact': 'visit-us',
};

interface HeadManagerContextType {
  activeSectionId: string;
  activeRoute: string;
  currentMetadata: SectionMetadata;
  navigateTo: (pathOrHash: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const HeadManagerContext = createContext<HeadManagerContextType | null>(null);

export const useHeadManager = () => {
  const context = useContext(HeadManagerContext);
  if (!context) {
    throw new Error('useHeadManager must be used within a HeadManager component');
  }
  return context;
};

interface HeadManagerProps {
  children: React.ReactNode;
}

export const HeadManager: React.FC<HeadManagerProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/\/$/, '') || '/';
    }
    return '/';
  });

  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [is404, setIs404] = useState<boolean>(false);
  const isUserScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Helper to update a <meta> tag by name or property
  const setMetaTag = useCallback((attr: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }, []);

  // Helper to update a <link> tag by rel
  const setLinkTag = useCallback((rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }, []);

  // Update dynamic head metadata and JSON-LD breadcrumbs
  const applyHeadMetadata = useCallback((meta: SectionMetadata) => {
    // 1. Title tag
    document.title = meta.title;

    // 2. Meta description & keywords
    setMetaTag('name', 'description', meta.description);
    if (meta.keywords && meta.keywords.length > 0) {
      setMetaTag('name', 'keywords', meta.keywords.join(', '));
    }

    // 3. Canonical link
    const cleanBase = SEO_CONFIG.siteUrl.replace(/\/$/, '');
    const canonicalUrl = meta.canonicalPath === '/' ? `${cleanBase}/` : `${cleanBase}${meta.canonicalPath}`;
    setLinkTag('canonical', canonicalUrl);

    // 4. Open Graph Social tags
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', canonicalUrl);

    // 5. Twitter Card tags
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:url', canonicalUrl);

    // 6. Update dynamic JSON-LD with structured breadcrumbs
    const scriptId = 'canes-seo-jsonld-dynamic';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const { localBusinessSchema, webSiteSchema, faqSchema, generateBreadcrumbSchema } =
      generateStructuredData();

    const breadcrumbSchema = generateBreadcrumbSchema(
      meta.id !== 'hero' ? meta.name : undefined,
      meta.canonicalPath
    );

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [localBusinessSchema, webSiteSchema, faqSchema, breadcrumbSchema],
    });
  }, [setMetaTag, setLinkTag]);

  // Initial Route & Popstate Handling
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      const hash = window.location.hash;
      setCurrentPath(path);

      if (ROUTE_TO_SECTION_MAP[path]) {
        const secId = ROUTE_TO_SECTION_MAP[path];
        setActiveSectionId(secId);
        setIs404(false);
        const meta = SECTIONS_METADATA[secId];
        if (meta) applyHeadMetadata(meta);

        // Scroll to element if not root
        if (secId !== 'hero') {
          const el = document.getElementById(meta.elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (hash && HASH_TO_SECTION_MAP[hash]) {
        const secId = HASH_TO_SECTION_MAP[hash];
        setActiveSectionId(secId);
        setIs404(false);
        const meta = SECTIONS_METADATA[secId];
        if (meta) applyHeadMetadata(meta);
      } else if (path !== '/') {
        setIs404(true);
        document.title = `Page Not Found | ${SEO_CONFIG.businessName}`;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [applyHeadMetadata]);

  // On mount: check current path or hash, and initialize metadata
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const hash = window.location.hash;

    if (ROUTE_TO_SECTION_MAP[path]) {
      const secId = ROUTE_TO_SECTION_MAP[path];
      setActiveSectionId(secId);
      setIs404(false);
      const meta = SECTIONS_METADATA[secId];
      if (meta) {
        applyHeadMetadata(meta);
        if (secId !== 'hero') {
          setTimeout(() => {
            const el = document.getElementById(meta.elementId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        }
      }
    } else if (hash && HASH_TO_SECTION_MAP[hash]) {
      const secId = HASH_TO_SECTION_MAP[hash];
      setActiveSectionId(secId);
      setIs404(false);
      const meta = SECTIONS_METADATA[secId];
      if (meta) applyHeadMetadata(meta);
    } else if (path !== '/') {
      setIs404(true);
      document.title = `Page Not Found | ${SEO_CONFIG.businessName}`;
    } else {
      setIs404(false);
      applyHeadMetadata(SECTIONS_METADATA.hero);
    }
  }, [applyHeadMetadata]);

  // ScrollSpy: IntersectionObserver to detect active section when user scrolls
  useEffect(() => {
    if (is404) return;

    const sectionElements: { id: string; el: HTMLElement }[] = [];
    Object.values(SECTIONS_METADATA).forEach((sec) => {
      const el = document.getElementById(sec.elementId);
      if (el) {
        sectionElements.push({ id: sec.id, el });
      }
    });

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If a programmatic scroll is active, ignore observer jitter
        if (isUserScrollingRef.current) return;

        // Find entry with largest intersection ratio that is intersecting
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio or bounding box proximity to top
          visibleEntries.sort((a, b) => {
            const rectA = a.boundingClientRect;
            const rectB = b.boundingClientRect;
            return Math.abs(rectA.top) - Math.abs(rectB.top);
          });

          const topEntry = visibleEntries[0];
          const matchedId = sectionElements.find((s) => s.el === topEntry.target)?.id;

          if (matchedId && matchedId !== activeSectionId) {
            setActiveSectionId(matchedId);
            const meta = SECTIONS_METADATA[matchedId];
            if (meta) {
              applyHeadMetadata(meta);

              // Update URL without page jump or history clutter
              const targetUrl = meta.routePath === '/' ? '/' : meta.routePath;
              if (window.location.pathname !== targetUrl) {
                window.history.replaceState({ sectionId: matchedId }, '', targetUrl);
              }
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '-15% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sectionElements.forEach((s) => observer.observe(s.el));

    return () => {
      sectionElements.forEach((s) => observer.unobserve(s.el));
      observer.disconnect();
    };
  }, [activeSectionId, applyHeadMetadata, is404]);

  // Programmatic navigation to section or route
  const scrollToSection = useCallback((sectionId: string) => {
    const meta = SECTIONS_METADATA[sectionId];
    if (!meta) return;

    isUserScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    setActiveSectionId(sectionId);
    applyHeadMetadata(meta);

    const targetUrl = meta.routePath === '/' ? '/' : meta.routePath;
    window.history.pushState({ sectionId }, '', targetUrl);

    const el = document.getElementById(meta.elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 1000);
  }, [applyHeadMetadata]);

  const navigateTo = useCallback((pathOrHash: string) => {
    if (pathOrHash === '/') {
      scrollToSection('hero');
      return;
    }

    const cleanPath = pathOrHash.replace(/\/$/, '');
    if (ROUTE_TO_SECTION_MAP[cleanPath]) {
      scrollToSection(ROUTE_TO_SECTION_MAP[cleanPath]);
      return;
    }

    if (HASH_TO_SECTION_MAP[pathOrHash]) {
      scrollToSection(HASH_TO_SECTION_MAP[pathOrHash]);
      return;
    }

    // Direct hash or unknown route
    if (pathOrHash.startsWith('#')) {
      const cleanId = pathOrHash.substring(1);
      const el = document.getElementById(cleanId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 404
    setIs404(true);
    document.title = `Page Not Found | ${SEO_CONFIG.businessName}`;
  }, [scrollToSection]);

  const navigateToHome = () => {
    setIs404(false);
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    scrollToSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (is404) {
    return <NotFoundPage onGoHome={navigateToHome} />;
  }

  const currentMetadata = SECTIONS_METADATA[activeSectionId] || SECTIONS_METADATA.hero;

  return (
    <HeadManagerContext.Provider
      value={{
        activeSectionId,
        activeRoute: currentMetadata.routePath,
        currentMetadata,
        navigateTo,
        scrollToSection,
      }}
    >
      {children}
    </HeadManagerContext.Provider>
  );
};
