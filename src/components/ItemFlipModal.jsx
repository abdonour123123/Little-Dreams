import React, { useState } from 'react';

export default function ItemFlipModal({ 
  item, 
  lookTheme, 
  onClose, 
  onAddToCart 
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSize, setSelectedSize] = useState('6Y');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  if (!item) return null;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 12, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Container */}
      <div 
        className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Inspection Modal"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* LEFT: 3D FLIP ITEM STAGE */}
        <div 
          className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col items-center justify-between bg-gradient-to-br from-slate-50 via-slate-100/60 to-slate-200/50 border-b md:border-b-0 md:border-r border-slate-100 relative select-none"
          style={{ perspective: '1200px' }}
        >
          {/* Top Pill Controls: Front / Back Toggle */}
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3D Piece Inspector • 2K Detail
            </span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-full shadow-sm border border-slate-200/80">
              <button
                onClick={() => setIsFlipped(false)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  !isFlipped ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setIsFlipped(true)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  isFlipped ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Back View
              </button>
            </div>
          </div>

          {/* 3D Flip Card */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[320px] h-[320px] sm:h-[350px] flex items-center justify-center cursor-pointer my-2"
            style={{
              perspective: '1000px',
            }}
            onClick={() => setIsFlipped(!isFlipped)}
            title="Click to flip front/back"
          >
            <div
              className="relative w-full h-full rounded-2xl transition-transform duration-700 ease-out shadow-lg"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`
              }}
            >
              {/* FRONT CARD FACE */}
              <div 
                className="absolute inset-0 w-full h-full rounded-2xl bg-white p-4 flex flex-col items-center justify-center border border-slate-200/80 shadow-md"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">
                  Front
                </div>
                
                {/* Product Front Real Photo / Imagery (No graphics) */}
                <div className="w-full h-48 sm:h-56 flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/50">
                  {item.frontImage || item.image ? (
                    <img 
                      src={item.frontImage || item.image} 
                      alt={`${item.name} Front`} 
                      className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
                    />
                  ) : item.frontSvg ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: item.frontSvg }} />
                  ) : null}
                </div>

                {/* Front detail highlights */}
                <div className="mt-3 w-full flex items-center justify-around text-[11px] font-semibold text-slate-500 bg-slate-50 py-2 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item.frontBadge1 || "Front Silhouette"}
                  </span>
                  <span>•</span>
                  <span>{item.frontBadge2 || "Soft Texture"}</span>
                </div>
              </div>

              {/* BACK CARD FACE (Flipped 180deg) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-2xl bg-white p-4 flex flex-col items-center justify-center border border-slate-200/80 shadow-md"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider">
                  Back
                </div>

                {/* Product Back Real Photo / Imagery (No graphics) */}
                <div className="w-full h-48 sm:h-56 flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/50">
                  {item.backImage ? (
                    <img 
                      src={item.backImage} 
                      alt={`${item.name} Back`} 
                      className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
                    />
                  ) : item.backSvg ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: item.backSvg }} />
                  ) : (
                    <img 
                      src={item.image} 
                      alt={`${item.name} Back`} 
                      className="w-full h-full object-contain filter drop-shadow-md scale-x-[-1]"
                    />
                  )}
                </div>

                {/* Back detail highlights */}
                <div className="mt-3 w-full flex items-center justify-around text-[11px] font-semibold text-slate-500 bg-slate-50 py-2 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    {item.backBadge1 || "Back Tailoring"}
                  </span>
                  <span>•</span>
                  <span>{item.backBadge2 || "Elastic Waistband"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Flip Hint Button */}
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="mt-3 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow transition-all group"
          >
            <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{isFlipped ? "Flip to View Front" : "Flip to View Back"} (Click to Rotate)</span>
          </button>
        </div>

        {/* RIGHT: SPECIFICATIONS, FIT & CART ACTION */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                {item.brand || "LITTLE DREAMS"}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                In Stock • Ready to Ship
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 font-serif mt-1">
              {item.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-2xl font-black text-slate-900">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Tax included • Free Shipping
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.description || "Designed with soft premium fabrics tailored for comfort, movement, and durability for growing little dreamers."}
            </p>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Select Size</span>
                <span className="text-slate-400 font-semibold cursor-pointer hover:underline">Size Guide</span>
              </div>
              <div className="flex items-center gap-2">
                {['4Y', '6Y', '8Y', '10Y', '12Y'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Material & Care */}
            <div className="mt-5 text-xs text-slate-500 space-y-1">
              <div><strong className="text-slate-700">Material:</strong> {item.material || "100% Organic Cotton / Soft Fleece Trim"}</div>
              <div><strong className="text-slate-700">Care:</strong> Machine wash cold gentle, tumble dry low</div>
            </div>
          </div>

          {/* Add To Bag CTA Button */}
          <div className="pt-6 mt-6 border-t border-slate-100">
            <button
              onClick={() => {
                onAddToCart(item);
                onClose();
              }}
              className="w-full py-4 rounded-xl text-white font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
              style={{
                backgroundColor: lookTheme?.buttonBg || '#6d1338',
                boxShadow: `0 10px 25px -5px ${lookTheme?.glowColor || 'rgba(0,0,0,0.1)'}`
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Add to Bag • ${item.price.toFixed(2)} (Size {selectedSize})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 