
// Security utilities for input validation and sanitization

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML brackets
    .substring(0, 1000); // Limit length
};

export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') return '';
  return email.toLowerCase().trim();
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  if (typeof password !== 'string' || password.length < 8) return false;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

export const escapeHtml = (text: string): string => {
  if (typeof text !== 'string') return '';
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

export const rateLimiter = (() => {
  const attempts: { [key: string]: number[] } = {};
  
  return {
    checkRateLimit: (identifier: string, maxAttempts: number = 5, timeWindow: number = 60000): boolean => {
      const now = Date.now();
      const windowStart = now - timeWindow;
      
      if (!attempts[identifier]) {
        attempts[identifier] = [];
      }
      
      // Remove old attempts
      attempts[identifier] = attempts[identifier].filter(timestamp => timestamp > windowStart);
      
      if (attempts[identifier].length >= maxAttempts) {
        return false; // Rate limit exceeded
      }
      
      attempts[identifier].push(now);
      return true; // Within rate limit
    },
    
    clearAttempts: (identifier: string): void => {
      delete attempts[identifier];
    }
  };
})();

export const generateSecureId = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const logSecurityEvent = (event: string, details: any = {}): void => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    event,
    details: {
      ...details,
      userAgent: navigator.userAgent,
      url: window.location.href
    }
  };
  
  console.warn('Security Event:', logEntry);
  
  // In production, send to security monitoring service
  // Example: sendToSecurityService(logEntry);
};
