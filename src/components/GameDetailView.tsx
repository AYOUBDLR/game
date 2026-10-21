import React from 'react';
import {
  Star,
  FileDown,
  BarChart2,
  User,
  Smartphone,
  Cpu,
  Download,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { AppItem } from '../types';
import { AppIcon } from './AppIcon';

interface GameDetailViewProps {
  app: AppItem;
  onBack: () => void;
  onDownload: (app: AppItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (appId: string) => void;
}

export const GameDetailView: React.FC<GameDetailViewProps> = ({
  app,
  onBack,
  onDownload,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <div className="w-full animate-in fade-in duration-200">
      {/* Back button & quick navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(app.id)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Container matching screenshot layout */}
      <div className="rounded-3xl sm:rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
        {/* Top Hero Banner with blurred backdrop matching screenshot */}
        <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden bg-slate-900">
          {app.iconUrl ? (
            <img
              src={app.iconUrl}
              alt={app.name}
              className="w-full h-full object-cover filter blur-md scale-110 opacity-75"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${app.bannerGradient} filter blur-sm`} />
          )}
          {/* Subtle dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        </div>

        {/* Content Box Overlapping the Banner */}
        <div className="relative px-5 sm:px-8 pb-8 pt-0 -mt-16 sm:-mt-20">
          {/* Header Row: Floating App Icon + PLUGIN Pill + Title + DOWNLOAD button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-6">
            <div className="flex items-end gap-4 sm:gap-6">
              {/* Floating Large App Icon matching screenshot */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl ring-4 ring-white dark:ring-slate-900 flex-shrink-0 bg-black">
                {app.iconUrl ? (
                  <img
                    src={app.iconUrl}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AppIcon type={app.iconType} size="xl" className="w-full h-full" />
                )}
              </div>

              {/* Title & Plugin Badge matching screenshot */}
              <div className="pb-1 sm:pb-2">
                <span className="inline-block px-3 py-0.5 rounded-full border border-blue-400/80 bg-blue-50/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
                  PLUGIN
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e293b] dark:text-white tracking-tight leading-tight">
                  {app.name}
                </h1>
              </div>
            </div>

            {/* DOWNLOAD Button matching screenshot */}
            <div className="sm:self-center">
              <button
                onClick={() => onDownload(app)}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#4b5eff] hover:bg-[#3b4edf] text-white font-black text-sm tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                {/* Download icon inside rounded square badge matching screenshot */}
                <div className="w-5 h-5 rounded-md border border-white/40 flex items-center justify-center">
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>DOWNLOAD</span>
              </button>
            </div>
          </div>

          {/* 6-Column Metadata Row with Vertical Dividers matching screenshot */}
          <div className="py-5 my-2 border-y border-slate-100 dark:border-slate-800/90">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-slate-800 text-center gap-y-4 sm:gap-y-0">
              {/* Column 1: Rating */}
              <div className="flex flex-col items-center justify-center px-2">
                <Star className="w-5 h-5 text-blue-500 mb-1 stroke-[1.8]" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Rating:</span>
                <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  {app.rating.toFixed(1)}
                </span>
              </div>

              {/* Column 2: Size */}
              <div className="flex flex-col items-center justify-center px-2">
                <FileDown className="w-5 h-5 text-blue-500 mb-1 stroke-[1.8]" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Size:</span>
                <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  {app.size.toLowerCase()}
                </span>
              </div>

              {/* Column 3: Downloads */}
              <div className="flex flex-col items-center justify-center px-2">
                <BarChart2 className="w-5 h-5 text-blue-500 mb-1 stroke-[1.8]" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Downloads:</span>
                <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  {app.downloads}
                </span>
              </div>

              {/* Column 4: Developer */}
              <div className="flex flex-col items-center justify-center px-2">
                <User className="w-5 h-5 text-blue-500 mb-1 stroke-[1.8]" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Developer:</span>
                <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  YesPlugins
                </span>
              </div>

              {/* Column 5: Category */}
              <div className="flex flex-col items-center justify-center px-2">
                <Smartphone className="w-5 h-5 text-blue-500 mb-1 stroke-[1.8]" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Category:</span>
                <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  {app.category}
                </span>
              </div>

              {/* Column 6: Supported OS */}
              <div className="flex flex-col items-center justify-center px-2">
                <Cpu className="w-5 h-5 text-blue-500 mb-1 stroke-[1.8]" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Supported OS:</span>
                <div className="flex items-center gap-2 mt-1 text-slate-800 dark:text-slate-100">
                  {/* Android Robot SVG Icon */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.125 12 8.125c-1.8533 0-3.5902.2866-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.7884h24c-.3432-4.1295-2.6889-7.6017-6.1185-9.467" />
                  </svg>
                  {/* Apple SVG Icon */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.12.64-2.79 1.43-.57.66-.99 1.72-.94 2.76 1.05.08 2.11-.57 2.72-1.32z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Notice matching screenshot */}
          <div className="pt-4 space-y-3">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-normal leading-relaxed">
              {app.subtitle}.
            </p>

            <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 tracking-wide uppercase">
              **CHECK YOUR ACCOUNT IS PUBLIC AND NOT PRIVATE**
            </p>

            {/* Additional Features Checklist */}
            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Included Tweak Features:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {app.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download CTA Bar */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Signed &amp; Ready for Direct Installation
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Compatible with iOS 13-18 (Safari) &amp; Android 8-15 (APK). No root or jailbreak required.
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDownload(app)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>START INSTALLATION</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Notice matching screenshot */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 py-6 px-6 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-2xl mx-auto leading-relaxed">
            All trademarks, service marks, trade names, trade dress, product names and logos appearing on the site are the property of their respective owners.
          </p>
        </div>
      </div>
    </div>
  );
};
