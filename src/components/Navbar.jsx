import React from 'react';

const NAVBAR_DOODLES = [
  { char: '★', top: '12%', left: '4%', size: 'text-xs', rotate: 'rotate-12', opacity: 'opacity-15', pulse: true },
  { char: '✨', top: '65%', left: '9%', size: 'text-sm', rotate: '-rotate-12', opacity: 'opacity-10', pulse: false },
  { char: '✦', top: '20%', left: '16%', size: 'text-[10px]', rotate: 'rotate-45', opacity: 'opacity-15', pulse: false },
  { char: '☁️', top: '55%', left: '22%', size: 'text-base', rotate: '-rotate-6', opacity: 'opacity-10', pulse: false },
  { char: '★', top: '15%', left: '29%', size: 'text-sm', rotate: '-rotate-45', opacity: 'opacity-10', pulse: true },
  { char: '✨', top: '70%', left: '34%', size: 'text-xs', rotate: 'rotate-12', opacity: 'opacity-15', pulse: false },
  { char: '⭐', top: '18%', left: '41%', size: 'text-xs', rotate: 'rotate-6', opacity: 'opacity-10', pulse: false },
  { char: '✦', top: '62%', left: '47%', size: 'text-sm', rotate: '-rotate-12', opacity: 'opacity-15', pulse: true },
  { char: '🌙', top: '14%', left: '53%', size: 'text-sm', rotate: '-rotate-12', opacity: 'opacity-10', pulse: false },
  { char: '★', top: '68%', left: '59%', size: 'text-[11px]', rotate: 'rotate-45', opacity: 'opacity-15', pulse: false },
  { char: '✨', top: '22%', left: '65%', size: 'text-sm', rotate: '-rotate-6', opacity: 'opacity-10', pulse: true },
  { char: '☁️', top: '58%', left: '71%', size: 'text-base', rotate: 'rotate-12', opacity: 'opacity-10', pulse: false },
  { char: '✦', top: '14%', left: '77%', size: 'text-xs', rotate: '-rotate-45', opacity: 'opacity-15', pulse: false },
  { char: '★', top: '66%', left: '83%', size: 'text-sm', rotate: 'rotate-12', opacity: 'opacity-15', pulse: true },
  { char: '⭐', top: '18%', left: '89%', size: 'text-xs', rotate: '-rotate-12', opacity: 'opacity-10', pulse: false },
  { char: '✨', top: '64%', left: '95%', size: 'text-sm', rotate: 'rotate-45', opacity: 'opacity-15', pulse: false },
];

export default function Navbar({ currentLook, cartCount, onCartClick }) {
  const isBoy = currentLook.gender === 'boy';

  return (
    <header 
      className="w-full h-16 px-6 sm:px-10 flex items-center justify-between text-white transition-colors duration-700 select-none z-50 shadow-md relative overflow-hidden"
      style={{ backgroundColor: currentLook.theme.headerBg }}
    >
      {/* Randomly Scattered Background Stars and Whimsical Doodles */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {NAVBAR_DOODLES.map((item, idx) => (
          <span
            key={idx}
            style={{ top: item.top, left: item.left }}
            className={`absolute ${item.size} ${item.rotate} ${item.opacity} ${
              item.pulse ? 'animate-pulse' : ''
            }`}
          >
            {item.char}
          </span>
        ))}
      </div>

      {/* Left: Back button & Brand Logo */}
      <div className="flex items-center gap-6 relative z-10">
        <button 
          aria-label="Back" 
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/15 transition-all text-white/90 hover:text-white cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <a href="#home" className="flex items-center gap-2 group cursor-pointer">
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-xl font-serif">
              <span>Little</span>
              <svg className="w-3.5 h-3.5 fill-amber-300 drop-shadow-sm group-hover:rotate-45 transition-transform duration-300" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-xl font-serif -mt-1 flex items-center gap-1">
              Dreams 
            </span>
          </div>
        </a>
      </div>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide relative z-10">
        <a 
          href="#collections" 
          className="text-white/80 hover:text-white transition-colors py-1 hover:border-b-2 hover:border-white/50"
        >
          Collections
        </a>

        <a 
          href="#contact" 
          className="text-white/80 hover:text-white transition-colors py-1 hover:border-b-2 hover:border-white/50"
        >
          Contact
        </a>
        <a 
          href="#account" 
          className="text-white/80 hover:text-white transition-colors py-1 hover:border-b-2 hover:border-white/50"
        >
          My Account
        </a>
      </nav>

      {/* Right: Theme pill & Bag */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Active gender theme badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium border border-white/15">
          <span className={`w-2 h-2 rounded-full animate-ping ${isBoy ? 'bg-cyan-400' : 'bg-pink-400'}`}></span>
          <span className="capitalize">{currentLook.gender} Edition</span>
        </div>

        {/* Shopping Bag Button */}
        <button 
          onClick={onCartClick}
          aria-label="Shopping Bag"
          className="relative p-2 rounded-full hover:bg-white/15 transition-all group cursor-pointer"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          
          {cartCount > 0 && (
            <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shadow-lg animate-bounce ${
              isBoy ? 'bg-cyan-400 text-slate-950' : 'bg-amber-300 text-rose-950'
            }`}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}