import React from 'react';
import {
  Compass,
  Gamepad2,
  Smartphone,
  Bookmark,
  HelpCircle,
  PlusCircle,
  Apple,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ViewFilter, Platform } from '../types';

interface SidebarProps {
  currentView: ViewFilter;
  onSelectView: (view: ViewFilter) => void;
  selectedPlatform: Platform;
  onSelectPlatform: (platform: Platform) => void;
  bookmarksCount: number;
  onRequestApp: () => void;
  onOpenGuide: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  selectedPlatform,
  onSelectPlatform,
  bookmarksCount,
  onRequestApp,
  onOpenGuide,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems: { id: ViewFilter; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'Discover',
      label: 'Discover',
      icon: <Compass className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: 'Games',
      label: 'Games',
      icon: <Gamepad2 className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: 'Apps',
      label: 'Apps',
      icon: <Smartphone className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: 'Bookmarks',
      label: 'Bookmarks',
      icon: <Bookmark className="w-5 h-5 stroke-[2.2]" />,
      badge: bookmarksCount,
    },
  ];

  const content = (
    <aside className="w-full flex flex-col justify-between h-full py-4 px-3 sm:px-4">
      <div className="space-y-6">
        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50/90 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Platform Filter Selector */}
        <div className="pt-2">
          <div className="px-3 pb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Platform Filter
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100/90 dark:bg-slate-900/80 rounded-xl border border-slate-200/50 dark:border-slate-800">
            {(['All', 'iOS', 'Android'] as Platform[]).map((platform) => {
              const isSelected = selectedPlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={() => onSelectPlatform(platform)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {platform}
                </button>
              );
            })}
          </div>
        </div>

        {/* Help & Tutorials */}
        <div className="space-y-1">
          <button
            onClick={() => {
              onOpenGuide();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span>How to Install Guide</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              onRequestApp();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-4 h-4 text-blue-500" />
              <span>Request an App</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Safety Badge / Footer Info */}
      <div className="pt-6 pb-2">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-left">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Safe &amp; Signed
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            All IPA profiles &amp; APKs are scanned and checked for anti-ban signatures.
          </p>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on md+) */}
      <div className="hidden md:block w-56 lg:w-60 flex-shrink-0 sticky top-18 h-[calc(100vh-4.5rem)]">
        {content}
      </div>

      {/* Mobile Drawer (visible when isMobileOpen is true) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-950 shadow-2xl h-full flex flex-col z-10 border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
