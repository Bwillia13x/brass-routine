import { Scissors, Sparkles, HandHeart, Zap, Wand2, ShieldCheck, Feather, Sparkle, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import PageSection from '../components/PageSection';
import { slugify } from '@/lib/utils';

const Services = () => {
  const navigate = useNavigate();
  const serviceCategories = [
    {
      icon: Scissors,
      title: 'Hair Services',
      summary: 'Tailored cuts, styling, and rituals to keep your silhouette sharp between visits.',
      services: [
        {
          name: 'Signature Cut',
          duration: '45 min',
          price: '$85',
          description: 'Precision cut with consultation, styling, and finish ritual.',
        },
        {
          name: 'Cut & Style Premium',
          duration: '60 min',
          price: '$105',
          description: 'Extended service with hot towel treatment and beard refinement.',
        },
      ],
    },
    {
      icon: Sparkles,
      title: 'Beard & Shave',
      summary: 'Traditional straight razor rituals and sculpting tailored to your features.',
      services: [
        {
          name: 'Traditional Shave',
          duration: '30 min',
          price: '$65',
          description: 'Hot towel prep, straight razor shave, and restorative aftercare balm.',
        },
        {
          name: 'Beard Sculpting',
          duration: '45 min',
          price: '$75',
          description: 'Precision trimming, shaping, and premium beard oil treatment.',
        },
      ],
    },
    {
      icon: Zap,
      title: 'SkinBar',
      summary: 'Mens facials and LED therapies designed around Calgary’s climate and your skin goals.',
      services: [
        {
          name: "Gentleman's Facial",
          duration: '60 min',
          price: '$120',
          description: 'Deep cleanse, exfoliation, mask, and moisturizer application.',
        },
        {
          name: 'LED Light Therapy',
          duration: '30 min',
          price: '$85',
          description: 'Advanced LED treatment for skin rejuvenation and recovery.',
        },
      ],
    },
    {
      icon: HandHeart,
      title: 'Massage',
      summary: 'Targeted bodywork to reset posture, relieve tension, and restore balance.',
      services: [
        {
          name: 'Relaxation Massage',
          duration: '60 min',
          price: '$125',
          description: 'Full body therapeutic massage with aromatherapy accents.',
        },
        {
          name: 'Head & Neck Focus',
          duration: '30 min',
          price: '$75',
          description: 'Targeted relief for tension, jet lag, and screen time stress.',
        },
      ],
    },
    {
      icon: Wand2,
      title: 'Waxing',
      summary: 'Refined finishing services for brows, nose, and detailing maintenance.',
      services: [
        {
          name: 'Eyebrow Shaping',
          duration: '15 min',
          price: '$35',
          description: 'Professional eyebrow grooming and shaping with precision.',
        },
        {
          name: 'Nose/Ear Hair',
          duration: '15 min',
          price: '$25',
          description: 'Discreet and comfortable grooming for finishing touches.',
        },
      ],
    },
  ];

  const experienceHighlights = [
    {
      icon: Feather,
      title: 'Signature finish ritual',
      description: 'We teach the technique and products required to recreate your look on demand.',
    },
    {
      icon: ShieldCheck,
      title: 'Consultation-first approach',
      description: 'Every appointment begins with a conversation about lifestyle, growth patterns, and goals.',
    },
    {
      icon: Sparkle,
      title: 'Art Deco lounge atmosphere',
      description: 'Relax into curated playlists, proper espresso, and brass accents inspired by NYC.',
    },
  ];

  return (
    <Layout 
      seo={{
        title: "Services - Andreas & Co. | Premium Men's Grooming Calgary",
        description: "Discover precision cuts, SkinBar facials, traditional shaves, and massage therapy at Andreas & Co. Premium men's grooming services in Calgary.",
        keywords: "mens haircut Calgary, barber shop Calgary, SkinBar facial, traditional shave, beard sculpting, mens grooming services",
        type: "service"
      }}
    >
      <PageHero
        eyebrow="Services"
        title="The Andreas & Co. service menu"
        description="Precision grooming, skincare, and rituals designed for modern professionals in Calgary."
        actions={(
          <>
            <Button
              className="btn-brass"
              onClick={() => navigate('/book')}
            >
              Book an appointment
            </Button>
            <Button
              variant="outline"
              className="btn-outline-brass"
              onClick={() => navigate('/membership')}
            >
              Explore membership
            </Button>
          </>
        )}
      />

      <PageSection
        eyebrow="Service Menu"
        title="Calibrated for your routine"
        description="Explore curated services led by master barbers, estheticians, and massage therapists. Each visit combines consultation, craftsmanship, and education so you can maintain the finish between appointments."
        tone="muted"
        contentClassName="space-y-16"
      >
        {serviceCategories.map((category, index) => (
          <div key={index} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-brass rounded-sm flex items-center justify-center shadow-brass/50">
                  <category.icon className="w-8 h-8 text-coal" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-semibold text-porcelain">
                    {category.title}
                  </h3>
                  <p className="text-steel text-sm md:max-w-2xl">
                    {category.summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.services.map((service, serviceIndex) => (
                <div
                  key={serviceIndex}
                  className="surface-panel p-6 flex flex-col gap-6 h-full"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display text-2xl font-semibold text-porcelain">
                          {service.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-steel mt-1">
                          <Clock className="w-4 h-4 text-brass" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <span className="font-display text-xl font-semibold text-brass">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-4">
                      {service.description}
                    </p>
                  </div>
                  <Button
                    className="btn-brass w-full justify-center group"
                    onClick={() => navigate(`/book?service=${slugify(service.name)}`)}
                  >
                    Book {service.name}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </PageSection>

      <PageSection
        eyebrow="Experience"
        title="Every appointment includes"
        description="From the first consultation to the last product recommendation, we obsess over the full routine so you walk out prepared for the week ahead."
        align="center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experienceHighlights.map((highlight, index) => (
            <div key={index} className="surface-panel p-6 text-left md:text-center space-y-4">
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
        eyebrow="Need guidance?"
        title="Not sure which service fits?"
        description="Start with a consultation or experience a single service before joining the membership tier that fits your routine."
        align="center"
        tone="surface"
        actions={(
          <>
            <Button className="btn-brass" onClick={() => navigate('/book?service=consultation')}>
              Book consultation
            </Button>
            <Button variant="outline" className="btn-outline-brass" onClick={() => navigate('/membership')}>
              Compare membership benefits
            </Button>
          </>
        )}
      >
        <p className="text-steel text-sm text-center max-w-2xl mx-auto">
          Members enjoy priority scheduling, rollover credits, and concierge rescheduling when life demands flexibility.
        </p>
      </PageSection>
    </Layout>
  );
};

export default Services;
