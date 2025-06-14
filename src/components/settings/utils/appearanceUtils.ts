
// Font family utility
export const applyFontFamily = (fontFamily: string) => {
  const getFontFamily = (font: string) => {
    const fonts = {
      'inter': 'Inter, system-ui, -apple-system, sans-serif',
      'roboto': 'Roboto, system-ui, -apple-system, sans-serif',
      'poppins': 'Poppins, system-ui, -apple-system, sans-serif',
      'montserrat': 'Montserrat, system-ui, -apple-system, sans-serif',
      'opensans': 'Open Sans, system-ui, -apple-system, sans-serif'
    };
    return fonts[font as keyof typeof fonts] || fonts.inter;
  };

  document.documentElement.style.fontFamily = getFontFamily(fontFamily);
  localStorage.setItem('font-family', fontFamily);
};

// Animation speed utility
export const applyAnimationSpeed = (speed: number) => {
  // Create or update speed style rules
  const existingSpeedStyles = document.getElementById('dynamic-speed-styles');
  if (existingSpeedStyles) {
    existingSpeedStyles.remove();
  }
  
  const speedStyles = document.createElement('style');
  speedStyles.id = 'dynamic-speed-styles';
  
  // Calculate duration multiplier (inverse of speed)
  const durationMultiplier = 1 / speed;
  
  const cssRules = `
    * {
      animation-duration: calc(var(--original-duration, 0.6s) * ${durationMultiplier}) !important;
      transition-duration: calc(var(--original-transition, 0.4s) * ${durationMultiplier}) !important;
    }
    
    .animate-fade-in {
      animation-duration: ${0.8 * durationMultiplier}s !important;
    }
    
    .animate-slide-right {
      animation-duration: ${1.2 * durationMultiplier}s !important;
    }
    
    .animate-bounce {
      animation-duration: ${1.5 * durationMultiplier}s !important;
    }
    
    .animate-pulse {
      animation-duration: ${3 * durationMultiplier}s !important;
    }
    
    canvas {
      animation-duration: ${1.5 * durationMultiplier}s !important;
    }
    
    button, .hover\\:scale-105 {
      transition-duration: ${0.4 * durationMultiplier}s !important;
    }
    
    .accordion-down {
      animation-duration: ${0.4 * durationMultiplier}s !important;
    }
    
    .accordion-up {
      animation-duration: ${0.4 * durationMultiplier}s !important;
    }
  `;
  
  speedStyles.textContent = cssRules;
  document.head.appendChild(speedStyles);
  
  localStorage.setItem('animation-speed', speed.toString());
};

// Animation style utility
export const applyAnimationStyle = (style: string) => {
  const root = document.documentElement;
  
  // Remove existing animation classes
  root.classList.remove('animation-smooth', 'animation-bouncy', 'animation-minimal', 'animation-energetic');
  
  // Add new animation class
  root.classList.add(`animation-${style}`);
  
  // Create or update animation style rules
  const existingAnimationStyles = document.getElementById('dynamic-animation-styles');
  if (existingAnimationStyles) {
    existingAnimationStyles.remove();
  }
  
  const animationStyles = document.createElement('style');
  animationStyles.id = 'dynamic-animation-styles';
  
  let cssRules = '';
  
  switch (style) {
    case 'bouncy':
      cssRules = `
        .animation-bouncy * {
          animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
        }
        .animation-bouncy .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animation-bouncy .animate-slide-right {
          animation: slide-right 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animation-bouncy button:hover {
          transform: scale(1.1) !important;
        }
      `;
      break;
    case 'minimal':
      cssRules = `
        .animation-minimal * {
          animation-duration: 0.3s !important;
          transition-duration: 0.2s !important;
        }
        .animation-minimal .animate-bounce {
          animation: none !important;
        }
        .animation-minimal .animate-pulse {
          animation: none !important;
        }
        .animation-minimal button:hover {
          transform: scale(1.02) !important;
        }
      `;
      break;
    case 'energetic':
      cssRules = `
        .animation-energetic * {
          animation-duration: 0.5s !important;
          transition-duration: 0.3s !important;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        .animation-energetic .animate-float {
          animation: float 1.8s ease-in-out infinite;
        }
        .animation-energetic .animate-glow {
          animation: glow 1.2s ease-in-out infinite alternate;
        }
        .animation-energetic button:hover {
          transform: scale(1.15) rotate(2deg) !important;
        }
        .animation-energetic .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `;
      break;
    default: // smooth
      cssRules = `
        .animation-smooth * {
          animation-timing-function: ease-out !important;
          transition-timing-function: ease-out !important;
        }
        .animation-smooth button:hover {
          transform: scale(1.05) !important;
        }
      `;
  }
  
  animationStyles.textContent = cssRules;
  document.head.appendChild(animationStyles);
  
  localStorage.setItem('animation-style', style);
};
