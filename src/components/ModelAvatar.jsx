import React from 'react';
// 1. Import the exact filenames including .png
import balletGirlImg from '../assets/ballet-girl-look.png';
import balletGirlImg2 from '../assets/girl-look-cutout(2).png';
import balletGirlImg3 from '../assets/girl in tringe.png';
import BoyImg1 from '../assets/boy1.png';
import BoyImg2 from '../assets/boy2.png';
// 2. Map each look ID to its specific image
const LOOK_IMAGES = {
  '01': balletGirlImg,
  '02': BoyImg1,
  '03': balletGirlImg2,
  '04': BoyImg2,
  '05': balletGirlImg3,
  // Add '03' and '04' here once you add and import their image files
};

export default function ModelAvatar({ 
  look, 
  isActive, 
  onSelectHotspot, 
  onOpenItemModal
}) {
  // Pick the specific image by look.id, or use look.model.image if provided
  const modelImage = LOOK_IMAGES[look.id] || look.model?.image || balletGirlImg;

  // Helper to trigger item details when clicking any garment area
  const handleItemClick = (e, spotId) => {
    e.stopPropagation();
    if (!isActive) return;
    
    onSelectHotspot(spotId);
    const correspondingItem = look.items.find(i => i.num === spotId) || look.items[0];
    if (onOpenItemModal && correspondingItem) {
      onOpenItemModal(correspondingItem);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end select-none">
      {/* Main Model Image Container */}
      <div className="relative z-10 w-64 sm:w-72 h-[380px] sm:h-[410px] flex items-center justify-center">
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-700"
          style={{
            transform: isActive ? 'scale(1.08)' : 'scale(0.92)'
          }}
        >
          {/* Ambient ground shadow beneath shoes */}
          <div 
            className="absolute bottom-3 w-44 h-8 rounded-full bg-black/25 filter blur-md -z-10"
            style={{ left: '22%' }}
          />

          {/* Specific 2K Model Image for this Look */}
          <img 
            src={modelImage} 
            alt={look.name || `Look ${look.id}`}
            className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            style={{
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25)) contrast(1.04) brightness(1.02)'
            }}
          />
        </div>

        {/* INVISIBLE CLICKABLE GARMENT ZONES */}
        {isActive && look.model?.hotspots?.map((spot) => (
          <button
            key={spot.id}
            onClick={(e) => handleItemClick(e, spot.id)}
            style={{ top: spot.top, left: spot.left }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-24 h-20 rounded-2xl bg-transparent cursor-pointer z-30 focus:outline-none"
            aria-label={`Inspect ${spot.label}`}
          />
        ))}
      </div>
    </div>
  );
} 