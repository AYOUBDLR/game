import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Zap, Heart, Trophy, Sparkles } from 'lucide-react';
import { AppItem } from '../types';
import { AppIcon } from './AppIcon';

interface HeroCarouselProps {
  apps: AppItem[];
  onSelectApp: (app: AppItem) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ apps, onSelectApp }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const featuredApps = apps.filter((app) => app.featured);

  return (
    <div className="relative group/carousel">
      {/* Scroll Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-105 cursor-pointer backdrop-blur-xs"
        aria-label="Previous featured"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-105 cursor-pointer backdrop-blur-xs"
        aria-label="Next featured"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2 px-1 snap-x snap-mandatory scroll-smooth"
      >
        {featuredApps.map((app) => {
          return (
            <div
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-[380px] snap-start group relative h-[190px] sm:h-[210px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card 1: NoomiClone Mod Banner */}
              {app.id === 'noomiclone-mod' && (
                <div className="w-full h-full bg-gradient-to-br from-[#12002f] via-[#2d0a5e] to-[#701a75] relative flex flex-col justify-end p-4 sm:p-5 overflow-hidden">
                  {/* Real Image Background with gradient overlay */}
                  {app.iconUrl && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={app.iconUrl}
                        alt="NoomiClone background"
                        className="w-full h-full object-cover opacity-25 scale-110 group-hover:scale-115 transition-transform duration-500 blur-xs"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-950/70 to-transparent" />
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/80 backdrop-blur-md text-white text-[10px] font-black border border-purple-300/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-300" /> VIP UNLOCKED
                    </span>
                  </div>

                  {/* Overlaid App Icon + Title */}
                  <div className="relative z-20 flex items-center gap-3.5">
                    <div className="ring-2 ring-white/60 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 bg-purple-950">
                      <AppIcon type="noomiclone-mod" iconUrl={app.iconUrl} size="sm" className="w-13 h-13 sm:w-14 sm:h-14" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-white truncate drop-shadow-sm tracking-tight">
                          NoomiClone Mod
                        </h3>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-[11px] font-bold border border-blue-400/30 flex-shrink-0">
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                          <span>{app.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-purple-200 font-medium truncate mt-0.5">
                        {app.subtitle}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-cyan-300">
                        <span>• Unlimited Credits</span>
                        <span>• Rare Outfits</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2: Speed Stars Mod Banner */}
              {app.id === 'speed-stars-mod' && (
                <div className="w-full h-full bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#991b1b] relative flex flex-col justify-end p-4 sm:p-5 overflow-hidden">
                  {/* Real Image Background with gradient overlay */}
                  {app.iconUrl && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={app.iconUrl}
                        alt="Speed Stars background"
                        className="w-full h-full object-cover opacity-30 scale-110 group-hover:scale-115 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-orange-950/70 to-transparent" />
                    </div>
                  )}

                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-md text-slate-950 text-[10px] font-black border border-amber-300/40 flex items-center gap-1">
                      <Trophy className="w-3 h-3 fill-slate-950" /> 9.0s WORLD RECORD
                    </span>
                  </div>

                  <div className="relative z-20 flex items-center gap-3.5">
                    <div className="ring-2 ring-white/60 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 bg-orange-950">
                      <AppIcon type="speed-stars-mod" iconUrl={app.iconUrl} size="sm" className="w-13 h-13 sm:w-14 sm:h-14" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-white truncate drop-shadow-sm italic">
                          Speed Stars Mod
                        </h3>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-md text-slate-950 text-[11px] font-black flex-shrink-0">
                          <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                          <span>{app.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-orange-200 font-medium truncate mt-0.5">
                        {app.subtitle}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-yellow-300">
                        <span>• Auto-Perfect Stride</span>
                        <span>• Anti-Trip</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 3: Meccha Chameleon Banner */}
              {app.id === 'meccha-chameleon' && (
                <div className="w-full h-full bg-gradient-to-br from-[#022c22] via-[#047857] to-[#083344] relative flex flex-col justify-end p-4 sm:p-5 overflow-hidden">
                  {/* Real Image Background with gradient overlay */}
                  {app.iconUrl && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={app.iconUrl}
                        alt="Meccha Chameleon background"
                        className="w-full h-full object-cover opacity-30 scale-110 group-hover:scale-115 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-emerald-950/70 to-transparent" />
                    </div>
                  )}

                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-bold border border-emerald-300/30 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-yellow-300" /> INFINITE REACH
                    </span>
                  </div>

                  <div className="relative z-20 flex items-center gap-3.5">
                    <div className="ring-2 ring-white/60 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 bg-emerald-950">
                      <AppIcon type="meccha-chameleon" iconUrl={app.iconUrl} size="sm" className="w-13 h-13 sm:w-14 sm:h-14" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-white truncate drop-shadow-sm">
                          Meccha Chameleon Mobile
                        </h3>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600/80 backdrop-blur-md text-white text-[11px] font-bold border border-emerald-400/30 flex-shrink-0">
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                          <span>{app.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-emerald-200 font-medium truncate mt-0.5">
                        {app.subtitle}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-emerald-300">
                        <span>• Rainbow Camouflage</span>
                        <span>• Godmode</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 4: Tomodachi Life Mobile Banner */}
              {app.id === 'tomodachi-life' && (
                <div className="w-full h-full bg-gradient-to-br from-[#0284c7] via-[#38bdf8] to-[#f59e0b] relative flex flex-col justify-end p-4 sm:p-5 overflow-hidden">
                  {/* Real Image Background with gradient overlay */}
                  {app.iconUrl && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={app.iconUrl}
                        alt="Tomodachi Life background"
                        className="w-full h-full object-cover opacity-35 scale-110 group-hover:scale-115 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-sky-950/60 to-transparent" />
                    </div>
                  )}

                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-bold border border-rose-300/40 flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-white" /> 100% ROMANCE
                    </span>
                  </div>

                  <div className="relative z-20 flex items-center gap-3.5">
                    <div className="ring-2 ring-white/60 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 bg-sky-950">
                      <AppIcon type="tomodachi-life" iconUrl={app.iconUrl} size="sm" className="w-13 h-13 sm:w-14 sm:h-14" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-white truncate drop-shadow-sm">
                          Tomodachi Life Mobile
                        </h3>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-600/80 backdrop-blur-md text-white text-[11px] font-bold border border-sky-400/30 flex-shrink-0">
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                          <span>{app.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-sky-100 font-medium truncate mt-0.5">
                        {app.subtitle}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] font-bold text-amber-200">
                        <span>• Unlimited Money</span>
                        <span>• All Items</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hover overlay sheen */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
