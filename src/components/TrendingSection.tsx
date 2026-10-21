import React, { useRef, useState, useEffect } from 'react';
import { Gamepad2, Smartphone, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { AppItem } from '../types';
import { AppIcon } from './AppIcon';

interface TrendingSectionProps {
  apps: AppItem[];
  onSelectApp: (app: AppItem) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ apps, onSelectApp }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const trendingApps = apps.filter((app) => app.trending);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const progress = (scrollLeft / maxScroll) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Trending
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-260)}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy(260)}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Trending Cards List matching screenshot */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
      >
        {trendingApps.map((app) => (
          <div
            key={app.id}
            onClick={() => onSelectApp(app)}
            className="group flex-shrink-0 w-32 sm:w-36 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-slate-800/80 shadow-xs hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/60 transition-all duration-200 flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-1"
          >
            {/* App Icon */}
            <div className="mb-2.5 transition-transform duration-200 group-hover:scale-105">
              <AppIcon type={app.iconType} iconUrl={app.iconUrl} size="md" />
            </div>

            {/* App Short Name matching screenshot */}
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate w-full mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {app.shortName}
            </h3>

            {/* Category Pill with Icon matching screenshot */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {app.category === 'Games' ? (
                <>
                  <Gamepad2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Games</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                  <span>Apps</span>
                </>
              )}
            </div>

            {/* Subtle Rating Pill on hover */}
            <div className="mt-2 text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{app.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Styled Scrollbar Indicator matching screenshot */}
      <div className="mt-3 px-1">
        <div className="w-full h-1.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-150"
            style={{
              width: '28%',
              transform: `translateX(${scrollProgress * 2.5}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
};
