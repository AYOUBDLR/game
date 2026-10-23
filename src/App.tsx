import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroCarousel } from './components/HeroCarousel';
import { TrendingSection } from './components/TrendingSection';
import { AppGridSection } from './components/AppGridSection';
import { AppDetailsModal } from './components/AppDetailsModal';
import { GameDetailView } from './components/GameDetailView';
import { InstallModal } from './components/InstallModal';
import { RequestAppModal } from './components/RequestAppModal';
import { HowToInstallModal } from './components/HowToInstallModal';
import { APPS_DATA } from './data/appsData';
import { AppItem, ViewFilter, Platform, Review } from './types';
import { Bookmark, Sparkles, AlertCircle, Heart, Search } from 'lucide-react';

export default function App() {
  const [apps, setApps] = useState<AppItem[]>(APPS_DATA);
  const [currentView, setCurrentView] = useState<ViewFilter>('Discover');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active game page for the detail screen matching user's screenshot
  const [activeGamePage, setActiveGamePage] = useState<AppItem | null>(null);

  // Modals state
  const [selectedAppForDetails, setSelectedAppForDetails] = useState<AppItem | null>(null);
  const [selectedAppForInstall, setSelectedAppForInstall] = useState<AppItem | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Bookmarks persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tapload_bookmarks') || localStorage.getItem('yesplugin_bookmarks');
      return saved ? JSON.parse(saved) : ['noomiclone-mod', 'tomodachi-life'];
    } catch {
      return ['noomiclone-mod', 'tomodachi-life'];
    }
  });

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tapload_theme') || localStorage.getItem('yesplugin_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tapload_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tapload_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem('tapload_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      // ignore storage error
    }
  }, [bookmarkedIds]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleBookmark = (appId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  const handleAddReview = (appId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };

    setApps((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedReviews = [newRev, ...app.reviews];
          const newAvg =
            updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
          return {
            ...app,
            reviews: updatedReviews,
            rating: Math.round(newAvg * 10) / 10,
            reviewsCount: app.reviewsCount + 1,
          };
        }
        return app;
      })
    );

    // Also update selected modal app if open
    if (selectedAppForDetails && selectedAppForDetails.id === appId) {
      setSelectedAppForDetails((prev) => {
        if (!prev) return null;
        const updatedReviews = [newRev, ...prev.reviews];
        const newAvg =
          updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
        return {
          ...prev,
          reviews: updatedReviews,
          rating: Math.round(newAvg * 10) / 10,
          reviewsCount: prev.reviewsCount + 1,
        };
      });
    }
  };

  // Filter apps for current views
  const getDisplayedApps = () => {
    let result = apps;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return result.filter(
        (app) =>
          app.name.toLowerCase().includes(q) ||
          app.subtitle.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q) ||
          app.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // View filter
    if (currentView === 'Games') {
      result = result.filter((app) => app.category === 'Games');
    } else if (currentView === 'Apps') {
      result = result.filter((app) => app.category === 'Apps');
    } else if (currentView === 'Bookmarks') {
      result = result.filter((app) => bookmarkedIds.includes(app.id));
    }

    // Platform filter
    if (selectedPlatform !== 'All') {
      result = result.filter((app) => app.platforms.includes(selectedPlatform));
    }

    return result;
  };

  const displayedApps = getDisplayedApps();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onLogoClick={() => {
          setCurrentView('Discover');
          setSearchQuery('');
          setActiveGamePage(null);
        }}
      />

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
        {/* Left Sidebar matching screenshot */}
        <Sidebar
          currentView={currentView}
          onSelectView={(view) => {
            setCurrentView(view);
            setSearchQuery('');
            setActiveGamePage(null);
          }}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          bookmarksCount={bookmarkedIds.length}
          onRequestApp={() => setIsRequestModalOpen(true)}
          onOpenGuide={() => setIsGuideModalOpen(true)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Right / Main Content Panel housed in high-end card container */}
        <main className="flex-1 w-full min-w-0 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl sm:rounded-[32px] p-4 sm:p-6 lg:p-7 shadow-xs">
          {/* SEARCH ACTIVE STATE */}
          {searchQuery.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Search Results for &ldquo;{searchQuery}&rdquo;
                  </h2>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {displayedApps.length} matches found
                </span>
              </div>

              {displayedApps.length > 0 ? (
                <AppGridSection
                  title="Search Results"
                  apps={displayedApps}
                  selectedPlatform={selectedPlatform}
                  onSelectApp={(app) => {
                    setActiveGamePage(app);
                    setSearchQuery('');
                  }}
                  onQuickInstall={(app, e) => {
                    e.stopPropagation();
                    setSelectedAppForInstall(app);
                  }}
                />
              ) : (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    No results for &ldquo;{searchQuery}&rdquo;
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                    Try searching for NoomiClone, Speed Stars, Meccha Chameleon, or Tomodachi Life!
                  </p>
                  <button
                    onClick={() => setIsRequestModalOpen(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Request this Game
                  </button>
                </div>
              )}
            </div>
          ) : activeGamePage ? (
            /* EXACT GAME DETAIL VIEW MATCHING USER SCREENSHOT */
            <GameDetailView
              app={activeGamePage}
              onBack={() => setActiveGamePage(null)}
              onDownload={(app) => setSelectedAppForInstall(app)}
              isBookmarked={bookmarkedIds.includes(activeGamePage.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          ) : (
            /* DEFAULT / VIEW STATES */
            <div className="space-y-6 sm:space-y-8">
              {currentView === 'Discover' && (
                <>
                  {/* Hero Featured Carousel matching screenshot */}
                  <HeroCarousel
                    apps={apps}
                    onSelectApp={(app) => setActiveGamePage(app)}
                  />

                  {/* Trending Section with cards & scrollbar indicator matching screenshot */}
                  <TrendingSection
                    apps={apps}
                    onSelectApp={(app) => setActiveGamePage(app)}
                  />

                  {/* All 4 Games Grid */}
                  <AppGridSection
                    title="All 4 Featured Games"
                    apps={apps}
                    selectedPlatform={selectedPlatform}
                    onSelectApp={(app) => setActiveGamePage(app)}
                    onQuickInstall={(app, e) => {
                      e.stopPropagation();
                      setSelectedAppForInstall(app);
                    }}
                  />
                </>
              )}

              {currentView === 'Games' && (
                <AppGridSection
                  title="Modded Games &amp; Private Servers"
                  apps={displayedApps}
                  selectedPlatform={selectedPlatform}
                  onSelectApp={(app) => setActiveGamePage(app)}
                  onQuickInstall={(app, e) => {
                    e.stopPropagation();
                    setSelectedAppForInstall(app);
                  }}
                />
              )}

              {currentView === 'Apps' && (
                <div className="py-16 text-center bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                    Games-Only Store
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                    TapLoad is currently configured with 4 top modded games: <strong>NoomiClone Mod</strong>, <strong>Speed Stars Mod</strong>, <strong>Meccha Chameleon</strong>, and <strong>Tomodachi Life</strong>.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setCurrentView('Games')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      View 4 Games
                    </button>
                    <button
                      onClick={() => setIsRequestModalOpen(true)}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
                    >
                      Request an App
                    </button>
                  </div>
                </div>
              )}

              {currentView === 'Bookmarks' && (
                <div>
                  <div className="mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Saved Bookmarks
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Quick access to your favorite tweaked apps and games
                    </p>
                  </div>

                  {displayedApps.length > 0 ? (
                    <AppGridSection
                      title="Your Saved Apps"
                      apps={displayedApps}
                      selectedPlatform={selectedPlatform}
                      onSelectApp={(app) => setActiveGamePage(app)}
                      onQuickInstall={(app, e) => {
                        e.stopPropagation();
                        setSelectedAppForInstall(app);
                      }}
                    />
                  ) : (
                    <div className="py-16 text-center bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800">
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto text-slate-500 mb-3">
                        <Bookmark className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        No Bookmarks Saved Yet
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
                        Click the bookmark icon on any app to save it here for fast re-installations.
                      </p>
                      <button
                        onClick={() => setCurrentView('Discover')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        Explore Discover Feed
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 py-6 px-4 bg-white/50 dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">TapLoad</span>
            <span>&copy; {new Date().getFullYear()} • Safe Tweaks &amp; Modded Games</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="hover:text-blue-600 cursor-pointer"
            >
              Installation Guide
            </button>
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="hover:text-blue-600 cursor-pointer"
            >
              Request App
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              ✓ All Certificates Active
            </span>
          </div>
        </div>
      </footer>

      {/* App Details Modal */}
      <AppDetailsModal
        app={selectedAppForDetails}
        onClose={() => setSelectedAppForDetails(null)}
        onInstall={(app) => {
          setSelectedAppForDetails(null);
          setSelectedAppForInstall(app);
        }}
        isBookmarked={
          selectedAppForDetails ? bookmarkedIds.includes(selectedAppForDetails.id) : false
        }
        onToggleBookmark={handleToggleBookmark}
        onAddReview={handleAddReview}
      />

      {/* Interactive Installation Modal */}
      <InstallModal
        app={selectedAppForInstall}
        onClose={() => setSelectedAppForInstall(null)}
      />

      {/* Request App Modal */}
      <RequestAppModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      {/* How to Install Modal */}
      <HowToInstallModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
