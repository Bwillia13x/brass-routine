import { Check, Crown, Star, Gift, Phone, ShieldCheck, Sparkles, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import PageSection from '../components/PageSection';

const Membership = () => {
  const memberships = [
    {
      name: 'Classic',
      price: '$75',
      period: '/month',
      icon: Star,
      description: 'Perfect for regular grooming maintenance with priority perks.',
      features: [
        '1 Classic service credit monthly (rollover up to 2)',
        '10% off all additional services',
        '10% off retail products',
        '48-hour priority booking window',
        'Birthday service upgrade to Reserve tier',
        'Exclusive member events and workshops',
        'Complimentary home care consultation',
        'No booking or convenience fees',
      ],
      savings: 'Save $25+ monthly vs. regular pricing',
      cta: 'Join Classic Membership',
      popular: false,
    },
    {
      name: 'Reserve',
      price: '$150',
      period: '/month',
      icon: Crown,
      description: 'Ultimate luxury with master barber access, guest privileges, and concierge support.',
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
        'Hot towel ritual included in all services',
      ],
      savings: 'Save $65+ monthly vs. regular pricing',
      cta: 'Join Reserve Membership',
      popular: true,
    },
  ];

  const memberHighlights = [
    {
      icon: Calendar,
      title: 'Priority access',
      description: 'Members book the most coveted time slots first and receive proactive reminders.',
    },
    {
      icon: ShieldCheck,
      title: 'Predictable spend',
      description: 'Credits roll over and include member-exclusive pricing on every additional service.',
    },
    {
      icon: Sparkles,
      title: 'Community & events',
      description: 'Private launches, workshops, and networking evenings designed around your interests.',
    },
  ];

  const faqs = [
    {
      question: 'How do service credits work?',
      answer: 'Credits can be used for any service of equal or lesser value. Unused credits roll over (Classic: up to 2, Reserve: up to 3) and never expire as long as membership is active.',
    },
    {
      question: 'Can I upgrade or downgrade my membership?',
      answer: 'Yes, you can change your membership tier at any time. Changes take effect on your next billing cycle.',
    },
    {
      question: 'What happens if I need to cancel?',
      answer: 'Memberships can be cancelled with 30 days notice. Any remaining credits can be used within 60 days of cancellation.',
    },
    {
      question: 'Are there any additional fees?',
      answer: 'No booking fees, convenience fees, or hidden charges. Members enjoy transparent pricing with exclusive discounts.',
    },
  ];

  return (
    <Layout>
      <PageHero
        eyebrow="Membership"
        title="Look sharp, always"
        description="Monthly credits, priority booking, and private lounge privileges. Choose the membership cadence that matches your routine."
        actions={(
          <>
            <Button className="btn-brass" onClick={() => window.location.href = '/book?service=consultation'}>
              Meet the team first
            </Button>
            <Button variant="outline" className="btn-outline-brass" onClick={() => window.location.href = '/book'}>
              Book with credits
            </Button>
          </>
        )}
      />

      <PageSection
        eyebrow="Membership Tiers"
        title="Choose the routine that matches your cadence"
        description="Both tiers include member communication, rollover credits, and concierge scheduling. Reserve adds master barber access, guest privileges, and extended rituals."
        tone="muted"
        contentClassName="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {memberships.map((membership, index) => (
          <div
            key={index}
            className={`surface-panel p-8 flex flex-col gap-6 relative ${
              membership.popular ? 'ring-2 ring-brass shadow-brass' : ''
            }`}
          >
            {membership.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-brass text-coal px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-brass flex items-center justify-center shadow-brass/30">
                <membership.icon className="w-10 h-10 text-coal" />
              </div>
              <h3 className="font-display text-3xl font-bold text-porcelain">
                {membership.name} Membership
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-bold text-brass">
                  {membership.price}
                </span>
                <span className="text-steel text-lg">{membership.period}</span>
              </div>
              <p className="text-muted-foreground">
                {membership.description}
              </p>
              <span className="inline-flex items-center justify-center px-4 py-2 bg-ny-green/50 border border-brass/20 rounded-full text-sm text-brass">
                {membership.savings}
              </span>
            </div>

            <ul className="space-y-4 text-sm text-porcelain">
              {membership.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-brass flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-coal" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full text-lg py-4 ${membership.popular ? 'btn-brass' : 'btn-outline-brass'}`}
              onClick={() => window.location.href = `/book?membership=${membership.name.toLowerCase()}`}
            >
              {membership.cta}
            </Button>
          </div>
        ))}
      </PageSection>

      <PageSection
        eyebrow="Member Experience"
        title="What membership feels like"
        description="Beyond monthly services, membership keeps you ready for boardrooms, travel, and celebrations."
        align="center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memberHighlights.map((highlight, index) => (
            <div key={index} className="surface-panel p-6 space-y-3 text-left md:text-center">
              <div className="w-12 h-12 mx-0 md:mx-auto rounded-full bg-gradient-brass flex items-center justify-center shadow-brass/30">
                <highlight.icon className="w-6 h-6 text-coal" />
              </div>
              <h4 className="font-display text-xl font-semibold text-porcelain">
                {highlight.title}
              </h4>
              <p className="text-steel text-sm leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="All Members Enjoy"
        title="Privileges included with every tier"
        align="center"
        tone="surface"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center">
              <Gift className="w-6 h-6 text-coal" />
            </div>
            <h4 className="font-semibold text-porcelain">Exclusive Events</h4>
            <p className="text-steel text-sm">
              Member-only workshops, product launches, and networking evenings.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center">
              <Check className="w-6 h-6 text-coal" />
            </div>
            <h4 className="font-semibold text-porcelain">No Hidden Fees</h4>
            <p className="text-steel text-sm">
              Skip booking and convenience fees on every visit.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center">
              <Star className="w-6 h-6 text-coal" />
            </div>
            <h4 className="font-semibold text-porcelain">Smart Reminders</h4>
            <p className="text-steel text-sm">
              Maintain your cadence with tailored reminders and follow-up notes.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center">
              <Phone className="w-6 h-6 text-coal" />
            </div>
            <h4 className="font-semibold text-porcelain">Priority Support</h4>
            <p className="text-steel text-sm">
              Dedicated line direct to the lounge for rescheduling or concierge requests.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Membership FAQs"
        title="Everything you need to know"
        description="Still deciding? These are the questions we answer most when new members join."
        align="center"
        contentClassName="space-y-6"
      >
        {faqs.map((faq, index) => (
          <div key={index} className="surface-panel p-6 text-left space-y-3">
            <h4 className="font-semibold text-porcelain text-lg">
              {faq.question}
            </h4>
            <p className="text-muted-foreground">
              {faq.answer}
            </p>
          </div>
        ))}
      </PageSection>

      <PageSection
        eyebrow="Ready to join?"
        title="Experience the lounge before you commit"
        description="Start with a single service, feel the difference, then activate the membership that keeps you ready for whatever the week delivers."
        align="center"
        tone="surface"
        actions={(
          <>
            <Button className="btn-brass" onClick={() => window.location.href = '/membership?plan=reserve'}>
              Join membership
            </Button>
            <Button variant="outline" className="btn-outline-brass" onClick={() => window.location.href = '/book'}>
              Try a service first
            </Button>
          </>
        )}
      />
    </Layout>
  );
};

export default Membership;
