import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { SEO_CONFIG } from '../config/seoConfig';

export const FaqSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-28 bg-[#E9E3DA] relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Helpful Questions &amp; Visiting Info</span>
          </div>
          <h2
            id="faq-heading"
            className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C]"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#2F2823]/80 leading-relaxed">
            Everything you need to know about our cafe hours, daily bakehouse schedule, dietary
            accommodations, and finding us in {SEO_CONFIG.city || '[CITY]'}.
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions List">
          {SEO_CONFIG.faq.map((item, index) => {
            const isOpen = openIndices.includes(index);
            const questionId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <div
                key={index}
                className="bg-[#F4F0EA] rounded-2xl border border-[#D6CCBE] transition-all duration-200 overflow-hidden shadow-xs hover:border-[#8C7B6E]/60"
              >
                <button
                  id={questionId}
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B322C] cursor-pointer"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#3B322C] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#3B322C] text-[#F3EEE7] rotate-180'
                        : 'bg-[#E9E3DA] text-[#8C7B6E] rotate-0'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-[#2F2823]/85 leading-relaxed border-t border-[#D6CCBE]/40 animate-in fade-in duration-200"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-[#F4F0EA] border border-[#D6CCBE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7B6E]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A24B] shrink-0" />
            <span>
              Have a special catering or private event inquiry in {SEO_CONFIG.city || '[CITY]'}?
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/15552345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-colors whitespace-nowrap shadow-xs"
            >
              <span>WhatsApp Us</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={`tel:${SEO_CONFIG.phoneRaw || '15552345678'}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-bold hover:bg-[#2A231E] transition-colors whitespace-nowrap shadow-xs"
            >
              <span>Call Us</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
