import { useEffect } from 'react';

// Progressive Web App configuration
const PWAManifest = () => {
  useEffect(() => {
    // Create manifest.json dynamically for PWA support
    const manifest = {
      name: 'Andreas & Co. - Premium Men\'s Grooming Lounge',
      short_name: 'Andreas & Co.',
      description: 'New-York calibre grooming in Calgary. Precision cuts, SkinBar facials, and membership privileges.',
      start_url: '/',
      display: 'standalone',
      background_color: '#0A0A0A',
      theme_color: '#D4AF37',
      orientation: 'portrait',
      icons: [
        {
          src: '/lovable-uploads/b046a3c5-1c1b-45b4-bec5-34fe783f8f54.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/lovable-uploads/b046a3c5-1c1b-45b4-bec5-34fe783f8f54.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
      categories: ['business', 'lifestyle', 'health'],
      lang: 'en-CA',
      scope: '/',
      prefer_related_applications: false
    };

    // Check if manifest link already exists
    let manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      document.head.appendChild(manifestLink);
    }

    // Create blob URL for manifest
    const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    const manifestUrl = URL.createObjectURL(manifestBlob);
    manifestLink.href = manifestUrl;

    // Add theme color meta tags for mobile browsers
    let themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = '#D4AF37';

    // Add Apple-specific meta tags
    let appleMobileMeta = document.querySelector('meta[name="apple-mobile-web-app-capable"]') as HTMLMetaElement;
    if (!appleMobileMeta) {
      appleMobileMeta = document.createElement('meta');
      appleMobileMeta.name = 'apple-mobile-web-app-capable';
      appleMobileMeta.content = 'yes';
      document.head.appendChild(appleMobileMeta);
    }

    let appleStatusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') as HTMLMetaElement;
    if (!appleStatusBarMeta) {
      appleStatusBarMeta = document.createElement('meta');
      appleStatusBarMeta.name = 'apple-mobile-web-app-status-bar-style';
      appleStatusBarMeta.content = 'black-translucent';
      document.head.appendChild(appleStatusBarMeta);
    }

    // Cleanup function
    return () => {
      URL.revokeObjectURL(manifestUrl);
    };
  }, []);

  return null;
};

export default PWAManifest;