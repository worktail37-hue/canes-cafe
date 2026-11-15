import React from 'react';
import { SITE_DATA } from '../data/siteData';

export const Marquee: React.FC = () => {
  // Duplicate ticker array 3 times for a seamless infinite loop
  const repeatedItems = [...SITE_DATA.ticker, ...SITE_DATA.ticker, ...SITE_DATA.ticker];

  return (
    <div
      className="w-full bg-[#3B322C] text-[#F3EEE7] py-4 sm:py-5 overflow-hidden select-none border-y border-[#2A231E]"
      role="region"
      aria-label="Popular specialties ticker"
    >
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {repeatedItems.map((item, idx) => (
          <div key={`${item}-${idx}`} className="inline-flex items-center mx-4 sm:mx-6 group">
            <span className="font-serif font-bold text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase text-[#F3EEE7] group-hover:text-[#C9A24B] transition-colors">
              {item}
            </span>
            <span
              className="ml-4 sm:ml-6 text-sm text-[#C9A24B] select-none"
              aria-hidden="true"
            >
              ☕
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
