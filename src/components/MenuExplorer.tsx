import React, { useState, useId, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Utensils,
  Sparkles,
  Search,
  Filter,
  X,
  Check,
  ChevronRight,
  RotateCcw,
  Info,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Loader2,
  Headphones,
  Leaf,
  WheatOff,
  Droplets,
  Sprout,
  LayoutGrid,
  Clock,
  ArrowRight,
  Flame,
  Wine,
} from 'lucide-react';
import { SITE_DATA } from '../data/siteData';
import { SafeImage } from './SafeImage';
import { useToast } from './Toast';
import { Cylinder3DRing, CylinderItem } from './ui/cylinder3-d-ring';

export type MenuCategoryType = 'all' | 'pasta' | 'sides';

export type DietaryOptionId = 'all' | 'gluten-free' | 'vegan' | 'dairy-free' | 'vegetarian';

export interface DietaryOption {
  id: DietaryOptionId;
  label: string;
  badgeLabel: string;
  icon: React.ElementType;
  description: string;
}

export const DIETARY_OPTIONS: DietaryOption[] = [
  {
    id: 'all',
    label: 'All Diets',
    badgeLabel: 'All',
    icon: LayoutGrid,
    description: 'Display all pastas and sides',
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian',
    badgeLabel: 'Vegetarian',
    icon: Sprout,
    description: 'Meatless dishes, handmade pastas, and savory sides',
  },
  {
    id: 'vegan',
    label: 'Vegan',
    badgeLabel: '100% Vegan',
    icon: Leaf,
    description: 'Plant-based recipes with zero dairy or animal products',
  },
  {
    id: 'gluten-free',
    label: 'Gluten-Free',
    badgeLabel: 'Gluten-Free',
    icon: WheatOff,
    description: 'Gluten-free friendly fries, bites, salads, and sides',
  },
  {
    id: 'dairy-free',
    label: 'Dairy-Free',
    badgeLabel: 'Dairy-Free',
    icon: Droplets,
    description: 'Lactose-free & dairy-free preparations',
  },
];

export interface KitchenMenuItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'pasta' | 'sides';
  subCategory: string;
  price: string;
  image: string;
  description: string;
  tag: string;
  dietary: string;
  dipOrSauce?: string;
  pairingNote?: string;
  cookNotes?: string;
  allergens?: string;
}

interface MenuExplorerProps {
  selectedCategory?: MenuCategoryType;
  onSelectCategory?: (category: MenuCategoryType) => void;
}

// Master list of handcrafted Pastas & Sides (NO COFFEES in this section)
const MASTER_PASTAS_AND_SIDES: KitchenMenuItem[] = [
  // --- HANDCRAFTED FRESH PASTAS ---
  {
    id: 'p1',
    name: 'TRUFFLE TAGLIOLINI',
    subtitle: '24-Month Parmigiano Reggiano',
    category: 'pasta',
    subCategory: 'Fresh Bronze-Die Pasta',
    price: '$17.50',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    description:
      'Delicate fresh egg ribbons tossed in white truffle butter emulsion, 24-month aged Parmigiano Reggiano, and cracked Tellicherry black pepper.',
    tag: 'Chef Signature',
    dietary: 'Vegetarian',
    dipOrSauce: 'White Truffle Butter Emulsion',
    pairingNote: 'Pairs wonderfully with an iced Double Cortado or crisp mineral water.',
    cookNotes: 'Extruded fresh daily at 10:30 AM through Italian bronze dies for optimal sauce adhesion.',
    allergens: 'Contains: Wheat, Dairy, Eggs',
  },
  {
    id: 'p2',
    name: 'RIGATONI BOLOGNESE',
    subtitle: '6-Hour Slow Simmered Ragù',
    category: 'pasta',
    subCategory: 'Fresh Bronze-Die Pasta',
    price: '$16.80',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=800&q=80',
    description:
      'Ridged bronze-die rigatoni coated in slow-braised beef, pork, and pancetta ragù with San Marzano tomatoes, mirepoix, red wine, and Grana Padano.',
    tag: 'Slow Braised',
    dietary: 'Hearty Classic',
    dipOrSauce: 'Bolognese Ragù',
    pairingNote: 'Pairs best with our bold Sumatran dark roast or iced cold brew reserve.',
    cookNotes: 'Slow simmered for 6 hours with pasture-raised meats and imported Italian tomatoes.',
    allergens: 'Contains: Wheat, Dairy, Beef, Pork',
  },
  {
    id: 'p3',
    name: 'CACIO E PEPE BUCATINI',
    subtitle: 'Roman Pecorino & Black Pepper',
    category: 'pasta',
    subCategory: 'Fresh Bronze-Die Pasta',
    price: '$15.20',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80',
    description:
      'Hollow bucatini tossed vigorously with toasted black peppercorns and creamy emulsified Pecorino Romano cheese broth into a glossy velvet coating.',
    tag: 'Roman Heritage',
    dietary: 'Vegetarian',
    dipOrSauce: 'Pecorino Romano Emulsion',
    pairingNote: 'Complements a clean single-origin pour-over with citrus notes.',
    cookNotes: 'Finished strictly al dente with starchy pasta water and coarse freshly crushed pepper.',
    allergens: 'Contains: Wheat, Dairy (Sheep Milk)',
  },
  {
    id: 'p4',
    name: 'BASIL GENOVESE GNOCCHI',
    subtitle: 'Ligurian Pesto & Sheep Ricotta',
    category: 'pasta',
    subCategory: 'Hand-Rolled Daily',
    price: '$16.40',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    description:
      'Pillow-soft hand-rolled Yukon Gold potato gnocchi tossed in vibrant sweet Genovese basil pesto, toasted pine nuts, and dollops of sheep milk ricotta.',
    tag: 'Hand-Rolled',
    dietary: 'Vegetarian',
    dipOrSauce: 'Fresh Basil Pesto',
    pairingNote: 'Refreshing alongside an iced Velvet Latte or tonic espresso.',
    cookNotes: 'Steamed Russet and Yukon potatoes riced hot for an impossibly fluffy, cloud-like texture.',
    allergens: 'Contains: Wheat, Dairy, Pine Nuts',
  },
  {
    id: 'p5',
    name: 'SPICY VODKA RIGATONI',
    subtitle: 'Calabrian Chili & Sweet Basil',
    category: 'pasta',
    subCategory: 'Fresh Bronze-Die Pasta',
    price: '$15.90',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80',
    description:
      'House-made rigatoni in a fiery tomato vodka cream sauce with smoky crushed Calabrian chilies, sweet torn basil, and shaved pecorino.',
    tag: 'Spicy Favorite',
    dietary: 'Vegetarian',
    dipOrSauce: 'Fiery Vodka Cream',
    pairingNote: 'Great with a chilled sparkling water or smooth milk beverage to temper the chili heat.',
    cookNotes: 'Flambéed with vodka to extract deep herbal nuances from San Marzano tomato paste.',
    allergens: 'Contains: Wheat, Dairy',
  },
  {
    id: 'p6',
    name: 'WILD MUSHROOM PAPPARDELLE',
    subtitle: 'Pan-Seared Chanterelles & Cremini',
    category: 'pasta',
    subCategory: 'Fresh Egg Ribbon Pasta',
    price: '$17.20',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80',
    description:
      'Wide ribbon egg pasta tossed with pan-seared chanterelle and cremini mushrooms, garlic herb white wine glaze, and garden thyme.',
    tag: 'Forest Harvest',
    dietary: 'Vegetarian',
    dipOrSauce: 'Garlic Herb Glaze',
    pairingNote: 'Earthy notes match exquisitely with medium-roast Colombian coffee.',
    cookNotes: 'Hand-cut 2cm egg ribbons cooked al dente in light mushroom reduction.',
    allergens: 'Contains: Wheat, Eggs, Dairy',
  },
  {
    id: 'p7',
    name: 'CRAB & SAFFRON LINGUINE',
    subtitle: 'Blue Crab & Herbed Pangrattato',
    category: 'pasta',
    subCategory: 'Fresh Bronze-Die Pasta',
    price: '$18.90',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    description:
      'Tender fresh linguine tossed with sweet lump blue crab meat, Spanish saffron white wine emulsion, gentle chili threads, and crunchy garlic pangrattato.',
    tag: 'Kitchen Reserve',
    dietary: 'Pescatarian',
    dipOrSauce: 'Saffron Wine Emulsion',
    pairingNote: 'Delicious with a floral Ethiopian pour-over or sparkling citrus cooler.',
    cookNotes: 'Finished with toasted sourdough breadcrumbs fried in garlic herb butter.',
    allergens: 'Contains: Wheat, Shellfish, Dairy',
  },
  {
    id: 'p8',
    name: 'SPINACH & RICOTTA RAVIOLI',
    subtitle: 'Sage Brown Butter & Hazelnuts',
    category: 'pasta',
    subCategory: 'Handmade Stuffed Pasta',
    price: '$16.50',
    image: 'https://images.unsplash.com/photo-1587740896339-96a76170508d?auto=format&fit=crop&w=800&q=80',
    description:
      'Hand-pinched pillow ravioli filled with whole-milk ricotta and baby spinach, bathed in nutty sage brown butter with toasted Oregon hazelnuts.',
    tag: 'Hand-Pinched',
    dietary: 'Vegetarian',
    dipOrSauce: 'Sage Brown Butter',
    pairingNote: 'Complements a nutty Flat White with oat or whole milk.',
    cookNotes: 'Delicate egg yolk dough sealed by hand and boiled for just 180 seconds.',
    allergens: 'Contains: Wheat, Dairy, Tree Nuts (Hazelnuts), Eggs',
  },

  // --- CRISPY SIDES & FRIES ---
  {
    id: 's1',
    name: 'ROSEMARY PARMESAN FRIES',
    subtitle: 'Hand-Cut Kennebec Potatoes',
    category: 'sides',
    subCategory: 'Crispy Double-Fried Sides',
    price: '$6.80',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    description:
      'Crispy double-fried hand-cut Idaho Kennebec potatoes tossed with fresh garden rosemary needles, coarse Maldon sea salt, and aged Parmigiano Reggiano.',
    tag: 'House Favorite',
    dietary: 'Vegetarian · Gluten-Free Friendly',
    dipOrSauce: 'Garlic Roasted Aioli',
    pairingNote: 'The quintessential accompaniment to any pasta or afternoon espresso.',
    cookNotes: 'Soaked for 12 hours in cold water to remove excess starch before double-cooking.',
    allergens: 'Dairy (in cheese), Eggs (in aioli)',
  },
  {
    id: 's2',
    name: 'TRUFFLE PARMESAN FRITES',
    subtitle: 'White Truffle Oil & Snipped Chives',
    category: 'sides',
    subCategory: 'Crispy Double-Fried Sides',
    price: '$7.90',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    description:
      'Golden shoestring frites drizzled with aromatic Italian white truffle oil, fine snipped chives, and delicate Pecorino shavings.',
    tag: 'Truffle Glazed',
    dietary: 'Vegetarian · Gluten-Free Friendly',
    dipOrSauce: 'Smoked Black Pepper Mayo',
    pairingNote: 'Pairs impeccably with our savory truffle tagliolini or an espresso cortado.',
    cookNotes: 'Double-fried at 180°C in clean sunflower oil for maximum crunch and potato sweetness.',
    allergens: 'Dairy, Eggs',
  },
  {
    id: 's3',
    name: 'CRISPY HERBED POLENTA BITES',
    subtitle: 'Rosemary Thyme & Warm Marinara',
    category: 'sides',
    subCategory: 'Warm Savory Bites',
    price: '$7.20',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    description:
      'Golden-crusted organic yellow polenta cubes infused with fresh rosemary and thyme, finished with grated cheese and served with warm San Marzano marinara.',
    tag: 'Crispy Hearth',
    dietary: 'Vegetarian · Gluten-Free Friendly',
    dipOrSauce: 'Warm San Marzano Marinara',
    pairingNote: 'A comforting gluten-conscious snack alongside an afternoon pour-over.',
    cookNotes: 'Coarse cornmeal slow-cooked with vegetable broth, cooled in slabs, and flash-crisped.',
    allergens: 'Dairy (optional vegan swap available)',
  },
  {
    id: 's4',
    name: 'HEIRLOOM CAFE GREEN SALAD',
    subtitle: 'Watermelon Radish & Hazelnut Vinaigrette',
    category: 'sides',
    subCategory: 'Crisp Market Greens',
    price: '$8.40',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description:
      'Crisp baby gem lettuce, crunchy watermelon radishes, English cucumber ribbons, and toasted Oregon hazelnuts in a bright lemon-shallot vinaigrette.',
    tag: 'Fresh Market',
    dietary: 'Vegan · Dairy-Free · Gluten-Free',
    dipOrSauce: 'House Lemon-Shallot Vinaigrette',
    pairingNote: 'Bright palate cleanser between rich pasta dishes.',
    cookNotes: 'Tossed to order with cold crisp market greens sourced from local organic growers.',
    allergens: 'Tree Nuts (Hazelnuts)',
  },
  {
    id: 's5',
    name: 'WARM GARLIC FOCACCIA SLICE',
    subtitle: 'Pan-Toasted Sourdough & Maldon Salt',
    category: 'sides',
    subCategory: 'Savory Bakehouse Side',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    description:
      'Thick slice of wild-levain sourdough focaccia pan-toasted with roasted garlic herb butter, chopped parsley, and crunchy Maldon sea salt flakes.',
    tag: 'Pan-Toasted',
    dietary: 'Vegetarian',
    dipOrSauce: 'Tuscan Extra Virgin Olive Oil',
    pairingNote: 'Essential for scooping up every drop of pasta bolognese or vodka cream sauce.',
    cookNotes: 'Slow wild-ferment focaccia dimpled with olive oil and toasted to crispy golden perfection.',
    allergens: 'Contains: Wheat, Dairy',
  },
  {
    id: 's6',
    name: 'SPICED ROASTED CAULIFLOWER',
    subtitle: 'Lemon Tahini Drizzle & Cumin',
    category: 'sides',
    subCategory: 'Oven-Roasted Vegetable',
    price: '$7.50',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80',
    description:
      'Oven-caramelized cauliflower florets dusted in fragrant toasted cumin and smoked paprika, finished with creamy lemon tahini drizzle and fresh mint leaves.',
    tag: 'Oven Charred',
    dietary: 'Vegan · Gluten-Free · Dairy-Free',
    dipOrSauce: 'Lemon Tahini Drizzle',
    pairingNote: 'Nutty, earthy flavors pair naturally with medium roast drip or iced brew.',
    cookNotes: 'Roasted at 230°C on volcanic stones to achieve charred edges and buttery centers.',
    allergens: 'Sesame (Tahini)',
  },
  {
    id: 's7',
    name: 'CRISPY PANKO ZUCCHINI FRIES',
    subtitle: 'Smoked Paprika & Lemon Caper Tartar',
    category: 'sides',
    subCategory: 'Crispy Double-Fried Sides',
    price: '$6.90',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description:
      'Hand-cut fresh green zucchini batons dipped in light batter and Japanese panko, fried golden-crisp and dusted with smoked sea salt.',
    tag: 'Golden Crunch',
    dietary: 'Vegetarian',
    dipOrSauce: 'Lemon Caper Tartar',
    pairingNote: 'Light, crunchy companion to our Cacio e Pepe or Tagliolini.',
    cookNotes: 'Cooked in small batches so the zucchini stays juicy while the exterior crackles.',
    allergens: 'Contains: Wheat, Eggs (in tartar)',
  },
  {
    id: 's8',
    name: 'MARINATED CASTELVETRANO OLIVES',
    subtitle: 'Citrus Peel, Fennel & Rosemary',
    category: 'sides',
    subCategory: 'Cold Antipasti',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    description:
      'Buttery bright green Sicilian Castelvetrano olives warm-marinated in extra virgin olive oil, blood orange peel, toasted fennel seed, and fresh rosemary sprigs.',
    tag: 'Antipasto',
    dietary: 'Vegan · Gluten-Free · Dairy-Free',
    dipOrSauce: 'Warm Herb Infused Olive Oil',
    pairingNote: 'Perfect savory table snack while waiting for fresh pasta to be rolled and boiled.',
    cookNotes: 'Warmed gently in oil to bloom aromatic volatile citrus and herb terpenes.',
    allergens: 'None',
  },
];

export const matchesDietary = (item: KitchenMenuItem, filterId: DietaryOptionId): boolean => {
  if (filterId === 'all') return true;
  const d = (item.dietary || '').toLowerCase();
  const desc = (item.description || '').toLowerCase();
  const name = item.name.toLowerCase();

  switch (filterId) {
    case 'vegetarian':
      return (
        d.includes('vegetarian') ||
        d.includes('vegan') ||
        name.includes('tagliolini') ||
        name.includes('cacio') ||
        name.includes('gnocchi') ||
        name.includes('fries')
      );
    case 'vegan':
      return (
        d.includes('vegan') ||
        d.includes('100% vegan') ||
        name.includes('salad') ||
        name.includes('cauliflower') ||
        name.includes('olives')
      );
    case 'gluten-free':
      return (
        d.includes('gluten-free') ||
        d.includes('gf') ||
        name.includes('fries') ||
        name.includes('frites') ||
        name.includes('polenta') ||
        name.includes('salad') ||
        name.includes('cauliflower') ||
        name.includes('olives')
      );
    case 'dairy-free':
      return (
        d.includes('dairy-free') ||
        d.includes('vegan') ||
        name.includes('salad') ||
        name.includes('cauliflower') ||
        name.includes('olives')
      );
    default:
      return true;
  }
};

export const MenuExplorer: React.FC<MenuExplorerProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [internalCategory, setInternalCategory] = useState<MenuCategoryType>('all');
  const activeCategory = selectedCategory ?? internalCategory;

  const setActiveCategory = (cat: MenuCategoryType) => {
    setInternalCategory(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryOptionId[]>([]);
  const [selectedItemForModal, setSelectedItemForModal] = useState<KitchenMenuItem | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const { showToast } = useToast();
  const searchInputId = useId();

  // Handle URL hash direct linking (e.g. #item-p1) on mount or popstate
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#item-')) {
        const itemId = hash.replace('#item-', '');
        const target = MASTER_PASTAS_AND_SIDES.find((item) => item.id === itemId);
        if (target) {
          setSelectedItemForModal(target);
          const el = document.getElementById(`item-card-${itemId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard navigation: Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedItemForModal) {
        setSelectedItemForModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemForModal]);

  // Handler to open item detail view and update URL hash cleanly
  const handleOpenItemDetails = (item: KitchenMenuItem) => {
    setSelectedItemForModal(item);
    try {
      window.history.replaceState(null, '', `#item-${item.id}`);
    } catch {
      // Ignore in restricted iframes
    }
    showToast(`Viewing ${item.name} details`, 'info');
  };

  // Close item detail modal
  const handleCloseItemDetails = () => {
    setSelectedItemForModal(null);
    try {
      window.history.replaceState(null, '', '#pastas-and-sides');
    } catch {
      // Ignore in restricted iframes
    }
  };

  // =========================================================================
  // Text-To-Speech (TTS) Kitchen Specials Audio Guide
  // =========================================================================
  const [ttsState, setTtsState] = useState<'idle' | 'loading' | 'playing' | 'paused'>('idle');
  const [ttsSpeed, setTtsSpeed] = useState<number>(1.0);
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);

  const kitchenReadoutScript = useMemo(() => {
    return (
      "Welcome to Cane's Serve kitchen audio guide for fresh pastas and crispy sides. " +
      "Our bronze-die extruded pasta offerings today include: " +
      "Truffle Tagliolini tossed in white truffle butter emulsion with 24-month aged Parmigiano Reggiano; " +
      "Rigatoni Bolognese with slow-braised beef, pork, and pancetta ragù simmered for 6 hours; " +
      "Cacio e Pepe Bucatini with toasted Tellicherry pepper and creamy Pecorino broth; " +
      "and Basil Genovese Gnocchi, hand-rolled daily with sweet Ligurian pesto and sheep milk ricotta. " +
      "For crispy sides: " +
      "Rosemary Parmesan Kennebec Fries with garlic roasted aioli; " +
      "Truffle Parmesan Frites drizzled in white truffle oil; " +
      "Crispy Herbed Polenta Bites with San Marzano marinara; " +
      "and Heirloom Green Salad in lemon shallot vinaigrette. " +
      "Pasta is served daily from 11:30 AM until close. Click any dish to view full culinary details!"
    );
  }, []);

  const fallbackToWebSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Speech audio is not supported in this browser', 'info');
      setTtsState('idle');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = ttsSpeed;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setTtsState('playing');
        showToast('Now reading Pasta & Sides Specials', 'info');
      };
      utterance.onpause = () => setTtsState('paused');
      utterance.onresume = () => setTtsState('playing');
      utterance.onend = () => {
        setTtsState('idle');
        showToast('Finished reading kitchen specials', 'info');
      };
      utterance.onerror = () => setTtsState('idle');

      window.speechSynthesis.speak(utterance);
    } catch {
      setTtsState('idle');
    }
  };

  const handleStartAudio = async () => {
    setTtsState('loading');
    showToast('Loading audio guide for Pasta & Sides specials...', 'info');

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: kitchenReadoutScript,
          voice: 'Kore',
        }),
      });

      if (!res.ok) {
        throw new Error('Server TTS unavailable');
      }

      const data = await res.json();
      if (!data.audioBase64) {
        throw new Error('No audio returned');
      }

      const audio = new Audio(`data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`);
      audio.playbackRate = ttsSpeed;
      audio.onplay = () => {
        setTtsState('playing');
        showToast('Now playing Pasta & Sides Audio Guide', 'success');
      };
      audio.onpause = () => {
        if (audio.currentTime < audio.duration) {
          setTtsState('paused');
        }
      };
      audio.onended = () => {
        setTtsState('idle');
        showToast('Finished reading kitchen specials', 'info');
      };
      audio.onerror = () => {
        fallbackToWebSpeech(kitchenReadoutScript);
      };

      ttsAudioRef.current = audio;
      await audio.play();
    } catch {
      fallbackToWebSpeech(kitchenReadoutScript);
    }
  };

  const handleTogglePlayback = () => {
    if (ttsState === 'idle') {
      handleStartAudio();
    } else if (ttsState === 'playing') {
      if (ttsAudioRef.current) {
        ttsAudioRef.current.pause();
        setTtsState('paused');
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        setTtsState('paused');
      }
    } else if (ttsState === 'paused') {
      if (ttsAudioRef.current) {
        ttsAudioRef.current.play();
        setTtsState('playing');
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setTtsState('playing');
      } else {
        handleStartAudio();
      }
    }
  };

  const handleStopAudio = () => {
    if (ttsAudioRef.current) {
      ttsAudioRef.current.pause();
      ttsAudioRef.current.currentTime = 0;
      ttsAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setTtsState('idle');
    showToast('Kitchen audio narration stopped', 'info');
  };

  useEffect(() => {
    return () => {
      if (ttsAudioRef.current) {
        ttsAudioRef.current.pause();
        ttsAudioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filter items based on activeCategory, searchQuery, and selectedDietary
  const filteredItems = useMemo(() => {
    return MASTER_PASTAS_AND_SIDES.filter((item) => {
      // 1. Category Filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSub = item.subtitle.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesDip = (item.dipOrSauce || '').toLowerCase().includes(q);
        const matchesDiet = (item.dietary || '').toLowerCase().includes(q);
        if (!matchesName && !matchesSub && !matchesDesc && !matchesDip && !matchesDiet) {
          return false;
        }
      }

      // 3. Dietary Filter (matches all active dietary badges)
      if (selectedDietary.length > 0) {
        const matchesAllBadges = selectedDietary.every((dietId) => matchesDietary(item, dietId));
        if (!matchesAllBadges) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, searchQuery, selectedDietary]);

  const toggleDietaryFilter = (dietId: DietaryOptionId) => {
    if (dietId === 'all') {
      setSelectedDietary([]);
      showToast('Cleared all dietary filters', 'info');
      return;
    }

    setSelectedDietary((prev) => {
      const exists = prev.includes(dietId);
      const next = exists ? prev.filter((id) => id !== dietId) : [...prev, dietId];
      const selectedOption = DIETARY_OPTIONS.find((o) => o.id === dietId);
      if (!exists && selectedOption) {
        showToast(`Filtered by ${selectedOption.label}`, 'info');
      }
      return next;
    });
  };

  // 3D Cylinder Ring dishes list (adapts smoothly to category filter or all dishes)
  const cylinderImages: CylinderItem[] = useMemo(() => {
    const list = filteredItems.length >= 6 ? filteredItems : MASTER_PASTAS_AND_SIDES;
    return list.map((dish) => ({
      id: dish.id,
      src: dish.image,
      alt: dish.name,
      title: dish.name,
      subtitle: dish.subtitle,
      price: dish.price,
      tag: dish.tag,
      category: dish.category,
    }));
  }, [filteredItems]);

  return (
    <section
      id="pastas-and-sides"
      aria-labelledby="pastas-heading"
      className="py-20 sm:py-28 bg-[#F4F0EA] dark:bg-[#1E1814] text-[#2F2823] dark:text-[#F3EEE7] relative border-b border-[#D6CCBE]/80 dark:border-[#3B322C] transition-colors duration-300"
    >
      {/* Anchor alias to ensure existing links (#menu-catalog) still land gracefully */}
      <span id="menu-catalog" className="sr-only">Pastas &amp; Sides</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* SECTION HEADER: RENAME CANE'S MENU CATALOG TO PASTA'S AND SIDES   */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C7B6E] dark:text-[#A8988B] mb-2">
              <Utensils className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Cane&apos;s Serve Kitchen • Scratch-Made Daily</span>
            </div>

            <h2
              id="pastas-heading"
              className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#3B322C] dark:text-[#F3EEE7]"
            >
              PASTA&apos;S AND SIDES
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#2F2823]/80 dark:text-[#D6CCBE]/80 leading-relaxed">
              Bronze-die extruded artisan pastas and hand-cut double-fried Kennebec potato sides. Click any item directly to view complete recipe details, culinary pairings, and dietary notes.
            </p>
          </div>

          {/* Audio Narration Button & Live Kitchen Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleTogglePlayback}
              disabled={ttsState === 'loading'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B322C] dark:bg-[#C9A24B] text-[#F3EEE7] dark:text-[#2A231E] hover:bg-[#2A231E] dark:hover:bg-[#E0BA60] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              title="Listen to kitchen specials spoken audio"
            >
              {ttsState === 'loading' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Loading Audio...</span>
                </>
              ) : ttsState === 'playing' ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Specials Audio</span>
                </>
              ) : ttsState === 'paused' ? (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume Specials</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C9A24B] dark:text-[#2A231E]" />
                  <span>Listen to Kitchen Specials</span>
                </>
              )}
            </button>

            {ttsState !== 'idle' && (
              <button
                type="button"
                onClick={handleStopAudio}
                className="p-2 rounded-full bg-[#E9E3DA] dark:bg-[#3B322C] text-[#3B322C] dark:text-[#F3EEE7] hover:bg-[#D6CCBE] transition-colors cursor-pointer"
                title="Stop audio playback"
              >
                <Square className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8C7B6E] dark:text-[#A8988B] bg-[#E9E3DA] dark:bg-[#2A231E] py-2 px-3.5 rounded-full border border-[#D6CCBE] dark:border-[#3B322C]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>KITCHEN SERVING 11:30 AM – CLOSE</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3D CYLINDER RING ANIMATED SHOWCASE                                */}
        {/* ================================================================= */}
        <div className="mb-10 sm:mb-12 bg-[#E9E3DA]/70 dark:bg-[#251E19]/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-[#D6CCBE] dark:border-[#3B322C] shadow-lg overflow-hidden relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9A24B] animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A24B]">
                Live 3D Ring Animation • Interactive Perspective
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8C7B6E] dark:text-[#A8988B]">
              Hover or swipe to tilt • Click any dish to view recipe &amp; details
            </span>
          </div>

          <Cylinder3DRing
            images={cylinderImages}
            duration={22}
            perspective={1150}
            initialTiltX={-12}
            interactiveTilt={true}
            className="py-2"
            onItemClick={(item) => {
              const dish = MASTER_PASTAS_AND_SIDES.find((d) => d.id === item.id);
              if (dish) {
                handleOpenItemDetails(dish);
              }
            }}
          />
        </div>

        {/* ================================================================= */}
        {/* INTERACTIVE CONTROLS BAR: CATEGORY TABS + LIVE SEARCH             */}
        {/* ================================================================= */}
        <div className="bg-white/80 dark:bg-[#2A231E]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#D6CCBE]/80 dark:border-[#3B322C] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Switcher Tabs with Animated Active Indicator */}
            <div
              role="tablist"
              aria-label="Pasta and Sides Categories"
              className="inline-flex max-w-full overflow-x-auto p-1.5 rounded-xl bg-[#E9E3DA] dark:bg-[#1E1814] border border-[#D6CCBE]/60 dark:border-[#3B322C] self-start relative"
            >
              {[
                { id: 'all', label: 'All Pastas & Sides', count: MASTER_PASTAS_AND_SIDES.length },
                {
                  id: 'pasta',
                  label: 'Handcrafted Pastas',
                  count: MASTER_PASTAS_AND_SIDES.filter((i) => i.category === 'pasta').length,
                },
                {
                  id: 'sides',
                  label: 'Crispy Sides & Fries',
                  count: MASTER_PASTAS_AND_SIDES.filter((i) => i.category === 'sides').length,
                },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(tab.id as MenuCategoryType)}
                    className={`relative z-10 px-3.5 sm:px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'text-[#F3EEE7] dark:text-[#2A231E]'
                        : 'text-[#3B322C]/70 dark:text-[#D6CCBE]/70 hover:text-[#3B322C] dark:hover:text-[#F3EEE7]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? 'bg-[#C9A24B] text-[#2A231E] font-bold'
                          : 'bg-[#D6CCBE]/70 dark:bg-[#3B322C] text-[#3B322C] dark:text-[#D6CCBE]'
                      }`}
                    >
                      {tab.count}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-[#3B322C] dark:bg-[#C9A24B] rounded-lg -z-10 shadow-sm"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Search Bar */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor={searchInputId} className="sr-only">
                Search pastas and sides
              </label>
              <Search className="w-4 h-4 text-[#8C7B6E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id={searchInputId}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tagliolini, bolognese, fries, polenta..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-[#1E1814] border border-[#D6CCBE] dark:border-[#3B322C] text-xs sm:text-sm text-[#2F2823] dark:text-[#F3EEE7] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C7B6E] hover:text-[#3B322C] dark:hover:text-[#F3EEE7] cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* DIETARY FILTER BADGES WITH ANIMATED PILLS                         */}
          {/* ================================================================= */}
          <div className="pt-3 border-t border-[#D6CCBE]/60 dark:border-[#3B322C] flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7B6E] dark:text-[#A8988B] flex items-center gap-1.5 mr-1">
              <Filter className="w-3 h-3 text-[#C9A24B]" />
              <span>Dietary Filter:</span>
            </span>

            {DIETARY_OPTIONS.map((option) => {
              const isAll = option.id === 'all';
              const isSelected = isAll ? selectedDietary.length === 0 : selectedDietary.includes(option.id);
              const IconComponent = option.icon;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleDietaryFilter(option.id)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3B322C] dark:bg-[#C9A24B] text-[#F3EEE7] dark:text-[#2A231E] shadow-sm font-semibold'
                      : 'bg-[#E9E3DA]/80 dark:bg-[#1E1814] text-[#69584D] dark:text-[#D6CCBE] hover:bg-[#D6CCBE] dark:hover:bg-[#3B322C]'
                  }`}
                  title={option.description}
                >
                  <IconComponent
                    className={`w-3 h-3 ${isSelected ? 'text-[#C9A24B] dark:text-[#2A231E]' : 'text-[#8C7B6E]'}`}
                  />
                  <span>{option.badgeLabel}</span>
                  {isSelected && !isAll && <Check className="w-3 h-3 ml-0.5" />}
                </button>
              );
            })}

            {/* Clear Filters Button if any active */}
            {(selectedDietary.length > 0 || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDietary([]);
                  setSearchQuery('');
                  showToast('Reset all filters', 'info');
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8C7B6E] hover:text-[#3B322C] dark:hover:text-[#F3EEE7] ml-auto transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Summary */}
        <div className="flex items-center justify-between text-xs text-[#8C7B6E] dark:text-[#A8988B] mb-6 px-1">
          <span>
            Showing <strong className="text-[#3B322C] dark:text-[#F3EEE7]">{filteredItems.length}</strong> items in{' '}
            {activeCategory === 'all'
              ? 'Pastas & Sides'
              : activeCategory === 'pasta'
              ? 'Handcrafted Pastas'
              : 'Crispy Sides'}
          </span>
          <span className="hidden sm:inline italic">Click any dish to inspect complete recipe &amp; pairing details</span>
        </div>

        {/* ================================================================= */}
        {/* REALLY ANIMATED GRID OF DISHES: SMOOTH MOTION CARDS               */}
        {/* ================================================================= */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-white/70 dark:bg-[#2A231E] rounded-3xl border border-[#D6CCBE] dark:border-[#3B322C] max-w-lg mx-auto">
            <Utensils className="w-10 h-10 text-[#C9A24B] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif font-bold text-xl text-[#3B322C] dark:text-[#F3EEE7]">
              No dishes match your filters
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#8C7B6E] dark:text-[#D6CCBE]">
              Try clearing your search query or relaxing dietary restrictions to see all pastas and sides.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDietary([]);
                setActiveCategory('all');
              }}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A231E] transition-all"
            >
              Show All Dishes
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.article
                  key={item.id}
                  id={`item-card-${item.id}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.05 : 0.35,
                    delay: shouldReduceMotion ? 0 : Math.min(idx * 0.04, 0.24),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.25 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenItemDetails(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenItemDetails(item);
                    }
                  }}
                  aria-label={`View details for ${item.name}`}
                  className="group cursor-pointer flex flex-col justify-between bg-white dark:bg-[#2A231E] rounded-2xl overflow-hidden border border-[#D6CCBE]/80 dark:border-[#3B322C] shadow-sm hover:shadow-xl hover:border-[#8C7B6E] dark:hover:border-[#C9A24B] transition-all duration-300 transform-gpu relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
                >
                  {/* Photo Container with Smooth Scale Effect */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9E3DA] dark:bg-[#1E1814]">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                      width={600}
                      height={450}
                    />

                    {/* Category & Craft Tag Overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A231E]/85 backdrop-blur-md text-[10px] font-semibold text-[#F3EEE7] uppercase tracking-wider">
                      <span>{item.category === 'pasta' ? 'Fresh Pasta' : 'Crispy Side'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#C9A24B]">{item.tag}</span>
                    </div>

                    {/* Price Badge Overlay */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 dark:bg-[#1E1814]/90 backdrop-blur-md text-xs font-mono font-bold text-[#3B322C] dark:text-[#C9A24B] shadow-sm">
                      {item.price}
                    </div>

                    {/* Hover Visual Invitation Indicator */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <span>Click to view recipe &amp; details</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#C9A24B]" />
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#C9A24B] font-semibold block mb-1">
                        {item.subCategory}
                      </span>

                      <h3 className="font-serif font-black text-lg text-[#3B322C] dark:text-[#F3EEE7] group-hover:text-[#C9A24B] transition-colors leading-snug">
                        {item.name}
                      </h3>

                      <p className="text-xs font-medium text-[#8C7B6E] dark:text-[#A8988B] mt-0.5">
                        {item.subtitle}
                      </p>

                      <p className="mt-2.5 text-xs text-[#2F2823]/80 dark:text-[#D6CCBE]/80 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer: Dietary Badges & Quick Details Action */}
                    <div className="mt-5 pt-3.5 border-t border-[#E9E3DA] dark:border-[#3B322C] flex items-center justify-between gap-2">
                      <span className="text-[10px] px-2.5 py-1 rounded-md bg-[#F4F0EA] dark:bg-[#1E1814] text-[#69584D] dark:text-[#D6CCBE] font-medium truncate">
                        {item.dietary}
                      </span>

                      <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#3B322C] dark:text-[#C9A24B] group-hover:translate-x-0.5 transition-transform shrink-0">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* IMMERSIVE ANIMATED DETAIL MODAL: DIRECT ITEM DETAILS VIEW         */}
        {/* ================================================================= */}
        <AnimatePresence>
          {selectedItemForModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Smooth Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-black/65 backdrop-blur-sm"
                onClick={handleCloseItemDetails}
                aria-hidden="true"
              />

              {/* Animated Detail Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-item-title"
                className="relative z-10 w-full max-w-2xl bg-[#F4F0EA] dark:bg-[#2A231E] rounded-3xl overflow-hidden border border-[#D6CCBE] dark:border-[#3B322C] shadow-2xl my-auto text-[#2F2823] dark:text-[#F3EEE7]"
              >
                {/* Hero Dish Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E9E3DA] dark:bg-[#1E1814]">
                  <SafeImage
                    src={selectedItemForModal.image}
                    alt={selectedItemForModal.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={handleCloseItemDetails}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer border border-white/20 shadow-md"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Category Pill Over Image */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#3B322C]/90 text-white text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
                    <Utensils className="w-3 h-3 text-[#C9A24B]" />
                    <span>{selectedItemForModal.category === 'pasta' ? 'Handcrafted Pasta' : 'Crispy Side'}</span>
                  </div>

                  {/* Dish Title & Price in Hero Header */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#C9A24B]">
                        {selectedItemForModal.subCategory}
                      </span>
                      <h3 id="modal-item-title" className="font-serif font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                        {selectedItemForModal.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#F3EEE7]/90 font-medium mt-0.5">
                        {selectedItemForModal.subtitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#C9A24B] block">Price</span>
                      <span className="font-serif font-black text-2xl sm:text-3xl text-white">
                        {selectedItemForModal.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modal Detail Body */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Full Description */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C7B6E] dark:text-[#A8988B] mb-1.5">
                      Culinary Description
                    </h4>
                    <p className="text-sm sm:text-base text-[#2F2823] dark:text-[#D6CCBE] leading-relaxed">
                      {selectedItemForModal.description}
                    </p>
                  </div>

                  {/* Preparation & Kitchen Notes */}
                  {selectedItemForModal.cookNotes && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1814] border border-[#D6CCBE]/80 dark:border-[#3B322C]">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3B322C] dark:text-[#F3EEE7] mb-1">
                        <Flame className="w-3.5 h-3.5 text-[#C9A24B]" />
                        <span>Artisan Preparation Craft</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2F2823]/80 dark:text-[#D6CCBE]/80 leading-relaxed">
                        {selectedItemForModal.cookNotes}
                      </p>
                    </div>
                  )}

                  {/* Pairing Recommendation */}
                  {selectedItemForModal.pairingNote && (
                    <div className="p-4 rounded-2xl bg-[#E9E3DA] dark:bg-[#3B322C]/60 border border-[#D6CCBE] dark:border-[#3B322C]">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3B322C] dark:text-[#C9A24B] mb-1">
                        <Wine className="w-3.5 h-3.5 text-[#C9A24B]" />
                        <span>Recommended Coffee Bar Pairing</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2F2823] dark:text-[#D6CCBE] leading-relaxed">
                        {selectedItemForModal.pairingNote}
                      </p>
                    </div>
                  )}

                  {/* Dietary & Allergen Profile Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1814] border border-[#D6CCBE]/80 dark:border-[#3B322C]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C7B6E] dark:text-[#A8988B] block mb-1">
                        Dietary Profile
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-[#3B322C] dark:text-[#F3EEE7]">
                        {selectedItemForModal.dietary}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1814] border border-[#D6CCBE]/80 dark:border-[#3B322C]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C7B6E] dark:text-[#A8988B] block mb-1">
                        Sauce / Accompaniment
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-[#3B322C] dark:text-[#F3EEE7]">
                        {selectedItemForModal.dipOrSauce || 'House Recipe'}
                      </span>
                    </div>
                  </div>

                  {/* Allergen Callout */}
                  {selectedItemForModal.allergens && (
                    <div className="flex items-start gap-2.5 text-xs text-[#8C7B6E] dark:text-[#A8988B] pt-2">
                      <Info className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#3B322C] dark:text-[#F3EEE7]">Allergen Notice:</strong>{' '}
                        {selectedItemForModal.allergens}. Please notify counter staff of severe food allergies.
                      </span>
                    </div>
                  )}
                </div>

                {/* Modal Footer Actions */}
                <div className="p-5 sm:p-6 bg-[#E9E3DA] dark:bg-[#1E1814] border-t border-[#D6CCBE] dark:border-[#3B322C] flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleCloseItemDetails}
                    className="px-5 py-2.5 rounded-xl border border-[#D6CCBE] dark:border-[#3B322C] text-xs font-semibold text-[#3B322C] dark:text-[#F3EEE7] hover:bg-white dark:hover:bg-[#2A231E] transition-colors cursor-pointer"
                  >
                    Back to Menu
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleCloseItemDetails();
                      const visitEl = document.querySelector('#visit-us') || document.querySelector('#location');
                      if (visitEl) {
                        visitEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#3B322C] dark:bg-[#C9A24B] text-[#F3EEE7] dark:text-[#2A231E] hover:bg-[#2A231E] dark:hover:bg-[#E0BA60] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Visit Cafe &amp; Order at Counter</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuExplorer;
