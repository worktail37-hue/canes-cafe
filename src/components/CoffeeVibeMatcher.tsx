import React, { useState } from 'react';
import {
  Compass,
  X,
  Coffee,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Heart,
  Smile,
  Zap,
  Sun,
  CloudRain,
  Briefcase,
  Music,
  Feather,
  ChevronRight,
} from 'lucide-react';
import { SITE_DATA } from '../data/siteData';
import { SafeImage } from './SafeImage';
import { useToast } from './Toast';

export interface VibeResult {
  id: string;
  archetype: string;
  tagline: string;
  feelGoodMessage: string;
  coffeeName: string;
  coffeeSubtitle: string;
  price: string;
  image: string;
  description: string;
  tastingNotes: string[];
  suggestedPastry: string;
  pastryDescription: string;
  menuTargetId: string;
}

const VIBE_RESULTS: Record<string, VibeResult> = {
  velvet: {
    id: 'velvet',
    archetype: 'The Velvet Comfort Soul',
    tagline: 'Warm, Nurturing & Velvety Softness',
    feelGoodMessage:
      'You deserve a gentle, comforting pause today. Let the textured hazelnut micro-foam wrap around your morning like a favorite warm knit sweater.',
    coffeeName: 'VELVET LATTE',
    coffeeSubtitle: 'House Signature · Oat or Whole Milk',
    price: '$4.80',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    description:
      'Double espresso gently folded into textured oat or whole milk with sweet toasted hazelnut and toffee undertones.',
    tastingNotes: ['Sweet Toffee', 'Hazelnut Praline', 'Silky Micro-foam'],
    suggestedPastry: 'Cardamom Cinnamon Knot',
    pastryDescription: 'Braided Scandinavian dough with crushed green cardamom & pearl sugar.',
    menuTargetId: 'c1',
  },
  pourOver: {
    id: 'pourOver',
    archetype: 'The Mindful Purist',
    tagline: 'Clarity, Presence & Sensory Elegance',
    feelGoodMessage:
      'Breathe in the floral jasmine aroma. Your vibe is all about quiet appreciation, deep creative clarity, and savoring the artisanal craft of a hand-poured cup.',
    coffeeName: 'SINGLE ORIGIN POUR-OVER',
    coffeeSubtitle: 'V60 Hand-Drip · Ethiopian Yirgacheffe',
    price: '$5.60',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    description:
      'Single-estate Ethiopian micro-lot highlighting floral jasmine blossoms, juicy stone fruit, and vibrant bergamot acidity.',
    tastingNotes: ['Jasmine Blossom', 'Ripe Peach', 'Bergamot Citrus'],
    suggestedPastry: 'Country Sourdough Loaf Slice',
    pastryDescription: 'Wild-levain whole grain sourdough with caramelized blistered crust.',
    menuTargetId: 'c6',
  },
  coldBrew: {
    id: 'coldBrew',
    archetype: 'The Focused Achiever',
    tagline: 'Clean Power, Steady Energy & Cool Drive',
    feelGoodMessage:
      'Your mind is sharp and you are ready to make things happen. This clean, ultra-smooth chilled extraction fuels your momentum without any jitters.',
    coffeeName: 'COLD BREW RESERVE',
    coffeeSubtitle: '20-Hour Slow Chilled Drip',
    price: '$5.20',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    description:
      'Single-origin beans steeped chilled for 20 hours. Deep chocolate clarity with exceptionally low acidity and a rounded cacao finish.',
    tastingNotes: ['Dark Chocolate', 'Dutch Cacao', 'Zero Bitterness'],
    suggestedPastry: 'Pain au Chocolat',
    pastryDescription: 'Laminated French butter pastry enveloping two batons of 66% dark chocolate.',
    menuTargetId: 'c4',
  },
  cappuccino: {
    id: 'cappuccino',
    archetype: 'The Timeless Classicist',
    tagline: 'Balance, Heritage & Nostalgic Joy',
    feelGoodMessage:
      'Some rituals never go out of style. Ground yourself in traditional Italian proportions: dense airy foam, rich espresso, and a delicate dusting of cocoa.',
    coffeeName: 'CLASSIC CAPPUCCINO',
    coffeeSubtitle: 'Traditional 1:1:1 Ratio',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    description:
      'Equal thirds of rich espresso, sweet steamed milk, and dense micro-aerated foam dusted with pure organic cacao.',
    tastingNotes: ['Bittersweet Cocoa', 'Rich Espresso', 'Airy Crema'],
    suggestedPastry: 'Burnt Basque Cheesecake',
    pastryDescription: 'Charred caramelized exterior with an ultra-creamy Tahitian vanilla center.',
    menuTargetId: 'c2',
  },
  cortado: {
    id: 'cortado',
    archetype: 'The Modern Minimalist',
    tagline: 'Poised Intensity & Balanced Calm',
    feelGoodMessage:
      'You appreciate zero fluff and absolute precision. Two ristretto shots softened with an equal kiss of milk give you the perfect contemplative spark.',
    coffeeName: 'DOUBLE CORTADO',
    coffeeSubtitle: 'Equal Balance in Gibraltar Glass',
    price: '$4.20',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    description:
      'Two ristretto shots softened with an equal pour of velvety milk in a heavy Gibraltar glass for maximum punch.',
    tastingNotes: ['Intense Ristretto', 'Velvety Milk', 'Roasted Walnut'],
    suggestedPastry: 'Rosemary & Sea Salt Focaccia',
    pastryDescription: 'Extra virgin olive oil dough with roasted garlic cloves & sea salt flakes.',
    menuTargetId: 'c3',
  },
};

interface QuestionOption {
  label: string;
  sublabel: string;
  icon: string;
  weight: 'velvet' | 'pourOver' | 'coldBrew' | 'cappuccino' | 'cortado';
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "How would you describe your current energy & headspace?",
    subtitle: "Select the option that mirrors your true feeling right now.",
    options: [
      {
        label: "Running full speed & need clean, focused fuel",
        sublabel: "Ready to tackle tasks with sharp, sustained drive",
        icon: "⚡",
        weight: "coldBrew",
      },
      {
        label: "Seeking warm comfort & a gentle, soothing hug",
        sublabel: "A quiet moment to unwind and feel nurtured",
        icon: "🛋️",
        weight: "velvet",
      },
      {
        label: "Slow, mindful & taking a quiet contemplative breath",
        sublabel: "Craving clarity, aroma, and peaceful gratitude",
        icon: "🌿",
        weight: "pourOver",
      },
      {
        label: "Balanced, steady & craving a timeless coffee classic",
        sublabel: "No gimmicks, just dependable artisanal tradition",
        icon: "☕",
        weight: "cappuccino",
      },
    ],
  },
  {
    id: 2,
    title: "What weather or aesthetic vibe speaks to you today?",
    subtitle: "What setting would make you feel most content?",
    options: [
      {
        label: "Crisp sunlit morning with linen breeze & birdsong",
        sublabel: "Bright, airy, and full of natural optimism",
        icon: "☀️",
        weight: "pourOver",
      },
      {
        label: "Rainy afternoon window with gentle acoustic music",
        sublabel: "Cozy knitwear, hot steam, and total relaxation",
        icon: "🌧️",
        weight: "velvet",
      },
      {
        label: "Modern minimalist studio, lo-fi beats & locked in",
        sublabel: "Organized desk, clean lines, and pure focus",
        icon: "💼",
        weight: "coldBrew",
      },
      {
        label: "Rustic European cafe counter with chatter & warm ovens",
        sublabel: "Timeless elegance and friendly neighborhood warmth",
        icon: "🏛️",
        weight: "cortado",
      },
    ],
  },
  {
    id: 3,
    title: "How do you want your coffee to feel on your palate?",
    subtitle: "Close your eyes and imagine the first sip.",
    options: [
      {
        label: "Silky, sweet, and coated in comforting hazelnut toffee",
        sublabel: "Melted richness that lingers like dessert",
        icon: "🍫",
        weight: "velvet",
      },
      {
        label: "Clean, light, and tea-like with sparkling floral fruit",
        sublabel: "Jasmine aroma, fresh peach, and zero bitterness",
        icon: "🌸",
        weight: "pourOver",
      },
      {
        label: "Chilled, deeply chocolatey, refreshing & zero acid",
        sublabel: "Deep dark cocoa clarity served over fresh ice",
        icon: "🧊",
        weight: "coldBrew",
      },
      {
        label: "Punchy espresso balanced by a thick velvet micro-foam",
        sublabel: "Equal intensity and creaminess in a heavy glass",
        icon: "🥛",
        weight: "cortado",
      },
    ],
  },
  {
    id: 4,
    title: "What feeling do you want to carry forward after this cup?",
    subtitle: "Our intention is to make you feel truly good.",
    options: [
      {
        label: "A deep sense of peace, self-care, and feeling cherished",
        sublabel: "Leave the hustle behind for 15 golden minutes",
        icon: "💖",
        weight: "velvet",
      },
      {
        label: "Sensory curiosity, inspiration, and craft discovery",
        sublabel: "Appreciating origin notes and terroir nuance",
        icon: "✨",
        weight: "pourOver",
      },
      {
        label: "Unstoppable momentum, productivity, and clear ambition",
        sublabel: "Ready to conquer your goals with confidence",
        icon: "🚀",
        weight: "coldBrew",
      },
      {
        label: "Grounded nostalgia, balance, and quiet satisfaction",
        sublabel: "The timeless joy of a simple, honest pleasure",
        icon: "🌱",
        weight: "cappuccino",
      },
    ],
  },
];

interface CoffeeVibeMatcherProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMenuTarget?: (targetId: string) => void;
}

export const CoffeeVibeMatcher: React.FC<CoffeeVibeMatcherProps> = ({
  isOpen,
  onClose,
  onSelectMenuTarget,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<VibeResult | null>(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSelectOption = (questionId: number, weight: string) => {
    const updated = { ...selectedAnswers, [questionId]: weight };
    setSelectedAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winning archetype by tallying weights
      const tally: Record<string, number> = {};
      Object.values(updated).forEach((w) => {
        tally[w] = (tally[w] || 0) + 1;
      });

      let topWeight = 'velvet';
      let maxCount = -1;
      Object.entries(tally).forEach(([k, count]) => {
        if (count > maxCount) {
          maxCount = count;
          topWeight = k;
        }
      });

      const matchedResult = VIBE_RESULTS[topWeight] || VIBE_RESULTS.velvet;
      setResult(matchedResult);
      showToast(`Matched with ${matchedResult.coffeeName}!`, 'Your vibe match is ready.', 'success');
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setResult(null);
  };

  const handleGoToMenu = (targetId: string) => {
    onClose();
    if (onSelectMenuTarget) {
      onSelectMenuTarget(targetId);
    }
    const menuEl = document.querySelector('#menu-catalog') || document.querySelector('#menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const progressPercent = result
    ? 100
    : Math.round(((currentStep + 1) / QUESTIONS.length) * 100);

  const currentQ = QUESTIONS[currentStep];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vibe-matcher-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2A231E]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-5">
        <div className="relative bg-[#F4F0EA] rounded-3xl max-w-xl w-full p-5 sm:p-8 border border-[#D6CCBE] shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#2F2823] overflow-hidden">
          {/* Top Decorative Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D6CCBE]/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center shrink-0 shadow-2xs">
                <Compass className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h2
                  id="vibe-matcher-title"
                  className="font-serif text-base sm:text-lg font-black tracking-tight text-[#3B322C]"
                >
                  COFFEE VIBE &amp; MOOD MATCHER
                </h2>
                <p className="text-[11px] text-[#8C7B6E]">
                  Find the drink that matches your energy &amp; makes you feel good
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8C7B6E] hover:text-[#2A231E] rounded-full hover:bg-[#D6CCBE]/40 transition-colors cursor-pointer"
              aria-label="Close vibe matcher"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 mb-6">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C7B6E] mb-1.5">
              <span>{result ? 'Your Match Is Ready' : `Question ${currentStep + 1} of ${QUESTIONS.length}`}</span>
              <span className="font-mono text-[#3B322C]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E9E3DA] rounded-full overflow-hidden border border-[#D6CCBE]/50">
              <div
                className="h-full bg-[#C9A24B] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* =========================================================================
              VIEW 1: QUESTION STEPPER
             ========================================================================= */}
          {!result && currentQ && (
            <div className="space-y-4">
              <div className="text-left mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A24B] block mb-1">
                  Step {currentStep + 1}
                </span>
                <h3 className="font-serif font-black text-lg sm:text-xl text-[#3B322C] leading-snug">
                  {currentQ.title}
                </h3>
                <p className="text-xs text-[#8C7B6E] mt-1">{currentQ.subtitle}</p>
              </div>

              {/* Options Stack */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isChosen = selectedAnswers[currentQ.id] === option.weight;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, option.weight)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group ${
                        isChosen
                          ? 'bg-[#3B322C] text-[#F3EEE7] border-[#3B322C] shadow-md ring-2 ring-[#C9A24B]'
                          : 'bg-white hover:bg-[#FAF8F5] border-[#D6CCBE] hover:border-[#8C7B6E] text-[#2F2823]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl sm:text-2xl shrink-0 group-hover:scale-110 transition-transform">
                          {option.icon}
                        </span>
                        <div>
                          <p
                            className={`font-serif font-bold text-xs sm:text-sm ${
                              isChosen ? 'text-[#F3EEE7]' : 'text-[#3B322C]'
                            }`}
                          >
                            {option.label}
                          </p>
                          <p
                            className={`text-[11px] mt-0.5 ${
                              isChosen ? 'text-[#D6CCBE]' : 'text-[#8C7B6E]'
                            }`}
                          >
                            {option.sublabel}
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          isChosen ? 'text-[#C9A24B]' : 'text-[#8C7B6E]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Back */}
              {currentStep > 0 && (
                <div className="pt-2 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs font-semibold text-[#8C7B6E] hover:text-[#3B322C] underline cursor-pointer"
                  >
                    ← Back to previous question
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 2: RESULT SCREEN (MATCH REVEAL)
             ========================================================================= */}
          {result && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Header Badge */}
              <div className="text-center pb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E3DA] border border-[#D6CCBE] text-[10px] font-bold uppercase tracking-widest text-[#3B322C] mb-2 shadow-2xs">
                  <Heart className="w-3 h-3 text-[#C9A24B] fill-[#C9A24B]" />
                  <span>Your Perfect Vibe Match</span>
                </div>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#3B322C] tracking-tight">
                  {result.archetype}
                </h3>
                <p className="text-xs font-semibold text-[#C9A24B] uppercase tracking-wider mt-0.5">
                  {result.tagline}
                </p>
              </div>

              {/* Feel-Good Message Card */}
              <div className="p-4 rounded-2xl bg-[#E9E3DA]/80 border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] leading-relaxed italic flex items-start gap-2.5">
                <Smile className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <p>&ldquo;{result.feelGoodMessage}&rdquo;</p>
              </div>

              {/* Matched Coffee Card */}
              <div className="rounded-2xl bg-white border border-[#D6CCBE] overflow-hidden shadow-sm flex flex-col sm:flex-row">
                <div className="relative aspect-[16/10] sm:aspect-square sm:w-44 shrink-0 bg-[#E9E3DA] overflow-hidden">
                  <SafeImage
                    src={result.image}
                    alt={result.coffeeName}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#3B322C]/90 text-[10px] font-bold text-[#F3EEE7]">
                    Recommended
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block">
                          {result.coffeeSubtitle}
                        </span>
                        <h4 className="font-serif font-black text-lg text-[#3B322C]">
                          {result.coffeeName}
                        </h4>
                      </div>
                      <span className="font-serif font-black text-lg text-[#3B322C]">
                        {result.price}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-[#2F2823]/80 leading-relaxed">
                      {result.description}
                    </p>

                    {/* Tasting notes */}
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {result.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4F0EA] text-[#69584D] font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bakery pairing recommendation */}
                  <div className="mt-3 pt-2.5 border-t border-[#F0EBE1] text-[11px] text-[#69584D]">
                    <span className="font-bold text-[#3B322C]">Suggested Bakehouse Pairing:</span>{' '}
                    <span>{result.suggestedPastry}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => handleGoToMenu(result.menuTargetId)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#3B322C] text-[#F3EEE7] text-xs font-bold tracking-wider uppercase hover:bg-[#2A231E] transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-[#C9A24B]" />
                  <span>Explore on Menu</span>
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-white border border-[#D6CCBE] text-[#3B322C] text-xs font-bold uppercase hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Another Vibe</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CoffeeVibeMatcher;
