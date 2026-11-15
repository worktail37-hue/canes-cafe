import React, { useState } from 'react';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'cup' | 'pastry' | 'beans' | 'cafe' | 'avatar';
  overlayClassName?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Resilient Image component optimized for Core Web Vitals (LCP, CLS):
 * - Supports eager loading and fetchpriority="high" for hero LCP assets.
 * - Defaults below-the-fold assets to loading="lazy" and decoding="async".
 * - Fallback vector illustrations prevent layout breakage if asset fails.
 * 
 * TODO-SEO: Photo Naming Convention Recommendation:
 * When uploading real photos, name them descriptively:
 * - canes-coffee-barista-latte-art-[city].jpg
 * - canes-coffee-french-butter-croissant.jpg
 * - canes-coffee-sourdough-country-loaf.jpg
 * - canes-coffee-cast-iron-drum-roasting.jpg
 * Always compress photos into modern WebP or AVIF formats for maximum PageSpeed scores.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'cup',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#D6CCBE]/40 text-[#3B322C] p-4 text-center select-none overflow-hidden ${className}`}
        role="img"
        aria-label={alt || "Cane's Coffee asset"}
      >
        {fallbackType === 'cup' && (
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-12 h-12 text-[#3B322C]/70 mb-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" y1="2" x2="6" y2="4" />
              <line x1="10" y1="2" x2="10" y2="4" />
              <line x1="14" y1="2" x2="14" y2="4" />
            </svg>
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#3B322C]/70">
              Artisan Brew
            </span>
          </div>
        )}

        {fallbackType === 'pastry' && (
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-12 h-12 text-[#8C7B6E] mb-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3 1.5 5.5 3.5 7L12 22l6.5-3c2-1.5 3.5-4 3.5-7 0-5.5-4.5-10-10-10z" />
              <path d="M8 12c1.5 1.5 4 2 8 0" />
            </svg>
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#3B322C]/70">
              Fresh Bake
            </span>
          </div>
        )}

        {fallbackType === 'beans' && (
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-12 h-12 text-[#3B322C]/70 mb-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <ellipse cx="12" cy="12" rx="8" ry="6" transform="rotate(-30 12 12)" />
              <path d="M8 8c2 4 6 4 8 8" />
            </svg>
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#3B322C]/70">
              Specialty Roast
            </span>
          </div>
        )}

        {fallbackType === 'cafe' && (
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-12 h-12 text-[#3B322C]/70 mb-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#3B322C]/70">
              Cane's Cafe
            </span>
          </div>
        )}

        {fallbackType === 'avatar' && (
          <div className="w-full h-full flex items-center justify-center bg-[#8C7B6E] text-[#F3EEE7] text-sm font-semibold">
            {alt ? alt.charAt(0).toUpperCase() : 'C'}
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt !== undefined ? alt : "Cane's Coffee artisanal item"}
      className={className}
      referrerPolicy="no-referrer"
      loading={loading}
      decoding={decoding}
      // Pass fetchPriority properly for React 19 / HTML standard
      {...(fetchPriority ? { fetchPriority } : {})}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};
