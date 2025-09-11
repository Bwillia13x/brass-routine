import { MapPin, Phone, Clock, Instagram, Mail } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-coal border-t border-brass/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl font-semibold text-brass mb-4">
              Visit Us
            </h3>
            <div className="space-y-3 text-porcelain">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brass mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">[INSERT ADDRESS]</p>
                  <p className="text-sm text-steel">Calgary, AB</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brass flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="hover:text-brass transition-colors"
                >
                  [INSERT PHONE]
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brass mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-sm text-steel">[INSERT HOURS]</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-xl font-semibold text-brass mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-porcelain">
              <li><a href="/services" className="hover:text-brass transition-colors">Premium Cuts</a></li>
              <li><a href="/services" className="hover:text-brass transition-colors">Beard & Shave</a></li>
              <li><a href="/skinbar" className="hover:text-brass transition-colors">SkinBar Facials</a></li>
              <li><a href="/services" className="hover:text-brass transition-colors">Massage</a></li>
              <li><a href="/wedding" className="hover:text-brass transition-colors">Wedding Packages</a></li>
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h3 className="font-display text-xl font-semibold text-brass mb-4">
              Membership
            </h3>
            <ul className="space-y-2 text-porcelain">
              <li><a href="/membership" className="hover:text-brass transition-colors">Classic Membership</a></li>
              <li><a href="/reserve" className="hover:text-brass transition-colors">Reserve Tier</a></li>
              <li><a href="/membership" className="hover:text-brass transition-colors">Member Benefits</a></li>
            </ul>
            <Button 
              className="btn-brass mt-4 w-full"
              onClick={() => window.location.href = '/membership'}
            >
              Join Now
            </Button>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="font-display text-xl font-semibold text-brass mb-4">
              Stay Connected
            </h3>
            <p className="text-steel text-sm mb-4">
              Get grooming tips, exclusive offers, and booking reminders.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent"
                />
                <Button variant="outline" className="btn-outline-brass">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex space-x-3">
                <a 
                  href="https://instagram.com/[INSERT HANDLE]"
                  className="p-2 rounded-sm bg-ny-green hover:bg-brass hover:text-coal transition-colors text-porcelain"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-brass/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              {/* Logo */}
              <img 
                src="/lovable-uploads/b046a3c5-1c1b-45b4-bec5-34fe783f8f54.png" 
                alt="Andreas & Co. Grooming Lounge"
                className="h-12 w-12"
              />
              <div>
                <p className="font-display font-semibold text-brass">Andreas & Co.</p>
                <p className="text-sm text-steel">Grooming Lounge</p>
              </div>
            </div>
            
            <div className="flex space-x-6 text-sm text-steel">
              <a href="/privacy" className="hover:text-brass transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-brass transition-colors">Terms of Service</a>
              <a href="/cancellation" className="hover:text-brass transition-colors">Cancellation Policy</a>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-steel">
            <p>&copy; 2024 Andreas & Co. Grooming Lounge. Crafted with precision.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;