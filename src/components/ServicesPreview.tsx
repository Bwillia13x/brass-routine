import { Scissors, Sparkles, HandHeart, Zap, Users } from 'lucide-react';
import { Button } from './ui/button';
import groomingToolsImage from '@/assets/grooming-tools.jpg';

const ServicesPreview = () => {
  const services = [
    {
      icon: Scissors,
      title: 'Hair',
      description: 'Precision cuts, styling, and wash ritual',
      duration: '45-60 min',
      price: 'From $85',
      includes: ['Consultation', 'Cut & Style', 'Hot Towel', 'Product Application']
    },
    {
      icon: Sparkles,
      title: 'Beard & Shave',
      description: 'Traditional straight razor and beard sculpting',
      duration: '30-45 min', 
      price: 'From $65',
      includes: ['Hot Towel Prep', 'Straight Razor', 'Beard Oil', 'Aftercare']
    },
    {
      icon: Zap,
      title: 'SkinBar',
      description: 'Mens facials, LED therapy, and skincare',
      duration: '60-90 min',
      price: 'From $120',
      includes: ['Deep Cleanse', 'LED Treatment', 'Moisturize', 'Regimen Guidance']
    },
    {
      icon: HandHeart,
      title: 'Massage',
      description: 'Relaxation and therapeutic bodywork',
      duration: '30-60 min',
      price: 'From $95',
      includes: ['Consultation', 'Targeted Therapy', 'Hot Stones', 'Aromatherapy']
    },
    {
      icon: Users,
      title: 'Wedding',
      description: 'Group packages and private lounge access',
      duration: '2-4 hours',
      price: 'Custom',
      includes: ['Private Space', 'Group Services', 'Refreshments', 'Photography']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-ny-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-6">
            Calibre · Concierge · Regimen · Members First
          </h2>
          <p className="text-body-large max-w-3xl mx-auto">
            Every service includes consultation, precision execution, and education 
            to help you maintain your look between visits.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="card-luxury p-6 luxury-hover group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-brass rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-coal" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-porcelain">
                    {service.title}
                  </h3>
                  <p className="text-steel text-sm">{service.duration}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.includes.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-porcelain">
                    <div className="w-1.5 h-1.5 bg-brass rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-between items-center">
                <span className="font-display text-lg font-semibold text-brass">
                  {service.price}
                </span>
                <Button 
                  size="sm" 
                  className="btn-brass"
                  onClick={() => window.location.href = `/book?service=${service.title.toLowerCase()}`}
                >
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Service Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={groomingToolsImage}
              alt="Premium grooming tools and brass instruments"
              className="w-full rounded-sm shadow-luxury"
            />
          </div>
          
          <div>
            <h3 className="text-display mb-6">
              The Reserve Experience
            </h3>
            <p className="text-body-large mb-6">
              Master Barber service with extended consultation, hot towel ritual, 
              and dedicated time buffer. Priority booking and concierge finish.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brass rounded-full"></div>
                <span className="text-porcelain">Master Barber (10+ years experience)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brass rounded-full"></div>
                <span className="text-porcelain">Extended 15-minute time buffer</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brass rounded-full"></div>
                <span className="text-porcelain">Signature hot towel ritual</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brass rounded-full"></div>
                <span className="text-porcelain">Priority member slots</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button className="btn-brass">
                Reserve Now
              </Button>
              <Button variant="outline" className="btn-outline-brass">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;