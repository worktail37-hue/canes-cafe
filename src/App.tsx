import { useState, lazy, Suspense } from 'react';
import { ToastProvider } from './components/Toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { FeaturedCategories } from './components/FeaturedCategories';
import { DailyRoasterySpotlight } from './components/DailyRoasterySpotlight';
import { OurCoffee } from './components/OurCoffee';
import { MenuExplorer, MenuCategoryType } from './components/MenuExplorer';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { SocialKitSection } from './components/SocialKitSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { VisitUs } from './components/VisitUs';
import { Footer } from './components/Footer';
import { HeadManager, useHeadManager } from './components/HeadManager';
import { ThemeProvider } from './context/ThemeContext';

// Lazy-load Admin UI so it is not bundled into the public customer bundle
const AdminDrawer = lazy(() =>
  import('./components/AdminDrawer').then((m) => ({ default: m.AdminDrawer }))
);
const AdminAccessPage = lazy(() =>
  import('./components/AdminAccessPage').then((m) => ({ default: m.AdminAccessPage }))
);

function AppContent() {
  const { activeSectionId } = useHeadManager();
  const { isOwner } = useAuth();
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<MenuCategoryType>('all');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dedicated URL access protection (/owner, /admin, #owner, #admin)
  const isOwnerRoute = activeSectionId === 'owner' || activeSectionId === 'admin';
  if (isOwnerRoute) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#E9E3DA] flex items-center justify-center p-6 text-center">
            <div className="space-y-3">
              <div className="w-10 h-10 border-4 border-[#3B322C] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-mono font-bold tracking-wider uppercase text-[#3B322C]">
                Loading Owner Portal...
              </p>
            </div>
          </div>
        }
      >
        <AdminAccessPage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--cream)] text-[var(--text-dark)] flex flex-col font-sans selection:bg-[var(--espresso)] selection:text-[var(--text-light)] transition-colors duration-250">
      {/* 1. NAVBAR (Header Landmark) */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      <main id="main-content" className="flex-1">
        {/* 2. HERO (#hero with single H1) */}
        <Hero />

        {/* 3. MARQUEE TICKER BAND */}
        <Marquee />

        {/* 3B. FEATURED CATEGORIES (Coffee, Bakery, Pasta, Sides) */}
        <FeaturedCategories
          onSelectCategory={(cat) => {
            setSelectedMenuCategory(cat);
          }}
        />

        {/* 3C. DAILY ROASTERY SPOTLIGHT & COUNTER SPECIALS */}
        <DailyRoasterySpotlight />

        {/* 4. OUR COFFEE SECTION (#our-coffee / #menu) */}
        <OurCoffee />

        {/* 5. PASTA'S AND SIDES (#pastas-and-sides / #menu-catalog) */}
        <MenuExplorer
          selectedCategory={selectedMenuCategory}
          onSelectCategory={setSelectedMenuCategory}
        />

        {/* 6. OUR STORY / ABOUT SECTION (#about / #story) */}
        <AboutSection />

        {/* 7B. FOOD & INTERIOR GALLERY WITH LIGHTBOX (#gallery) */}
        <GallerySection />

        {/* 7C. CANE'S SERVE STICKERS & SOCIAL BANNERS (#social-kit) */}
        <SocialKitSection />

        {/* 8. CUSTOMER REVIEWS (#reviews) */}
        <ReviewsSection />

        {/* 9. FREQUENTLY ASKED QUESTIONS (#faq) */}
        <FaqSection />

        {/* 10. "YOUR PERFECT CUP AWAITS" CTA BANNER */}
        <CtaBanner />

        {/* 11. VISIT US / LOCATION & CONTACT (#visit-us / #location / #contact) */}
        <VisitUs />
      </main>

      {/* 12. FOOTER (Footer Landmark with discreet Owner Portal and Privacy Note) */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 13. CAFE MANAGER & INCOMING LEADS DRAWER (Lazy loaded only when requested by owner) */}
      {isOwner && isAdminOpen && (
        <Suspense fallback={null}>
          <AdminDrawer isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <SearchProvider>
            <HeadManager>
              <AppContent />
            </HeadManager>
          </SearchProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
