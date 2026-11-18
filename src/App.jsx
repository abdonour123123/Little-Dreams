import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel3D from './components/Carousel3D';
import ProductSidebar from './components/ProductSidebar';
import BottomControls from './components/BottomControls';
import DoodleBackground from './components/DoodleBackground';
import ItemFlipModal from './components/ItemFlipModal';
import CollectionSection from './components/CollectionSection';
import BagPage from './pages/BagPage';
import { LOOKS_DATA } from './data/looksData';

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Cart State
  const [cartItems, setCartItems] = useState([]);

  const [activeHotspot, setActiveHotspot] = useState(1);
  const [inspectedItem, setInspectedItem] = useState(null);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const currentLook = LOOKS_DATA[currentIndex];
  const duration = 4500;

  useEffect(() => {
    if (!isPlaying || inspectedItem !== null) return;

    const intervalStep = 50;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % LOOKS_DATA.length);
          setActiveHotspot(1);
          return 0;
        }
        return prev + (intervalStep / duration) * 100;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, inspectedItem]);

  const handleSelectLook = (newIndex) => {
    setCurrentIndex(newIndex);
    setProgress(0);
    setActiveHotspot(1);
  };

  // Add item to cart with strict 1-by-1 increment
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        };
        return updated;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });

    const displayName = item.name || item.title;
    showToast(`Added ${displayName} to your bag!`);
  };

  // Update item quantity safely from BagPage
  const handleUpdateQuantity = (index, delta) => {
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      const currentQty = updated[index].quantity || 1;
      const newQty = currentQty + delta;
      
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      
      updated[index] = {
        ...updated[index],
        quantity: newQty,
      };
      return updated;
    });
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Add bundle to cart
  const handleAddBundle = (look) => {
    look.items.forEach((item) => {
      handleAddToCart({
        ...item,
        price: item.price * 0.9, // 10% bundle discount applied
        selectedSize: '4',
      });
    });
    showToast(`Added complete 3-piece ${look.title} bundle (Saved 10%!) 🎉`);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <Routes>
      {/* Route 1: Home Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen w-full flex flex-col font-sans relative overflow-x-hidden">
            <div
              className="w-full flex flex-col relative theme-transition"
              style={{
                background: currentLook.theme.bgGradient,
              }}
            >
              {/* Top Navigation - Routes to /bag on click */}
              <Navbar
                currentLook={currentLook}
                cartCount={totalCartCount}
                onCartClick={() => navigate('/bag')}
              />

              {/* Main 3D Hero Layout */}
              <main className="flex-1 w-full flex flex-col lg:flex-row relative z-10 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
                <DoodleBackground theme={currentLook.theme} gender={currentLook.gender} />

                <section className="flex-1 flex flex-col justify-between relative min-h-[640px] lg:min-h-0 lg:h-full overflow-hidden">
                  <div className="flex-1 flex flex-col relative w-full h-full min-h-0">
                    <Carousel3D
                      looks={LOOKS_DATA}
                      currentIndex={currentIndex}
                      onSelectLook={handleSelectLook}
                      activeHotspot={activeHotspot}
                      onSelectHotspot={setActiveHotspot}
                      onOpenItemModal={(item) => setInspectedItem(item)}
                      isPaused={!isPlaying || inspectedItem !== null}
                    />
                  </div>

                  <div className="flex-shrink-0 w-full relative z-20">
                    <BottomControls
                      looks={LOOKS_DATA}
                      currentIndex={currentIndex}
                      onSelectLook={handleSelectLook}
                      isPlaying={isPlaying && inspectedItem === null}
                      onTogglePlay={() => setIsPlaying(!isPlaying)}
                      progress={progress}
                    />
                  </div>
                </section>

                <ProductSidebar
                  currentLook={currentLook}
                  activeHotspot={activeHotspot}
                  onSelectHotspot={setActiveHotspot}
                  onAddToCart={handleAddToCart}
                  onAddBundle={handleAddBundle}
                  onOpenItemModal={(item) => setInspectedItem(item)}
                />
              </main>
            </div>
            
            {/* Brand Manifesto Strip */}
            <BrandManifesto />

            {/* Collection Catalog Section */}
            <CollectionSection onAddToBag={handleAddToCart} />

            {/* Trust and Press Bar */}
            <TrustAndPressBar />

            {/* Brand Visual Identity Section with Local Image */}
            <BrandIdentitySection />

            {/* Brand Footer */}
            <BrandFooter onShowToast={showToast} />

            {/* 3D Piece Inspection Modal */}
            {inspectedItem && (
              <ItemFlipModal
                item={inspectedItem}
                lookTheme={currentLook.theme}
                onClose={() => setInspectedItem(null)}
                onAddToCart={handleAddToCart}
              />
            )}

            {/* Toast Notification */}
            {toast && (
              <div
                className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-2xl bg-slate-900/90 text-white backdrop-blur-md shadow-2xl flex items-center gap-3 text-sm font-semibold z-50 animate-bounce"
                style={{
                  border: `1.5px solid ${currentLook.theme.secondaryColor}`,
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{toast}</span>
              </div>
            )}
          </div>
        }
      />

      {/* Route 2: Dedicated Bag & Checkout Page */}
      <Route
        path="/bag"
        element={
          <BagPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        }
      />
    </Routes>
  );
}

// Brand Manifesto Component
function BrandManifesto() {
  return (
    <section className="bg-[#FBF8F3] py-28 px-6 text-center border-t border-b border-[#0E2340]/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#0E2340_1.5px,transparent_1.5px)] [background-size:18px_18px]" />
      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0E2340]/60 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E2340]" />
          The Little Dreams Philosophy
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E2340]" />
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#0E2340] leading-relaxed tracking-tight">
          “Designed with heritage craftsmanship, organic comfort, and playful modern styling for magical childhood moments.”
        </h3>
        <p className="text-sm text-[#0E2340]/70 font-medium">
          Every piece is thoughtfully tailored to bring warmth, elegance, and unhindered joy to everyday adventures.
        </p>
      </div>
    </section>
  );
}

// Trust and Press Bar Component
function TrustAndPressBar() {
  return (
    <section className="bg-white py-12 px-6 border-t border-[#0E2340]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center">
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#0E2340]/5 flex items-center justify-center text-xl shrink-0">🌿</div>
          <div>
            <h4 className="font-extrabold text-sm text-[#0E2340]">100% Certified Organic</h4>
            <p className="text-xs text-[#0E2340]/70">Pure cotton fibers safe for sensitive skin.</p>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#0E2340]/5 flex items-center justify-center text-xl shrink-0">✨</div>
          <div>
            <h4 className="font-extrabold text-sm text-[#0E2340]">Heritage Tailoring</h4>
            <p className="text-xs text-[#0E2340]/70">Designed with precision craftsmanship.</p>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#0E2340]/5 flex items-center justify-center text-xl shrink-0">🛡️</div>
          <div>
            <h4 className="font-extrabold text-sm text-[#0E2340]">30-Day Luxury Returns</h4>
            <p className="text-xs text-[#0E2340]/70">Hassle-free exchanges and door pickup.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Brand Visual Identity Section with Local Image (Fixed Blue Night Theme)
function BrandIdentitySection() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#0E2340] text-[#FBF8F3] overflow-hidden flex items-center justify-center py-28 px-6 md:px-16 border-t border-white/10">
      {/* Background Beach & Starry Sky Image */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-65 mix-blend-luminosity"
          style={{
            backgroundImage: `url('/Brandidentitybackground.png')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2340] via-[#0E2340]/65 to-[#0E2340]/30" />
      </div>

      {/* Floating Sparkles & Whimsical Elements */}

      {/* Editorial Brand Identity Copy */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200 bg-white/10">
          <span>★</span> Our Story & Identity <span>★</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight drop-shadow-md text-[#FBF8F3]">
          Made for Little Dreamers, Crafted to Last.
        </h2>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto drop-shadow-sm text-[#FBF8F3]/90">
          At <span className="font-bold text-amber-200">Little Dreams</span>, we believe childhood should feel boundless, soft, and full of wonder—like walking hand-in-hand under a starry night sky. Every stitch is tailored from gentle, organic fabrics designed to move effortlessly with your child.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold tracking-wider uppercase text-[#FBF8F3]/80">
          <span className="flex items-center gap-2">
            <span className="text-amber-300">✦</span> Gentle on Sensitive Skin
          </span>
          <span className="hidden sm:inline opacity-35">•</span>
          <span className="flex items-center gap-2">
            <span className="text-amber-300">✦</span> Play-Proof Tailoring
          </span>
          <span className="hidden sm:inline opacity-35">•</span>
          <span className="flex items-center gap-2">
            <span className="text-amber-300">✦</span> Timeless Keepsake Pieces
          </span>
        </div>
      </div>
    </section>
  );
}
//PINK-Blue_effetct
// function BrandIdentitySection() {
//   const [isPinkTheme, setIsPinkTheme] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIsPinkTheme((prev) => !prev);
//     }, 5000); // يتبدل اللون تلقائياً كل 5 ثوانٍ بين الأزرق والوردي

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section 
//       className={`relative w-full min-h-[540px] transition-all duration-1000 ease-in-out ${
//         isPinkTheme ? 'bg-[#581C38] text-[#FDF2F4]' : 'bg-[#0E2340] text-[#FBF8F3]'
//       } overflow-hidden flex items-center justify-center py-24 px-6 md:px-16 border-t border-white/10`}
//     >
//       {/* Generated Whimsical Kids Landscape & Celestial Backdrop */}
//       <svg
//         className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-all duration-1000"
//         viewBox="0 0 1440 600"
//         preserveAspectRatio="xMidYMid slice"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <radialGradient id="moonGlow" cx="80%" cy="22%" r="35%">
//             <stop offset="0%" stopColor="#FDE68A" stopOpacity={isPinkTheme ? "0.35" : "0.28"} />
//             <stop offset="100%" stopColor={isPinkTheme ? "#581C38" : "#0E2340"} stopOpacity="0" />
//           </radialGradient>
//           <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor={isPinkTheme ? "#702446" : "#16325B"} />
//             <stop offset="100%" stopColor={isPinkTheme ? "#581C38" : "#0E2340"} />
//           </linearGradient>
//           <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor={isPinkTheme ? "#831843" : "#1E4072"} />
//             <stop offset="100%" stopColor={isPinkTheme ? "#4C1D95" : "#0B1C34"} />
//           </linearGradient>
//         </defs>

//         {/* Ambient Moon Glow */}
//         <rect width="1440" height="600" fill="url(#moonGlow)" />

//         {/* Crescent Moon */}
//         <path
//           d="M 1160 95 A 48 48 0 1 0 1215 165 A 38 38 0 1 1 1160 95 Z"
//           fill="#FDE68A"
//           opacity="0.85"
//         />

//         {/* Soft Illustrated Clouds */}
//         <path
//           d="M 180 150 Q 180 120 215 120 Q 230 95 270 95 Q 310 95 325 120 Q 365 120 370 150 Q 375 170 350 172 L 200 172 Q 175 170 180 150 Z"
//           fill="currentColor"
//           className={`transition-colors duration-1000 ${isPinkTheme ? 'text-[#FCE7F3]' : 'text-[#FBF8F3]'}`}
//           opacity="0.06"
//         />
//         <path
//           d="M 940 210 Q 940 188 965 188 Q 978 170 1008 170 Q 1038 170 1050 188 Q 1080 188 1084 210 Q 1088 225 1068 227 L 955 227 Q 936 225 940 210 Z"
//           fill="currentColor"
//           className={`transition-colors duration-1000 ${isPinkTheme ? 'text-[#FCE7F3]' : 'text-[#FBF8F3]'}`}
//           opacity="0.05"
//         />

//         {/* Twinkling Stars */}
//         <g fill="#FDE68A" opacity="0.7">
//           <circle cx="140" cy="90" r="2.5" />
//           <circle cx="310" cy="65" r="2" />
//           <circle cx="490" cy="110" r="3" />
//           <circle cx="680" cy="55" r="2" />
//           <circle cx="860" cy="95" r="2.5" />
//           <circle cx="1040" cy="70" r="2" />
//           <circle cx="1310" cy="130" r="3" />
//           <circle cx="240" cy="240" r="2" />
//           <circle cx="1240" cy="260" r="2" />
//         </g>

//         {/* Rolling Storybook Hills */}
//         <path
//           d="M 0 430 Q 360 350 740 430 T 1440 400 L 1440 600 L 0 600 Z"
//           fill="url(#hillBack)"
//         />
//         <path
//           d="M 0 470 Q 450 530 920 450 T 1440 480 L 1440 600 L 0 600 Z"
//           fill="url(#hillFront)"
//         />

//         {/* Playful Paper Airplane & Trail */}
//         <path
//           d="M 290 360 Q 420 290 540 315"
//           fill="none"
//           stroke="currentColor"
//           className={`transition-colors duration-1000 ${isPinkTheme ? 'text-[#FCE7F3]' : 'text-[#FBF8F3]'}`}
//           strokeWidth="2"
//           strokeDasharray="6 6"
//           opacity="0.25"
//         />
//         <path
//           d="M 555 318 L 525 305 L 533 318 L 525 329 Z"
//           fill="#FDE68A"
//           opacity="0.7"
//         />
//       </svg>

//       {/* Editorial Brand Identity Copy */}
//       <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
//         <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-1000 ${
//           isPinkTheme ? 'bg-white/15 border-white/30 text-amber-200' : 'bg-white/10 border-white/15 text-amber-200'
//         }`}>
//           <span>★</span> Our Story & Identity <span>★</span>
//         </div>

//         <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
//           Made for Little Dreamers, Crafted to Last.
//         </h2>

//         <p className={`text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto transition-colors duration-1000 ${
//           isPinkTheme ? 'text-[#FDF2F4]/90' : 'text-[#FBF8F3]/85'
//         }`}>
//           At <span className="font-bold text-amber-200">Little Dreams</span>, we believe childhood should feel boundless, soft, and full of wonder. Every stitch is tailored from gentle, organic fabrics designed to move with your child—from quiet bedtime stories to bold afternoon adventures.
//         </p>

//         <div className={`pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold tracking-wider uppercase transition-colors duration-1000 ${
//           isPinkTheme ? 'text-[#FDF2F4]/80' : 'text-[#FBF8F3]/75'
//         }`}>
//           <span className="flex items-center gap-2">
//             <span className="text-amber-300">✦</span> Gentle on Sensitive Skin
//           </span>
//           <span className="hidden sm:inline opacity-25">•</span>
//           <span className="flex items-center gap-2">
//             <span className="text-amber-300">✦</span> Play-Proof Tailoring
//           </span>
//           <span className="hidden sm:inline opacity-25">•</span>
//           <span className="flex items-center gap-2">
//             <span className="text-amber-300">✦</span> Timeless Keepsake Pieces
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }
// Editorial Brand Footer Component
function BrandFooter({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onShowToast('✨ Thank you for subscribing to Little Dreams newsletter! 🌙');
    setEmail('');
  };

  return (
    <>
      <footer id="contact" className="bg-[#FBF8F3] text-[#0E2340] pt-16 pb-12 px-6 md:px-16 relative overflow-hidden border-t border-[#0E2340]/10">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0E2340_1.5px,transparent_1.5px)] [background-size:18px_18px]" />

        <div className="max-w-4xl mx-auto text-center pb-14 border-b border-[#0E2340]/10 relative z-10">
          <h3 className="text-lg md:text-xl font-extrabold tracking-wider uppercase mb-2">
            SIGN-UP FOR LITTLE DREAMS NEWSLETTER
          </h3>
          <p className="text-xs text-[#0E2340]/70 mb-6">
            be the first to know about our newest arrivals, special offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email address"
              className="flex-1 px-5 py-3 rounded-none bg-white border border-[#0E2340]/20 text-slate-950 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0E2340]"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#0E2340] hover:bg-[#193863] text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              SUBMIT
            </button>
          </form>
        </div>

        <div className="max-w-[1400px] mx-auto pt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase">Customer Service</h4>
            <ul className="space-y-3 text-xs text-[#0E2340]/75 font-medium">
              <li><a href="#terms" className="hover:text-[#0E2340] font-bold transition-colors">Little Dreams Terms And Condition</a></li>
              <li><a href="#privacy" className="hover:text-[#0E2340] font-bold transition-colors">Little Dreams Privacy Policy</a></li>
              <li><a href="#delivery" className="hover:text-[#0E2340] font-bold transition-colors">Delivery And Returns</a></li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="hover:text-[#0E2340] font-bold transition-colors text-left cursor-pointer"
                >
                  Size & Fit Guide
                </button>
              </li>
              <li><a href="#refund" className="hover:text-[#0E2340] font-bold transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase">About</h4>
            <ul className="space-y-3 text-xs text-[#0E2340]/75 font-medium">
              <li><a href="#about" className="hover:text-[#0E2340] font-bold transition-colors">About Little Dreams</a></li>
              <li><a href="#purchase" className="hover:text-[#0E2340] font-bold transition-colors">How To Purchase</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-3 text-xs text-[#0E2340]/75 font-medium">
              <li><a href="#contact" className="hover:text-[#0E2340] font-bold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-extrabold tracking-wider uppercase mb-4">Keep In Touch</h4>
              <div className="flex items-center gap-4 text-[#0E2340]">
                <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#0E2340]/10 flex items-center justify-center hover:bg-[#0E2340]/20 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#0E2340]/10 flex items-center justify-center hover:bg-[#0E2340]/20 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#tiktok" aria-label="TikTok" className="w-8 h-8 rounded-full bg-[#0E2340]/10 flex items-center justify-center hover:bg-[#0E2340]/20 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                </a>
                <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-full bg-[#0E2340]/10 flex items-center justify-center hover:bg-[#0E2340]/20 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-extrabold tracking-wider uppercase mb-3">Payment Accept</h4>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-[#0E2340] text-white font-bold rounded text-[10px]">Apple Pay</span>
                <span className="px-2.5 py-1 bg-slate-900 text-white font-bold rounded text-[10px]">Mastercard</span>
                <span className="px-2.5 py-1 bg-blue-700 text-white font-bold rounded text-[10px]">VISA</span>
                <span className="px-2.5 py-1 bg-teal-800 text-teal-200 font-bold rounded text-[10px]">valU*</span>
                <span className="px-2.5 py-1 bg-red-800 text-white font-bold rounded text-[10px]">PREMIUM CARD</span>
                <span className="px-2.5 py-1 bg-blue-500 text-white font-bold rounded text-[10px]">cash on delivery</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-[#0E2340]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF8F3] text-[#0E2340] rounded-3xl max-w-lg w-full p-8 border border-[#0E2340]/15 shadow-2xl relative">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#0E2340]/5 flex items-center justify-center text-sm font-bold hover:bg-[#0E2340]/10 cursor-pointer"
            >
              ✕
            </button>
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0E2340] text-white">
              Atelier Fit Chart
            </span>
            <h3 className="text-2xl font-extrabold mt-3">Children’s Size Guide</h3>
            <p className="text-xs text-[#0E2340]/70 mt-1 mb-5">
              Tailored with comfortable room for movement and layering.
            </p>
            <div className="overflow-hidden rounded-2xl border border-[#0E2340]/10 bg-white text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#0E2340] text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size (Age)</th>
                    <th className="py-3 px-4">Height (cm)</th>
                    <th className="py-3 px-4">Chest (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0E2340]/10 font-semibold">
                  <tr><td className="py-2.5 px-4">2 Years</td><td className="py-2.5 px-4">86 – 92 cm</td><td className="py-2.5 px-4">52 cm</td></tr>
                  <tr><td className="py-2.5 px-4">4 Years</td><td className="py-2.5 px-4">98 – 104 cm</td><td className="py-2.5 px-4">56 cm</td></tr>
                  <tr><td className="py-2.5 px-4">6 Years</td><td className="py-2.5 px-4">110 – 116 cm</td><td className="py-2.5 px-4">60 cm</td></tr>
                  <tr><td className="py-2.5 px-4">8 Years</td><td className="py-2.5 px-4">122 – 128 cm</td><td className="py-2.5 px-4">64 cm</td></tr>
                  <tr><td className="py-2.5 px-4">10–12 Years</td><td className="py-2.5 px-4">134 – 152 cm</td><td className="py-2.5 px-4">70–76 cm</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Dedicated Bag Page Route

