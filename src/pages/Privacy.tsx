import Layout from '../components/Layout';

const Privacy = () => {
  return (
    <Layout 
      seo={{
        title: "Privacy Policy - Andreas & Co. | Calgary Grooming Lounge",
        description: "Read Andreas & Co.'s privacy policy regarding personal information collection, use, and protection for our Calgary grooming services.",
        type: "article"
      }}
    >
      <div className="pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-hero mb-6">
              Privacy Policy
            </h1>
            <p className="text-body-large max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="card-luxury p-8 space-y-8">
            
            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Information We Collect
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  At Andreas & Co., we collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account or profile</li>
                  <li>Book appointments or services</li>
                  <li>Sign up for membership programs</li>
                  <li>Contact us through our forms or phone</li>
                  <li>Subscribe to our newsletter</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                How We Use Your Information
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Schedule and manage your appointments</li>
                  <li>Process membership benefits and payments</li>
                  <li>Send appointment reminders and service updates</li>
                  <li>Respond to your comments and questions</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Information Sharing
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Service providers who assist in our operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Data Security
              </h2>
              <div className="text-muted-foreground">
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Your Rights
              </h2>
              <div className="text-muted-foreground space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@andreasandco.ca or call our main number.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-brass mb-4">
                Contact Us
              </h2>
              <div className="text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-ny-green/50 rounded-sm">
                  <p><strong>Andreas & Co. Grooming Lounge</strong></p>
                  <p>Email: privacy@andreasandco.ca</p>
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

export default Privacy;