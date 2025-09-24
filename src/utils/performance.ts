// Performance monitoring utilities

export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

// Core Web Vitals monitoring
export const measureWebVitals = (): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      resolve({
        loadTime: 0,
        domContentLoaded: 0,
      });
      return;
    }

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: navigation.loadEventEnd - navigation.fetchStart,
      };

      // Get paint metrics if available
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        metrics.firstContentfulPaint = fcpEntry.startTime;
      }

      resolve(metrics);
    });
  });
};

// Image lazy loading observer
export const createImageObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );
};

// Resource hints for preloading
export const preloadResource = (href: string, as: string, crossorigin?: string) => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) link.crossOrigin = crossorigin;
  
  document.head.appendChild(link);
};

// Prefetch resources for next navigation
export const prefetchResource = (href: string) => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  document.head.appendChild(link);
};