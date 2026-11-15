import React from 'react';
import { Search, ArrowDownRight, Sparkles, X } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';
import { SEO_CONFIG } from '../config/seoConfig';
import { SafeImage } from './SafeImage';
import { useToast } from './Toast';
import { useSearch } from '../context/SearchContext';

export const Hero: React.FC = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const { showToast } = useToast();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      showToast('Search Cane\'s Serve', 'Try searching "latte", "cappuccino", or "cold brew"', 'info');
      return;
    }
    const menuEl = document.querySelector('#our-coffee') || document.querySelector('#menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-6 pb-20 sm:pt-10 sm:pb-28 overflow-hidden bg-[#E9E3DA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle Brand Kicker */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C7B6E]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>{SITE_DATA.brand.est}</span>
            <span aria-hidden="true">·</span>
            <span>{SITE_DATA.brand.tagline}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#8C7B6E]">
            <span>Specialty Coffee</span>
            <span aria-hidden="true">·</span>
            <span>Artisan Bakehouse</span>
            <span aria-hidden="true">·</span>
            <span>{SEO_CONFIG.city || '[CITY]'}</span>
          </div>
        </div>

        {/* HERO COMPOSITION: FLANKING EXTREME IMAGES + UNOBSTRUCTED CENTER HEADLINE */}
        <div className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-center my-3 sm:my-6">
          {/* Extreme Left Flank Photo Card (Shifted completely to far left boundary) */}
          <div className="hidden xl:block absolute left-2 2xl:left-0 top-1/2 -translate-y-1/2 z-10 w-52 2xl:w-60 animate-fade-in-up animation-delay-100">
            <div className="relative group p-2.5 bg-[#F4F0EA] rounded-2xl shadow-xl border border-[#D6CCBE] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="overflow-hidden rounded-xl aspect-[3/4] bg-[#3B322C]/10">
                <SafeImage
                  src={SITE_DATA.hero.baristaPhoto}
                  alt={`Barista pouring latte art into a cappuccino at Cane's Serve in ${SEO_CONFIG.city}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackType="cafe"
                  loading="eager"
                  fetchPriority="high"
                  width={400}
                  height={533}
                />
              </div>
              <div className="pt-2 px-1 flex items-center justify-between text-[11px] font-medium text-[#3B322C]">
                <span className="font-serif italic font-semibold">Craft &amp; Temper</span>
                <span className="text-[#8C7B6E]">6:30 AM Pour</span>
              </div>
              {/* Artisanal Note Tag */}
              <div className="mt-1.5 pt-1.5 border-t border-[#D6CCBE]/60 flex items-center justify-between text-[10px] text-[#8C7B6E]">
                <span>Single Origin: Huila 1,850m</span>
                <span className="font-semibold text-[#3B322C]">Jasmine &amp; Peach</span>
              </div>
            </div>
          </div>

          {/* GIANT HEADLINE (Center Editorial Focal Point - 100% VISIBLE & UNOBSTRUCTED) */}
          <div className="relative z-20 text-center select-none max-w-4xl lg:max-w-4xl mx-auto px-4 sm:px-6 animate-fade-in-up">
            <h1
              id="hero-heading"
              className="font-serif font-black uppercase text-[#3B322C] leading-[0.92] tracking-tight text-[clamp(2.6rem,7.2vw,7rem)] text-balance"
            >
              <span className="block drop-shadow-sm tracking-tight">{SITE_DATA.hero.headlineTop}</span>
              <span className="block mt-1 sm:mt-2 text-[#2A231E] tracking-tight">
                {SITE_DATA.hero.headlineBottom}
              </span>
              {/* Accessible local SEO context for search crawlers */}
              <span className="sr-only">
                {' '}— Cane's Serve: Specialty Coffee Shop &amp; Fresh Artisan Bakery in {SEO_CONFIG.city}
              </span>
            </h1>
          </div>

          {/* Extreme Right Flank Photo Card (Shifted completely to far right boundary) */}
          <div className="hidden xl:block absolute right-2 2xl:right-0 top-1/2 -translate-y-1/2 z-10 w-52 2xl:w-60 animate-fade-in-up animation-delay-100">
            <div className="relative group p-2.5 bg-[#F4F0EA] rounded-2xl shadow-xl border border-[#D6CCBE] transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="overflow-hidden rounded-xl aspect-square bg-[#3B322C]/10">
                <SafeImage
                  src={SITE_DATA.hero.cupWithBeansPhoto}
                  alt="Freshly extracted espresso cup with roasted single-origin Arabica coffee beans at Cane's Serve"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackType="cup"
                  loading="eager"
                  fetchPriority="high"
                  width={400}
                  height={400}
                />
              </div>
              <div className="pt-2 px-1 flex items-center justify-between text-[11px] font-medium text-[#3B322C]">
                <span className="font-serif font-bold">100% Arabica</span>
                <span className="text-[#C9A24B] font-mono">★ 4.9 Rating</span>
              </div>
              {/* Live Counter Pulse */}
              <div className="mt-1.5 pt-1.5 border-t border-[#D6CCBE]/60 flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Brew Bar Open
                </span>
                <span className="text-[#8C7B6E]">Fresh Batch On Bar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mid-screen & Mobile Photo Strip (Positioned BELOW headline so text is NEVER covered) */}
        <div className="flex xl:hidden items-center justify-center gap-3 sm:gap-6 my-4 sm:my-6 animate-fade-in-up animation-delay-100">
          <div className="w-36 sm:w-44 p-2 bg-[#F4F0EA] rounded-xl shadow-md border border-[#D6CCBE] rotate-[-2deg]">
            <div className="overflow-hidden rounded-lg aspect-[4/3]">
              <SafeImage
                src={SITE_DATA.hero.baristaPhoto}
                alt="Barista at Cane's Serve crafting espresso drink"
                className="w-full h-full object-cover"
                fallbackType="cafe"
                loading="eager"
                width={220}
                height={165}
              />
            </div>
            <p className="mt-1.5 text-[10px] text-center font-serif italic text-[#3B322C]">Craft &amp; Temper</p>
          </div>
          <div className="w-36 sm:w-44 p-2 bg-[#F4F0EA] rounded-xl shadow-md border border-[#D6CCBE] rotate-[2deg]">
            <div className="overflow-hidden rounded-lg aspect-[4/3]">
              <SafeImage
                src={SITE_DATA.hero.cupWithBeansPhoto}
                alt="Cane's Serve espresso cup with beans"
                className="w-full h-full object-cover"
                fallbackType="cup"
                loading="eager"
                width={220}
                height={165}
              />
            </div>
            <p className="mt-1.5 text-[10px] text-center font-mono text-[#3B322C]">100% Arabica · ★ 4.9</p>
          </div>
        </div>

        {/* Subtext Paragraph & Action Controls */}
        <div className="max-w-3xl mx-auto text-center mt-6 sm:mt-10 animate-fade-in-up animation-delay-200">
          <p className="text-sm sm:text-base lg:text-lg text-[#2F2823]/85 leading-relaxed font-normal">
            {SITE_DATA.hero.subtext}
          </p>

          {/* Search bar + View Menu */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              aria-label="Search Cane's Serve menu items"
              className="w-full sm:flex-1 relative flex items-center"
            >
              <Search className="w-4 h-4 text-[#8C7B6E] absolute left-4 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={SITE_DATA.hero.searchPlaceholder}
                aria-label="Search drinks, espresso, or bakery pastries"
                className="w-full pl-11 pr-28 py-3 rounded-full bg-[#F4F0EA] border border-[#D6CCBE] text-xs sm:text-sm text-[#2F2823] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C] focus:border-transparent transition-all shadow-inner"
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-1.5 rounded-full text-[#8C7B6E] hover:text-[#3B322C] hover:bg-[#D6CCBE]/40 transition-colors"
                    aria-label="Clear search input"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="py-2 px-4 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold hover:bg-[#2A231E] transition-colors whitespace-nowrap shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            <a
              href="#our-coffee"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#3B322C] text-[#3B322C] text-xs font-semibold hover:bg-[#3B322C] hover:text-[#F3EEE7] transition-all whitespace-nowrap"
            >
              <span>View Full Menu</span>
              <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Quick-Order / Trending Tags to fill empty space under search */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#8C7B6E]">
            <span className="font-medium text-[11px] uppercase tracking-wider text-[#3B322C]">Trending Now:</span>
            {[
              { label: 'Velvet Latte', query: 'Latte' },
              { label: 'Truffle Tagliolini', query: 'Tagliolini' },
              { label: 'Double Cortado', query: 'Cortado' },
              { label: 'Rosemary Fries', query: 'Fries' },
              { label: 'Cold Brew Reserve', query: 'Cold Brew' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => {
                  setSearchQuery(chip.query);
                  const menuEl = document.querySelector('#our-coffee') || document.querySelector('#menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded-full bg-[#F4F0EA] border border-[#D6CCBE] text-[11px] font-medium text-[#3B322C] hover:bg-[#3B322C] hover:text-[#F3EEE7] hover:border-[#3B322C] transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Micro Stat Badges */}
          <div className="mt-8 pt-6 border-t border-[#D6CCBE]/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#8C7B6E]">
            {SITE_DATA.hero.stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#3B322C]">
                  {stat.value}
                </span>
                <span className="uppercase tracking-wider text-[11px]">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Four Artisanal Pillars Feature Grid (Fills empty bottom space of the hero section) */}
          <div className="mt-12 pt-8 border-t border-[#D6CCBE]/70 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-[#F4F0EA] border border-[#D6CCBE]/80 shadow-xs">
              <span className="text-lg">🌿</span>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3B322C] mt-2">
                Direct Trade Micro-Lots
              </h4>
              <p className="mt-1 text-[11px] text-[#8C7B6E] leading-relaxed">
                Single-origin coffees sourced directly above 1,750m elevation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F0EA] border border-[#D6CCBE]/80 shadow-xs">
              <span className="text-lg">🔥</span>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3B322C] mt-2">
                Cast-Iron Drum Roasts
              </h4>
              <p className="mt-1 text-[11px] text-[#8C7B6E] leading-relaxed">
                Micro-batches under 15kg to celebrate sweet floral complexity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F0EA] border border-[#D6CCBE]/80 shadow-xs">
              <span className="text-lg">🥐</span>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3B322C] mt-2">
                36-Hour Wild Levain
              </h4>
              <p className="mt-1 text-[11px] text-[#8C7B6E] leading-relaxed">
                Golden laminated pastries made with French cultured butter.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F0EA] border border-[#D6CCBE]/80 shadow-xs">
              <span className="text-lg">🌱</span>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3B322C] mt-2">
                100% Plant-Based Cups
              </h4>
              <p className="mt-1 text-[11px] text-[#8C7B6E] leading-relaxed">
                Compostable takeaway materials &amp; spent grounds recycling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
