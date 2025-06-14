
export const applyFontSizeChanges = (newFontSize: number, toast: any) => {
  const root = document.documentElement;
  
  // Set base font size
  root.style.fontSize = `${newFontSize}px`;
  
  // Calculate responsive scaling factor
  const scaleFactor = newFontSize / 16; // 16 is base font size
  
  // Auto-adjust all spacing and sizing based on font size
  root.style.setProperty('--font-scale', scaleFactor.toString());
  root.style.setProperty('--header-height', `${3.5 * scaleFactor}rem`);
  root.style.setProperty('--sidebar-width', `${16 * scaleFactor}rem`);
  root.style.setProperty('--spacing-xs', `${0.25 * scaleFactor}rem`);
  root.style.setProperty('--spacing-sm', `${0.5 * scaleFactor}rem`);
  root.style.setProperty('--spacing-md', `${1 * scaleFactor}rem`);
  root.style.setProperty('--spacing-lg', `${1.5 * scaleFactor}rem`);
  root.style.setProperty('--spacing-xl', `${2 * scaleFactor}rem`);
  root.style.setProperty('--spacing-2xl', `${3 * scaleFactor}rem`);
  root.style.setProperty('--border-radius-sm', `${0.25 * scaleFactor}rem`);
  root.style.setProperty('--border-radius-md', `${0.375 * scaleFactor}rem`);
  root.style.setProperty('--border-radius-lg', `${0.5 * scaleFactor}rem`);
  
  // Apply scaling to header specifically
  const header = document.querySelector('header');
  if (header) {
    header.style.height = `${3.5 * scaleFactor}rem`;
    header.style.padding = `0 ${1 * scaleFactor}rem`;
  }
  
  // Apply scaling to main content
  const main = document.querySelector('main');
  if (main) {
    const mainContent = main.querySelector('div.flex-1');
    if (mainContent) {
      (mainContent as HTMLElement).style.padding = `${1 * scaleFactor}rem`;
    }
  }
  
  // Apply scaling to cards and components
  const cards = document.querySelectorAll('[class*="bg-white"], [class*="bg-gray"]');
  cards.forEach(card => {
    (card as HTMLElement).style.padding = `${1.5 * scaleFactor}rem`;
    (card as HTMLElement).style.gap = `${1 * scaleFactor}rem`;
  });
  
  // Update CSS custom properties for Tailwind classes
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --font-scale: ${scaleFactor};
    }
    
    /* Auto-adjust spacing classes */
    .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: ${0.25 * scaleFactor}rem; }
    .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: ${0.5 * scaleFactor}rem; }
    .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: ${0.75 * scaleFactor}rem; }
    .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: ${1 * scaleFactor}rem; }
    .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: ${1.5 * scaleFactor}rem; }
    .space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: ${2 * scaleFactor}rem; }
    
    .space-x-2 > :not([hidden]) ~ :not([hidden]) { margin-left: ${0.5 * scaleFactor}rem; }
    .space-x-3 > :not([hidden]) ~ :not([hidden]) { margin-left: ${0.75 * scaleFactor}rem; }
    .space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: ${1 * scaleFactor}rem; }
    
    .gap-2 { gap: ${0.5 * scaleFactor}rem; }
    .gap-3 { gap: ${0.75 * scaleFactor}rem; }
    .gap-4 { gap: ${1 * scaleFactor}rem; }
    .gap-6 { gap: ${1.5 * scaleFactor}rem; }
    
    /* Auto-adjust padding classes */
    .p-2 { padding: ${0.5 * scaleFactor}rem; }
    .p-3 { padding: ${0.75 * scaleFactor}rem; }
    .p-4 { padding: ${1 * scaleFactor}rem; }
    .p-6 { padding: ${1.5 * scaleFactor}rem; }
    
    .px-3 { padding-left: ${0.75 * scaleFactor}rem; padding-right: ${0.75 * scaleFactor}rem; }
    .px-4 { padding-left: ${1 * scaleFactor}rem; padding-right: ${1 * scaleFactor}rem; }
    .px-6 { padding-left: ${1.5 * scaleFactor}rem; padding-right: ${1.5 * scaleFactor}rem; }
    
    .py-2 { padding-top: ${0.5 * scaleFactor}rem; padding-bottom: ${0.5 * scaleFactor}rem; }
    .py-3 { padding-top: ${0.75 * scaleFactor}rem; padding-bottom: ${0.75 * scaleFactor}rem; }
    .py-4 { padding-top: ${1 * scaleFactor}rem; padding-bottom: ${1 * scaleFactor}rem; }
    
    /* Auto-adjust margin classes */
    .m-2 { margin: ${0.5 * scaleFactor}rem; }
    .m-3 { margin: ${0.75 * scaleFactor}rem; }
    .m-4 { margin: ${1 * scaleFactor}rem; }
    
    .mb-2 { margin-bottom: ${0.5 * scaleFactor}rem; }
    .mb-3 { margin-bottom: ${0.75 * scaleFactor}rem; }
    .mb-4 { margin-bottom: ${1 * scaleFactor}rem; }
    .mb-6 { margin-bottom: ${1.5 * scaleFactor}rem; }
    
    /* Auto-adjust border radius */
    .rounded { border-radius: ${0.25 * scaleFactor}rem; }
    .rounded-md { border-radius: ${0.375 * scaleFactor}rem; }
    .rounded-lg { border-radius: ${0.5 * scaleFactor}rem; }
    
    /* Auto-adjust header height */
    header { 
      height: ${3.5 * scaleFactor}rem !important; 
      min-height: ${3.5 * scaleFactor}rem !important;
    }
    
    /* Auto-adjust sidebar width */
    [data-sidebar] {
      width: ${16 * scaleFactor}rem;
    }
    
    /* Auto-adjust button sizes */
    button {
      padding: ${0.5 * scaleFactor}rem ${1 * scaleFactor}rem;
      border-radius: ${0.375 * scaleFactor}rem;
    }
    
    /* Auto-adjust input sizes */
    input, textarea, select {
      padding: ${0.5 * scaleFactor}rem ${0.75 * scaleFactor}rem;
      border-radius: ${0.375 * scaleFactor}rem;
    }
    
    /* Auto-adjust card spacing */
    [class*="card"] {
      padding: ${1.5 * scaleFactor}rem;
    }
    
    /* Ensure responsive behavior */
    @media (max-width: 768px) {
      header { 
        height: ${3 * scaleFactor}rem !important; 
        padding: 0 ${0.75 * scaleFactor}rem !important;
      }
      
      main > div {
        padding: ${0.75 * scaleFactor}rem !important;
      }
    }
  `;
  
  // Remove existing dynamic styles and add new one
  const existingStyle = document.getElementById('dynamic-font-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  style.id = 'dynamic-font-styles';
  document.head.appendChild(style);
  
  toast({ 
    title: "Font Size Updated", 
    description: `Font size set to ${newFontSize}px with auto-adjusted spacing and layout` 
  });
};
