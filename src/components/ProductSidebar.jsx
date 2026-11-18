import React from 'react';

export default function ProductSidebar({
  currentLook,
  activeHotspot,
  onSelectHotspot,
  onAddToCart,
  onAddBundle,
  onOpenItemModal
}) {
  const isBoy = currentLook.gender === 'boy';
  const theme = currentLook.theme;
  const items = currentLook.items;
  const bundle = currentLook.bundle;

  return (
    <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 lg:h-full lg:overflow-y-auto bg-white/95 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-black/5 shadow-2xl flex flex-col justify-between p-6 sm:p-8 z-30 select-none theme-transition">
      {/* Top Header & Whimsical Doodle Badge */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 font-serif">
              In this look
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-block w-2 h-2 rounded-full theme-transition ${isBoy ? 'bg-sky-500' : 'bg-pink-500'}`} />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Look {currentLook.id} • {currentLook.title}
              </span>
            </div>
          </div>

          {/* Whimsical Crown & "NEW" Doodle */}
          <div className="flex flex-col items-center">
            <svg 
              className="w-14 h-10 theme-transition" 
              viewBox="0 0 60 45" 
              fill="none" 
              stroke={theme.doodleColor} 
              strokeWidth="2.4"
            >
              <path 
                d="M 5 35 L 12 15 L 25 24 L 30 10 L 35 24 L 48 15 L 55 35 Z" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <circle cx="12" cy="12" r="2" fill={theme.doodleColor} />
              <circle cx="30" cy="7" r="2" fill={theme.doodleColor} />
              <circle cx="48" cy="12" r="2" fill={theme.doodleColor} />
            </svg>
            <div className="flex items-center gap-1 -mt-1 font-serif font-black text-xs tracking-widest text-slate-800">
              <span>NEW</span>
              <svg className="w-3.5 h-3.5 theme-transition" viewBox="0 0 24 24" fill="none" stroke={theme.doodleColor} strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Product Items List (Numbered 1, 2, 3) */}
        <div className="mt-6 space-y-3.5">
          {items.map((item) => {
            const isHighlighted = activeHotspot === item.num;
            return (
              <div
                key={item.id}
                onMouseEnter={() => onSelectHotspot(item.num)}
                onClick={() => {
                  onSelectHotspot(item.num);
                  if (onOpenItemModal) {
                    onOpenItemModal(item);
                  }
                }}
                className={`relative group p-3 rounded-2xl flex items-center justify-between border transition-all duration-300 cursor-pointer ${
                  isHighlighted 
                    ? 'bg-slate-50 border-slate-300 shadow-md ring-2'
                    : 'bg-white/70 hover:bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                }`}
                style={{
                  ringColor: isHighlighted ? theme.primaryColor : 'transparent'
                }}
              >
                {/* Left: Thumbnail & Number Badge */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/80 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <span 
                      className="absolute top-1 left-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Center: Details */}
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      {item.brand}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-slate-900 flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-normal">
                        (3D ↺)
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                      <span className="text-xs sm:text-sm font-semibold text-slate-700">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-medium">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick 3D View & Add (+) Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenItemModal) onOpenItemModal(item);
                    }}
                    title="View Front & Back in 3D"
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all text-xs"
                  >
                    ↺
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    aria-label={`Add ${item.name} to bag`}
                    className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200 group-hover:border-transparent flex-shrink-0"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.primaryColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary & Full Look CTA */}
      <div className="pt-5 border-t border-slate-200/70 mt-4">
        <div className="flex items-baseline justify-between mb-1">
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              {bundle.label}
            </h4>
            <p className="text-xs font-semibold text-emerald-600">
              {bundle.discountNote}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 line-through mr-2">
              ${bundle.originalPrice.toFixed(2)}
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              ${bundle.bundlePrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* CTA Button: "Add full look to bag ->" */}
        <button
          onClick={() => onAddBundle(currentLook)}
          className="mt-3.5 w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] group"
          style={{
            backgroundColor: theme.buttonBg,
            boxShadow: `0 10px 25px -5px ${theme.glowColor}`
          }}
        >
          <span>Add full look to bag</span>
          <svg 
            className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Guarantee details */}
        <div className="mt-2.5 flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Free 30-Day Returns
          </span>
          <span>•</span>
          <span>Free Express Shipping</span>
        </div>
      </div>
    </aside>
  );
}
