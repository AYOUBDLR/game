import React, { useState } from 'react';

interface AppIconProps {
  type: string;
  iconUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AppIcon: React.FC<AppIconProps> = ({ type, iconUrl, className = '', size = 'md' }) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-16 h-16 sm:w-18 sm:h-18 rounded-2xl',
    lg: 'w-20 h-20 rounded-2xl',
    xl: 'w-24 h-24 rounded-3xl',
  }[size];

  if (iconUrl && !imgError) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-slate-900/40 shadow-md ${sizeClasses} ${className}`}>
        <img
          src={iconUrl}
          alt={type}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const renderIcon = () => {
    switch (type) {
      case 'noomiclone-mod':
        return (
          <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-700 shadow-md border border-purple-500/30 ${sizeClasses} ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none">
              {/* Isometric grid background */}
              <defs>
                <pattern id="pixelGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#a855f7" strokeWidth="0.5" opacity="0.25" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#pixelGrid)" />
              {/* Retro Avatar / Noomi Chibi figure */}
              {/* Hair / Cap */}
              <rect x="30" y="22" width="40" height="20" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
              <rect x="24" y="32" width="12" height="16" rx="2" fill="#d97706" />
              <rect x="64" y="32" width="12" height="16" rx="2" fill="#d97706" />
              {/* Face */}
              <rect x="32" y="34" width="36" height="30" rx="6" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" />
              {/* Cool Pixel Sunglasses */}
              <rect x="32" y="40" width="16" height="10" fill="#0f172a" stroke="#00f2fe" strokeWidth="1.5" />
              <rect x="52" y="40" width="16" height="10" fill="#0f172a" stroke="#00f2fe" strokeWidth="1.5" />
              <line x1="48" y1="44" x2="52" y2="44" stroke="#00f2fe" strokeWidth="2" />
              {/* Glare on glasses */}
              <line x1="34" y1="42" x2="38" y2="42" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="54" y1="42" x2="58" y2="42" stroke="#ffffff" strokeWidth="1.5" />
              {/* Smile */}
              <path d="M44 56 Q50 62 56 56" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Hoodie */}
              <path d="M22 68 C22 64 34 62 50 62 C66 62 78 64 78 68 L82 92 L18 92 Z" fill="#ec4899" stroke="#be185d" strokeWidth="2" />
              {/* Diamond VIP necklace */}
              <polygon points="50,70 56,76 50,82 44,76" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
            </svg>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent py-0.5 text-center">
              <span className="text-[8px] font-black tracking-widest text-cyan-300 uppercase">NOOMI</span>
            </div>
          </div>
        );

      case 'speed-stars-mod':
        return (
          <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 shadow-md border border-orange-400/40 ${sizeClasses} ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none">
              {/* Running Track lines */}
              <rect width="100" height="100" fill="#c2410c" />
              <line x1="0" y1="28" x2="100" y2="28" stroke="#fed7aa" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
              <line x1="0" y1="72" x2="100" y2="72" stroke="#fed7aa" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
              {/* Motion speed blur lines */}
              <line x1="5" y1="42" x2="35" y2="42" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
              <line x1="12" y1="56" x2="42" y2="56" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="64" x2="28" y2="64" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              {/* Sprinter Silhouette / Vector Runner */}
              {/* Head */}
              <circle cx="68" cy="28" r="7" fill="#ffffff" stroke="#facc15" strokeWidth="1.5" />
              {/* Torso leaning forward */}
              <line x1="66" y1="35" x2="52" y2="52" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" />
              {/* Arms sprinting */}
              <line x1="60" y1="42" x2="44" y2="34" stroke="#facc15" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="60" y1="42" x2="76" y2="54" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              {/* Forward Leg */}
              <line x1="52" y1="52" x2="72" y2="66" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <line x1="72" y1="66" x2="80" y2="82" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              {/* Back Leg */}
              <line x1="52" y1="52" x2="36" y2="64" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
              <line x1="36" y1="64" x2="26" y2="58" stroke="#facc15" strokeWidth="4.5" strokeLinecap="round" />
              {/* Gold Star */}
              <polygon points="82,14 84,20 90,20 85,24 87,30 82,26 77,30 79,24 74,20 80,20" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
            </svg>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent py-0.5 text-center">
              <span className="text-[7.5px] font-black tracking-wider text-yellow-300 uppercase">SPEED STARS</span>
            </div>
          </div>
        );

      case 'meccha-chameleon':
        return (
          <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 shadow-md border border-emerald-400/30 ${sizeClasses} ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none">
              {/* Cyber Circuit Grid */}
              <circle cx="50" cy="50" r="46" fill="#042f2e" />
              <path d="M10 50 L30 50 L40 30 L60 30" stroke="#06b6d4" strokeWidth="1" opacity="0.3" fill="none" />
              <path d="M40 70 L60 70 L70 90" stroke="#10b981" strokeWidth="1" opacity="0.3" fill="none" />
              {/* Chameleon Curled Tail */}
              <path d="M22 68 C14 68 14 54 22 54 C28 54 28 62 24 62 C22 62 20 60 22 58" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              {/* Chameleon Mecha Body */}
              <ellipse cx="46" cy="54" rx="22" ry="16" fill="#059669" stroke="#34d399" strokeWidth="2" />
              {/* Armor Plates */}
              <path d="M34 44 Q46 38 58 44" stroke="#10b981" strokeWidth="2.5" fill="none" />
              <path d="M32 54 Q46 48 60 54" stroke="#047857" strokeWidth="2" fill="none" />
              {/* Chameleon Head & Snout */}
              <path d="M56 42 C64 34 76 38 78 48 C80 54 74 62 64 62 Z" fill="#10b981" stroke="#34d399" strokeWidth="2" />
              {/* Mecha Turret Eye (Conical 360 rotating eye) */}
              <circle cx="68" cy="46" r="8" fill="#064e3b" stroke="#6ee7b7" strokeWidth="2" />
              <circle cx="68" cy="46" r="4" fill="#06b6d4" />
              <circle cx="69" cy="45" r="1.5" fill="#ffffff" />
              {/* Electric Tongue Shootout */}
              <path d="M78 50 C86 50 88 42 96 38" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <circle cx="96" cy="38" r="3.5" fill="#fb7185" stroke="#ffe4e6" strokeWidth="1" />
              {/* Energy Sparks */}
              <polygon points="86,36 89,40 84,41" fill="#facc15" />
            </svg>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent py-0.5 text-center">
              <span className="text-[7.5px] font-black tracking-wider text-emerald-400 uppercase">MECCHA</span>
            </div>
          </div>
        );

      case 'tomodachi-life':
        return (
          <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-400 via-sky-300 to-amber-200 shadow-md border border-sky-300/60 ${sizeClasses} ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none">
              {/* Island Sky & Sun */}
              <circle cx="50" cy="50" r="46" fill="#38bdf8" />
              <circle cx="82" cy="22" r="12" fill="#fef08a" />
              {/* Green Tropical Island Base */}
              <ellipse cx="50" cy="88" rx="44" ry="18" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
              <ellipse cx="50" cy="88" rx="42" ry="14" fill="#86efac" opacity="0.4" />
              {/* Iconic Tomodachi Life Apartment Complex (Curved tower with window grid) */}
              <path d="M30 40 C30 36 36 34 50 34 C64 34 70 36 70 40 L70 82 L30 82 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
              {/* Apartment Roof Sign */}
              <rect x="40" y="28" width="20" height="7" rx="2" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
              <text x="50" y="33.5" fontSize="5" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">MII</text>
              {/* Colorful Apartment Window units */}
              <rect x="35" y="42" width="7" height="6" rx="1" fill="#facc15" />
              <rect x="46.5" y="42" width="7" height="6" rx="1" fill="#f43f5e" />
              <rect x="58" y="42" width="7" height="6" rx="1" fill="#38bdf8" />

              <rect x="35" y="52" width="7" height="6" rx="1" fill="#4ade80" />
              <rect x="46.5" y="52" width="7" height="6" rx="1" fill="#a855f7" />
              <rect x="58" y="52" width="7" height="6" rx="1" fill="#fb923c" />

              <rect x="35" y="62" width="7" height="6" rx="1" fill="#38bdf8" />
              <rect x="46.5" y="62" width="7" height="6" rx="1" fill="#facc15" />
              <rect x="58" y="62" width="7" height="6" rx="1" fill="#f43f5e" />
              {/* Mii Speech Bubble with Heart */}
              <rect x="14" y="20" width="26" height="18" rx="6" fill="#ffffff" stroke="#ea580c" strokeWidth="1.5" />
              <polygon points="26,38 32,38 28,44" fill="#ffffff" />
              {/* Heart in bubble */}
              <path d="M27 28 C27 25 24 23 21.5 25.5 C19 23 16 25 16 28 C16 32 21.5 35 21.5 35 C21.5 35 27 32 27 28 Z" fill="#ef4444" transform="translate(5, -2) scale(0.8)" />
            </svg>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-sky-950/80 to-transparent py-0.5 text-center">
              <span className="text-[7.5px] font-black tracking-wider text-amber-300 uppercase">TOMODACHI</span>
            </div>
          </div>
        );

      default:
        return (
          <div className={`relative flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold shadow-md ${sizeClasses} ${className}`}>
            <span className="text-xl">YP</span>
          </div>
        );
    }
  };

  return renderIcon();
};
