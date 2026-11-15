import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee, Compass, Sparkles } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';
import { useToast } from './Toast';
import { CoffeeVibeMatcher } from './CoffeeVibeMatcher';
import { useHeadManager } from './HeadManager';
import { SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vibeMatcherOpen, setVibeMatcherOpen] = useState(false);

  const { isOwner } = useAuth();
  const { showToast } = useToast();
  const { activeSectionId, navigateTo } = useHeadManager();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('#visit-us');
  };

  return (
    <>
      {/* Coffee Vibe & Mood Matcher Modal */}
      <CoffeeVibeMatcher
        isOpen={vibeMatcherOpen}
        onClose={() => setVibeMatcherOpen(false)}
        onSelectMenuTarget={(targetId) => {
          navigateTo('#our-coffee');
          showToast('Highlighted matched coffee at Coffee Bar', 'info');
        }}
      />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#E9E3DA]/95 backdrop-blur-md shadow-sm border-b border-[#D6CCBE]/60 py-2 sm:py-3'
            : 'bg-[#E9E3DA] py-2.5 sm:py-4'
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="flex items-center gap-1.5 sm:gap-2 group shrink-0 text-decoration-none min-w-0"
              aria-label="Cane's Serve Home"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3B322C] text-[#F3EEE7] flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12 duration-300">
                <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
              </div>
              <span className="font-serif text-base sm:text-lg xl:text-xl font-black tracking-tight text-[#3B322C] truncate">
                {SITE_DATA.brand.name}
              </span>
            </a>

            {/* Zone 2: Navigation Links (Clean single-row desktop navigation) */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-1.5 xl:gap-3 2xl:gap-4 text-[11px] xl:text-xs font-semibold tracking-wider uppercase text-[#3B322C] shrink-0"
            >
              {SITE_DATA.navigation.map((item) => {
                const targetId = item.href.replace('#', '');
                const isActive = activeSectionId === targetId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.href);
                    }}
                    className={`whitespace-nowrap transition-all relative py-1 px-1 rounded-sm ${
                      isActive
                        ? 'text-[#3B322C] font-black after:w-full'
                        : 'text-[#3B322C]/75 hover:text-[#3B322C] after:w-0'
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#3B322C] hover:after:w-full after:transition-all after:duration-200`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions (Leads & Admin SHIFTED LEFT, Cane's Stickers, Vibe Matcher, Visit) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Feature 1: Manager Leads & Admin Portal Action (Strictly Owner Only - Shifted Left in Navigation Flow) */}
              {isOwner && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="px-2.5 sm:px-3 py-1.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#3B322C] text-[#F3EEE7] border border-[#C9A24B]/70 hover:border-[#C9A24B] hover:bg-[#2A231E] text-xs font-semibold transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer"
                  title="Open Cafe Manager (Incoming Customer Leads & WhatsApp Alerts)"
                  aria-label="Cafe Manager Leads and Admin"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                  <span className="font-serif font-bold text-xs tracking-tight">Leads &amp; Admin</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/40 animate-pulse hidden sm:inline-block" title="Owner Verified" />
                </button>
              )}

              {/* Feature 2: CANE'S STICKERS Direct Action Button (Single Primary Badge) */}
              <a
                href="#stickers"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('#stickers');
                }}
                className="px-2.5 sm:px-3 py-1.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#C9A24B] hover:bg-[#E6C875] text-[#1F1A16] text-xs font-serif font-black tracking-tight transition-all shadow-xs active:scale-95 shrink-0 cursor-pointer"
                title="Explore 20 Viral Cane's Stickers"
                aria-label="Cane's Stickers"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1F1A16] shrink-0" />
                <span className="text-xs font-serif font-black">
                  <span className="hidden sm:inline">Cane's </span>Stickers
                </span>
              </a>

              {/* Feature 3: Coffee Vibe & Mood Matcher (Hidden on small mobile top bar to avoid header squeeze; always in mobile drawer) */}
              <button
                type="button"
                onClick={() => setVibeMatcherOpen(true)}
                className="hidden sm:inline-flex px-2.5 sm:px-3 py-1.5 items-center justify-center gap-1.5 rounded-full bg-[#E9E3DA] border border-[#3B322C]/40 hover:border-[#3B322C] text-[#3B322C] hover:bg-[#D6CCBE]/40 text-xs font-semibold transition-all shadow-2xs active:scale-95 shrink-0 cursor-pointer"
                title="Find the coffee that matches your vibe and mood"
                aria-label="Open Coffee Vibe Matcher"
              >
                <Compass className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 stroke-[2.2]" />
                <span className="text-xs font-serif font-bold tracking-tight">Vibe Matcher</span>
              </button>

              {/* Feature 4: Visit & Contact Button (Visible on wide desktops) */}
              <a
                href="#visit-us"
                onClick={handleContactClick}
                className="hidden xl:inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold tracking-wider uppercase hover:bg-[#2A231E] transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap shrink-0"
              >
                Visit
              </a>

              {/* Mobile / Tablet Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#3B322C] hover:bg-[#D6CCBE]/50 focus:outline-none shrink-0 transition-colors cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Drawer Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-[#D6CCBE]/60 pb-4 space-y-3 animate-fade-in-up max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Owner Quick Access Banner (Strictly Owner Only) */}
              {isOwner && (
                <div className="p-3 rounded-2xl bg-[#3B322C] text-[#F3EEE7] border border-[#C9A24B]/60 shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#2A231E] text-[#C9A24B] flex items-center justify-center shrink-0 border border-[#C9A24B]/30">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-serif font-black text-[#F3EEE7]">Cafe Manager</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <p className="text-[10px] text-[#D6CCBE]/80 truncate">
                        Incoming Leads, WhatsApp &amp; Storefront
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin?.();
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#C9A24B] hover:bg-[#E6C875] text-[#1F1A16] text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-xs"
                  >
                    Open
                  </button>
                </div>
              )}

              {/* Navigation Links with comfortable touch targets */}
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                {SITE_DATA.navigation.map((item) => {
                  const targetId = item.href.replace('#', '');
                  const isActive = activeSectionId === targetId;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        navigateTo(item.href);
                      }}
                      className={`min-h-[44px] px-3.5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#3B322C] text-[#F3EEE7] font-bold shadow-xs'
                          : 'text-[#3B322C] hover:bg-[#D6CCBE]/40'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />}
                    </a>
                  );
                })}
              </nav>

              {/* Mobile Drawer Action Buttons */}
              <div className="pt-3 border-t border-[#D6CCBE]/60 flex flex-col gap-2.5">
                {/* Cane's Stickers Direct Button */}
                <a
                  href="#stickers"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    navigateTo('#stickers');
                  }}
                  className="min-h-[44px] w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#C9A24B] hover:bg-[#E6C875] text-[#1F1A16] text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#1F1A16]" />
                  <span>Explore Cane's Stickers (20 Viral Styles)</span>
                </a>

                {/* Coffee Vibe & Mood Matcher Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setVibeMatcherOpen(true);
                  }}
                  className="min-h-[44px] w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#3B322C] hover:bg-[#2A231E] text-[#F3EEE7] text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#C9A24B] stroke-[2.2]" />
                  <span>Coffee Vibe &amp; Mood Matcher</span>
                </button>

                {/* Visit Us & Concierge */}
                <a
                  href="#visit-us"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleContactClick(e);
                  }}
                  className="min-h-[44px] w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#E9E3DA] border border-[#3B322C]/40 text-[#3B322C] hover:bg-[#D6CCBE]/40 text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Visit Us, Hours &amp; Direct Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
