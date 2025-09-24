// Production readiness checklist component for monitoring

interface ProductionCheck {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
}

export const useProductionReadiness = (): ProductionCheck[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const checks: ProductionCheck[] = [
    // Environment checks
    {
      name: 'Supabase Configuration',
      status: import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY ? 'pass' : 'fail',
      message: 'Backend connection configured'
    },

    // Security checks
    {
      name: 'HTTPS Protocol',
      status: window.location.protocol === 'https:' || window.location.hostname === 'localhost' ? 'pass' : 'warn',
      message: 'Secure connection established'
    },

    // Performance checks
    {
      name: 'Service Worker',
      status: 'serviceWorker' in navigator ? 'pass' : 'warn',
      message: 'Offline capabilities available'
    },

    // SEO checks
    {
      name: 'Meta Tags',
      status: document.querySelector('meta[name="description"]') ? 'pass' : 'fail',
      message: 'Page metadata configured'
    },

    {
      name: 'Open Graph',
      status: document.querySelector('meta[property="og:title"]') ? 'pass' : 'warn',
      message: 'Social sharing optimized'
    },

    // Accessibility checks
    {
      name: 'Alt Text Coverage',
      status: Array.from(document.images).every(img => img.alt !== '') ? 'pass' : 'warn',
      message: 'Images have descriptions'
    },

    // Forms checks
    {
      name: 'Form Validation',
      status: document.querySelector('form[novalidate]') ? 'warn' : 'pass',
      message: 'Client-side validation active'
    },

    // Analytics readiness
    {
      name: 'Analytics Ready',
      status: document.querySelector('script[src*="gtag"]') ? 'pass' : 'warn',
      message: 'Tracking configuration available'
    }
  ];

  return checks;
};

// Development-only component to show production readiness
const ProductionReadiness = () => {
  if (import.meta.env.PROD) {
    return null; // Don't show in production
  }

  const checks = useProductionReadiness();
  const passCount = checks.filter(c => c.status === 'pass').length;
  const totalCount = checks.length;
  const percentage = Math.round((passCount / totalCount) * 100);

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-semibold text-sm mb-2">
        Production Readiness: {percentage}%
      </h3>
      <div className="space-y-1 text-xs">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              check.status === 'pass' ? 'bg-green-500' :
              check.status === 'warn' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="flex-1">{check.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionReadiness;