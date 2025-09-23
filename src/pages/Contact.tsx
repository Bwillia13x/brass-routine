import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, CalendarCheck, UsersRound, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import PageSection from '../components/PageSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) throw error;

      toast({
        title: 'Message Sent!',
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'input-luxury w-full';

  return (
    <Layout>
      <PageHero
        eyebrow="Visit the lounge"
        title="Book a visit or plan a private experience"
        description="We are located in the heart of Calgary. Call, write, or drop by to feel the Andreas & Co. atmosphere in person."
        align="left"
        actions={(
          <>
            <Button className="btn-brass" onClick={() => window.location.href = '/book'}>
              Book an appointment
            </Button>
            <Button variant="outline" className="btn-outline-brass" onClick={() => window.open('tel:+1234567890')}>
              Call the lounge
            </Button>
          </>
        )}
      />

      <PageSection
        eyebrow="Connect with us"
        title="Concierge team hours & details"
        description="Reserve members receive direct concierge access and valet on arrival. Classic members enjoy priority responses during operating hours."
        tone="muted"
        contentClassName="grid grid-cols-1 lg:grid-cols-5 gap-8"
      >
        <div className="surface-panel p-8 space-y-6 lg:col-span-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brass mb-6">Contact Information</h2>
            <div className="space-y-5 text-porcelain">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-coal" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">[INSERT ADDRESS]</p>
                  <p className="text-muted-foreground">Calgary, AB [POSTAL CODE]</p>
                  <p className="text-steel text-sm mt-2">Premium parking available. Valet service for Reserve members.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-coal" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+1234567890" className="text-brass hover:text-brass/80 transition-colors text-lg">
                    [INSERT PHONE]
                  </a>
                  <p className="text-steel text-sm mt-1">Members have priority phone support.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-coal" />
                </div>
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Monday - Friday: [INSERT HOURS]</p>
                    <p>Saturday: [INSERT HOURS]</p>
                    <p>Sunday: [INSERT HOURS]</p>
                  </div>
                  <p className="text-steel text-sm mt-2">Extended hours available for Reserve members.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-coal" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:info@andreasandco.ca" className="text-brass hover:text-brass/80 transition-colors">
                    info@andreasandco.ca
                  </a>
                  <p className="text-steel text-sm mt-1">For general inquiries and membership questions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="btn-brass w-full" onClick={() => window.location.href = '/book'}>
              Book appointment
            </Button>
            <Button
              variant="outline"
              className="btn-outline-brass w-full"
              onClick={() => window.open('https://maps.google.com/?q=[INSERT ADDRESS]')}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get directions
            </Button>
          </div>
        </div>

        <div className="surface-panel p-8 lg:col-span-3">
          <h2 className="font-display text-2xl font-semibold text-brass mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-porcelain font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-porcelain font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-porcelain font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-porcelain font-medium mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            <div>
              <label className="block text-porcelain font-medium mb-2">Subject</label>
              <select
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select a subject</option>
                <option value="booking">Booking Question</option>
                <option value="membership">Membership Inquiry</option>
                <option value="services">Services Information</option>
                <option value="wedding">Wedding Package</option>
                <option value="general">General Question</option>
              </select>
            </div>

            <div>
              <label className="block text-porcelain font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleInputChange}
                className={`${inputClass} resize-none`}
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <Button type="submit" className="btn-brass w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Concierge services"
        title="Design the visit that fits your occasion"
        description="From express drop-ins to private lounge takeovers, our team can tailor the experience."
        align="center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="surface-panel p-6 space-y-3 text-left md:text-center">
            <div className="w-12 h-12 mx-0 md:mx-auto rounded-full bg-gradient-brass flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-coal" />
            </div>
            <h4 className="font-display text-xl font-semibold text-porcelain">Private bookings</h4>
            <p className="text-steel text-sm">Reserve the lounge for weddings, team offsites, or client hospitality.</p>
          </div>
          <div className="surface-panel p-6 space-y-3 text-left md:text-center">
            <div className="w-12 h-12 mx-0 md:mx-auto rounded-full bg-gradient-brass flex items-center justify-center">
              <UsersRound className="w-6 h-6 text-coal" />
            </div>
            <h4 className="font-display text-xl font-semibold text-porcelain">Group experiences</h4>
            <p className="text-steel text-sm">Coordinate multi-chair bookings with refreshments and photography add-ons.</p>
          </div>
          <div className="surface-panel p-6 space-y-3 text-left md:text-center">
            <div className="w-12 h-12 mx-0 md:mx-auto rounded-full bg-gradient-brass flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-coal" />
            </div>
            <h4 className="font-display text-xl font-semibold text-porcelain">Concierge support</h4>
            <p className="text-steel text-sm">Dedicated point of contact for itinerary changes, travel delays, or valet requests.</p>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Find us"
        title="Visit the lounge"
        align="center"
        tone="contrast"
      >
        <div className="surface-panel p-2 bg-transparent">
          <div className="bg-ny-green/60 rounded-xl h-96 flex items-center justify-center text-center px-6">
            <div>
              <MapPin className="w-12 h-12 text-brass mx-auto mb-4" />
              <p className="text-porcelain font-medium mb-2">Interactive map coming soon</p>
              <p className="text-steel text-sm mb-4">Our Google Maps integration will live here. Until then, tap below for directions.</p>
              <Button
                className="btn-outline-brass"
                onClick={() => window.open('https://maps.google.com/?q=[INSERT ADDRESS]')}
              >
                View on Google Maps
              </Button>
            </div>
          </div>
        </div>
      </PageSection>
    </Layout>
  );
};

export default Contact;
