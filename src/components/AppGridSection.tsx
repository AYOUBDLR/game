import React, { useState } from 'react';
import { Download, Star, Sparkles, Filter, ArrowUpDown } from 'lucide-react';
import { AppItem, Platform } from '../types';
import { AppIcon } from './AppIcon';

interface AppGridSectionProps {
  title: string;
  apps: AppItem[];
  selectedPlatform: Platform;
  onSelectApp: (app: AppItem) => void;
  onQuickInstall: (app: AppItem, e: React.MouseEvent) => void;
}

export const AppGridSection: React.FC<AppGridSectionProps> = ({
  title,
  apps,
  selectedPlatform,
  onSelectApp,
  onQuickInstall,
}) => {
  const [filterTag, setFilterTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'name'>('popular');

  // Extract unique tags
  const allTags = ['All', ...Array.from(new Set(apps.flatMap((a) => a.tags))).slice(0, 6)];

  let filtered = apps.filter((app) => {
    if (selectedPlatform !== 'All') {
      if (!app.platforms.includes(selectedPlatform)) return false;
    }
    if (filterTag !== 'All') {
      return app.tags.includes(filterTag) || app.subCategory.toLowerCase().includes(filterTag.toLowerCase());
    }
    return true;
  });

  filtered = filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return parseInt(b.downloads.replace(/[^0-9]/g, '')) - parseInt(a.downloads.replace(/[^0-9]/g, ''));
  });

  return (
    <section className="pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Showing {filtered.length} verified applications &amp; games
          </p>
        </div>

        {/* Sort & Tag Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Tag Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterTag === tag
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map((app) => (
          <div
            key={app.id}
            onClick={() => onSelectApp(app)}
            className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-700 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              {/* App Icon */}
              <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                <AppIcon type={app.iconType} iconUrl={app.iconUrl} size="md" />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1 pr-2">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {app.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {app.subtitle}
                </p>

                <div className="flex items-center gap-2 mt-2 text-[11px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {app.rating.toFixed(1)}
                  </span>
                  <span>•</span>
                  <span>{app.size}</span>
                  <span>•</span>
                  <span className="text-blue-600 dark:text-blue-400">{app.category}</span>
                </div>
              </div>
            </div>

            {/* GET Button */}
            <button
              onClick={(e) => onQuickInstall(app, e)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-600 dark:hover:bg-blue-600 text-blue-600 dark:text-blue-300 hover:text-white dark:hover:text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer"
            >
              GET
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            No apps found matching your current filter.
          </p>
          <button
            onClick={() => setFilterTag('All')}
            className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};
