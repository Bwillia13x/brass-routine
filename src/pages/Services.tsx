import { Scissors, Sparkles, HandHeart, Zap, Wand2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';

const Services = () => {
  const serviceCategories = [
    {
      icon: Scissors,
      title: 'Hair Services',
      services: [
        {
          name: 'Signature Cut',
          duration: '45 min',
          price: '$85',
          description: 'Precision cut with consultation, styling, and finish ritual'
        },
        {
          name: 'Cut & Style Premium',
          duration: '60 min',
          price: '$105',
          description: 'Extended service with hot towel treatment and beard trim'
        }
      ]
    },
    {
      icon: Sparkles,
      title: 'Beard & Shave',
      services: [
        {
          name: 'Traditional Shave',
          duration: '30 min',
          price: '$65',
          description: 'Hot towel prep, straight razor shave, aftercare balm'
        },
        {
          name: 'Beard Sculpting',
          duration: '45 min',
          price: '$75',
          description: 'Precision trimming, shaping, and premium beard oil treatment'
        }
      ]
    },
    {
      icon: Zap,
      title: 'SkinBar',
      services: [
        {
          name: 'Gentleman\'s Facial',
          duration: '60 min',
          price: '$120',
          description: 'Deep cleanse, exfoliation, mask, and moisturizer application'
        },
        {
          name: 'LED Light Therapy',
          duration: '30 min',
          price: '$85',
          description: 'Advanced LED treatment for skin rejuvenation and healing'
        }
      ]
    },
    {
      icon: HandHeart,
      title: 'Massage',
      services: [
        {
          name: 'Relaxation Massage',
          duration: '60 min',
          price: '$125',
          description: 'Full body therapeutic massage with aromatherapy'
        },
        {
          name: 'Head & Neck Focus',
          duration: '30 min',
          price: '$75',
          description: 'Targeted relief for tension and stress points'
        }
      ]
    },
    {
      icon: Wand2,
      title: 'Waxing',
      services: [
        {
          name: 'Eyebrow Shaping',
          duration: '15 min',
          price: '$35',
          description: 'Professional eyebrow grooming and shaping'
        },
        {
          name: 'Nose/Ear Hair',
          duration: '15 min',
          price: '$25',
          description: 'Discreet and comfortable grooming service'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-hero mb-6">
              Our Services
            </h1>
            <p className="text-body-large max-w-3xl mx-auto">
              Every service includes expert consultation, precision execution, 
              and education to help you maintain your look between visits.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-16">
            {serviceCategories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-brass rounded-sm flex items-center justify-center">
                    <category.icon className="w-8 h-8 text-coal" />
                  </div>
                  <h2 className="font-display text-3xl font-semibold text-porcelain">
                    {category.title}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="card-luxury p-6 luxury-hover">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-display text-xl font-semibold text-porcelain mb-2">
                            {service.name}
                          </h3>
                          <p className="text-steel text-sm">{service.duration}</p>
                        </div>
                        <span className="font-display text-lg font-semibold text-brass">
                          {service.price}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      
                      <Button 
                        className="btn-brass w-full"
                        onClick={() => window.location.href = `/book?service=${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        Book {service.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center card-luxury p-8">
            <h3 className="font-display text-2xl font-semibold text-brass mb-4">
              Not Sure Which Service?
            </h3>
            <p className="text-muted-foreground mb-6">
              Book a consultation with our master stylists to create a personalized grooming plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-brass">
                Book Consultation
              </Button>
              <Button variant="outline" className="btn-outline-brass">
                View Membership Benefits
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;