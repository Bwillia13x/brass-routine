// Security utilities for production

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Email validation with security checks
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = sanitizeInput(email);
  
  return (
    emailRegex.test(sanitized) &&
    sanitized.length <= 254 && // RFC 5321 limit
    !sanitized.includes('..') && // No consecutive dots
    !sanitized.startsWith('.') && // No leading dot
    !sanitized.endsWith('.') // No trailing dot
  );
};

// Phone number validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\(\)\-\.]{7,15}$/;
  const sanitized = sanitizeInput(phone);
  
  return phoneRegex.test(sanitized);
};

// URL validation for external links
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

// Content Security Policy helpers
export const createCSPNonce = (): string => {
  if (typeof crypto === 'undefined') {
    return Math.random().toString(36).substring(2, 15);
  }
  
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
};

// Rate limiting for form submissions
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    
    return true;
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();