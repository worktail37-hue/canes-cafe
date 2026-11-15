import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Image as ImageIcon,
  Camera,
  X,
  Share2,
} from 'lucide-react';
import { SOCIAL_STICKERS, StickerItem } from '../data/socialKitData';
import { useToast } from './Toast';

export const SocialKitSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Photo Studio Modal State
  const [studioOpen, setStudioOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<StickerItem>(SOCIAL_STICKERS[0]);
  const [photoSource, setPhotoSource] = useState<string>(
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  );
  const [stickerPos, setStickerPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [stickerScale, setStickerScale] = useState<number>(1);
  const [stickerRotation, setStickerRotation] = useState<number>(0);
  const studioCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const { showToast } = useToast();

  // Download Vector Sticker as Transparent PNG via HTML5 Canvas
  const handleDownloadSticker = (sticker: StickerItem) => {
    setDownloadingId(sticker.id);
    const canvas = document.createElement('canvas');
    const scale = 2; // High-DPI 2x
    canvas.width = sticker.width * scale;
    canvas.height = sticker.height * scale;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      showToast('Download Error', 'Could not initialize canvas context.', 'info');
      setDownloadingId(null);
      return;
    }

    const img = new Image();
    const svgBlob = new Blob([sticker.svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `canes-serve-sticker-${sticker.id}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
        setDownloadingId(null);
        showToast('Sticker Downloaded!', `Saved ${sticker.name} as transparent PNG.`, 'success');
      }, 'image/png');
    };

    img.onerror = () => {
      setDownloadingId(null);
      showToast('Notice', 'Could not render sticker image.', 'info');
    };

    img.src = url;
  };

  // Copy Sticker PNG to Clipboard
  const handleCopySticker = async (sticker: StickerItem) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = sticker.width;
      canvas.height = sticker.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([sticker.svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = async () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        canvas.toBlob(async (blob) => {
          if (!blob) return;
          try {
            if (navigator.clipboard && navigator.clipboard.write) {
              await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
              setCopiedId(sticker.id);
              showToast('Sticker Copied!', 'PNG copied to clipboard. Ready to paste in Instagram Stories or photo app.', 'success');
              setTimeout(() => setCopiedId(null), 2500);
            } else {
              handleDownloadSticker(sticker);
            }
          } catch {
            handleDownloadSticker(sticker);
          }
        }, 'image/png');
      };
      img.src = url;
    } catch {
      handleDownloadSticker(sticker);
    }
  };

  // Photo Studio Composite Downloader
  const handleDownloadCompositePhoto = () => {
    const canvas = studioCanvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `canes-serve-sticker-pic-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Photo Saved!', 'Your branded Cane’s Serve photo is saved! Ready to post on social media.', 'success');
    }, 'image/png');
  };

  // Re-render Photo Studio Canvas when photo or sticker settings change
  React.useEffect(() => {
    if (!studioOpen) return;
    const canvas = studioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bg = new Image();
    bg.crossOrigin = 'anonymous';
    bg.onload = () => {
      canvas.width = 1080;
      canvas.height = 1350; // standard 4:5 Instagram portrait

      // Draw background photo
      const scale = Math.max(canvas.width / bg.width, canvas.height / bg.height);
      const x = (canvas.width - bg.width * scale) / 2;
      const y = (canvas.height - bg.height * scale) / 2;
      ctx.drawImage(bg, x, y, bg.width * scale, bg.height * scale);

      // Draw Sticker over Photo
      const stickerImg = new Image();
      const svgBlob = new Blob([selectedSticker.svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const stickerUrl = URL.createObjectURL(svgBlob);

      stickerImg.onload = () => {
        ctx.save();
        const targetX = (stickerPos.x / 100) * canvas.width;
        const targetY = (stickerPos.y / 100) * canvas.height;
        const stWidth = selectedSticker.width * stickerScale * 0.9;
        const stHeight = selectedSticker.height * stickerScale * 0.9;

        ctx.translate(targetX, targetY);
        ctx.rotate((stickerRotation * Math.PI) / 180);
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 12;
        ctx.drawImage(stickerImg, -stWidth / 2, -stHeight / 2, stWidth, stHeight);
        ctx.restore();
        URL.revokeObjectURL(stickerUrl);
      };
      stickerImg.src = stickerUrl;
    };
    bg.src = photoSource;
  }, [studioOpen, photoSource, selectedSticker, stickerPos, stickerScale, stickerRotation]);

  return (
    <section
      id="stickers"
      aria-labelledby="stickers-heading"
      className="py-16 sm:py-24 bg-[#1F1A16] text-[#F3EEE7] relative overflow-hidden border-b border-[#3B322C]"
    >
      {/* Anchor alias to ensure existing links (#social-kit) land smoothly */}
      <span id="social-kit" className="sr-only">Cane's Stickers</span>

      {/* Background warm halftone accent glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#8C7B6E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Lockup */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-2">
              <Sparkles className="w-4 h-4 text-[#C9A24B]" />
              <span>VIRAL MERCH • HALFTONE &amp; RETRO COMIC AESTHETICS</span>
            </div>
            <h2
              id="stickers-heading"
              className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#F3EEE7]"
            >
              CANE'S STICKERS
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#D6CCBE]/80 leading-relaxed">
              20 official <strong>CANE'S SERVE</strong> die-cut stickers inspired by vintage halftone screentones, chunky
              organic comic lettering, and internet pop humor. Download transparent PNGs or drop them on your photos!
            </p>
          </div>

          {/* Interactive Photo Studio Callout Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="px-5 py-3 rounded-full bg-[#C9A24B] hover:bg-[#E6C875] text-[#1F1A16] font-serif font-black text-sm flex items-center gap-2.5 transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-[#1F1A16]" />
              <span>Stick On My Photos Studio</span>
            </button>
          </div>
        </div>

        {/* 20 STICKERS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SOCIAL_STICKERS.map((sticker) => {
            const isCopied = copiedId === sticker.id;
            const isDownloading = downloadingId === sticker.id;

            return (
              <div
                key={sticker.id}
                className="group bg-[#2A231E] rounded-2xl p-5 border border-[#3B322C] flex flex-col justify-between hover:border-[#C9A24B]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Sticker Preview Box with Checkered Transparency */}
                <div className="relative aspect-[4/3] rounded-xl bg-[#181310] border border-[#3B322C]/70 flex items-center justify-center p-4 overflow-hidden shadow-inner group-hover:bg-[#120F0D]">
                  {/* Subtle transparency checkered background */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
                      backgroundSize: '16px 16px',
                      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                    }}
                  />

                  {/* Render Sticker SVG */}
                  <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    dangerouslySetInnerHTML={{ __html: sticker.svgContent }}
                  />

                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#1F1A16]/90 text-[10px] font-mono text-[#C9A24B] uppercase font-bold border border-[#3B322C]">
                    {sticker.trendHook}
                  </span>
                </div>

                {/* Sticker Info */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#F3EEE7] truncate">
                      {sticker.name}
                    </h4>
                    <p className="text-xs text-[#D6CCBE]/70 mt-1 line-clamp-1 italic">
                      "{sticker.quote}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-[#3B322C] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadSticker(sticker)}
                      disabled={isDownloading}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#3B322C] hover:bg-[#C9A24B] hover:text-[#1F1A16] text-[#F3EEE7] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Download transparent PNG"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isDownloading ? 'Saving...' : 'PNG'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopySticker(sticker)}
                      className="p-2 rounded-xl bg-[#181310] hover:bg-[#3B322C] text-[#D6CCBE] hover:text-[#F3EEE7] border border-[#3B322C] transition-colors cursor-pointer"
                      title="Copy PNG to clipboard"
                      aria-label="Copy to clipboard"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSticker(sticker);
                        setStudioOpen(true);
                      }}
                      className="p-2 rounded-xl bg-[#181310] hover:bg-[#3B322C] text-[#C9A24B] hover:text-[#E6C875] border border-[#3B322C] transition-colors cursor-pointer"
                      title="Test on my photo"
                      aria-label="Test on photo"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Viral Marketing Bottom Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#2A231E] border border-[#3B322C] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C9A24B]/20 text-[#C9A24B] flex items-center justify-center shrink-0 border border-[#C9A24B]/30">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-black text-lg text-[#F3EEE7]">
                Post Your Pics With CANE'S STICKERS
              </h4>
              <p className="text-xs sm:text-sm text-[#D6CCBE]/80 mt-0.5">
                Drop these transparent PNG stickers onto your food dumps, morning coffee selfies, and Instagram stories. Tag @canesserve for a feature!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText('https://canesserve.example/#stickers');
              showToast('Link Copied!', "CANE'S STICKERS link copied to clipboard.", 'success');
            }}
            className="px-5 py-2.5 rounded-full bg-[#3B322C] hover:bg-[#C9A24B] hover:text-[#1F1A16] border border-[#C9A24B]/40 text-[#F3EEE7] text-xs font-mono font-bold transition-all shrink-0 cursor-pointer"
          >
            Share CANE'S STICKERS Link
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHOTO STUDIO MODAL: Test Stickers On Your Pics */}
      {/* ========================================================================= */}
      {studioOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#120F0D]/90 backdrop-blur-md overflow-y-auto"
          onClick={() => setStudioOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl bg-[#1F1A16] text-[#F3EEE7] rounded-3xl border border-[#3B322C] shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[#3B322C] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A24B] text-[#1F1A16] flex items-center justify-center font-bold">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-xl text-[#F3EEE7] uppercase tracking-tight">
                    CANE'S STICKER PHOTO STUDIO
                  </h3>
                  <p className="text-xs text-[#D6CCBE]/80">
                    Place any of our 20 viral stickers over sample cafe pics or upload your own!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStudioOpen(false)}
                className="w-9 h-9 rounded-full bg-[#2A231E] hover:bg-[#3B322C] text-[#D6CCBE] hover:text-[#F3EEE7] flex items-center justify-center transition-colors cursor-pointer border border-[#3B322C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Canvas Preview */}
              <div className="md:col-span-7 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#C9A24B] shadow-2xl bg-[#120F0D]">
                  <canvas ref={studioCanvasRef} className="w-full h-full object-contain" />
                </div>
                <p className="text-[11px] font-mono text-[#D6CCBE]/60 mt-2 text-center">
                  Live composite preview in 4:5 Instagram Portrait format (1080×1350)
                </p>
              </div>

              {/* Right Column: Controls */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                {/* 1. Pick Photo */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#C9A24B] font-bold mb-2">
                    1. Select Photo
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Coffee Flight', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
                      { name: 'Fresh Tagliolini', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80' },
                      { name: 'Sunlit Counter', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80' },
                    ].map((sample) => (
                      <button
                        key={sample.name}
                        type="button"
                        onClick={() => setPhotoSource(sample.url)}
                        className={`h-14 rounded-lg overflow-hidden border relative cursor-pointer ${
                          photoSource === sample.url ? 'border-[#C9A24B] ring-2 ring-[#C9A24B]/40' : 'border-[#3B322C]'
                        }`}
                      >
                        <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-[#1F1A16]/85 text-[8px] font-mono text-[#F3EEE7] truncate px-1 text-center">
                          {sample.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  <label className="mt-2.5 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#2A231E] hover:bg-[#3B322C] border border-[#3B322C] text-xs font-mono text-[#D6CCBE] hover:text-[#F3EEE7] cursor-pointer transition-colors">
                    <ImageIcon className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>Upload Your Own Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => setPhotoSource(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* 2. Pick from the 20 Stickers */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#C9A24B] font-bold mb-2">
                    2. Select Cane's Sticker (20 Available)
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full">
                    {SOCIAL_STICKERS.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setSelectedSticker(st)}
                        className={`w-14 h-14 rounded-xl p-1 shrink-0 border flex items-center justify-center bg-[#2A231E] cursor-pointer transition-all ${
                          selectedSticker.id === st.id ? 'border-[#C9A24B] bg-[#3B322C] ring-2 ring-[#C9A24B]' : 'border-[#3B322C]'
                        }`}
                        title={st.name}
                      >
                        <div
                          className="w-10 h-10 flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: st.svgContent }}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#E6C875] truncate block">
                    Active: {selectedSticker.name}
                  </span>
                </div>

                {/* 3. Sliders */}
                <div className="space-y-3 bg-[#2A231E] p-3 rounded-xl border border-[#3B322C]">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#D6CCBE]">
                      <span>Sticker Scale</span>
                      <span>{Math.round(stickerScale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.05"
                      value={stickerScale}
                      onChange={(e) => setStickerScale(parseFloat(e.target.value))}
                      className="w-full accent-[#C9A24B] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#D6CCBE]">
                      <span>Rotation</span>
                      <span>{stickerRotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      step="1"
                      value={stickerRotation}
                      onChange={(e) => setStickerRotation(parseInt(e.target.value))}
                      className="w-full accent-[#C9A24B] cursor-pointer"
                    />
                  </div>

                  {/* Position Quick Placement */}
                  <div>
                    <span className="text-[10px] font-mono text-[#D6CCBE]/70 block mb-1">
                      Quick Placement:
                    </span>
                    <div className="grid grid-cols-4 gap-1 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => setStickerPos({ x: 25, y: 25 })}
                        className="py-1 rounded bg-[#1F1A16] hover:bg-[#3B322C] text-[#D6CCBE] cursor-pointer"
                      >
                        Top Left
                      </button>
                      <button
                        type="button"
                        onClick={() => setStickerPos({ x: 75, y: 25 })}
                        className="py-1 rounded bg-[#1F1A16] hover:bg-[#3B322C] text-[#D6CCBE] cursor-pointer"
                      >
                        Top Right
                      </button>
                      <button
                        type="button"
                        onClick={() => setStickerPos({ x: 50, y: 50 })}
                        className="py-1 rounded bg-[#1F1A16] hover:bg-[#3B322C] text-[#D6CCBE] cursor-pointer"
                      >
                        Center
                      </button>
                      <button
                        type="button"
                        onClick={() => setStickerPos({ x: 50, y: 80 })}
                        className="py-1 rounded bg-[#1F1A16] hover:bg-[#3B322C] text-[#D6CCBE] cursor-pointer"
                      >
                        Bottom
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Download Final Composite */}
                <button
                  type="button"
                  onClick={handleDownloadCompositePhoto}
                  className="w-full py-3 rounded-full bg-[#C9A24B] hover:bg-[#E6C875] text-[#1F1A16] font-serif font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#1F1A16]" />
                  <span>Download Final Branded Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
