import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, SearchX, RotateCcw, X, Coffee } from 'lucide-react';
import { SITE_DATA, CoffeeItem } from '../data/siteData';
import { SEO_CONFIG } from '../config/seoConfig';
import { SafeImage } from './SafeImage';
import { useSearch } from '../context/SearchContext';
import { MenuDock } from './MenuDock';

export const OurCoffee: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { searchQuery, clearSearch, isSearching } = useSearch();

  // Filter coffee items by name (case-insensitive)
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = trimmedQuery
    ? SITE_DATA.coffeeSection.items.filter((coffee) =>
        coffee.name.toLowerCase().includes(trimmedQuery)
      )
    : SITE_DATA.coffeeSection.items;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="our-coffee"
      aria-labelledby="coffee-heading"
      className="py-20 sm:py-28 bg-[#E9E3DA] overflow-hidden relative"
    >
      {/* Anchor alias for #menu link targeting */}
      <span id="menu" className="sr-only">Cane's Coffee Specialty Menu</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Circular Arrow Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] block mb-2">
              Signature Brews &amp; Espresso
            </span>
            <h2
              id="coffee-heading"
              className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C]"
            >
              {SITE_DATA.coffeeSection.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#2F2823]/80 leading-relaxed">
              Specialty espresso drinks, brewed fresh daily in {SEO_CONFIG.city || '[CITY]'}. {SITE_DATA.coffeeSection.subtitle}
            </p>
          </div>

          {/* Circular Dark Navigation Arrows (disabled if no items or fewer than 2 items) */}
          {filteredItems.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full bg-[#3B322C] text-[#F3EEE7] flex items-center justify-center hover:bg-[#2A231E] transition-all duration-200 active:scale-95 shadow-md border border-[#8C7B6E]/30"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full bg-[#3B322C] text-[#F3EEE7] flex items-center justify-center hover:bg-[#2A231E] transition-all duration-200 active:scale-95 shadow-md border border-[#8C7B6E]/30"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Interactive Signature Coffee MacOS Dock */}
        <div className="mb-14">
          <MenuDock />
        </div>

        {/* Active Filter Bar when search is active */}
        {isSearching && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 p-3.5 px-5 rounded-2xl bg-[#F4F0EA] border border-[#D6CCBE] text-xs shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-[#3B322C]">
              <span className="text-[#8C7B6E]">Filtered product cards by name:</span>
              <span className="font-semibold px-2.5 py-0.5 rounded-full bg-[#3B322C] text-[#F3EEE7] font-mono text-[11px]">
                "{searchQuery}"
              </span>
              <span className="text-[#8C7B6E]">
                ({filteredItems.length} {filteredItems.length === 1 ? 'match' : 'matches'})
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="text-xs font-semibold text-[#8C7B6E] hover:text-[#3B322C] transition-colors flex items-center gap-1.5 underline"
            >
              <span>Clear search</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Empty State: 'No results found' */}
        {filteredItems.length === 0 ? (
          <div className="my-10 py-16 px-6 sm:px-10 rounded-3xl bg-[#F4F0EA] border border-[#D6CCBE] text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#3B322C] text-[#F3EEE7] flex items-center justify-center mx-auto mb-4 shadow-md">
              <SearchX className="w-8 h-8 stroke-[1.8] text-[#C9A24B]" />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] block mb-1">
              No Matches
            </span>
            <h3 className="font-serif font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#3B322C]">
              No results found
            </h3>
            <p className="mt-3 text-sm text-[#2F2823]/80 leading-relaxed max-w-md mx-auto">
              We couldn't find any coffee product cards matching &ldquo;
              <span className="font-semibold text-[#3B322C]">{searchQuery}</span>
              &rdquo;. Try searching for &ldquo;Latte&rdquo;, &ldquo;Cappuccino&rdquo;, &ldquo;Cortado&rdquo;, or &ldquo;Cold Brew&rdquo;.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={clearSearch}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A231E] transition-all duration-200 active:scale-95 shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>View All Coffees</span>
              </button>
            </div>
          </div>
        ) : (
          /* Carousel Container (with overflow room for overflowing circular cup photos) */
          <div className="pt-16 pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div
              ref={carouselRef}
              className={`flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2 ${
                filteredItems.length <= 3 ? 'justify-start sm:justify-center' : ''
              }`}
            >
              {filteredItems.map((coffee) => (
                <div
                  key={coffee.id}
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start group relative pt-16 flex flex-col"
                >
                  {/* Pop-Out Round Cup Image (Positioned to overflow the top of the card) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-36 h-36 rounded-full p-1 bg-[#E9E3DA] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                    <div className="w-full h-full rounded-full overflow-hidden shadow-xl border-2 border-[#3B322C] bg-[#2A231E]">
                      {/* TODO-SEO: Replace with authentic product photo */}
                      <SafeImage
                        src={coffee.image}
                        alt={`${coffee.name} - ${coffee.subtitle} specialty coffee at Cane's Coffee in ${SEO_CONFIG.city}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
                        fallbackType="cup"
                        loading="lazy"
                        decoding="async"
                        width={144}
                        height={144}
                      />
                    </div>
                  </div>

                  {/* Card Body (Dark Espresso) */}
                  <div className="flex-1 bg-[#3B322C] text-[#F3EEE7] rounded-[24px] pt-24 pb-7 px-6 flex flex-col justify-between shadow-xl border border-[#2A231E] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                    {/* Drink Name & Rating */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#D6CCBE]/80 tracking-widest uppercase font-medium text-[11px]">
                          {coffee.subtitle}
                        </span>
                        <div className="flex items-center gap-1 text-[#C9A24B]">
                          <Star className="w-3.5 h-3.5 fill-[#C9A24B]" />
                          <span className="font-mono font-semibold text-xs text-[#F3EEE7]">
                            {coffee.rating}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif font-black text-xl tracking-tight uppercase text-[#F3EEE7] group-hover:text-[#D6CCBE] transition-colors">
                        {coffee.name}
                      </h3>

                      <p className="mt-2 text-xs text-[#D6CCBE]/80 line-clamp-2 leading-relaxed">
                        {coffee.description}
                      </p>
                    </div>

                    {/* Volume, Price & Counter Badge */}
                    <div className="mt-6 pt-5 border-t border-[#8C7B6E]/30 flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] text-[#D6CCBE]/70 uppercase tracking-wider">
                          {coffee.volume}
                        </span>
                        <span className="block font-mono font-bold text-lg text-[#F3EEE7] mt-0.5">
                          {coffee.price}
                        </span>
                      </div>

                      {/* Counter Service Badge */}
                      <span className="px-3 py-1.5 rounded-xl bg-[#2A231E] text-[#D6CCBE] border border-[#8C7B6E]/40 font-mono text-[11px] font-medium flex items-center gap-1.5">
                        <Coffee className="w-3 h-3 text-[#C9A24B]" />
                        <span>Counter</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Carousel indicator note */}
        {filteredItems.length > 0 && (
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-[#8C7B6E]">
            <span>
              {isSearching
                ? `Showing ${filteredItems.length} matching specialty ${
                    filteredItems.length === 1 ? 'roast' : 'roasts'
                  }`
                : `Drag or use arrows to view all ${SITE_DATA.coffeeSection.items.length} specialty roasts`}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
