import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLLECTION_PRODUCTS } from '../data/looksData';

const CATEGORIES = ['All', 'Dresses', 'Outerwear'];

export default function CollectionSection({ onAddToBag }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [inspectingProduct, setInspectingProduct] = useState(null);

  const filteredProducts =
    activeCategory === 'All'
      ? COLLECTION_PRODUCTS
      : COLLECTION_PRODUCTS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-[#FBF8F3] py-24 px-6 md:px-12 lg:px-16 text-[#0E2340]"
    >
      {/* Background Dot Grid Pattern & Whimsical Doodles */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#0E2340_1.5px,transparent_1.5px)] [background-size:18px_18px]" />
      
      {/* Scattered Background Stars and Doodles */}
      <div className="absolute top-10 left-12 text-3xl text-[#0E2340] opacity-[0.08] select-none pointer-events-none rotate-12">✨</div>
      <div className="absolute top-16 right-20 text-4xl text-[#0E2340] opacity-[0.07] select-none pointer-events-none -rotate-12">☁️</div>
      <div className="absolute bottom-16 left-20 text-3xl text-[#0E2340] opacity-[0.08] select-none pointer-events-none rotate-45">★</div>
      <div className="absolute bottom-10 right-28 text-4xl text-[#0E2340] opacity-[0.07] select-none pointer-events-none rotate-12">🌙</div>

      {/* Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#FFB5C5]/[0.05] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#B8D3F5]/[0.05] blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0E2340]/70 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB5C5]" />
              Little Dreams • Heritage & Craftsmanship
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0E2340]">
              New Arrivals Collection
            </h2>
            
            {/* Heritage & Organic Badge (Added under title) */}

          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0E2340] text-white shadow-md'
                      : 'bg-white text-[#0E2340] border border-[#0E2340]/15 hover:border-[#0E2340]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <CollectionCard
              key={product.id}
              product={product}
              onAddToBag={onAddToBag}
              onOpenDetails={() => setInspectingProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Fabric & Design Details Modal */}
      {inspectingProduct && (
        <div className="fixed inset-0 z-50 bg-[#0E2340]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF8F3] rounded-3xl max-w-lg w-full p-8 border border-[#0E2340]/20 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setInspectingProduct(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#0E2340]/5 flex items-center justify-center text-sm font-bold text-[#0E2340] hover:bg-[#0E2340]/10 cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0E2340] text-white">
                Design Dossier • CODE {inspectingProduct.code}
              </span>
              <h3 className="text-2xl font-extrabold text-[#0E2340]">
                {inspectingProduct.title}
              </h3>
              <p className="text-sm text-[#0E2340]/80 leading-relaxed font-medium">
                Tailored meticulously with certified organic fibers and heritage stitching techniques. Designed to withstand children's active daily adventures while retaining luxurious softness and skin breathability.
              </p>

              <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-[#0E2340]/10 text-xs font-semibold text-[#0E2340]">
                <div>✨ 100% Organic Cotton Blend</div>
                <div>🌿 Hypoallergenic Safe Dyes</div>
                <div>🧵 Reinforced Double Stitching</div>
                <div>🧼 Gentle Machine Washable</div>
              </div>

              <button
                onClick={() => setInspectingProduct(null)}
                className="w-full py-3 bg-[#0E2340] text-white rounded-full font-extrabold text-xs tracking-wider uppercase hover:bg-[#193863] transition-all cursor-pointer shadow-sm"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CollectionCard({ product, onAddToBag, onOpenDetails }) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [isFading, setIsFading] = useState(false);
  
  const navigate = useNavigate();
  const activeVariant = product.variants[selectedVariantIdx];

  const handleVariantChange = (idx) => {
    if (idx === selectedVariantIdx) return;
    setIsFading(true);
    setSelectedVariantIdx(idx);
    setTimeout(() => setIsFading(false), 250);
  };

  const handleAdd = () => {
    if (onAddToBag) {
      onAddToBag({
        ...product,
        selectedColor: activeVariant.name,
        selectedSize,
        image: activeVariant.primaryImg,
      });
    }
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1400);
  };

  const handleBuyNow = () => {
    if (onAddToBag) {
      onAddToBag({
        ...product,
        selectedColor: activeVariant.name,
        selectedSize,
        image: activeVariant.primaryImg,
      });
    }
    navigate('/bag');
  };

  return (
    <article className="bg-white rounded-3xl p-4 border border-[#0E2340]/10 shadow-[0_8px_30px_rgb(14,35,64,0.04)] hover:shadow-[0_12px_40px_rgb(14,35,64,0.09)] transition-all duration-300 flex flex-col group">
      {/* Image Container with Brand Stamp */}
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#EFEAE2]">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-[#0E2340] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#0E2340]/10 shadow-sm">
          <span>★</span> Little Dreams
        </div>

        {product.badge && (
          <span className="absolute bottom-3 left-3 z-10 bg-[#0E2340] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}

        <span className="absolute top-3 right-3 z-10 bg-[#0E2340]/80 backdrop-blur-sm text-white text-[10px] font-extrabold px-2 py-1 rounded-full">
          #{product.code}
        </span>

        <img
          src={activeVariant.primaryImg}
          alt={`${product.title} - ${activeVariant.name}`}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 group-hover:scale-105 ${
            isFading ? 'opacity-40' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Quick Design Details Button on Image Hover */}
        <button
          type="button"
          onClick={onOpenDetails}
          className="absolute inset-x-4 bottom-4 bg-white/90 hover:bg-white text-[#0E2340] py-2 rounded-xl text-[11px] font-extrabold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md backdrop-blur-xs cursor-pointer"
        >
          View Design Details 🔍
        </button>
      </div>

      {/* Card Body & Controls */}
      <div className="pt-4 px-1 pb-1 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-[#0E2340] leading-snug">
              {product.title}
            </h3>
            <span className="font-extrabold text-base text-[#0E2340] shrink-0">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1.5">
              {product.variants.map((variant, idx) => (
                <button
                  key={variant.name}
                  type="button"
                  title={variant.name}
                  aria-label={`Select color ${variant.name}`}
                  onClick={() => handleVariantChange(idx)}
                  className={`w-5 h-5 rounded-full border border-black/15 transition-transform cursor-pointer ${
                    selectedVariantIdx === idx
                      ? 'ring-2 ring-[#0E2340] ring-offset-2 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: variant.hex }}
                />
              ))}
            </div>
            <span className="text-xs text-[#0E2340]/70 font-medium ml-1">
              {activeVariant.name}
            </span>
          </div>
        </div>

        {/* Size Selector & Action Buttons */}
        <div className="pt-3 border-t border-[#0E2340]/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E2340]/60">
              Size (Years)
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedSize === size
                    ? 'bg-[#0E2340] text-white shadow-xs'
                    : 'bg-[#FBF8F3] text-[#0E2340] hover:bg-[#B8D3F5]/40'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Action Buttons: Add to Bag & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className={`py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all cursor-pointer shadow-sm ${
                addedFeedback
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-[#0E2340] border border-[#0E2340] hover:bg-[#0E2340]/5'
              }`}
            >
              {addedFeedback ? 'Added ✓' : 'Add to Bag'}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="py-2.5 bg-[#0E2340] hover:bg-[#193863] text-white rounded-full text-xs font-extrabold tracking-wide transition-all cursor-pointer shadow-sm"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}