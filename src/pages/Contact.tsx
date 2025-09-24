import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Clock, Mail, Navigation, CalendarCheck, UsersRound, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import PageSection from '../components/PageSection';
import { submitContactMessage } from '@/integrations/supabase/service';
import { siteConfig } from '@/lib/site-config';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .refine((value) => value === '' || /^[0-9+().\-\s]*$/.test(value), 'Enter a valid phone number'),
  subject: z.string().min(1, 'Select a subject'),
  message: z.string().min(10, 'Please share a few details so our team can assist you.'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const navigate = useNavigate();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const result = await submitContactMessage({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone.trim() === '' ? undefined : values.phone.trim(),
      subject: values.subject,
      message: values.message,
    });

    if (result.success === false) {
      toast({
        title: 'Unable to send message',
        description: result.error,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Message Sent!',
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    form.reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const inputClass = 'input-luxury w-full';
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Layout 
      seo={{
        title: "Contact Us - Andreas & Co. | Calgary Grooming Lounge",
        description: "Contact Andreas & Co. Calgary for appointments, membership information, and inquiries. Located in the heart of Calgary.",
        keywords: "contact Calgary barber, Andreas Co location, grooming lounge Calgary contact",
        type: "website"
      }}
    >
      <PageHero
        eyebrow="Visit the lounge"
        title="Book a visit or plan a private experience"
        description="We are located in the heart of Calgary. Call, write, or drop by to feel the Andreas & Co. atmosphere in person."
        align="left"
        actions={(
          <>
            <Button className="btn-brass" onClick={() => navigate('/book')}>
              Book an appointment
            </Button>
            <Button variant="outline" className="btn-outline-brass" onClick={() => window.open(`tel:${siteConfig.contact.phone}`)}>
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
                  <p className="text-muted-foreground">{siteConfig.address.line1}</p>
                  {siteConfig.address.line2 && (
                    <p className="text-muted-foreground">{siteConfig.address.line2}</p>
                  )}
                  <p className="text-muted-foreground">
                    {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
                  </p>
                  <p className="text-steel text-sm mt-2">Premium parking available. Valet service for Reserve members.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-brass flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-coal" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-brass hover:text-brass/80 transition-colors text-lg">
                    {siteConfig.contact.formattedPhone}
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
                  <ul className="text-muted-foreground space-y-1">
                    {siteConfig.hours.map((entry) => (
                      <li key={entry.days}>
                        <span className="text-porcelain">{entry.days}:</span> {entry.time}
                      </li>
                    ))}
                  </ul>
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
            <Button className="btn-brass w-full" onClick={() => navigate('/book')}>
              Book appointment
            </Button>
            <Button
              variant="outline"
              className="btn-outline-brass w-full"
              onClick={() => window.open(siteConfig.mapLink, '_blank', 'noopener,noreferrer')}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get directions
            </Button>
          </div>
        </div>

        <div className="surface-panel p-8 lg:col-span-3">
          <h2 className="font-display text-2xl font-semibold text-brass mb-6">Send us a message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-porcelain">First Name</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClass} placeholder="Your first name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-porcelain">Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClass} placeholder="Your last name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-porcelain">Email</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClass} placeholder="your.email@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-porcelain">Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} className={inputClass} placeholder="(123) 456-7890" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-porcelain">Subject</FormLabel>
                    <FormControl>
                      <select {...field} className={inputClass}>
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Question</option>
                        <option value="membership">Membership Inquiry</option>
                        <option value="services">Services Information</option>
                        <option value="wedding">Wedding Package</option>
                        <option value="general">General Question</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-porcelain">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us how we can help you..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="btn-brass w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
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
            <p className="text-steel text-sm">Host corporate retreats or membership appreciation nights with crafted menus.</p>
          </div>
          <div className="surface-panel p-6 space-y-3 text-left md:text-center">
            <div className="w-12 h-12 mx-0 md:mx-auto rounded-full bg-gradient-brass flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-coal" />
            </div>
            <h4 className="font-display text-xl font-semibold text-porcelain">Member exclusives</h4>
            <p className="text-steel text-sm">Reserve members unlock private lockers, tasting events, and concierge support.</p>
          </div>
        </div>
      </PageSection>
    </Layout>
  );
};

export default Contact;
