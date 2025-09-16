import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'service';
}

const SEO = ({ 
  title = "Andreas & Co. - Premium Men's Grooming Lounge | Calgary",
  description = "New-York calibre grooming in Calgary. Precision cuts, SkinBar facials, and membership privileges at Andreas & Co. - Calgary's premier men's grooming lounge.",
  keywords = "men's grooming Calgary, barber shop Calgary, men's haircut, SkinBar facial, premium grooming lounge, Andreas & Co",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  canonical,
  type = 'website'
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };
    
    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Andreas & Co.');
    
    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'Andreas & Co.', true);
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.rel = 'canonical';
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = canonical || currentUrl;
    
    // Structured Data for Local Business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "HairSalon",
      "name": "Andreas & Co.",
      "description": description,
      "url": "https://andreasandco.ca",
      "image": image,
      "telephone": "+1-234-567-8900",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Calgary",
        "addressRegion": "AB",
        "addressCountry": "CA"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "09:00", 
          "closes": "17:00"
        }
      ],
      "priceRange": "$$$",
      "servesCuisine": [],
      "hasMenu": {
        "@type": "Menu",
        "name": "Grooming Services",
        "hasMenuSection": [
          {
            "@type": "MenuSection",
            "name": "Signature Cuts",
            "description": "Precision haircuts with expert consultation"
          },
          {
            "@type": "MenuSection", 
            "name": "SkinBar",
            "description": "Professional facial treatments for men"
          }
        ]
      }
    };
    
    // Update structured data
    let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);
    
  }, [title, description, keywords, image, canonical, type, currentUrl]);
  
  return null;
};

export default SEO;