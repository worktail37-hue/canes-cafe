import { ArrowUpRight, Coffee, Utensils, Sparkles, Compass } from 'lucide-react';
import { SITE_DATA, FeaturedCategory } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface FeaturedCategoriesProps {
  onSelectCategory?: (category: 'all' | 'pasta' | 'sides') => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (category: 'coffee' | 'bakery' | 'pasta' | 'sides') => {
    if (category === 'coffee') {
      const el = document.querySelector('#our-coffee') || document.querySelector('#coffee');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (category === 'bakery') {
      const el = document.querySelector('#pastas-and-sides') || document.querySelector('#menu-catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (onSelectCategory && (category === 'pasta' || category === 'sides')) {
      onSelectCategory(category);
    }
    const menuEl =
      document.querySelector('#pastas-and-sides') ||
      document.querySelector('#menu-catalog');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'coffee':
        return <Coffee className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />;
      case 'bakery':
        return <Sparkles className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />;
      case 'pasta':
        return <Utensils className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="categories"
      aria-labelledby="featured-categories-heading"
      className="py-16 sm:py-24 bg-[#F4F0EA] dark:bg-[#1E1814] border-b border-[#D6CCBE]/70 dark:border-[#3B322C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] dark:text-[#A8988B] mb-2">
            <span>Western Cafe Pillars</span>
            <span aria-hidden="true">·</span>
            <span>Made From Scratch</span>
          </div>
          <h2
            id="featured-categories-heading"
            className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C] dark:text-[#F3EEE7]"
          >
            What We Craft Daily
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#2F2823]/80 dark:text-[#D6CCBE]/80 leading-relaxed">
            From sunrise espresso and morning sourdough to fresh midday bronze-die pasta ribbons and crisp hand-cut fries.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SITE_DATA.featuredCategories.map((cat: FeaturedCategory, idx: number) => (
            <article
              key={cat.id}
              onClick={() => handleCategoryClick(cat.filterTarget)}
              className="group cursor-pointer flex flex-col justify-between bg-white dark:bg-[#2A231E] rounded-2xl overflow-hidden border border-[#D6CCBE]/80 dark:border-[#3B322C] shadow-sm hover:shadow-xl hover:border-[#8C7B6E] dark:hover:border-[#C9A24B]/60 transition-all duration-300 transform-gpu hover:-translate-y-1"
            >
              {/* Image Container with smooth zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9E3DA] dark:bg-[#3B322C]/40">
                <SafeImage
                  src={cat.image}
                  alt={`${cat.title} at ${SITE_DATA.brand.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  width={600}
                  height={450}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A231E]/85 backdrop-blur-md text-[11px] font-medium text-[#F3EEE7]">
                  {getCategoryIcon(cat.filterTarget)}
                  <span>{cat.itemCount}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#C9A24B] font-semibold block mb-1">
                    0{idx + 1} · {cat.kicker}
                  </span>
                  <h3 className="font-serif font-black text-xl text-[#3B322C] dark:text-[#F3EEE7] group-hover:text-[#C9A24B] transition-colors leading-tight">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#2F2823]/75 dark:text-[#D6CCBE]/75 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Quiet Action Link */}
                <div className="mt-6 pt-4 border-t border-[#E9E3DA] dark:border-[#3B322C] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#3B322C] dark:text-[#E9E3DA]">
                  <span>Explore Selections</span>
                  <div className="w-7 h-7 rounded-full bg-[#F4F0EA] dark:bg-[#3B322C] flex items-center justify-center group-hover:bg-[#3B322C] group-hover:text-[#F3EEE7] dark:group-hover:bg-[#C9A24B] dark:group-hover:text-[#2A231E] transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
