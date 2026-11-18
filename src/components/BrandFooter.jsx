// Editorial Brand Footer matched with professional multi-column layout
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
      <footer id="contact" className="bg-[#0E2340] text-[#FBF8F3] pt-16 pb-12 px-6 md:px-16 relative overflow-hidden border-t border-white/10">
        
        {/* Top Newsletter Section */}
        <div className="max-w-4xl mx-auto text-center pb-14 border-b border-white/10 relative z-10">
          <h3 className="text-lg md:text-xl font-extrabold tracking-wider uppercase mb-2">
            SIGN-UP FOR LITTLE DREAMS NEWSLETTER
          </h3>
          <p className="text-xs text-[#FBF8F3]/70 mb-6">
            be the first to know about our newest arrivals, special offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email address"
              className="flex-1 px-5 py-3 rounded-none bg-white text-slate-950 placeholder:text-slate-400 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#E85D25] hover:bg-[#d4521d] text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Multi-Column Links Section */}
        <div className="max-w-[1400px] mx-auto pt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          
          {/* Column 1: Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase">
              Customer Service
            </h4>
            <ul className="space-y-3 text-xs text-[#FBF8F3]/70 font-medium">
              <li><a href="#terms" className="hover:text-white transition-colors">Little Dreams Terms And Condition</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Little Dreams Privacy Policy</a></li>
              <li><a href="#delivery" className="hover:text-white transition-colors">Delivery And Returns</a></li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Size & Fit Guide
                </button>
              </li>
              <li><a href="#refund" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          {/* Column 2: About */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase">
              ABOUT
            </h4>
            <ul className="space-y-3 text-xs text-[#FBF8F3]/70 font-medium">
              <li><a href="#about" className="hover:text-white transition-colors">About Little Dreams</a></li>
              <li><a href="#purchase" className="hover:text-white transition-colors">How To Purchase</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold tracking-wider uppercase">
              CONTACT US
            </h4>
            <ul className="space-y-3 text-xs text-[#FBF8F3]/70 font-medium">
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Keep In Touch & Payment Methods */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-extrabold tracking-wider uppercase mb-4">
                Keep In Touch
              </h4>
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 text-white">
                <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#tiktok" aria-label="TikTok" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                </a>
                <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Payment Accept Badges */}
            <div>
              <h4 className="text-sm font-extrabold tracking-wider uppercase mb-3">
                Payment Accept
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-white text-slate-950 font-bold rounded text-[10px]">Apple Pay</span>
                <span className="px-2.5 py-1 bg-slate-900 border border-white/20 text-white font-bold rounded text-[10px]">Mastercard</span>
                <span className="px-2.5 py-1 bg-blue-700 text-white font-bold rounded text-[10px]">VISA</span>
                <span className="px-2.5 py-1 bg-teal-800 text-teal-200 font-bold rounded text-[10px]">valU*</span>
                <span className="px-2.5 py-1 bg-red-800 text-white font-bold rounded text-[10px]">PREMIUM CARD</span>
                <span className="px-2.5 py-1 bg-blue-500 text-white font-bold rounded text-[10px]">cash on delivery</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Size Guide Modal */}
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