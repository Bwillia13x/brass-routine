import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Navigation } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '../components/Layout';

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
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form
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
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-hero mb-6">
              Visit Us
            </h1>
            <p className="text-body-large max-w-3xl mx-auto">
              Located in the heart of Calgary, Andreas & Co. offers premium grooming 
              in a sophisticated, Art Deco-inspired environment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brass mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brass rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-coal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-porcelain mb-1">Address</h3>
                    <p className="text-muted-foreground">[INSERT ADDRESS]</p>
                    <p className="text-muted-foreground">Calgary, AB [POSTAL CODE]</p>
                    <p className="text-steel text-sm mt-2">
                      Premium parking available. Valet service for Reserve members.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brass rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-coal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-porcelain mb-1">Phone</h3>
                    <a 
                      href="tel:+1234567890" 
                      className="text-brass hover:text-brass/80 transition-colors text-lg"
                    >
                      [INSERT PHONE]
                    </a>
                    <p className="text-steel text-sm mt-1">
                      Members have priority phone support
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brass rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-coal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-porcelain mb-1">Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: [INSERT HOURS]</p>
                      <p>Saturday: [INSERT HOURS]</p>
                      <p>Sunday: [INSERT HOURS]</p>
                    </div>
                    <p className="text-steel text-sm mt-2">
                      Extended hours available for Reserve members
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brass rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-coal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-porcelain mb-1">Email</h3>
                    <a 
                      href="mailto:info@andreasandco.ca" 
                      className="text-brass hover:text-brass/80 transition-colors"
                    >
                      info@andreasandco.ca
                    </a>
                    <p className="text-steel text-sm mt-1">
                      For general inquiries and membership questions
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Button 
                  className="btn-brass w-full"
                  onClick={() => window.location.href = '/book'}
                >
                  Book Appointment
                </Button>
                <Button 
                  variant="outline" 
                  className="btn-outline-brass w-full"
                  onClick={() => window.open('https://maps.google.com/?q=[INSERT ADDRESS]')}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-luxury p-8">
              <h2 className="font-display text-2xl font-semibold text-brass mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-porcelain font-medium mb-2">
                      First Name
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
                      Last Name
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

                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    Email
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

                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent transition-all"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label className="block text-porcelain font-medium mb-2">
                    Subject
                  </label>
                  <select 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain focus:ring-2 focus:ring-brass focus:border-transparent transition-all"
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
                  <label className="block text-porcelain font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-ny-green border border-brass/30 rounded-sm text-porcelain placeholder-steel focus:ring-2 focus:ring-brass focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <Button type="submit" className="btn-brass w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>

          {/* Google Map Placeholder */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-brass text-center mb-8">
              Find Us
            </h2>
            <div className="card-luxury p-2">
              <div className="bg-ny-green/50 rounded-sm h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-brass mx-auto mb-4" />
                  <p className="text-porcelain font-medium mb-2">Interactive Map</p>
                  <p className="text-steel text-sm">[Google Maps integration would appear here]</p>
                  <Button 
                    className="btn-outline-brass mt-4"
                    onClick={() => window.open('https://maps.google.com/?q=[INSERT ADDRESS]')}
                  >
                    View on Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;