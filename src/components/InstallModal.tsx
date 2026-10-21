import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Smartphone,
  ArrowRight,
  Check,
} from 'lucide-react';
import { AppItem } from '../types';
import { AppIcon } from './AppIcon';

interface InstallModalProps {
  app: AppItem | null;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ app, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'iOS' | 'Android'>('iOS');
  const [isMobile, setIsMobile] = useState(false);
  const [showDesktopBlocked, setShowDesktopBlocked] = useState(false);

  // Check if current user agent / device is mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isMobileScreen = window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      const detectedMobile = isMobileUA || isMobileScreen;

      setIsMobile(detectedMobile);

      if (/iPad|iPhone|iPod/.test(userAgent)) {
        setSelectedPlatform('iOS');
      } else if (/android/i.test(userAgent)) {
        setSelectedPlatform('Android');
      }
    }
  }, []);

  if (!app) return null;

  const handleContinueClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      // Desktop detected: block direct download and show the "Mobile not detected!" screen
      e.preventDefault();
      setShowDesktopBlocked(true);
    } else {
      // Mobile detected: let link open https://apptrck.net/cl/i/82vqek and close modal
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* DESKTOP BLOCKED VIEW (MATCHING USER'S SCREENSHOT EXACTLY) */}
      {showDesktopBlocked ? (
        <div className="relative w-full max-w-md bg-[#181a20] text-white rounded-3xl sm:rounded-[32px] p-6 sm:p-8 shadow-2xl border border-zinc-800/80 z-10 animate-in zoom-in-95 duration-200 my-auto flex flex-col items-center text-center">
          {/* Close button in top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* App Icon centered with rounded squircle */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-4 bg-zinc-900 border border-zinc-700/50 flex-shrink-0">
            {app.iconUrl ? (
              <img
                src={app.iconUrl}
                alt={app.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <AppIcon type={app.iconType} iconUrl={app.iconUrl} size="xl" className="w-full h-full" />
            )}
          </div>

          {/* Title matching screenshot */}
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1.5">
            Mobile not detected!
          </h3>

          {/* Subtitle matching screenshot */}
          <p className="text-xs sm:text-sm text-zinc-300 font-medium max-w-xs mx-auto leading-relaxed mb-6">
            please open this tab in your mobile device for better experience!
          </p>

          {/* Blue Waiting... Button */}
          <div className="w-full max-w-xs">
            <div className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#3b82f6] via-[#4f46e5] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/30 select-none transition-all">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Waiting...</span>
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD SELECT PLATFORM VIEW */
        <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <AppIcon type={app.iconType} iconUrl={app.iconUrl} size="sm" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                  Install {app.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {app.version} • {app.size}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-6">
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full">
                  STEP 1 OF 2
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  Select Your Device Platform
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  YesPlugin will tailor the unsigned profile or APK specific to your operating system.
                </p>
              </div>

              {/* Platform selector options */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('iOS')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedPlatform === 'iOS'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Smartphone className="w-6 h-6 text-slate-800 dark:text-white" />
                    {selectedPlatform === 'iOS' && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                      iOS (Apple)
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      iPhone &amp; iPad Safari
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlatform('Android')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedPlatform === 'Android'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Smartphone className="w-6 h-6 text-emerald-600" />
                    {selectedPlatform === 'Android' && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Android
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Samsung, Xiaomi, Pixel
                    </div>
                  </div>
                </button>
              </div>

              {/* Tweak features included */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="font-bold text-slate-700 dark:text-slate-300">
                  Injecting to {selectedPlatform}:
                </div>
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Unlimited in-game currencies &amp; unlocked items</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Anti-ban memory guard (zero ban record)</span>
                </div>
              </div>

              {/* Start Button / Continue Download Link */}
              <a
                href={app.downloadUrl || 'https://apptrck.net/cl/i/82vqek'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleContinueClick}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer transform hover:scale-[1.01]"
              >
                <span>Continue to Installation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
