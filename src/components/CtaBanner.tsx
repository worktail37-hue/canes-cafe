import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';
import { SEO_CONFIG } from '../config/seoConfig';
import { SafeImage } from './SafeImage';
import { useToast } from './Toast';

export const CtaBanner: React.FC = () => {
  const { showToast } = useToast();

  const handleMenuClick = () => {
    const el = document.querySelector('#our-coffee') || document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast('Explore Our Menu', 'Discover all signature drinks, single origins, and fresh bakes.', 'info');
  };

  const handleReserveClick = () => {
    const el = document.querySelector('#visit-us') || document.querySelector('#visit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast('Plan Your Visit', 'Find our contact details, hours, and reservation form below.', 'info');
  };

  return (
    <section
      id="visit-cta"
      aria-labelledby="cta-heading"
      className="py-20 sm:py-28 bg-[#3B322C] text-[#F3EEE7] relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#8C7B6E]/15 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline and Call-to-Action */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] block mb-3">
              Crafted Fresh Daily in {SEO_CONFIG.city || '[CITY]'}
            </span>
            <h2
              id="cta-heading"
              className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#F3EEE7] leading-[0.95] text-balance"
            >
              {SITE_DATA.ctaBanner.headline}
            </h2>
            <p className="mt-6 text-sm sm:text-base lg:text-lg text-[#D6CCBE]/85 leading-relaxed max-w-xl">
              {SITE_DATA.ctaBanner.subtext}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={handleMenuClick}
                type="button"
                className="px-8 py-4 rounded-full bg-[#E9E3DA] text-[#2A231E] font-bold text-xs uppercase tracking-wider hover:bg-[#F4F0EA] hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl flex items-center gap-2 group cursor-pointer"
              >
                <span>{SITE_DATA.ctaBanner.buttonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>

              <button
                onClick={handleReserveClick}
                type="button"
                className="px-7 py-4 rounded-full border border-[#D6CCBE]/40 text-[#F3EEE7] font-semibold text-xs uppercase tracking-wider hover:bg-[#2A231E] hover:border-[#D6CCBE] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                <span>{SITE_DATA.ctaBanner.secondaryText}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Neat 4-Photo Mosaic Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-2 bg-[#2A231E] rounded-3xl border border-[#8C7B6E]/30 shadow-2xl">
              {SITE_DATA.ctaBanner.mosaic.map((item, index) => (
                <div
                  key={item.title}
                  className={`overflow-hidden rounded-2xl aspect-square bg-[#3B322C]/40 group relative ${
                    index % 2 === 1 ? 'translate-y-2' : ''
                  }`}
                >
                  {/* TODO-SEO: Replace with authentic bakery and latte photos */}
                  <SafeImage
                    src={item.image}
                    alt={`${item.title} at Cane's Coffee in ${SEO_CONFIG.city}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    fallbackType={index % 2 === 0 ? 'cup' : 'pastry'}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-[11px] font-medium text-[#F3EEE7]">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
