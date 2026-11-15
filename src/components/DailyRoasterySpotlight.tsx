import React from 'react';
import { Sparkles, Clock, Compass, Coffee, ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { SEO_CONFIG } from '../config/seoConfig';

export const DailyRoasterySpotlight: React.FC = () => {
  return (
    <section
      id="daily-spotlight"
      aria-labelledby="spotlight-heading"
      className="py-16 sm:py-24 bg-[#F4F0EA] border-b border-[#D6CCBE]/60 relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Lockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Daily Roaster &amp; Bakehouse Board</span>
            </div>
            <h2
              id="spotlight-heading"
              className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C]"
            >
              Today at the Counter
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#2F2823]/80 leading-relaxed">
              Curated daily flights, fresh morning bake pairings, and limited micro-lot roast drops in {SEO_CONFIG.city || '[CITY]'}.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7B6E] bg-[#E9E3DA] py-2 px-3.5 rounded-full border border-[#D6CCBE] self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>UPDATED DAILY AT 6:00 AM</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Barista Tasting Flight */}
          <div className="group bg-[#E9E3DA] rounded-2xl overflow-hidden border border-[#D6CCBE] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#3B322C]/10">
              <SafeImage
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                alt="Three coffee tasting cups representing the Barista Flight"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackType="cup"
                loading="lazy"
                width={600}
                height={450}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#2A231E]/85 backdrop-blur-xs text-[#F3EEE7] text-[10px] font-medium tracking-wide flex items-center gap-1.5">
                <Coffee className="w-3 h-3 text-[#C9A24B]" />
                <span>3-Cup Experience</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A24B] font-semibold">
                  Barista Tasting Flight
                </span>
                <h3 className="font-serif font-bold text-lg text-[#3B322C] mt-1">
                  The Daily Terroir Trio
                </h3>
                <p className="text-xs text-[#2F2823]/75 mt-2 line-clamp-3 leading-relaxed">
                  Three 4oz pours highlighting washed Ethiopian Yirgacheffe, natural Colombian Huila, and our signature velvet house espresso.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#D6CCBE] flex items-center justify-between">
                <span className="font-mono font-bold text-base text-[#3B322C]">$11.50</span>
                <span className="px-2.5 py-1 rounded-full bg-[#3B322C]/10 text-[#3B322C] text-[11px] font-medium">
                  Limited Daily
                </span>
              </div>
            </div>
          </div>

          {/* 2. Morning Oven Batch Pairing */}
          <div className="group bg-[#E9E3DA] rounded-2xl overflow-hidden border border-[#D6CCBE] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#3B322C]/10">
              <SafeImage
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                alt="Flaky golden croissant and hot latte pairing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackType="pastry"
                loading="lazy"
                width={600}
                height={450}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#2A231E]/85 backdrop-blur-xs text-[#F3EEE7] text-[10px] font-medium tracking-wide flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#C9A24B]" />
                <span>6:30 AM Out of Oven</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A24B] font-semibold">
                  Today's Bake Pairing
                </span>
                <h3 className="font-serif font-bold text-lg text-[#3B322C] mt-1">
                  Cardamom Bun &amp; Flat White
                </h3>
                <p className="text-xs text-[#2F2823]/75 mt-2 line-clamp-3 leading-relaxed">
                  Swedish pearl-sugar brioche twisted with freshly ground green cardamom, paired with a double cortado or velvet flat white.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#D6CCBE] flex items-center justify-between">
                <span className="font-mono font-bold text-base text-[#3B322C]">$9.00</span>
                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Fresh from Oven
                </span>
              </div>
            </div>
          </div>

          {/* 3. Micro-Lot Roast Drop */}
          <div className="group bg-[#E9E3DA] rounded-2xl overflow-hidden border border-[#D6CCBE] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#3B322C]/10">
              <SafeImage
                src="https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80"
                alt="Whole bean roasted coffee bag"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackType="beans"
                loading="lazy"
                width={600}
                height={450}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#2A231E]/85 backdrop-blur-xs text-[#F3EEE7] text-[10px] font-medium tracking-wide flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-[#C9A24B]" />
                <span>Single Origin</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A24B] font-semibold">
                  Today's Roaster Drop
                </span>
                <h3 className="font-serif font-bold text-lg text-[#3B322C] mt-1">
                  Guatemala Huehuetenango
                </h3>
                <p className="text-xs text-[#2F2823]/75 mt-2 line-clamp-3 leading-relaxed">
                  Micro-batch drum roasted yesterday. Washed Bourbon &amp; Caturra variety at 1,900m altitude.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D6CCBE]/60 text-[#3B322C] font-mono">
                    White Peach
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D6CCBE]/60 text-[#3B322C] font-mono">
                    Sugarcane
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#D6CCBE] flex items-center justify-between">
                <span className="font-mono font-bold text-base text-[#3B322C]">$19.50</span>
                <span className="px-3 py-1.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold">
                  At Counter
                </span>
              </div>
            </div>
          </div>

          {/* 4. CANE'S STICKERS CARD & HYPERLINK (Replaced Roastery Lounge) */}
          <div className="group bg-[#2A231E] text-[#F3EEE7] rounded-2xl p-6 border border-[#3B322C] flex flex-col justify-between shadow-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A24B]">
            {/* Subtle halftone background texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#C9A24B 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A24B] font-bold px-2 py-0.5 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B]/30">
                  ★ VIRAL MERCH
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  20 Stickers Live
                </span>
              </div>

              <h3 className="font-serif font-black text-2xl uppercase tracking-tight text-[#FAF6ED]">
                CANE&apos;S STICKERS
              </h3>
              <p className="mt-2 text-xs text-[#D6CCBE]/80 leading-relaxed">
                Halftone brainrot antidotes, chunky comic lettering, and hilarious trending stickers designed for your food photos &amp; Instagram stories.
              </p>

              {/* Sample Sticker Teasers */}
              <div className="mt-4 flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="px-2 py-1 rounded-md bg-[#181310] text-[#E6C875] border border-[#3B322C]">
                  🧠 100% Dopamine
                </span>
                <span className="px-2 py-1 rounded-md bg-[#181310] text-[#E6C875] border border-[#3B322C]">
                  ⚡ Pure Delusion
                </span>
                <span className="px-2 py-1 rounded-md bg-[#181310] text-[#E6C875] border border-[#3B322C]">
                  🍝 Roman Empire
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3B322C] relative z-10">
              <a
                href="#stickers"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#stickers') || document.querySelector('#social-kit');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#C9A24B] hover:bg-[#E6C875] text-[#1F1A16] font-serif font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-center cursor-pointer"
                title="Go to CANE'S STICKERS section"
              >
                <span>CANE&apos;S STICKERS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
