import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Calendar, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

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
              className="flex items-center hover:opacity-80 transition-all duration-300 magnetic-hover group"
            >
              <img 
                src="/lovable-uploads/b046a3c5-1c1b-45b4-bec5-34fe783f8f54.png" 
                alt="Andreas & Co. Grooming Lounge"
                className="h-12 w-12 md:h-14 md:w-14 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(199,164,90,0.4)]"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `font-medium transition-all duration-300 link-underline hover:text-brass relative group animate-fade-in ${
                    isActive 
                      ? 'text-brass' 
                      : 'text-porcelain'
                  }`
                }
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="group-hover:tracking-wide transition-all duration-300">{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              className="btn-outline-brass group magnetic-hover animate-slide-in-left [animation-delay:0.8s]"
              onClick={() => window.open('tel:+1234567890')}
            >
              <Phone className="w-4 h-4 mr-2 group-hover:animate-bounce-subtle group-hover:rotate-12 transition-all duration-300" />
              <span className="group-hover:tracking-wide transition-all duration-300">Call</span>
            </Button>
            
            {user ? (
              <>
                <span className="text-porcelain text-sm">
                  Welcome, {profile?.first_name || user.email?.split('@')[0]}
                </span>
                <Button 
                  variant="outline"
                  size="sm"
                  className="btn-outline-brass group"
                  onClick={signOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                <Button 
                  className="btn-brass group magnetic-hover animate-slide-in-right [animation-delay:1s]"
                  onClick={() => navigate('/book')}
                >
                  <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="group-hover:tracking-wide transition-all duration-300">Book Now</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline"
                  size="sm"
                  className="btn-outline-brass group"
                  onClick={() => navigate('/auth')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  className="btn-brass group magnetic-hover animate-slide-in-right [animation-delay:1s]"
                  onClick={() => navigate('/auth')}
                >
                  <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="group-hover:tracking-wide transition-all duration-300">Book Now</span>
                </Button>
              </>
            )}
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
              
              {user ? (
                <>
                  <div className="text-porcelain text-sm text-center">
                    Welcome, {profile?.first_name || user.email?.split('@')[0]}
                  </div>
                  <Button 
                    variant="outline"
                    className="btn-outline-brass w-full"
                    onClick={signOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                  <Button 
                    className="btn-brass w-full"
                    onClick={() => navigate('/book')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    className="btn-outline-brass w-full"
                    onClick={() => navigate('/auth')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button 
                    className="btn-brass w-full"
                    onClick={() => navigate('/auth')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Sign Up & Book
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;