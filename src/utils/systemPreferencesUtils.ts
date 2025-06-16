
// System preferences utility functions
export const applyCompactViewStyles = () => {
  const compactStyles = document.getElementById('compact-view-styles');
  if (compactStyles) return; // Already exists

  const styleElement = document.createElement('style');
  styleElement.id = 'compact-view-styles';
  styleElement.textContent = `
    .compact-view {
      --header-height: 3rem;
      --card-padding: 0.75rem;
      --text-sm: 0.8rem;
      --spacing-unit: 0.5rem;
    }
    
    .compact-view .space-y-4 > * + * {
      margin-top: var(--spacing-unit) !important;
    }
    
    .compact-view .space-y-6 > * + * {
      margin-top: calc(var(--spacing-unit) * 1.5) !important;
    }
    
    .compact-view .p-4 {
      padding: var(--card-padding) !important;
    }
    
    .compact-view .p-6 {
      padding: calc(var(--card-padding) * 1.5) !important;
    }
    
    .compact-view .h-14,
    .compact-view .h-16 {
      height: var(--header-height) !important;
    }
    
    .compact-view .text-sm {
      font-size: var(--text-sm) !important;
    }
    
    .compact-view .grid {
      gap: var(--spacing-unit) !important;
    }
  `;
  
  document.head.appendChild(styleElement);
};

export const removeCompactViewStyles = () => {
  const compactStyles = document.getElementById('compact-view-styles');
  if (compactStyles) {
    compactStyles.remove();
  }
};

// Initialize compact view styles on load
if (typeof window !== 'undefined') {
  applyCompactViewStyles();
}
