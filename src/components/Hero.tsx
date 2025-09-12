import { Calendar, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import heroLoungeImage from '@/assets/hero-lounge.jpg';

const Hero = () => {
  const calibreMarkers = [
    { icon: Check, text: 'Expert Consultation' },
    { icon: Check, text: 'Signature Finish Ritual' },
    { icon: Check, text: 'Two-Tap Booking' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroLoungeImage}
          alt="Andreas & Co. luxury grooming lounge interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-coal/75 backdrop-blur-sm"></div>
      </div>

      {/* Art Deco Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-brass/20 via-transparent to-ny-green/20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="deco-frame max-w-4xl mx-auto">
          
          {/* Main Logo */}
          <div className="mb-8 animate-fade-in">
            <img 
              src="/lovable-uploads/b046a3c5-1c1b-45b4-bec5-34fe783f8f54.png" 
              alt="Andreas & Co. Grooming Lounge"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-6 hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Main Headline */}
          <h1 className="text-hero mb-6 animate-slide-up">
            Measured. Mastered. Yours.
          </h1>
          
          {/* Subheadline */}
          <p className="text-body-large max-w-3xl mx-auto mb-8 animate-fade-in [animation-delay:0.3s]">
            New-York calibre, Calgary address. Precision cuts, SkinBar facials, 
            and a finish ritual you can repeat at home.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in [animation-delay:0.6s]">
            <Button 
              className="btn-brass text-lg px-10 py-6 group"
              onClick={() => window.location.href = '/book'}
            >
              <Calendar className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Book in Two Taps
            </Button>
            <Button 
              variant="outline" 
              className="btn-outline-brass text-lg px-10 py-6 group"
              onClick={() => window.location.href = '/services'}
            >
              Explore Services
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Calibre Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {calibreMarkers.map((marker, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center space-x-3 animate-fade-in interactive-hover group"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-brass flex items-center justify-center flex-shrink-0 group-hover:animate-pulse-brass">
                  <marker.icon className="w-4 h-4 text-coal group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-medium text-porcelain group-hover:text-brass transition-colors">{marker.text}</span>
              </div>
            ))}
          </div>

          {/* Premium Badge */}
          <div className="mt-12 inline-flex items-center space-x-2 px-6 py-3 bg-ny-green/80 border border-brass/30 rounded-sm backdrop-blur-sm">
            <div className="w-6 h-6 rounded-full bg-gradient-brass flex items-center justify-center">
              <span className="font-display font-bold text-coal text-xs">A&Co</span>
            </div>
            <span className="text-brass font-medium">Calgary's Premier Grooming Lounge</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in [animation-delay:1.2s]">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;