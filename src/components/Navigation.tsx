import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Reserve', href: '/reserve' },
    { name: 'Membership', href: '/membership' },
    { name: 'SkinBar', href: '/skinbar' },
    { name: 'Wedding', href: '/wedding' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-coal/95 backdrop-blur-sm border-b border-brass/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink 
              to="/" 
              className="flex items-center hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <img 
                src="/lovable-uploads/b046a3c5-1c1b-45b4-bec5-34fe783f8f54.png" 
                alt="Andreas & Co. Grooming Lounge"
                className="h-12 w-12 md:h-14 md:w-14 transition-transform duration-300"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `font-medium transition-all duration-300 link-underline hover:text-brass ${
                    isActive 
                      ? 'text-brass' 
                      : 'text-porcelain'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              className="btn-outline-brass group"
              onClick={() => window.open('tel:+1234567890')}
            >
              <Phone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              Call
            </Button>
            <Button 
              className="btn-brass group"
              onClick={() => window.location.href = '/book'}
            >
              <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span className="group-hover:animate-pulse">Book Now</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-porcelain hover:text-brass p-2 rounded-sm transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-coal/98 backdrop-blur-sm border-t border-brass/20">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors ${
                    isActive 
                      ? 'text-brass border-l-2 border-brass pl-3' 
                      : 'text-porcelain hover:text-brass'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 space-y-3">
              <Button 
                variant="outline" 
                className="btn-outline-brass w-full"
                onClick={() => window.open('tel:+1234567890')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
              <Button 
                className="btn-brass w-full"
                onClick={() => window.location.href = '/book'}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;