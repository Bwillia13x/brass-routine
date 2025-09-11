import { Calendar, Clock, User, Phone, Mail, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';

const BookingPage = () => {
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
            
            <form className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
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
                    required
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
                    required
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
                    required
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
                  <select className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain focus:ring-2 focus:ring-brass focus:border-transparent transition-all">
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
                  <select className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain focus:ring-2 focus:ring-brass focus:border-transparent transition-all">
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
                  rows={3}
                  className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent transition-all resize-none"
                  placeholder="Let us know your preferred dates, times, and any special requests..."
                ></textarea>
              </div>

              <div className="text-center">
                <Button type="submit" className="btn-brass text-lg px-12 py-4">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Request Appointment
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