/** Shared gradients and filters for the hand-drawn fruit. Rendered once on the page. */
export const ArtDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="ss-bb" cx=".34" cy=".3" r=".75"><stop offset="0" stopColor="#8C9BD6" /><stop offset=".4" stopColor="#3E4A8C" /><stop offset="1" stopColor="#161C45" /></radialGradient>
      <radialGradient id="ss-rasp" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#FF8C9C" /><stop offset=".45" stopColor="#D41C46" /><stop offset="1" stopColor="#7A0624" /></radialGradient>
      <radialGradient id="ss-bk" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#7A5A8C" /><stop offset=".45" stopColor="#2E1838" /><stop offset="1" stopColor="#0E0612" /></radialGradient>
      <radialGradient id="ss-skin" cx=".36" cy=".32" r=".8"><stop offset="0" stopColor="#FF6B6B" /><stop offset=".55" stopColor="#D81E36" /><stop offset="1" stopColor="#8A0C1E" /></radialGradient>
      <radialGradient id="ss-flesh" cx=".5" cy=".45" r=".6"><stop offset="0" stopColor="#FFF4F1" /><stop offset=".35" stopColor="#FFC2C4" /><stop offset=".75" stopColor="#F2546A" /><stop offset="1" stopColor="#D0213A" /></radialGradient>
      <linearGradient id="ss-mango-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFD873" /><stop offset="1" stopColor="#FFB320" /></linearGradient>
      <linearGradient id="ss-mango-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFAA1A" /><stop offset="1" stopColor="#E98A00" /></linearGradient>
      <linearGradient id="ss-mango-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F29600" /><stop offset="1" stopColor="#CC7200" /></linearGradient>
      <linearGradient id="ss-pine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF6BF" /><stop offset=".45" stopColor="#FFE066" /><stop offset="1" stopColor="#EFB800" /></linearGradient>
      <radialGradient id="ss-banana" cx=".45" cy=".42" r=".6"><stop offset="0" stopColor="#FFFCEF" /><stop offset=".7" stopColor="#FBF0C9" /><stop offset="1" stopColor="#E7CF86" /></radialGradient>
      <radialGradient id="ss-gran" cx=".4" cy=".35" r=".75"><stop offset="0" stopColor="#E9BC74" /><stop offset=".55" stopColor="#B97C34" /><stop offset="1" stopColor="#7A4818" /></radialGradient>
      <linearGradient id="ss-honey" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFD56A" /><stop offset=".5" stopColor="#F4A11A" /><stop offset="1" stopColor="#C97800" /></linearGradient>
      <linearGradient id="ss-leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7CCB8C" /><stop offset="1" stopColor="#2B7443" /></linearGradient>
      <linearGradient id="ss-yog" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#EFE8DA" /><stop offset=".3" stopColor="#FFFFFF" /><stop offset=".75" stopColor="#FBF8F1" /><stop offset="1" stopColor="#E6DDCB" /></linearGradient>
      <linearGradient id="ss-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".12" stopColor="#fff" stopOpacity=".08" /><stop offset=".8" stopColor="#fff" stopOpacity=".04" /><stop offset="1" stopColor="#fff" stopOpacity=".4" /></linearGradient>
      <filter id="ss-tex" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 -0.02" result="a" />
        <feComposite in="a" in2="SourceGraphic" operator="in" result="t" />
        <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="t" /></feMerge>
      </filter>
      <filter id="ss-soft" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.4" floodColor="#3A1A10" floodOpacity=".28" /></filter>
      <filter id="ss-blur"><feGaussianBlur stdDeviation="6" /></filter>
    </defs>
  </svg>
);
