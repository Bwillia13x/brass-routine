import { BellRing } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { siteConfig } from '@/lib/site-config';

interface NotificationStatusBannerProps {
  context?: 'booking' | 'contact';
}

const copy = {
  booking: {
    title: 'Concierge notifications are queued automatically',
    description: (
      <>
        Our system logs every appointment request in Supabase and enqueues email/SMS alerts for the concierge team. If you
        do not receive a confirmation within 15 minutes, please call {siteConfig.contact.formattedPhone} or email{' '}
        {siteConfig.contact.email}.
      </>
    ),
  },
  contact: {
    title: 'Concierge team receives notifications instantly',
    description: (
      <>
        Contact messages trigger Supabase notifications to the concierge inbox. Expect a reply within one business day.
        For urgent matters, call {siteConfig.contact.formattedPhone}.
      </>
    ),
  },
};

export const NotificationStatusBanner = ({ context = 'booking' }: NotificationStatusBannerProps) => {
  const content = copy[context];

  return (
    <Alert className="surface-panel border-brass/40 bg-coal/60 text-porcelain">
      <BellRing className="h-5 w-5 text-brass" />
      <AlertTitle className="font-display text-lg text-brass">{content.title}</AlertTitle>
      <AlertDescription className="text-sm text-steel">{content.description}</AlertDescription>
    </Alert>
  );
};

export default NotificationStatusBanner;
