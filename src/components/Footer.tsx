import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from '@/hooks/use-toast';
import { siteConfig } from '@/lib/site-config';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = newsletterEmail.trim();

    if (!trimmedEmail) {
      toast({
        title: 'Email required',
        description: 'Share an email address so we can send lounge updates your way.',
        variant: 'destructive',
      });
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      toast({
        title: 'Double-check your email',
        description: "That address doesn't look quite right. Try again and we'll get you on the list.",
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: 'Welcome to the list',
        description: "You'll receive grooming intel, member perks, and lounge announcements soon.",
      });
      setNewsletterEmail('');
      setIsSubmitting(false);
    }, 400);
  };

  const addressLines = [siteConfig.address.line1, siteConfig.address.line2].filter(Boolean);

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
                  {addressLines.map((line, index) => (
                    <p key={index} className="font-medium">
                      {line}
                    </p>
                  ))}
                  <p className="text-sm text-steel">
                    {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brass flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-brass transition-colors"
                >
                  {siteConfig.contact.formattedPhone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brass mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Hours</p>
                  <ul className="text-sm text-steel space-y-1">
                    {siteConfig.hours.map((entry) => (
                      <li key={entry.days}>
                        <span className="text-porcelain">{entry.days}:</span> {entry.time}
                      </li>
                    ))}
                  </ul>
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
              <li><Link to="/services" className="hover:text-brass transition-colors">Premium Cuts</Link></li>
              <li><Link to="/services" className="hover:text-brass transition-colors">Beard &amp; Shave</Link></li>
              <li><Link to="/skinbar" className="hover:text-brass transition-colors">SkinBar Facials</Link></li>
              <li><Link to="/services" className="hover:text-brass transition-colors">Massage</Link></li>
              <li><Link to="/wedding" className="hover:text-brass transition-colors">Wedding Packages</Link></li>
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h3 className="font-display text-xl font-semibold text-brass mb-4">
              Membership
            </h3>
            <ul className="space-y-2 text-porcelain">
              <li><Link to="/membership" className="hover:text-brass transition-colors">Classic Membership</Link></li>
              <li><Link to="/reserve" className="hover:text-brass transition-colors">Reserve Tier</Link></li>
              <li><Link to="/membership" className="hover:text-brass transition-colors">Member Benefits</Link></li>
            </ul>
            <Button asChild className="btn-brass mt-4 w-full">
              <Link to="/membership">
                Join Now
              </Link>
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
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex space-x-3">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 input-luxury"
                  aria-label="Email address"
                  autoComplete="email"
                  required
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="btn-outline-brass"
                  disabled={isSubmitting}
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex space-x-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-sm bg-ny-green hover:bg-brass hover:text-coal transition-colors text-porcelain"
                  aria-label="Follow Andreas & Co. on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </form>
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
                <p className="font-display font-semibold text-brass">{siteConfig.name}</p>
                <p className="text-sm text-steel">{siteConfig.tagline}</p>
              </div>
            </div>

            <div className="flex space-x-6 text-sm text-steel">
              <Link to="/privacy" className="hover:text-brass transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brass transition-colors">Terms of Service</Link>
              <Link to="/cancellation" className="hover:text-brass transition-colors">Cancellation Policy</Link>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-steel">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Crafted with precision.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
