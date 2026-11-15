import React from 'react';
import { Coffee, Sparkles, HeartHandshake, Wheat } from 'lucide-react';
import { SEO_CONFIG } from '../config/seoConfig';
import { SafeImage } from './SafeImage';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-28 bg-[#F4F0EA] border-t border-b border-[#D6CCBE]/70 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Story Mosaic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Visual */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D6CCBE] aspect-[4/5] bg-[#3B322C]/10">
                {/* TODO-SEO: Replace with authentic high-res photo of your cafe roastery or bakers at work */}
                <SafeImage
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                  alt={`Inside Cane's Serve cafe and bakery in ${SEO_CONFIG.city}, with espresso machine and warm wood tables`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                  fallbackType="cafe"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A231E]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-[#F3EEE7]">
                  <p className="text-xs uppercase tracking-widest text-[#C9A24B] font-semibold">
                    Local Heritage
                  </p>
                  <p className="font-serif text-lg font-bold mt-1">
                    Roasted &amp; Baked in {SEO_CONFIG.neighborhood || '[NEIGHBORHOOD]'}
                  </p>
                </div>
              </div>

              {/* Overlapping Badge / Floating Accent Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#3B322C] text-[#F3EEE7] p-5 rounded-2xl border border-[#D6CCBE]/40 shadow-xl max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2 text-[#C9A24B] mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Micro-Batch</span>
                </div>
                <p className="text-xs leading-relaxed text-[#D6CCBE]">
                  Cast-iron drum roasts under 15kg &amp; 36-hour sourdough fermentation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] mb-3">
                <Coffee className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Our Heritage &amp; Craft</span>
              </div>

              <h2
                id="about-heading"
                className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C] text-balance"
              >
                Rooted in Craft. Brewed for Community.
              </h2>

              <p className="mt-3 text-sm sm:text-base font-medium text-[#8C7B6E]">
                Specialty coffee roasting and daily artisan baking in the heart of {SEO_CONFIG.city}.
              </p>

              {/* 2 Short SEO-Optimized Paragraphs with Natural Local Mentions */}
              <div className="mt-6 space-y-4 text-sm sm:text-base text-[#2F2823]/85 leading-relaxed">
                {/* Paragraph 1: Coffee & Roasting */}
                {/* TODO-SEO: Customize this paragraph to reflect your founder story and local town history */}
                <p>
                  Founded with a deep reverence for origin and tradition,{' '}
                  <strong className="text-[#3B322C] font-semibold">Cane's Serve</strong> began with a
                  simple conviction: that great coffee belongs at the center of community life in{' '}
                  {SEO_CONFIG.neighborhood || '[NEIGHBORHOOD]'}, {SEO_CONFIG.city || '[CITY]'}. We source directly
                  from ethical farming cooperatives across Ethiopia, Colombia, and Sumatra, roasting each
                  harvest on a vintage cast-iron Giesen drum in micro-batches to unlock vibrant floral acidity,
                  silky caramelized sugars, and deep chocolate clarity.
                </p>

                {/* Paragraph 2: Bakery & Slow Fermentation */}
                {/* TODO-SEO: Customize baking details, flour mills, or signature bakery specialties */}
                <p>
                  Every morning before sunrise, our bakehouse comes alive with the rhythm of slow-fermented
                  sourdough loaves, golden laminated croissants, and warm cardamom buns crafted with cultured
                  butter and stone-ground flours. Whether you stop by our sunlit cafe counter for your morning
                  espresso ritual or settle into a booth with a fresh pastry, Cane's Serve is where time
                  slows down and craftsmanship is savored in every cup.
                </p>
              </div>

              {/* Value Badges */}
              <div className="mt-8 pt-8 border-t border-[#D6CCBE] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#2F2823]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center shrink-0 mt-0.5">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#3B322C]">Single-Origin</h3>
                    <p className="text-[#8C7B6E] mt-0.5 leading-snug">
                      100% Arabica ethically sourced from high-altitude micro-lots.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center shrink-0 mt-0.5">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#3B322C]">Daily Bakehouse</h3>
                    <p className="text-[#8C7B6E] mt-0.5 leading-snug">
                      Wild ferment sourdough and French butter viennoiseries from 6:00 AM.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#3B322C]">Local Gathering</h3>
                    <p className="text-[#8C7B6E] mt-0.5 leading-snug">
                      Welcoming {SEO_CONFIG.city || '[CITY]'} neighbors, remote workers, and coffee travelers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
