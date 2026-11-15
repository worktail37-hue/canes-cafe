import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { SEO_CONFIG } from '../config/seoConfig';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'coffee' | 'bakery' | 'kitchen' | 'interior';
  categoryLabel: string;
  image: string;
  caption: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Morning Espresso Ritual',
    category: 'coffee',
    categoryLabel: 'Coffee Bar',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    caption: 'Dialing in the morning espresso shot with micro-milled burrs on our custom multi-boiler machine.',
    tag: '6:30 AM Dial-In',
  },
  {
    id: 'g2',
    title: 'Laminated French Butter Viennoiserie',
    category: 'bakery',
    categoryLabel: 'Artisan Bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
    caption: 'Pulled fresh from the stone-deck hearth at 6:00 AM, layered with 81 folds of Normandy cultured butter.',
    tag: 'Stone-Deck Oven',
  },
  {
    id: 'g3',
    title: 'Bronze-Die Tagliolini Hand-Rolling',
    category: 'kitchen',
    categoryLabel: 'Fresh Pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
    caption: 'Fresh extruded ribbons crafted daily using organic durum semolina and pasture-raised farm eggs.',
    tag: 'Hand-Cut Ribbons',
  },
  {
    id: 'g4',
    title: 'Sunlit Roastery & Cafe Tables',
    category: 'interior',
    categoryLabel: 'Atmosphere',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85',
    caption: 'Warm reclaimed oak tables, gentle morning sunlight, and the scent of freshly roasted beans.',
    tag: 'Neighborhood Seating',
  },
  {
    id: 'g5',
    title: 'Velvet Latte Art Craft',
    category: 'coffee',
    categoryLabel: 'Coffee Bar',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=85',
    caption: 'Micro-aerated silky milk folded precisely over double-shot single estate espresso.',
    tag: 'Barista Craft',
  },
  {
    id: 'g6',
    title: 'Double-Fried Kennebec Herb Frites',
    category: 'kitchen',
    categoryLabel: 'Crispy Sides',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=85',
    caption: 'Hand-cut Kennebec potatoes double-fried to golden crunch with garden rosemary and aged Parmesan.',
    tag: 'Double-Fried',
  },
  {
    id: 'g7',
    title: 'Cast-Iron Drum Bean Roaster',
    category: 'interior',
    categoryLabel: 'Roastery',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1200&q=85',
    caption: 'Cooling tray aromatics following a delicate micro-batch drum roast under 15kg.',
    tag: 'Cast-Iron Roaster',
  },
  {
    id: 'g8',
    title: 'Slow-Ferment Country Sourdough',
    category: 'bakery',
    categoryLabel: 'Artisan Bakery',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=85',
    caption: '36-hour wild levain loaf with deeply caramelized blistered crust and custardy crumb.',
    tag: '36-Hr Wild Levain',
  },
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'bakery' | 'kitchen' | 'interior'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
    }
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
    }
  }, [lightboxIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for accessible lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, handleClose, handleNext, handlePrev]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-20 sm:py-28 bg-[#F4F0EA] border-b border-[#D6CCBE]/70 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9E3DA] border border-[#D6CCBE] text-[11px] font-semibold uppercase tracking-widest text-[#8C7B6E] mb-3">
              <Camera className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Food &amp; Interior Gallery</span>
            </div>
            <h2
              id="gallery-heading"
              className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C]"
            >
              Scenes From Our Cafe
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#2F2823]/80 max-w-2xl leading-relaxed">
              Step inside our sunlit espresso counter, morning sourdough bakehouse, fresh pasta station, and cozy neighborhood seating in {SEO_CONFIG.city || 'our neighborhood'}.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#E9E3DA] border border-[#D6CCBE] self-start md:self-auto">
            {(
              [
                { id: 'all', label: 'All Photos' },
                { id: 'coffee', label: 'Coffee Bar' },
                { id: 'bakery', label: 'Bakery' },
                { id: 'kitchen', label: 'Pasta & Sides' },
                { id: 'interior', label: 'Atmosphere' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  setActiveCategory(filter.id);
                  setLightboxIndex(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === filter.id
                    ? 'bg-[#3B322C] text-[#F3EEE7] shadow-sm'
                    : 'text-[#3B322C]/75 hover:text-[#3B322C] hover:bg-white/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              tabIndex={0}
              role="button"
              aria-label={`View full-size photo: ${item.title}`}
              onClick={() => setLightboxIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxIndex(idx);
                }
              }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#3B322C]/10 border border-[#D6CCBE] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
            >
              <SafeImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={600}
                height={750}
              />

              {/* Tag pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#2A231E]/80 backdrop-blur-xs text-[10px] font-semibold text-[#F3EEE7]">
                {item.tag}
              </div>

              {/* Hover overlay with zoom hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A231E]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-wider text-[#C9A24B] font-semibold">
                  {item.categoryLabel}
                </span>
                <h3 className="font-serif font-bold text-sm text-[#F3EEE7] mt-0.5 leading-snug">
                  {item.title}
                </h3>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-[#D6CCBE] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Click to view full photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informational reassurance under gallery */}
        <div className="mt-12 text-center text-xs text-[#8C7B6E] flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>All photography captured in-house at our cafe, roastery, and artisan bakehouse.</span>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {currentItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${currentItem.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1E1814] text-[#F3EEE7] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title & Close Button */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C9A24B]">
                  {currentItem.categoryLabel} · {lightboxIndex + 1} of {filteredItems.length}
                </span>
                <h3 className="font-serif font-black text-lg sm:text-xl text-[#F3EEE7]">
                  {currentItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Photo Display */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] bg-black/40 flex items-center justify-center overflow-hidden">
              <SafeImage
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
                loading="eager"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Keyboard Hints */}
            <div className="p-4 sm:p-5 bg-[#2A231E] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <p className="text-[#D6CCBE] leading-relaxed max-w-xl">
                {currentItem.caption}
              </p>
              <div className="flex items-center gap-2 text-[#8C7B6E] font-mono text-[11px] shrink-0">
                <span className="hidden sm:inline">Use [←] and [→] arrows</span>
                <span>·</span>
                <span>[Esc] to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
