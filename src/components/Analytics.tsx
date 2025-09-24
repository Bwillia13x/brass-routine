import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Basic analytics component ready for Google Analytics 4 integration
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views when route changes
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          // Log core web vitals for monitoring
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          
          // These could be sent to your analytics service
          console.log('Performance metrics:', {
            loadTime,
            domContentLoaded,
            firstContentfulPaint: navigation.loadEventEnd - navigation.fetchStart,
          });
        }
      });
    }
  }, []);

  return null;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default Analytics;