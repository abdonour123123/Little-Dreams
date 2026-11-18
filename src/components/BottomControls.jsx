import React from 'react';

export default function BottomControls({
  looks,
  currentIndex,
  onSelectLook,
  isPlaying,
  onTogglePlay,
  progress
}) {
  const currentLook = looks[currentIndex];
  const theme = currentLook.theme;

  const handlePrev = () => {
    onSelectLook((currentIndex - 1 + looks.length) % looks.length);
  };

  const handleNext = () => {
    onSelectLook((currentIndex + 1) % looks.length);
  };

  return (
    <div className="w-full px-6 sm:px-12 py-3 sm:py-4 flex flex-row items-center justify-between gap-4 z-30 select-none">
      {/* Left: Pagination & Active Look Name */}
      <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
        {looks.map((look, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={look.id}
              onClick={() => onSelectLook(index)}
              className="flex items-center gap-2 group transition-all duration-300 py-1 focus:outline-none"
            >
              <span 
                className={`text-xs font-bold transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-110' : 'opacity-40 group-hover:opacity-75'
                }`}
                style={{
                  color: isActive ? theme.primaryColor : '#475569'
                }}
              >
                {look.id}
              </span>

              {isActive && (
                <span 
                  className="hidden sm:inline text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 animate-fadeIn"
                  style={{ color: theme.primaryColor }}
                >
                  {look.title}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Center: Live Circular Auto-Advance Progress Bar */}

    </div>
  );
}
