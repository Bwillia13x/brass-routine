import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'service';
}

interface LayoutProps {
  children: ReactNode;
  seo?: SEOData;
}

const Layout = ({ children, seo }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SEO {...seo} />
      <Navigation />
      <main className="pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;