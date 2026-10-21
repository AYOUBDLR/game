import React from 'react';
import { Search, Moon, Sun, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
  onOpenMobileMenu,
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={onLogoClick}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            {/* YP Monogram Logo matching screenshot */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0f172a] dark:bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <span className="font-black text-xl tracking-tighter select-none font-sans">
                YP
              </span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse ring-2 ring-white dark:ring-slate-900" />
            </div>

            {/* Brand Name */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold text-[#0f172a] dark:text-white tracking-tight">
                  Yes<span className="text-blue-600 dark:text-blue-400">Plugin</span>
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest hidden sm:block">
                iOS &amp; Android Store
              </span>
            </div>
          </button>
        </div>

        {/* Center / Right: Theme Switcher & Search Bar */}
        <div className="flex items-center gap-2.5 sm:gap-4 flex-1 max-w-md justify-end">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-blue-600 dark:text-yellow-400 transition-all duration-200 cursor-pointer flex-shrink-0 shadow-xs"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Search Bar matching screenshot */}
          <div className="relative w-full max-w-xs sm:max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-9 py-2 sm:py-2.5 bg-[#f1f5f9] dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium rounded-2xl border border-transparent focus:border-blue-400/50 dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
