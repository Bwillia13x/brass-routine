import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, User, Phone, Mail, CreditCard, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import PageSection from '../components/PageSection';
import { submitAppointmentRequest } from '@/integrations/supabase/service';
import { siteConfig } from '@/lib/site-config';

const membershipOptions = ['none', 'classic', 'reserve', 'interested'] as const;

const bookingFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z
    .string()
    .min(7, 'Phone number is required')
    .regex(/^[0-9+().\-\s]*$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  membershipStatus: z.enum(membershipOptions, {
    errorMap: () => ({ message: 'Select your membership status' }),
  }),
  preferredDateTime: z.string().min(5, 'Share your preferred dates and times'),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const bookingHighlights = [
  {
    icon: ShieldCheck,
    title: 'Card-on-file security',
    description: 'Your details are encrypted through Supabase. Charges only occur after confirmation.',
  },
  {
    icon: MessageCircle,
    title: 'Concierge follow-up',
    description: 'Expect a text or call within 24 hours with confirmation and pre-visit recommendations.',
  },
  {
    icon: Sparkles,
    title: 'Member priority',
    description: 'Reserve and Classic members receive first access to openings and waitlists.',
  },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: user?.email ?? '',
      service: '',
      membershipStatus: 'none',
      preferredDateTime: '',
    },
  });

  useEffect(() => {
    if (user?.email) {
      form.setValue('email', user.email, { shouldDirty: false });
    }
  }, [user?.email, form]);

  const onSubmit = async (values: BookingFormValues) => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to book an appointment.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    const result = await submitAppointmentRequest({
      userId: user.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      service: values.service,
      membershipStatus: values.membershipStatus,
      preferredDateTime: values.preferredDateTime,
    });

    if (result.success === false) {
      toast({
        title: 'Unable to submit',
        description: result.error,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Appointment Requested!',
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });

    form.reset({
      firstName: '',
      lastName: '',
      phone: '',
      email: user?.email ?? '',
      service: '',
      membershipStatus: 'none',
      preferredDateTime: '',
    });
  };

  const inputClass = 'input-luxury w-full';
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Layout 
      seo={{
        title: "Book Appointment - Andreas & Co. | Premium Men's Grooming Calgary",
        description: "Book your grooming appointment at Andreas & Co. Calgary. Online booking for cuts, facials, shaves, and membership services.",
        keywords: "book mens haircut Calgary, grooming appointment booking, barber appointment Calgary",
        type: "service"
      }}
    >
      <PageHero
        eyebrow="Book your experience"
        title="Reserve time at Andreas & Co."
        description="Select a service, share your availability, and our concierge team will confirm the details."
        align="left"
        actions={(
          <>
            <Button className="btn-brass" onClick={() => window.open(`tel:${siteConfig.contact.phone}`)}>
              Call to book
            </Button>
            <Button variant="outline" className="btn-outline-brass" onClick={() => navigate('/membership')}>
              Explore member perks
            </Button>
          </>
        )}
      />

      <PageSection
        eyebrow="Online booking"
        title="Integrated booking system"
        description="Our live booking interface launches soon. Until then, call us directly or send a request below."
        tone="muted"
      >
        <div className="surface-panel p-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-brass rounded-full flex items-center justify-center shadow-brass/30">
            <Calendar className="w-10 h-10 text-coal" />
          </div>
          <h2 className="font-display text-3xl font-semibold text-porcelain">Online booking system</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our integrated booking system will appear here. For now, please call us directly or use the request form below and we
            will secure your preferred time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-brass text-lg px-8 py-4" onClick={() => window.open(`tel:${siteConfig.contact.phone}`)}>
              <Phone className="w-5 h-5 mr-2" />
              Call to book: {siteConfig.contact.formattedPhone}
            </Button>
            <Button
              variant="outline"
              className="btn-outline-brass text-lg px-8 py-4"
              onClick={() => navigate('/contact')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact form
            </Button>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="How to prepare"
        title="What to know before you arrive"
        description="Arrive 10 minutes early for consultation, bring inspiration photos, and let us know if you are exploring membership."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="surface-panel p-6 space-y-4">
            <h3 className="font-display text-xl font-semibold text-brass flex items-center gap-2">
              <User className="w-5 h-5" />
              Choose your experience
            </h3>
            <div className="space-y-3 text-steel text-sm">
              <p>
                <strong className="text-porcelain">First visit:</strong> Start with our Signature Cut or Gentleman’s Facial to
                experience the full consultation and finish ritual.
              </p>
              <p>
                <strong className="text-porcelain">Members:</strong> Apply credits to any service or stack them for an elevated ritual.
              </p>
              <p>
                <strong className="text-porcelain">Reserve tier:</strong> Master Barber access with extended consultation and lounge
                amenities.
              </p>
            </div>
          </div>

          <div className="surface-panel p-6 space-y-4">
            <h3 className="font-display text-xl font-semibold text-brass flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Booking policies
            </h3>
            <div className="space-y-3 text-steel text-sm">
              <p>
                <strong className="text-porcelain">Advance notice:</strong> Kindly provide 12-hour notice for changes or cancellations.
              </p>
              <p>
                <strong className="text-porcelain">Payment:</strong> A card on file secures your slot. Members enjoy priority booking.
              </p>
              <p>
                <strong className="text-porcelain">Arrival:</strong> Please arrive 10 minutes early for consultation and preparation.
              </p>
              <p>
                <strong className="text-porcelain">Rescheduling:</strong> Flexible rescheduling available with advance notice.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="What happens next"
        title="After you request an appointment"
        align="center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookingHighlights.map((highlight, index) => (
            <div key={index} className="surface-panel p-6 space-y-3 text-left md:text-center">
              <div className="w-12 h-12 mx-0 md:mx-auto rounded-full bg-gradient-brass flex items-center justify-center">
                <highlight.icon className="w-6 h-6 text-coal" />
              </div>
              <h4 className="font-display text-xl font-semibold text-porcelain">{highlight.title}</h4>
              <p className="text-steel text-sm leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Request an appointment"
        title="Tell us when to expect you"
        description="Fill out the form below with your preferred dates, times, and any special requests. Our concierge will confirm within one business day."
        align="center"
        tone="surface"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-porcelain">First Name *</FormLabel>
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
                    <FormLabel className="text-porcelain">Last Name *</FormLabel>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-porcelain">Phone *</FormLabel>
                    <FormControl>
                      <Input {...field} className={inputClass} placeholder="(123) 456-7890" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-porcelain">Email *</FormLabel>
                    <FormControl>
                      <Input {...field} className={inputClass} placeholder="your.email@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-porcelain">Preferred Service</FormLabel>
                    <FormControl>
                      <select {...field} className={inputClass}>
                        <option value="">Select a service</option>
                        <option value="signature-cut">Signature Cut</option>
                        <option value="cut-style-premium">Cut & Style Premium</option>
                        <option value="traditional-shave">Traditional Shave</option>
                        <option value="beard-sculpting">Beard Sculpting</option>
                        <option value="gentlemans-facial">Gentleman's Facial</option>
                        <option value="led-therapy">LED Light Therapy</option>
                        <option value="massage">Relaxation Massage</option>
                        <option value="consultation">Consultation Only</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="membershipStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-porcelain">Membership Status</FormLabel>
                    <FormControl>
                      <select {...field} className={inputClass}>
                        <option value="none">Not a Member</option>
                        <option value="classic">Classic Member</option>
                        <option value="reserve">Reserve Member</option>
                        <option value="interested">Interested in Membership</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="preferredDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-porcelain">Preferred Date & Time</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Let us know your preferred dates, times, and any special requests..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center">
              <Button type="submit" className="btn-brass text-lg px-12 py-4" disabled={isSubmitting}>
                <CreditCard className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Request Appointment'}
              </Button>
              <p className="text-steel text-sm mt-3">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
            </div>
          </form>
        </Form>
      </PageSection>
    </Layout>
  );
};

export default BookingPage;
