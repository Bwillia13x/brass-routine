import { FormEvent, useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from '@/hooks/use-toast';
import { submitContactMessage } from '@/integrations/supabase/service';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address to join our newsletter.',
        variant: 'destructive',
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactMessage({
        firstName: 'Newsletter',
        lastName: 'Subscriber',
        email: trimmedEmail,
        subject: 'Newsletter Signup',
        message: 'Please add me to your newsletter for grooming tips, exclusive offers, and booking reminders.',
      });

      if (result.success === false) {
        toast({
          title: 'Unable to subscribe',
          description: result.error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Welcome to the newsletter!',
        description: "You'll receive grooming tips, exclusive offers, and booking reminders soon.",
      });

      setEmail('');
    } catch (error) {
      toast({
        title: 'Subscription failed',
        description: 'Something went wrong. Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex space-x-3">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="flex-1 input-luxury"
          aria-label="Email address for newsletter"
          autoComplete="email"
          disabled={isSubmitting}
          required
        />
        <Button
          type="submit"
          variant="outline"
          className="btn-outline-brass"
          disabled={isSubmitting}
          aria-label="Subscribe to newsletter"
        >
          <Mail className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default Newsletter;