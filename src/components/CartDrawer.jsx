// import React from 'react';

// export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
//   if (!isOpen) return null;

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
//   const shipping = subtotal > 150 ? 0 : 15.00;
//   const total = subtotal + (subtotal > 0 ? shipping : 0);

//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden">
//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />

//       <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
//         <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#FBF8F3]">
//             <div className="flex items-center gap-2">
//               <span className="w-2.5 h-2.5 rounded-full bg-[#0E2340]" />
//               <h2 className="text-lg font-extrabold text-[#0E2340]">Your Shopping Bag</h2>
//               <span className="ml-2 px-2.5 py-0.5 rounded-full bg-[#0E2340] text-white text-xs font-bold">
//                 {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
//               </span>
//             </div>
//             <button
//               type="button"
//               onClick={onClose}
//               className="p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Cart Items List */}
//           <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
//             {cartItems.length === 0 ? (
//               <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-3">
//                 <div className="w-16 h-16 rounded-full bg-[#FBF8F3] flex items-center justify-center text-2xl">
//                   🛍️
//                 </div>
//                 <p className="font-semibold text-[#0E2340]">Your bag is currently empty.</p>
//                 <p className="text-sm text-slate-400 max-w-xs">
//                   Explore our new arrivals and collection drops to add pieces to your wardrobe!
//                 </p>
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="mt-2 px-6 py-2.5 bg-[#0E2340] text-white rounded-full text-sm font-bold shadow-sm hover:bg-[#193863] transition-colors cursor-pointer"
//                 >
//                   Start Shopping
//                 </button>
//               </div>
//             ) : (
//               cartItems.map((item, index) => (
//                 <div
//                   key={`${item.id}-${item.selectedSize || 'std'}-${index}`}
//                   className="flex gap-4 p-4 rounded-2xl bg-[#FBF8F3] border border-[#0E2340]/10 items-center"
//                 >
//                   <img
//                     src={item.image || item.primaryImg}
//                     alt={item.title || item.name}
//                     className="w-20 h-24 object-cover rounded-xl bg-white shadow-sm shrink-0"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-bold text-sm text-[#0E2340] truncate">
//                       {item.title || item.name}
//                     </h4>
//                     <div className="text-xs text-slate-500 mt-0.5 space-y-0.5">
//                       {item.selectedColor && <p>Color: {item.selectedColor}</p>}
//                       {item.selectedSize && <p>Size: {item.selectedSize} Years</p>}
//                     </div>
//                     <div className="font-extrabold text-sm text-[#0E2340] mt-2">
//                       ${item.price.toFixed(2)}
//                     </div>
//                   </div>

//                   {/* Quantity & Remove Controls */}
//                   <div className="flex flex-col items-end justify-between h-24">
//                     <button
//                       type="button"
//                       onClick={() => onRemoveItem(index)}
//                       className="text-slate-400 hover:text-rose-600 text-xs font-medium transition-colors cursor-pointer"
//                     >
//                       Remove
//                     </button>

//                     <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-2 py-1">
//                       <button
//                         type="button"
//                         onClick={() => onUpdateQuantity(index, -1)}
//                         className="text-slate-500 hover:text-[#0E2340] font-bold text-xs px-1 cursor-pointer"
//                       >
//                         -
//                       </button>
//                       <span className="text-xs font-extrabold text-[#0E2340] w-4 text-center">
//                         {item.quantity || 1}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => onUpdateQuantity(index, 1)}
//                         className="text-slate-500 hover:text-[#0E2340] font-bold text-xs px-1 cursor-pointer"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Footer Subtotal & Checkout */}
//           {cartItems.length > 0 && (
//             <div className="border-t border-slate-100 px-6 py-6 bg-[#FBF8F3] space-y-4">
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between text-slate-600">
//                   <span>Subtotal</span>
//                   <span className="font-semibold text-[#0E2340]">${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-slate-600">
//                   <span>Estimated Shipping</span>
//                   <span className="font-semibold text-[#0E2340]">
//                     {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
//                   </span>
//                 </div>
//                 {shipping > 0 && (
//                   <p className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md">
//                     Add ${(150 - subtotal).toFixed(2)} more to unlock Free Express Shipping! 🚚
//                   </p>
//                 )}
//                 <div className="flex justify-between text-base font-extrabold text-[#0E2340] pt-2 border-t border-slate-200">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => alert('Proceeding to Secure Checkout!')}
//                 className="w-full py-3.5 bg-[#0E2340] hover:bg-[#193863] text-white rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer"
//               >
//                 Proceed to Checkout →
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }