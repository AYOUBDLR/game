import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, HelpCircle, CheckCircle2, ChevronDown, Apple } from 'lucide-react';

interface HowToInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToInstallModal: React.FC<HowToInstallModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'faq'>('ios');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Do I need Jailbreak (iOS) or Root (Android)?',
      a: 'No! All tweaks on YesPlugin are engineered with standalone dynamic libraries (dYlibs) or run on dedicated private sandbox servers (e.g. Null\'s Brawl). Your device remains 100% on standard official firmware.',
    },
    {
      q: 'Can my main account get banned?',
      a: 'No. Private server games use independent databases, so your official Supercell or publisher account is completely untouched. Apps like TikTok Coins and 8 Ball Pool use anti-detection memory filters that operate strictly on the client side.',
    },
    {
      q: 'Why does iOS ask to "Trust Enterprise Developer"?',
      a: 'Apple requires enterprise-signed applications to be explicitly trusted in Settings > General > VPN & Device Management before running. This is the standard Apple mechanism for apps distributed outside the official App Store.',
    },
    {
      q: 'How do I update an installed tweak?',
      a: 'Simply visit YesPlugin again, find the updated title, and tap "GET / INSTALL". The newer version will overwrite the existing version while keeping your saved progress.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 animate-in zoom-in-95 duration-200 my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/60 rounded-xl text-blue-600 dark:text-blue-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Installation &amp; Setup Guide
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Easy step-by-step instructions for any device
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-3 gap-2 my-4 flex-shrink-0">
          <button
            onClick={() => setActiveTab('ios')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            iOS (iPhone / iPad)
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'android'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Android (APK)
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Common FAQs
          </button>
        </div>

        {/* Tab content */}
        <div className="overflow-y-auto custom-scrollbar flex-1 space-y-4 pr-1 text-xs">
          {activeTab === 'ios' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    Open in Safari Browser
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    Always visit YesPlugin using Apple Safari on your iPhone or iPad. Other third-party browsers cannot handle native configuration profiles.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    Download Configuration Profile
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    Select your app (e.g. Null&apos;s Brawl), tap <strong>INSTALL</strong>, and tap <strong>Allow</strong> when prompted with &quot;This website is trying to download a configuration profile&quot;.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    Install in iOS Settings
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    Open your device <strong>Settings</strong> app. A banner labeled <strong>&quot;Profile Downloaded&quot;</strong> will appear directly underneath your Apple ID. Tap it and press <strong>Install</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    Trust Developer Certificate (If Prompted)
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    If iOS shows &quot;Untrusted Enterprise Developer&quot;, go to <strong>Settings &gt; General &gt; VPN &amp; Device Management</strong>, tap the certificate, and tap <strong>Trust</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'android' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    Download APK Package
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    Tap the <strong>GET</strong> or <strong>INSTALL</strong> button for any game or app on YesPlugin. The direct APK file will download immediately.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    Enable Unknown Sources
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    When opening the downloaded APK, Chrome or your browser may ask permission. Tap <strong>Settings</strong> and toggle on <strong>&quot;Allow from this source&quot;</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                    Complete Installation
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    Tap <strong>Install</strong>. Once completed, you can launch the app directly from your app drawer. All mods are activated by default.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-3.5 flex items-center justify-between text-left font-bold text-slate-800 dark:text-slate-200 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaq === idx ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="p-3.5 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
