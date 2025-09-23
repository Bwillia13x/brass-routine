import { useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';
import { siteConfig } from '@/lib/site-config';

const Cancellation = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-hero mb-6">
              Cancellation Policy
            </h1>
            <p className="text-body-large max-w-2xl mx-auto">
              We understand plans change. Here's our flexible approach to appointment modifications and cancellations.
            </p>
          </div>

          {/* Policy Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card-luxury p-6 text-center">
              <div className="w-16 h-16 bg-gradient-brass rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-coal" />
              </div>
              <h3 className="font-display text-lg font-semibold text-brass mb-2">
                12+ Hours Notice
              </h3>
              <p className="text-steel text-sm">
                Full flexibility to reschedule or cancel with no fees
              </p>
            </div>

            <div className="card-luxury p-6 text-center">
              <div className="w-16 h-16 bg-gradient-brass rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-coal" />
              </div>
              <h3 className="font-display text-lg font-semibold text-brass mb-2">
                2-12 Hours Notice
              </h3>
              <p className="text-steel text-sm">
                25% cancellation fee may apply based on service
              </p>
            </div>

            <div className="card-luxury p-6 text-center">
              <div className="w-16 h-16 bg-gradient-brass rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-coal" />
              </div>
              <h3 className="font-display text-lg font-semibold text-brass mb-2">
                Same Day / No Show
              </h3>
              <p className="text-steel text-sm">
                50% of service cost will be charged to card on file
              </p>
            </div>
          </div>

          <div className="space-y-8">
            
            {/* Detailed Policy */}
            <div className="card-luxury p-8">
              <h2 className="font-display text-2xl font-semibold text-brass mb-6">
                Detailed Cancellation Terms
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-porcelain mb-3">
                    Standard Appointments
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>12+ hours notice:</strong> Free cancellation or rescheduling</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>2-12 hours notice:</strong> 25% cancellation fee for premium services</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>Same day/No show:</strong> 50% service charge applied</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-porcelain mb-3">
                    Member Benefits
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>Classic Members:</strong> One courtesy same-day cancellation per month</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>Reserve Members:</strong> Priority rebooking + enhanced flexibility</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>Service Credits:</strong> Unused member credits roll over per tier limits</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-porcelain mb-3">
                    Special Circumstances
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>Illness:</strong> No charge with same-day notice for health-related cancellations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>Weather:</strong> Free rescheduling for severe weather conditions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                      <span><strong>Emergency:</strong> Policy waived for documented emergencies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How to Cancel */}
            <div className="card-luxury p-8">
              <h2 className="font-display text-2xl font-semibold text-brass mb-6">
                How to Cancel or Reschedule
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-porcelain">
                    Quick Options
                  </h3>
                  <div className="space-y-3">
                    <Button
                      className="btn-outline-brass w-full justify-start"
                      onClick={() => window.open(`tel:${siteConfig.contact.phone}`)}
                    >
                      <Phone className="w-4 h-4 mr-3" />
                      Call: {siteConfig.contact.formattedPhone}
                    </Button>
                    <Button
                      variant="outline"
                      className="btn-outline-brass w-full justify-start"
                      onClick={() => window.location.href = 'mailto:appointments@andreasandco.ca'}
                    >
                      <Mail className="w-4 h-4 mr-3" />
                      Email: appointments@andreasandco.ca
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-porcelain">
                    Online Account
                  </h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>• Log into your account to manage appointments</p>
                    <p>• View upcoming bookings and credits</p>
                    <p>• Reschedule with real-time availability</p>
                    <p>• Cancel with instant confirmation</p>
                  </div>
                  <Button
                    className="btn-brass w-full"
                    onClick={() => navigate('/auth')}
                  >
                    Access Account
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

export default Cancellation;