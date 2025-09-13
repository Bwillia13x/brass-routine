import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Layout from '../components/Layout';

const BookingPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: user?.email || '',
    service: '',
    membershipStatus: 'none',
    preferredDateTime: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to book an appointment.",
        variant: "destructive",
      });
      window.location.href = '/auth';
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          membership_status: formData.membershipStatus,
          preferred_datetime: formData.preferredDateTime,
        });

      if (error) throw error;

      toast({
        title: "Appointment Requested!",
        description: "We'll contact you within 24 hours to confirm your appointment.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: user?.email || '',
        service: '',
        membershipStatus: 'none',
        preferredDateTime: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your appointment request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-hero mb-6">
              Book Your Appointment
            </h1>
            <p className="text-body-large max-w-2xl mx-auto">
              Experience New-York calibre grooming in Calgary. 
              Select your preferred service and time below.
            </p>
          </div>

          {/* Booking Integration Placeholder */}
          <div className="card-luxury p-8 text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-brass rounded-full flex items-center justify-center">
              <Calendar className="w-10 h-10 text-coal" />
            </div>
            
            <h2 className="font-display text-2xl font-semibold text-brass mb-4">
              Online Booking System
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Our integrated booking system will appear here. 
              For now, please call us directly or use the contact form below.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-brass text-lg px-8 py-4"
                onClick={() => window.open('tel:+1234567890')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call to Book: [INSERT PHONE]
              </Button>
              <Button 
                variant="outline" 
                className="btn-outline-brass text-lg px-8 py-4"
                onClick={() => window.location.href = '/contact'}
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Form
              </Button>
            </div>
          </div>

          {/* Booking Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Service Selection Guide */}
            <div className="card-luxury p-6">
              <h3 className="font-display text-xl font-semibold text-brass mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Choose Your Experience
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-2 border-brass pl-4">
                  <h4 className="font-semibold text-porcelain">First Time?</h4>
                  <p className="text-steel text-sm">
                    Start with our Signature Cut to experience our calibre and consultation process.
                  </p>
                </div>
                
                <div className="border-l-2 border-brass pl-4">
                  <h4 className="font-semibold text-porcelain">Members</h4>
                  <p className="text-steel text-sm">
                    Use your monthly credits or enjoy member discounts on all services.
                  </p>
                </div>
                
                <div className="border-l-2 border-brass pl-4">
                  <h4 className="font-semibold text-porcelain">Reserve Tier</h4>
                  <p className="text-steel text-sm">
                    Master Barber service with extended consultation and hot towel ritual.
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Policies */}
            <div className="card-luxury p-6">
              <h3 className="font-display text-xl font-semibold text-brass mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Booking Information
              </h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-porcelain mb-1">Advance Notice</h4>
                  <p className="text-steel">
                    Kindly provide 12-hour notice for changes or cancellations.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-porcelain mb-1">Payment</h4>
                  <p className="text-steel">
                    A card on file secures your slot. Members enjoy priority booking.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-porcelain mb-1">Arrival Time</h4>
                  <p className="text-steel">
                    Please arrive 10 minutes early for consultation and preparation.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-porcelain mb-1">Rescheduling</h4>
                  <p className="text-steel">
                    Flexible rescheduling available with advance notice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="mt-12 card-luxury p-8">
            <h3 className="font-display text-2xl font-semibold text-brass mb-6 text-center">
              Request an Appointment
            </h3>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent transition-all"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent transition-all"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent transition-all"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    Preferred Service
                  </label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain focus:ring-2 focus:ring-brass focus:border-transparent transition-all"
                  >
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
                </div>
                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    Membership Status
                  </label>
                  <select 
                    name="membershipStatus"
                    value={formData.membershipStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain focus:ring-2 focus:ring-brass focus:border-transparent transition-all"
                  >
                    <option value="none">Not a Member</option>
                    <option value="classic">Classic Member</option>
                    <option value="reserve">Reserve Member</option>
                    <option value="interested">Interested in Membership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-porcelain font-medium mb-2">
                  Preferred Date & Time
                </label>
                <textarea
                  name="preferredDateTime"
                  rows={3}
                  value={formData.preferredDateTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent transition-all resize-none"
                  placeholder="Let us know your preferred dates, times, and any special requests..."
                ></textarea>
              </div>

              <div className="text-center">
                <Button type="submit" className="btn-brass text-lg px-12 py-4" disabled={loading}>
                  <CreditCard className="w-5 h-5 mr-2" />
                  {loading ? 'Submitting...' : 'Request Appointment'}
                </Button>
                <p className="text-steel text-sm mt-3">
                  We'll contact you within 24 hours to confirm your appointment.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;