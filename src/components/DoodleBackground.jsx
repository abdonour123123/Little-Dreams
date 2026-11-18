import React from 'react';

export default function DoodleBackground({ theme, gender }) {
  const isBoy = gender === 'boy';
  const doodleColor = theme.doodleColor || (isBoy ? '#1d72b8' : '#d9206e');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-4deg); }
        }
        .doodle-float-slow { animation: floatSlow 3.2s ease-in-out infinite; }
        .doodle-float-rev { animation: floatReverse 4s ease-in-out infinite; }
      `}</style>

      {/* Soft Ambient Radial Light Spotlights */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full filter blur-[100px] opacity-40 transition-all duration-1000"
        style={{
          background: isBoy 
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(29, 114, 184, 0.1) 70%, transparent 100%)' 
            : 'radial-gradient(circle, rgba(244, 114, 182, 0.45) 0%, rgba(217, 32, 110, 0.1) 70%, transparent 100%)',
          top: '20%',
          left: '30%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Hand-drawn Doodles SVG Overlay */}
      <svg className="w-full h-full absolute inset-0 opacity-80" xmlns="http://www.w3.org/2000/svg">
        {/* Top-Right Cloud */}
        <g style={{ transform: 'translate(52vw, 8vh) scale(0.95)' }}>
          <g className="doodle-float-slow">
            <path d="M 20 60 Q 20 35 45 35 Q 55 15 85 15 Q 115 15 125 35 Q 155 35 160 60 Q 165 75 145 78 L 35 78 Q 18 75 20 60 Z" fill="none" stroke={doodleColor} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
            <path d="M 38 65 Q 40 48 58 46" fill="none" stroke={doodleColor} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          </g>
        </g>

        {/* Mid-Left Cloud */}
        <g style={{ transform: 'translate(14vw, 22vh) scale(0.7)' }}>
          <g className="doodle-float-rev">
            <path d="M 15 50 Q 15 28 36 28 Q 45 12 70 12 Q 95 12 105 28 Q 130 28 135 50 Q 140 64 120 66 L 30 66 Q 14 64 15 50 Z" fill="none" stroke={doodleColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          </g>
        </g>

        {/* Far-Right Cloud */}
        <g style={{ transform: 'translate(82vw, 28vh) scale(0.65)' }}>
          <g className="doodle-float-slow">
            <path d="M 15 50 Q 15 28 36 28 Q 45 12 70 12 Q 95 12 105 28 Q 130 28 135 50 Q 140 64 120 66 L 30 66 Q 14 64 15 50 Z" fill="none" stroke={doodleColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          </g>
        </g>

        {/* Bottom-Center Cloud */}
        <g style={{ transform: 'translate(35vw, 75vh) scale(0.8)' }}>
          <g className="doodle-float-rev">
            <path d="M 20 60 Q 20 35 45 35 Q 55 15 85 15 Q 115 15 125 35 Q 155 35 160 60 Q 165 75 145 78 L 35 78 Q 18 75 20 60 Z" fill="none" stroke={doodleColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          </g>
        </g>

        {/* Scattered Stars */}
        <g style={{ transform: 'translate(44vw, 38vh)' }}>
          <path className="doodle-float-slow" d="M 12 2 L 15 9 L 22 10 L 17 15 L 18 22 L 12 18 L 6 22 L 7 15 L 2 10 L 9 9 Z" fill="none" stroke={doodleColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
        </g>
        <g style={{ transform: 'translate(23vw, 55vh) scale(0.8)' }}>
          <path className="doodle-float-rev" d="M 12 2 L 15 9 L 22 10 L 17 15 L 18 22 L 12 18 L 6 22 L 7 15 L 2 10 L 9 9 Z" fill="none" stroke={doodleColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
        </g>
        <g style={{ transform: 'translate(70vw, 48vh) scale(1.1)' }}>
          <path className="doodle-float-slow" d="M 12 2 L 15 9 L 22 10 L 17 15 L 18 22 L 12 18 L 6 22 L 7 15 L 2 10 L 9 9 Z" fill="none" stroke={doodleColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </g>
        <g style={{ transform: 'translate(18vw, 82vh) scale(0.75)' }}>
          <path className="doodle-float-rev" d="M 12 2 L 15 9 L 22 10 L 17 15 L 18 22 L 12 18 L 6 22 L 7 15 L 2 10 L 9 9 Z" fill="none" stroke={doodleColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </g>
        <g style={{ transform: 'translate(88vw, 70vh) scale(0.9)' }}>
          <path className="doodle-float-slow" d="M 12 2 L 15 9 L 22 10 L 17 15 L 18 22 L 12 18 L 6 22 L 7 15 L 2 10 L 9 9 Z" fill="none" stroke={doodleColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
        </g>
        <g style={{ transform: 'translate(62vw, 18vh) scale(0.7)' }}>
          <path className="doodle-float-rev" d="M 12 2 L 15 9 L 22 10 L 17 15 L 18 22 L 12 18 L 6 22 L 7 15 L 2 10 L 9 9 Z" fill="none" stroke={doodleColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
        </g>

        {/* Sparkle Burst Lines */}
        <g style={{ transform: 'translate(40.5vw, 22vh)' }}>
          <line x1="0" y1="18" x2="14" y2="4" stroke={doodleColor} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="12" y1="24" x2="28" y2="12" stroke={doodleColor} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="22" y1="32" x2="38" y2="24" stroke={doodleColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </g>
        <g style={{ transform: 'translate(75vw, 65vh) scale(0.8)' }}>
          <line x1="0" y1="18" x2="14" y2="4" stroke={doodleColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <line x1="12" y1="24" x2="28" y2="12" stroke={doodleColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* Gender Specific Doodles */}
        {isBoy ? (
          <>
            <g style={{ transform: 'translate(8vw, 15vh) scale(0.85)' }}>
              <g className="doodle-float-slow">
                <path d="M 5 25 L 45 5 L 25 45 L 20 28 Z M 45 5 L 20 28" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                <path d="M 5 25 Q -10 35 -15 50" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />
              </g>
            </g>
            <g style={{ transform: 'translate(85vw, 18vh) scale(0.65) rotate(15deg)' }}>
              <path className="doodle-float-rev" d="M 5 25 L 45 5 L 25 45 L 20 28 Z M 45 5 L 20 28" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            </g>
          </>
        ) : (
          <>
            <g style={{ transform: 'translate(8vw, 15vh) scale(0.85)' }}>
              <path className="doodle-float-slow" d="M 20 20 Q 5 5 10 25 Q 15 32 20 22 Q 25 32 30 25 Q 35 5 20 20 Z" fill="none" stroke="#f472b6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            </g>
            <g style={{ transform: 'translate(86vw, 20vh) scale(0.7) rotate(-20deg)' }}>
              <path className="doodle-float-rev" d="M 20 20 Q 5 5 10 25 Q 15 32 20 22 Q 25 32 30 25 Q 35 5 20 20 Z" fill="none" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}