import { useState, useEffect } from 'react';

// Type-safe localStorage hook for user preferences and offline support
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

// Hook for user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    hasVisited: false,
    newsletterPromptShown: false,
    lastBookingData: null,
  });

  const markAsVisited = () => {
    setPreferences(prev => ({ ...prev, hasVisited: true }));
  };

  const markNewsletterPromptShown = () => {
    setPreferences(prev => ({ ...prev, newsletterPromptShown: true }));
  };

  const saveLastBookingData = (data: any) => {
    setPreferences(prev => ({ ...prev, lastBookingData: data }));
  };

  return {
    preferences,
    markAsVisited,
    markNewsletterPromptShown,
    saveLastBookingData,
  };
}