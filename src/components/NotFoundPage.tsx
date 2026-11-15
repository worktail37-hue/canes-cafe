import React from 'react';
import { Coffee, ArrowLeft, Home, Compass } from 'lucide-react';
import { SEO_CONFIG } from '../config/seoConfig';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-[#E9E3DA] text-[#2F2823] flex flex-col justify-between selection:bg-[#3B322C] selection:text-[#F3EEE7]">
      {/* Mini Header */}
      <header className="border-b border-[#D6CCBE] py-4 px-6 bg-[#F4F0EA]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            className="flex items-center gap-2 text-[#3B322C] hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-[#3B322C] text-[#F3EEE7] flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
            <span className="font-serif font-black tracking-wider uppercase text-base">
              {SEO_CONFIG.businessName}
            </span>
          </a>
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7B6E]">
            Error 404
          </span>
        </div>
      </header>

      {/* 404 Editorial Content */}
      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
        <div className="max-w-xl text-center bg-[#F4F0EA] p-8 sm:p-12 rounded-3xl border border-[#D6CCBE] shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center mx-auto mb-6 shadow-md">
            <Compass className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] block mb-2 font-mono">
            Page Not Found
          </span>

          <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#3B322C] uppercase tracking-tight">
            Looks like this cup went cold
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#2F2823]/80 leading-relaxed max-w-md mx-auto">
            The page or aroma you are searching for might have moved, been renamed, or never existed in
            our recipe book. Let's get you back to fresh coffee and warm pastries.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGoHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A231E] transition-all cursor-pointer shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </button>
            <a
              href="/#menu"
              onClick={(e) => {
                e.preventDefault();
                onGoHome();
                setTimeout(() => {
                  const el = document.getElementById('our-coffee') || document.getElementById('menu');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#3B322C] text-[#3B322C] text-xs font-semibold uppercase tracking-wider hover:bg-[#3B322C] hover:text-[#F3EEE7] transition-all cursor-pointer"
            >
              <Coffee className="w-4 h-4" />
              <span>Browse Menu</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 px-4 text-center text-xs text-[#8C7B6E] border-t border-[#D6CCBE]">
        <p>© 2026 {SEO_CONFIG.businessName}. Artisanal Coffee &amp; Bakery in {SEO_CONFIG.city || '[CITY]'}.</p>
      </footer>
    </div>
  );
};
