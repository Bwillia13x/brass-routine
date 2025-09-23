import { Check, Crown, Star, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { slugify } from '@/lib/utils';

const MembershipPreview = () => {
  const navigate = useNavigate();
  const memberships = [
    {
      name: 'Classic',
      price: '$75',
      period: '/month',
      icon: Star,
      description: 'Perfect for regular grooming maintenance',
      features: [
        '1 Classic service credit monthly',
        '10% off all services & retail',
        '48-hour priority booking',
        'Birthday service upgrade',
        'Exclusive member events',
        'Home care consultation'
      ],
      cta: 'Join Classic',
      popular: false
    },
    {
      name: 'Reserve',
      price: '$150',
      period: '/month',
      icon: Crown,
      description: 'Ultimate luxury with master barber access',
      features: [
        '2 Reserve service credits monthly',
        '15% off services, 30% off premium retail',
        'Concierge booking & priority slots',
        'Guest pass (2 per month)',
        'Complimentary product samples',
        'VIP event invitations',
        'Personal grooming regimen'
      ],
      cta: 'Join Reserve',
      popular: true
    }
  ];

  return (
    <section className="py-20 bg-ny-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-display mb-6">
            Look Sharp, Always
          </h2>
          <p className="text-body-large max-w-3xl mx-auto">
            Members get priority access, monthly credits, and private perks. 
            Reserve or Classic—your routine, simplified.
          </p>
        </div>

        {/* Membership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {memberships.map((membership, index) => (
            <div 
              key={index} 
              className={`card-luxury p-8 luxury-hover relative group animate-scale-in ${
                membership.popular ? 'ring-2 ring-brass' : ''
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {membership.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-float">
                  <div className="bg-gradient-brass text-coal px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 group-hover:animate-pulse">
                    <Crown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-brass rounded-full flex items-center justify-center group-hover:animate-pulse-brass transition-all duration-300">
                  <membership.icon className="w-8 h-8 text-coal group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-porcelain mb-2 group-hover:text-brass transition-colors">
                  {membership.name}
                </h3>
                
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="font-display text-4xl font-bold text-brass group-hover:animate-pulse">
                    {membership.price}
                  </span>
                  <span className="text-steel">{membership.period}</span>
                </div>
                
                <p className="text-muted-foreground mt-3">
                  {membership.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {membership.features.map((feature, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start space-x-3 animate-fade-in"
                    style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
                  >
                    <div className="w-5 h-5 bg-gradient-brass rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Check className="w-3 h-3 text-coal" />
                    </div>
                    <span className="text-porcelain">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full group/btn ${membership.popular ? 'btn-brass' : 'btn-outline-brass'}`}
                onClick={() => navigate(`/membership?plan=${slugify(membership.name)}`)}
              >
                <span className="group-hover/btn:animate-pulse">{membership.cta}</span>
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 text-center">
          <h3 className="font-display text-xl font-semibold text-brass mb-8">
            All Members Enjoy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-gradient-brass rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-coal" />
              </div>
              <h4 className="font-semibold text-porcelain">Exclusive Events</h4>
              <p className="text-steel text-sm text-center">
                Member-only workshops, product launches, and networking events
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-gradient-brass rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-coal" />
              </div>
              <h4 className="font-semibold text-porcelain">No Booking Fees</h4>
              <p className="text-steel text-sm text-center">
                Skip all booking and convenience fees, save on every visit
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-gradient-brass rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-coal" />
              </div>
              <h4 className="font-semibold text-porcelain">Rebook Reminders</h4>
              <p className="text-steel text-sm text-center">
                Smart notifications to maintain your optimal grooming schedule
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-steel mb-6">
            Kindly provide 12-hour notice for changes; a card on file secures your slot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in [animation-delay:1s]">
            <Button
              className="btn-brass group"
              onClick={() => navigate('/membership')}
            >
              <span className="group-hover:animate-pulse">Compare All Benefits</span>
            </Button>
            <Button
              variant="outline"
              className="btn-outline-brass group"
              onClick={() => navigate('/book')}
            >
              <span className="group-hover:animate-pulse">Try a Service First</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPreview;