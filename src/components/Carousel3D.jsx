import { useRef, useState } from 'react';
import ModelAvatar from './ModelAvatar';

export default function Carousel3D({
  looks,
  currentIndex,
  onSelectLook,
  activeHotspot,
  onSelectHotspot,
  onOpenItemModal,
  isPaused
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const activeLook = looks[currentIndex];
  const totalLooks = looks.length;
  const radius = 380; // Distance from center in 3D space

  // Interactive 3D mouse parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 8, // subtle pitch
      y: x * 14  // smooth yaw
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Touch / Drag rotation support
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const delta = endX - dragStartX;
    if (delta > 40) {
      onSelectLook((currentIndex - 1 + totalLooks) % totalLooks);
    } else if (delta < -40) {
      onSelectLook((currentIndex + 1) % totalLooks);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className="stage-perspective relative w-full h-full flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      {/* Top Headline & Subtitle */}
      <div className="pt-4 sm:pt-6 lg:pt-8 px-6 sm:px-12 max-w-xl z-20 flex-shrink-0">
        <h1 
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight theme-transition font-serif leading-tight"
          style={{ color: activeLook.theme.textColor }}
        >
          {activeLook.model.headline}
        </h1>
        <p 
          className="mt-2 text-sm sm:text-base lg:text-lg font-medium theme-transition max-w-md"
          style={{ color: activeLook.theme.taglineColor }}
        >
          {activeLook.model.subhead}
        </p>
      </div>

      {/* 3D Circular Turntable / Carousel Stage */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[380px] lg:min-h-[440px]">
        {/* Soft 3D Ground Shadow Ring */}
        <div 
          className="absolute bottom-4 sm:bottom-6 w-[500px] sm:w-[650px] h-[140px] sm:h-[160px] rounded-[100%] theme-transition opacity-60 filter blur-xl pointer-events-none"
          style={{
            background: activeLook.gender === 'boy' 
              ? 'radial-gradient(ellipse at center, rgba(14, 116, 144, 0.35) 0%, rgba(2, 132, 199, 0.1) 60%, transparent 80%)'
              : 'radial-gradient(ellipse at center, rgba(190, 24, 93, 0.35) 0%, rgba(219, 39, 119, 0.1) 60%, transparent 80%)'
          }}
        />

        {/* 3D Transform Carousel Cylinder Wrapper */}
        <div
          className="preserve-3d relative w-full h-[420px] flex items-center justify-center transition-transform duration-700 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          }}
        >
          {looks.map((look, index) => {
            let offset = index - currentIndex;
            if (offset > totalLooks / 2) offset -= totalLooks;
            if (offset < -totalLooks / 2) offset += totalLooks;

            const angle = offset * (360 / totalLooks);
            const isActive = offset === 0;
            const isNeighbor = Math.abs(offset) === 1;

            const opacity = isActive ? 1 : isNeighbor ? 0.65 : 0.25;
            const blur = isActive ? '0px' : isNeighbor ? '1.5px' : '4px';
            const scale = isActive ? 1.05 : isNeighbor ? 0.82 : 0.65;
            const zIndex = isActive ? 40 : 20 - Math.abs(offset);

            return (
              <div
                key={look.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLook(index);
                }}
                className={`transition-all duration-700 ease-out cursor-pointer flex items-center justify-center ${
                  isActive ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-90'
                }`}
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '420px',
                  left: 'calc(50% - 160px)',
                  top: 'calc(50% - 210px)',
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity: opacity,
                  filter: `blur(${blur})`,
                  zIndex: zIndex
                }}
              >
                <ModelAvatar
                  look={look}
                  isActive={isActive}
                  activeHotspot={activeHotspot}
                  onSelectHotspot={onSelectHotspot}
                  onOpenItemModal={onOpenItemModal}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating 3D Interaction Hint */}

    </div>
  );
}
 