import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface RequestAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestAppModal: React.FC<RequestAppModalProps> = ({ isOpen, onClose }) => {
  const [appName, setAppName] = useState('');
  const [platform, setPlatform] = useState<'iOS' | 'Android' | 'Both'>('Both');
  const [features, setFeatures] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAppName('');
      setFeatures('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/60 rounded-xl text-blue-600 dark:text-blue-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Request a Game / App Tweak
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Request Submitted to YesPlugin Modders!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Our reverse-engineering team prioritizes apps with multiple requests.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                App or Game Name
              </label>
              <input
                type="text"
                required
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. Genshin Impact, Clash Royale, Duolingo"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Device Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['iOS', 'Android', 'Both'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`py-1.5 text-xs font-semibold rounded-xl border cursor-pointer transition-all ${
                      platform === p
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Desired Tweaks / Mods
              </label>
              <textarea
                rows={3}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="e.g. Unlimited gems, ad removal, god mode, unlocked cosmetics"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Tweak Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
