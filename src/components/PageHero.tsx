import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  actions?: ReactNode;
  children?: ReactNode;
  backgroundImage?: string;
}

const PageHero = ({
  eyebrow,
  title,
  description,
  align = 'center',
  actions,
  children,
  backgroundImage,
}: PageHeroProps) => {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const descriptionAlignment = align === 'center' ? 'mx-auto' : '';
  const actionsAlignment = align === 'center' ? 'justify-center' : '';

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Decorative background"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-coal via-ny-green/80 to-coal" />
        )}
        <div className="absolute inset-0 bg-coal/60" />
        <div className="absolute inset-0 mix-blend-screen opacity-40 bg-[radial-gradient(circle_at_top,_hsl(var(--brass)/0.25),_transparent_55%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className={cn('flex flex-col gap-6', alignment)}>
          {eyebrow && (
            <span className="section-eyebrow">{eyebrow}</span>
          )}

          <div className={cn('space-y-5', align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl')}>
            <h1 className="text-hero">{title}</h1>
            {description && (
              <p className={cn('text-body-large text-porcelain/90', descriptionAlignment)}>
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className={cn('mt-4 flex flex-wrap gap-4', actionsAlignment)}>
              {actions}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
