import Layout from '../components/Layout';

const Terms = () => {
  return (
    <Layout 
      seo={{
        title: "Terms of Service - Andreas & Co. | Calgary Grooming Lounge",
        description: "Review Andreas & Co.'s terms of service for appointments, memberships, and grooming services in Calgary.",
        type: "article"
      }}
    >
      <div className="pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-hero mb-6">
              Terms of Service
            </h1>
            <p className="text-body-large max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="card-luxury p-8 space-y-8">
            
            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Acceptance of Terms
              </h2>
              <div className="text-muted-foreground">
                <p>
                  By accessing and using Andreas & Co. services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Services
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>Andreas & Co. provides premium grooming services including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Hair cutting and styling services</li>
                  <li>Beard grooming and traditional shaving</li>
                  <li>SkinBar facial treatments</li>
                  <li>Massage and wellness services</li>
                  <li>Waxing and grooming services</li>
                  <li>Membership programs and benefits</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Booking and Appointments
              </h2>
              <div className="text-muted-foreground space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>All appointments require advance booking</li>
                  <li>A valid payment method must be on file to secure appointments</li>
                  <li>Please arrive 10 minutes before your scheduled appointment</li>
                  <li>Late arrivals may result in shortened service time or rescheduling</li>
                  <li>No-shows may be charged for the full service amount</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Cancellation Policy
              </h2>
              <div className="text-muted-foreground space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>12-hour notice:</strong> Required for changes or cancellations</li>
                  <li><strong>Same-day cancellations:</strong> May be subject to a cancellation fee</li>
                  <li><strong>No-shows:</strong> Will be charged 50% of the service cost</li>
                  <li><strong>Members:</strong> Enhanced flexibility with priority rebooking</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Membership Terms
              </h2>
              <div className="text-muted-foreground space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Membership fees are billed monthly on your enrollment date</li>
                  <li>Service credits roll over as specified in your membership tier</li>
                  <li>Unused credits expire 60 days after membership termination</li>
                  <li>30-day notice required for membership cancellation</li>
                  <li>Membership benefits are non-transferable</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Payment Terms
              </h2>
              <div className="text-muted-foreground space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Payment is due at the time of service</li>
                  <li>We accept cash, credit cards, and digital payments</li>
                  <li>Gratuities are appreciated but not mandatory</li>
                  <li>Returned payments may incur additional fees</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Health and Safety
              </h2>
              <div className="text-muted-foreground space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Please inform us of any allergies or skin sensitivities</li>
                  <li>We reserve the right to refuse service for health or safety reasons</li>
                  <li>All equipment is sanitized between clients</li>
                  <li>If you're feeling unwell, please reschedule your appointment</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Limitation of Liability
              </h2>
              <div className="text-muted-foreground">
                <p>
                  Andreas & Co. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the specific service in question.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Contact Information
              </h2>
              <div className="text-muted-foreground">
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-ny-green/50 rounded-sm">
                  <p><strong>Andreas & Co. Grooming Lounge</strong></p>
                  <p>Email: legal@andreasandco.ca</p>
                  <p>Phone: [INSERT CONTACT NUMBER]</p>
                  <p>Address: [INSERT BUSINESS ADDRESS]</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;