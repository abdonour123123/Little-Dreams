import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BagPage({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Shipping & Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod', // Cash on Delivery or Card
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.00;
  const totalDiscount = subtotal * discount;
  const total = subtotal - totalDiscount + (subtotal > 0 ? shipping : 0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'STELLINA10') {
      setDiscount(0.10);
      alert('Promo code applied! 10% off your order.');
    } else {
      alert('Invalid promo code. Try "STELLINA10"');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#FBF8F3] flex flex-col items-center justify-center px-6 py-12 text-[#0E2340]">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border border-[#0E2340]/10 space-y-4">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto">
            ✓
          </div>
          <h2 className="text-2xl font-extrabold">Order Placed Successfully!</h2>
          <p className="text-sm text-slate-600">
            Thank you for shopping with <strong className="text-[#0E2340]">Stellina Kids</strong>. We have sent a confirmation email to <span className="font-semibold">{formData.email || 'your email'}</span>.
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-[#0E2340] text-white rounded-full font-bold text-sm hover:bg-[#193863] transition-colors shadow-sm"
            >
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#0E2340] pb-24">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-[#0E2340]/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-full bg-[#0E2340]/5 hover:bg-[#0E2340]/10 text-xs font-bold transition-colors flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          <h1 className="text-xl font-extrabold tracking-tight">Stellina Kids • Shopping Bag</h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Cart Items or Checkout Form */}
        <div className="lg:col-span-7 space-y-6">
          {!isCheckingOut ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold">Review Your Bag ({cartItems.reduce((a, c) => a + (c.quantity || 1), 0)})</h2>
                <Link to="/" className="text-xs font-bold text-[#0E2340] underline underline-offset-4">
                  Continue Shopping
                </Link>
              </div>

              {cartItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#0E2340]/10 space-y-4">
                  <div className="text-5xl">🛍️</div>
                  <h3 className="text-lg font-bold">Your bag is empty</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Explore our cozy new arrivals and add your favorite kids wear items to checkout.
                  </p>
                  <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-[#0E2340] text-white rounded-full text-sm font-bold shadow-sm hover:bg-[#193863] transition-colors"
                  >
                    Explore Collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.id}-${item.selectedSize || 'std'}-${index}`}
                      className="bg-white rounded-2xl p-4 border border-[#0E2340]/10 flex items-center gap-4 shadow-xs"
                    >
                      <img
                        src={item.image || item.primaryImg}
                        alt={item.title || item.name}
                        className="w-20 h-24 object-cover rounded-xl bg-[#EFEAE2] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base truncate">{item.title || item.name}</h4>
                        <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                          {item.selectedColor && <p>Color: <span className="font-medium text-[#0E2340]">{item.selectedColor}</span></p>}
                          {item.selectedSize && <p>Size: <span className="font-medium text-[#0E2340]">{item.selectedSize} Years</span></p>}
                          {item.code && <p>Code: <span className="font-medium text-[#0E2340]">{item.code}</span></p>}
                        </div>
                        <div className="font-extrabold text-sm mt-2 text-[#0E2340]">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end justify-between h-24">
                        <button
                          type="button"
                          onClick={() => onRemoveItem(index)}
                          className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                        <div className="flex items-center gap-2 bg-[#FBF8F3] rounded-lg border border-slate-200 px-2 py-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(index, -1)}
                            className="font-bold text-xs px-1 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-extrabold w-4 text-center">{item.quantity || 1}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(index, 1)}
                            className="font-bold text-xs px-1 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCheckoutSubmit} className="bg-white rounded-3xl p-8 border border-[#0E2340]/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-extrabold">Shipping & Checkout Details</h2>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs font-bold text-slate-500 hover:text-[#0E2340] cursor-pointer"
                >
                  ← Back to Bag
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ahmed Nady"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2340]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ahmed@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2340]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+20 100 000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2340]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street name, building number, apartment"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2340]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Governorate / City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Bani Suef / Cairo"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2340]"
                  />
                </div>

                <div className="pt-2">
                  <label className="block font-bold mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-[#0E2340] bg-[#0E2340]/5' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="text-[#0E2340]"
                      />
                      <span className="font-bold text-xs">Cash on Delivery</span>
                    </label>

                    <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-[#0E2340] bg-[#0E2340]/5' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="text-[#0E2340]"
                      />
                      <span className="font-bold text-xs">Credit / Debit Card</span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#0E2340] hover:bg-[#193863] text-white rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                Place Order (${total.toFixed(2)}) →
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Order Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 border border-[#0E2340]/10 shadow-sm space-y-6 sticky top-24">
            <h3 className="text-lg font-extrabold border-b pb-4">Order Summary</h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (STELLINA10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E2340]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#0E2340] text-white rounded-xl text-xs font-bold hover:bg-[#193863] cursor-pointer"
              >
                Apply
              </button>
            </form>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-[#0E2340]">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount (10%)</span>
                  <span>-${totalDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-[#0E2340]">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#0E2340] pt-3 border-t border-slate-200">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {!isCheckingOut && cartItems.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-[#0E2340] hover:bg-[#193863] text-white rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                Proceed to Checkout →
              </button>
            )}

            <div className="pt-2 text-center">
              <Link
                to="/"
                className="text-xs font-bold text-slate-500 hover:text-[#0E2340] underline underline-offset-4"
              >
                ← Return to Home Page
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}