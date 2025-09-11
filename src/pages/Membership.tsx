import { Check, Crown, Star, Gift, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';

const Membership = () => {
  const memberships = [
    {
      name: 'Classic',
      price: '$75',
      period: '/month',
      icon: Star,
      description: 'Perfect for regular grooming maintenance with priority perks',
      features: [
        '1 Classic service credit monthly (rollover up to 2)',
        '10% off all additional services',
        '10% off retail products',
        '48-hour priority booking window',
        'Birthday service upgrade to Reserve tier',
        'Exclusive member events and workshops',
        'Complimentary home care consultation',
        'No booking or convenience fees'
      ],
      savings: 'Save $25+ monthly vs. regular pricing',
      cta: 'Join Classic Membership',
      popular: false
    },
    {
      name: 'Reserve',
      price: '$150',
      period: '/month',
      icon: Crown,
      description: 'Ultimate luxury experience with master barber access and VIP treatment',
      features: [
        '2 Reserve service credits monthly (rollover up to 3)',
        '15% off all additional services',
        '30% off premium retail products',
        'Concierge booking with priority slots',
        'Guest pass privileges (2 per month)',
        'Complimentary product samples quarterly',
        'VIP event invitations and private sessions',
        'Personal grooming regimen development',
        'Extended consultation time with master barbers',
        'Hot towel ritual included in all services'
      ],
      savings: 'Save $65+ monthly vs. regular pricing',
      cta: 'Join Reserve Membership',
      popular: true
    }
  ];

  const faqs = [
    {
      question: 'How do service credits work?',
      answer: 'Credits can be used for any service of equal or lesser value. Unused credits roll over (Classic: up to 2, Reserve: up to 3) and never expire as long as membership is active.'
    },
    {
      question: 'Can I upgrade or downgrade my membership?',
      answer: 'Yes, you can change your membership tier at any time. Changes take effect on your next billing cycle.'
    },
    {
      question: 'What happens if I need to cancel?',
      answer: 'Memberships can be cancelled with 30 days notice. Any remaining credits can be used within 60 days of cancellation.'
    },
    {
      question: 'Are there any additional fees?',
      answer: 'No booking fees, convenience fees, or hidden charges. Members enjoy transparent pricing with exclusive discounts.'
    }
  ];

  return (
    <Layout>
      <div className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-hero mb-6">
              Membership
            </h1>
            <p className="text-body-large max-w-3xl mx-auto">
              Look sharp, always. Members get priority access, monthly credits, 
              and private perks. Your routine, simplified.
            </p>
          </div>

          {/* Membership Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
            {memberships.map((membership, index) => (
              <div 
                key={index} 
                className={`card-luxury p-8 luxury-hover relative ${
                  membership.popular ? 'ring-2 ring-brass scale-105' : ''
                }`}
              >
                {membership.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-brass text-coal px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Crown className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-brass rounded-full flex items-center justify-center">
                    <membership.icon className="w-10 h-10 text-coal" />
                  </div>
                  
                  <h3 className="font-display text-3xl font-bold text-porcelain mb-3">
                    {membership.name} Membership
                  </h3>
                  
                  <div className="flex items-baseline justify-center space-x-1 mb-3">
                    <span className="font-display text-5xl font-bold text-brass">
                      {membership.price}
                    </span>
                    <span className="text-steel text-lg">{membership.period}</span>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {membership.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="text-center mb-6">
                    <span className="bg-gradient-brass text-coal px-4 py-2 rounded-full text-sm font-semibold">
                      {membership.savings}
                    </span>
                  </div>
                  
                  <ul className="space-y-4">
                    {membership.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-gradient-brass rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-coal" />
                        </div>
                        <span className="text-porcelain text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full text-lg py-4 ${membership.popular ? 'btn-brass' : 'btn-outline-brass'}`}
                  onClick={() => window.location.href = `/book?membership=${membership.name.toLowerCase()}`}
                >
                  {membership.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="text-center mb-16">
            <h3 className="font-display text-2xl font-semibold text-brass mb-8">
              All Members Enjoy
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-brass rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-coal" />
                </div>
                <h4 className="font-semibold text-porcelain mb-2">Exclusive Events</h4>
                <p className="text-steel text-sm">
                  Member-only workshops, product launches, and networking
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-brass rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-coal" />
                </div>
                <h4 className="font-semibold text-porcelain mb-2">No Hidden Fees</h4>
                <p className="text-steel text-sm">
                  Skip booking and convenience fees on every visit
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-brass rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-coal" />
                </div>
                <h4 className="font-semibold text-porcelain mb-2">Smart Reminders</h4>
                <p className="text-steel text-sm">
                  Optimal grooming schedule notifications
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-brass rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-coal" />
                </div>
                <h4 className="font-semibold text-porcelain mb-2">Priority Support</h4>
                <p className="text-steel text-sm">
                  Dedicated member service line
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="font-display text-2xl font-semibold text-brass text-center mb-12">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="card-luxury p-6">
                  <h4 className="font-semibold text-porcelain mb-3 text-lg">
                    {faq.question}
                  </h4>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="card-luxury p-8 max-w-2xl mx-auto">
              <h3 className="font-display text-2xl font-semibold text-brass mb-4">
                Ready to Join?
              </h3>
              <p className="text-muted-foreground mb-6">
                Start with a single service to experience our calibre, 
                then upgrade to membership for ongoing benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-brass">
                  Join Membership
                </Button>
                <Button variant="outline" className="btn-outline-brass">
                  Try a Service First
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Membership;