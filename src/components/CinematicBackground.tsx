import React, { useMemo, useState, useEffect } from 'react';

export default function CinematicBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate randomized configurations for cherry blossom petals
  const petals = useMemo(() => {
    return Array.from({ length: 26 }).map((_, index) => {
      const left = Math.random() * 100; // Percentage
      const delay = Math.random() * -18; // Negative delay to start pre-dispersed
      const scale = 0.4 + Math.random() * 0.7; // Scale factor
      const duration = 10 + Math.random() * 12; // Base speed in seconds
      const rotation = Math.random() * 360; // Initial rotation
      
      // Distribute among the three animation styles
      let animClass = 'animate-petal-medium';
      if (index % 3 === 0) animClass = 'animate-petal-slow';
      if (index % 3 === 1) animClass = 'animate-petal-fast';

      // Soft pink and peach variations
      const colors = [
        'fill-[#FFAEC1]/70', // classic cherry blossom
        'fill-[#FFC5D3]/60', // soft pink
        'fill-[#FFE3E8]/80', // light pastel pink
        'fill-[#FFB2A6]/50', // warm peachy pink
        'fill-[#FFC8B4]/60'  // warm gold-pink
      ];
      const colorClass = colors[index % colors.length];

      return {
        id: index,
        left,
        delay,
        scale,
        duration,
        rotation,
        animClass,
        colorClass
      };
    });
  }, []);

  // Generate randomized configurations for bokeh particles
  const bokehs = useMemo(() => {
    return Array.from({ length: 12 }).map((_, index) => {
      const size = 60 + Math.random() * 140; // px
      const top = Math.random() * 100; // %
      const left = Math.random() * 100; // %
      const delay = Math.random() * -12; // s
      const duration = 12 + Math.random() * 10; // s
      const color = index % 2 === 0 ? 'bg-gold-accent/20' : 'bg-[#FFDFD3]/25';

      return {
        id: index,
        size,
        top,
        left,
        delay,
        duration,
        color
      };
    });
  }, []);

  // Generate floating dust particles
  const dusts = useMemo(() => {
    return Array.from({ length: 16 }).map((_, index) => {
      const left = Math.random() * 100; // %
      const delay = Math.random() * -15; // s
      const duration = 12 + Math.random() * 12; // s
      const size = 2 + Math.random() * 4; // px
      return {
        id: index,
        left,
        delay,
        duration,
        size
      };
    });
  }, []);

  return (
    <div id="cinematic-background" className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none bg-gradient-to-tr from-[#FFEFE3] via-[#FFF5EC] to-[#FFF9F4]">
      
      {/* 1. SOFT AURORA DRIFTING BLOBS */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(255,246,230,0.4)_0%,transparent_70%)] blur-3xl animate-aurora-1 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(212,176,106,0.15)_0%,transparent_75%)] blur-3xl animate-aurora-2 mix-blend-screen" />

      {/* 2. SUNRISE SKY GLOW & LIGHT LEAKS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(212,176,106,0.35)_0%,rgba(255,180,180,0.18)_30%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,190,190,0.22)_0%,rgba(212,176,106,0.12)_40%,transparent_70%)]" />
      
      {/* 3. SHIMMERING VOLUMETRIC LIGHT RAYS */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      >
        <defs>
          <linearGradient id="ray-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0D0" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#FFDEB4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFAA9E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ray-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#FFD3B6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFC6FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Ray beams rotating/shimmering */}
        <g className="animate-ray origin-[20%_10%]" style={{ filter: 'blur(15px)' }}>
          <polygon points="-100,-100 250,-100 1200,900 800,1200" fill="url(#ray-grad-1)" />
          <polygon points="50,-100 400,-100 1600,1100 1100,1400" fill="url(#ray-grad-2)" />
          <polygon points="-200,-100 -50,-100 600,1000 300,1100" fill="url(#ray-grad-1)" />
        </g>
      </svg>

      {/* 4. COOPERING ARTISTIC SAKURA BLOSSOMS OUTLINES / SILHOUETTES */}
      <div 
        className="absolute inset-0 opacity-10 flex justify-between pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${scrollY * -0.03}px)` }}
      >
        {/* Top left corner branch */}
        <svg className="w-80 h-80 text-gold-accent transform rotate-12 -translate-x-10 -translate-y-10" viewBox="0 0 100 100" fill="currentColor">
          <path d="M0,0 C15,5 30,12 40,25 C45,30 48,38 42,44 C38,48 30,45 28,38 C26,30 35,22 42,15 C48,8 60,4 70,2 M20,10 C25,18 20,28 15,32 M35,20 C42,25 45,15 50,12" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="42" cy="25" r="1.5" />
          <circle cx="28" cy="38" r="1" />
          <circle cx="42" cy="15" r="1.2" />
          <circle cx="20" cy="10" r="0.8" />
          <circle cx="15" cy="32" r="1" />
        </svg>
        {/* Bottom right corner branch */}
        <svg className="w-96 h-96 text-gold-accent absolute bottom-0 right-0 transform translate-x-16 translate-y-16 rotate-180 opacity-80" viewBox="0 0 100 100" fill="currentColor">
          <path d="M0,0 C15,5 30,12 40,25 C45,30 48,38 42,44 C38,48 30,45 28,38 C26,30 35,22 42,15 C48,8 60,4 70,2 M20,10 C25,18 20,28 15,32 M35,20 C42,25 45,15 50,12" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="42" cy="25" r="1.5" />
          <circle cx="28" cy="38" r="1" />
          <circle cx="42" cy="15" r="1.2" />
        </svg>
      </div>

      {/* 5. GENTLE MORNING MIST LAYERS */}
      <div 
        className="absolute inset-x-0 bottom-[-10%] h-[40%] bg-gradient-to-t from-white/40 via-white/10 to-transparent blur-3xl opacity-35 animate-mist"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
      <div 
        className="absolute inset-x-0 top-[15%] h-[25%] bg-gradient-to-b from-white/20 to-transparent blur-3xl opacity-20 animate-mist" 
        style={{ animationDelay: '-8s', transform: `translateY(${scrollY * 0.03}px)` }} 
      />

      {/* 6. ELEGANT BOKEH PARTICLES */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.04}px)` }}
      >
        {bokehs.map((b) => (
          <div
            key={b.id}
            className={`absolute rounded-full blur-xl animate-bokeh ${b.color}`}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              top: `${b.top}%`,
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 7. FLOATING DUST PARTICLES (GLOWING SPARKLES) */}
      <div className="absolute inset-0 overflow-hidden">
        {dusts.map((d) => (
          <div
            key={d.id}
            className="absolute bg-gold-accent/30 rounded-full blur-[0.5px] animate-dust"
            style={{
              width: `${d.size}px`,
              height: `${d.size}px`,
              left: `${d.left}%`,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
              '--dust-dur': `${d.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 8. FLOATING CHERRY BLOSSOM PETALS */}
      <div className="absolute inset-0">
        {petals.map((p) => (
          <div
            key={p.id}
            className={`absolute left-0 top-0 pointer-events-none ${p.animClass}`}
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              transform: `scale(${p.scale}) rotate(${p.rotation}deg)`,
            }}
          >
            {/* Elegant Custom Cleft Sakura Petal SVG */}
            <svg
              className={p.colorClass}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4 C11.5 1 8 0 6 2 C3 5 3 10 6 14 C9 18 12 21 12 21 C12 21 15 18 18 14 C21 10 21 5 18 2 C16 0 12.5 1 12 4 Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* 9. LUXURY EYE-SAFE VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(58,43,40,0.06)_100%)] pointer-events-none z-10" />

      {/* Subtle Warm Sunrise Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFF0E2]/25 pointer-events-none mix-blend-multiply" />
    </div>
  );
}
