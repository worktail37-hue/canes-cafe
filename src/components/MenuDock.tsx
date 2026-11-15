import React, { useState } from 'react';
import { MacOSDock, DockApp } from './ui/mac-os-dock';
import { useToast } from './Toast';
import { Sparkles, Coffee, ArrowUpRight } from 'lucide-react';

export interface SignatureCoffee {
  id: string;
  name: string;
  icon: string;
  price: string;
  category: string;
  description: string;
  tastingNotes: string[];
  volume: string;
  matchMenuId?: string;
}

export const SIGNATURE_COFFEES: SignatureCoffee[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    icon: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=300&q=80',
    price: '$3.80',
    category: 'Double Shot Ristretto',
    description: 'Extracted with golden crema, rich dark cacao intensity, and a delicate honey finish.',
    tastingNotes: ['Dark Cacao', 'Orange Zest', 'Golden Crema'],
    volume: '60 ml',
    matchMenuId: 'c3',
  },
  {
    id: 'latte',
    name: 'Latte',
    icon: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=300&q=80',
    price: '$4.80',
    category: 'Velvet Micro-Foam',
    description: 'Double espresso pulled gently over silky steamed milk with subtle hazelnut and toffee notes.',
    tastingNotes: ['Hazelnut', 'Toffee', 'Silky Sweetness'],
    volume: '240 ml',
    matchMenuId: 'c1',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    icon: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80',
    price: '$5.20',
    category: '20-Hour Slow Steep',
    description: 'Slow-steeped chilled for 20 hours, unlocking ultra-smooth chocolate clarity with near-zero acidity.',
    tastingNotes: ['Cacao Nibs', 'Black Cherry', 'Molasses'],
    volume: '320 ml',
    matchMenuId: 'c4',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    icon: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80',
    price: '$4.50',
    category: 'Classic 1:1:1 Ratio',
    description: 'Harmonious third espresso, third steamed whole milk, topped with a dense cloud of sweet micro-froth.',
    tastingNotes: ['Aerated Cream', 'Cocoa Dust', 'Roasted Nut'],
    volume: '180 ml',
    matchMenuId: 'c2',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    icon: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=300&q=80',
    price: '$4.60',
    category: 'Antipodean Style',
    description: 'Double ristretto crowned with glossy micro-foam, delivering intense coffee body with a velvet mouthfeel.',
    tastingNotes: ['Brown Sugar', 'Stone Fruit', 'Glossy Velour'],
    volume: '160 ml',
    matchMenuId: 'c6',
  },
];

export interface MenuDockProps {
  onCoffeeSelect?: (coffee: SignatureCoffee) => void;
  className?: string;
  showCard?: boolean;
}

export const MenuDock: React.FC<MenuDockProps> = ({
  onCoffeeSelect,
  className = '',
  showCard = true,
}) => {
  const [selectedId, setSelectedId] = useState<string>('latte');
  const { showToast } = useToast();

  const selectedCoffee =
    SIGNATURE_COFFEES.find((c) => c.id === selectedId) || SIGNATURE_COFFEES[0];

  const dockApps: DockApp[] = SIGNATURE_COFFEES.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
  }));

  const handleAppClick = (appId: string) => {
    setSelectedId(appId);
    const coffee = SIGNATURE_COFFEES.find((c) => c.id === appId);
    if (coffee) {
      if (onCoffeeSelect) {
        onCoffeeSelect(coffee);
      }
    }
  };

  const handleScrollToMenu = () => {
    const el = document.querySelector('#our-coffee');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Menu Spotlight', `Viewing ${selectedCoffee.name} in specialty brews`, 'info');
  };

  return (
    <div className={`flex flex-col items-center w-full max-w-2xl mx-auto px-4 ${className}`}>
      {/* Header Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-2 w-2 rounded-full bg-[#C9A24B] animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8C7B6E] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
          Signature Brews Dock
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#2F2823]/75 text-center mb-5 max-w-md">
        Hover to magnify our signature brews. Click an icon to inspect the roast profile or add to bag.
      </p>

      {/* The macOS Magnification Dock */}
      <div className="py-2 flex items-center justify-center w-full max-w-full overflow-visible">
        <MacOSDock
          apps={dockApps}
          openApps={[selectedId]}
          onAppClick={handleAppClick}
          className="shadow-2xl border border-white/20 max-w-full"
        />
      </div>

      {/* Selected Coffee Inspection Card */}
      {showCard && selectedCoffee && (
        <div className="mt-6 w-full max-w-lg bg-[#F4F0EA] dark:bg-[#2A231E]/90 rounded-2xl p-4 sm:p-5 border border-[#D6CCBE] dark:border-[#3B322C] shadow-lg transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md border border-[#D6CCBE]/60">
              <img
                src={selectedCoffee.icon}
                alt={selectedCoffee.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-black text-lg sm:text-xl text-[#3B322C] dark:text-[#F3EEE7]">
                    {selectedCoffee.name}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#3B322C]/10 dark:bg-white/10 text-[#3B322C] dark:text-[#E9E3DA] font-mono">
                    {selectedCoffee.volume}
                  </span>
                </div>
                <span className="text-base sm:text-lg font-bold text-[#C9A24B] font-mono">
                  {selectedCoffee.price}
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C7B6E] mb-2">
                {selectedCoffee.category}
              </p>

              <p className="text-xs sm:text-sm text-[#2F2823]/80 dark:text-[#E9E3DA]/80 leading-relaxed mb-3">
                {selectedCoffee.description}
              </p>

              {/* Tasting Notes */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-4">
                {selectedCoffee.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#E9E3DA] dark:bg-[#3B322C] text-[#3B322C] dark:text-[#F3EEE7] font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Information & Menu Navigation */}
              <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold shadow-xs">
                  <Coffee className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Available at Counter</span>
                </span>

                <button
                  type="button"
                  onClick={handleScrollToMenu}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-full border border-[#D6CCBE] dark:border-[#52443B] text-xs font-medium text-[#3B322C] dark:text-[#E9E3DA] hover:bg-[#E9E3DA]/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>Full Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDock;
