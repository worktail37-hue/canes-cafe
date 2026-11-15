import React, { useState } from 'react';
import { Coffee, ArrowUp, SlidersHorizontal, MapPin, Phone, MessageSquare } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';
import { SEO_CONFIG } from '../config/seoConfig';
import { useHeadManager } from './HeadManager';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const handleOpenAdmin = onOpenAdmin || (() => setIsAdminOpen(true));
  const { navigateTo } = useHeadManager();
  const { isOwner } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2A231E] text-[#F3EEE7] pt-16 sm:pt-20 pb-12 border-t border-[#3B322C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top WhatsApp & Direct Call Strip */}
          <div
            id="newsletter"
            className="pb-16 mb-16 border-b border-[#3B322C] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] block mb-1">
                Direct Guest Concierge
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F3EEE7]">
                Connect via WhatsApp &amp; Direct Call
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#D6CCBE]/80 max-w-lg">
                Have questions regarding our single-origin roasts, daily 6:30 AM bakehouse releases, bronze-die pastas, or table availability? Connect directly with our roasters and barista team.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-3 justify-end">
              <a
                href="https://wa.me/15552345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${SEO_CONFIG.phoneRaw || '15552345678'}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#E9E3DA] hover:bg-white text-[#2A231E] text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#3B322C]" />
                <span>Call Us: {SEO_CONFIG.phone}</span>
              </a>
            </div>
          </div>

          {/* Main Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-16">
            {/* Brand Blurb & Verified NAP Citation (Spans 2 columns) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center border border-[#8C7B6E]/30" aria-hidden="true">
                  <Coffee className="w-4 h-4" />
                </div>
                <span className="font-serif text-xl font-black tracking-tight text-[#F3EEE7]">
                  {SEO_CONFIG.businessName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#D6CCBE]/80 leading-relaxed max-w-sm">
                {SITE_DATA.footer.blurb}
              </p>

              {/* Semantic NAP Address in Footer */}
              <address className="not-italic mt-4 pt-4 border-t border-[#3B322C] text-xs text-[#D6CCBE]/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                  <span>{SEO_CONFIG.address.streetAddress}, {SEO_CONFIG.city}, {SEO_CONFIG.stateCode} {SEO_CONFIG.postalCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                  <a href={`tel:${SEO_CONFIG.phoneRaw}`} className="hover:text-[#F3EEE7] font-mono">
                    {SEO_CONFIG.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" aria-hidden="true" />
                  <a
                    href="https://wa.me/15552345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] font-mono text-[#25D366]"
                  >
                    WhatsApp Enquiries
                  </a>
                </div>
              </address>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={SEO_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3B322C] flex items-center justify-center text-[#D6CCBE] hover:text-[#C9A24B] hover:bg-[#3B322C]/80 transition-colors border border-[#8C7B6E]/30"
                  aria-label="Cane's Serve on Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href={SEO_CONFIG.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3B322C] flex items-center justify-center text-[#D6CCBE] hover:text-[#C9A24B] hover:bg-[#3B322C]/80 transition-colors border border-[#8C7B6E]/30"
                  aria-label="Cane's Serve on TikTok"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.32a6.34 6.34 0 0 0-.85-.06A6.33 6.33 0 0 0 3 15.6a6.34 6.34 0 0 0 10.84 4.47 6.28 6.28 0 0 0 1.83-4.47V9.05a8.27 8.27 0 0 0 4.92 1.6V7.2a4.82 4.82 0 0 1-1-.51z" />
                  </svg>
                </a>

                <a
                  href={SEO_CONFIG.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3B322C] flex items-center justify-center text-[#D6CCBE] hover:text-[#C9A24B] hover:bg-[#3B322C]/80 transition-colors border border-[#8C7B6E]/30"
                  aria-label="Cane's Serve on X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a
                  href={SEO_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3B322C] flex items-center justify-center text-[#D6CCBE] hover:text-[#C9A24B] hover:bg-[#3B322C]/80 transition-colors border border-[#8C7B6E]/30"
                  aria-label="Cane's Serve on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.456 5 15.545 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav Columns (4 columns) */}
            {SITE_DATA.footer.columns.map((col) => (
              <div key={col.title} className="space-y-4">
                <h3 className="font-serif font-bold text-sm tracking-wide text-[#F3EEE7]">
                  {col.title}
                </h3>
                <ul className="space-y-2.5 text-xs text-[#D6CCBE]/80">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#') || link.href.startsWith('/')) {
                            e.preventDefault();
                            navigateTo(link.href);
                          }
                        }}
                        className="hover:text-[#F3EEE7] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar: Copyright, Manager portal, Theme Switcher & Back to Top */}
          <div className="pt-8 border-t border-[#3B322C] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8C7B6E]">
            <div className="flex flex-wrap items-center gap-3">
              <p>{SITE_DATA.footer.copyright}</p>
              {isOwner ? (
                <button
                  onClick={handleOpenAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B322C] hover:bg-[#C9A24B] hover:text-[#2A231E] text-[#D6CCBE] transition-all font-mono text-[11px] cursor-pointer"
                  title="Manage store hours, contact details and table reservations"
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#C9A24B]" aria-hidden="true" />
                  <span>Owner Admin</span>
                </button>
              ) : (
                <a
                  href="#owner"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/owner');
                  }}
                  className="text-[#8C7B6E]/70 hover:text-[#D6CCBE] transition-colors text-[11px] font-mono"
                  title="Owner Access Portal"
                >
                  Owner Portal
                </a>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-[#D6CCBE] transition-colors cursor-pointer text-xs underline"
              >
                Privacy &amp; Guest Data
              </button>

              {SITE_DATA.footer.legal.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#D6CCBE] transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-[#3B322C] text-[#F3EEE7] hover:bg-[#8C7B6E] transition-colors ml-2 cursor-pointer"
                aria-label="Scroll back to top of page"
              >
                <ArrowUp className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Guest Privacy & Data Protection Modal */}
        {privacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
            <div className="bg-[#FAF7F2] text-[#2F2823] max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D6CCBE] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D6CCBE]">
                <h3 className="font-serif font-black text-xl text-[#3B322C]">
                  Privacy &amp; Data Protection
                </h3>
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(false)}
                  className="p-1 rounded-full text-[#8C7B6E] hover:text-[#3B322C] hover:bg-[#D6CCBE]/40 cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs sm:text-sm text-[#4A3E35] space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                <p>
                  <strong>What We Collect:</strong> When you submit a cafe inquiry or table reservation request on our website, we collect your name, mobile phone number, topic, and message.
                </p>
                <p>
                  <strong>Why We Collect It:</strong> Your details are used solely to review your inquiry, confirm table seating, and dispatch prompt WhatsApp notifications if you provided consent.
                </p>
                <p>
                  <strong>Who Sees Your Data:</strong> Access is restricted strictly to the verified website owner ({SEO_CONFIG.businessName}). Your personal contact information is never sold, published, or shared with third-party advertisers.
                </p>
                <p>
                  <strong>Anti-Spam &amp; Rate Limits:</strong> Submissions are protected by rate limiters and spam honeypot filters. Automated replies can be opted out of at any time by texting STOP.
                </p>
                <p>
                  <strong>Data Retention &amp; Deletion Requests:</strong> Guest inquiries are kept for a maximum of 180 days. You may request permanent deletion of your inquiry records at any time by calling {SEO_CONFIG.phone} or messaging us on WhatsApp.
                </p>
              </div>

              <div className="pt-3 border-t border-[#D6CCBE]">
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(false)}
                  className="w-full py-3 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-bold uppercase tracking-wider hover:bg-[#2A231E] transition-colors cursor-pointer"
                >
                  Understood &amp; Close
                </button>
              </div>
            </div>
          </div>
        )}
      </footer>
    );
};
