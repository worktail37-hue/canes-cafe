import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';
import { SEO_CONFIG } from '../config/seoConfig';
import { SafeImage } from './SafeImage';

export const ReviewsSection: React.FC = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const prevReview = () => {
    setActiveReviewIndex((prev) =>
      prev === 0 ? SITE_DATA.reviewsSection.items.length - 1 : prev - 1
    );
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) =>
      prev === SITE_DATA.reviewsSection.items.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-20 sm:py-28 bg-[#F4F0EA] border-t border-[#D6CCBE]/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] block mb-2">
              Community Voices
            </span>
            <h2
              id="reviews-heading"
              className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C]"
            >
              {SITE_DATA.reviewsSection.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#2F2823]/80 leading-relaxed">
              Words from morning regulars and coffee travelers in {SEO_CONFIG.city || '[CITY]'}. {SITE_DATA.reviewsSection.subtitle}
            </p>
          </div>

          {/* Navigation Controls for Mobile Slider */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-full bg-[#3B322C] text-[#F3EEE7] hover:bg-[#2A231E] cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextReview}
              className="p-2.5 rounded-full bg-[#3B322C] text-[#F3EEE7] hover:bg-[#2A231E] cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Review Cards (Grid on desktop, carousel on mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {SITE_DATA.reviewsSection.items.map((review) => (
            <div
              key={review.id}
              className="bg-[#E9E3DA] p-8 rounded-2xl border border-[#D6CCBE] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-[#8C7B6E]/30 absolute top-6 right-6" aria-hidden="true" />

              <div>
                {/* 5-Star Gold Rating */}
                <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A24B] text-[#C9A24B]" aria-hidden="true" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#2F2823] leading-relaxed italic font-serif">
                  {review.comment}
                </p>
              </div>

              {/* Author Lockup (h3 maintains strict heading hierarchy) */}
              <div className="mt-8 pt-6 border-t border-[#D6CCBE] flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-[#8C7B6E]/40 shrink-0 bg-[#3B322C]">
                  {/* TODO-SEO: Replace with authentic patron photo */}
                  <SafeImage
                    src={review.avatar}
                    alt={`${review.name}, Cane's Coffee patron in ${SEO_CONFIG.city}`}
                    className="w-full h-full object-cover"
                    fallbackType="avatar"
                    loading="lazy"
                    decoding="async"
                    width={44}
                    height={44}
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#3B322C]">
                    {review.name}
                  </h3>
                  <p className="text-xs text-[#8C7B6E]">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View Single Card with Controls */}
        <div className="md:hidden">
          {(() => {
            const review = SITE_DATA.reviewsSection.items[activeReviewIndex];
            return (
              <div className="bg-[#E9E3DA] p-6 rounded-2xl border border-[#D6CCBE] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A24B] text-[#C9A24B]" aria-hidden="true" />
                    ))}
                  </div>

                  <p className="text-sm text-[#2F2823] leading-relaxed italic font-serif">
                    {review.comment}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D6CCBE] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#8C7B6E]/40 shrink-0 bg-[#3B322C]">
                    <SafeImage
                      src={review.avatar}
                      alt={`${review.name}, patron`}
                      className="w-full h-full object-cover"
                      fallbackType="avatar"
                      loading="lazy"
                      decoding="async"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#3B322C]">
                      {review.name}
                    </h3>
                    <p className="text-xs text-[#8C7B6E]">{review.role}</p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {SITE_DATA.reviewsSection.items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReviewIndex(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeReviewIndex === i ? 'w-6 bg-[#3B322C]' : 'bg-[#8C7B6E]/40'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Accolades & Press Honors (Fills empty space below customer reviews) */}
        <div className="mt-16 pt-12 border-t border-[#D6CCBE]/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#E9E3DA] border border-[#D6CCBE] shadow-xs">
              <span className="font-mono text-sm font-bold text-[#C9A24B]">★ 4.9 / 5.0</span>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3B322C] mt-1.5">
                Google &amp; Yelp
              </h4>
              <p className="mt-1 text-[11px] text-[#8C7B6E] leading-snug">
                1,200+ five-star verified neighborhood reviews.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#E9E3DA] border border-[#D6CCBE] shadow-xs">
              <span className="font-mono text-sm font-bold text-[#C9A24B]">BEST ROASTER</span>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3B322C] mt-1.5">
                Specialty Coffee Guild
              </h4>
              <p className="mt-1 text-[11px] text-[#8C7B6E] leading-snug">
                Awarded for micro-batch origin clarity &amp; consistency.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#E9E3DA] border border-[#D6CCBE] shadow-xs">
              <span className="font-mono text-sm font-bold text-[#C9A24B]">TOP 3 PASTRY</span>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3B322C] mt-1.5">
                Daily Bakehouse Guide
              </h4>
              <p className="mt-1 text-[11px] text-[#8C7B6E] leading-snug">
                Recognized for 36-hour French butter lamination.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#E9E3DA] border border-[#D6CCBE] shadow-xs">
              <span className="font-mono text-sm font-bold text-[#C9A24B]">ZERO-WASTE</span>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3B322C] mt-1.5">
                Green Cafe Award
              </h4>
              <p className="mt-1 text-[11px] text-[#8C7B6E] leading-snug">
                100% compostable takeaway &amp; community grounds compost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
