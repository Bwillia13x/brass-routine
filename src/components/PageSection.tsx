import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionAlignment = 'left' | 'center';
type SectionTone = 'default' | 'muted' | 'contrast' | 'surface';

interface PageSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: SectionAlignment;
  tone?: SectionTone;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
}

const toneClasses: Record<SectionTone, string> = {
  default: '',
  muted: 'section-muted',
  contrast: 'section-contrast',
  surface: '',
};

const PageSection = ({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'default',
  actions,
  children,
  className,
  contentClassName,
  id,
}: PageSectionProps) => {
  const hasHeader = Boolean(eyebrow || title || description || actions);
  const hasContent = Boolean(children);
  const alignmentClasses = align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl';
  const descriptionAlignment = align === 'center' ? 'mx-auto' : '';
  const actionsAlignment = align === 'center' ? 'justify-center' : '';

  return (
    <section
      id={id}
      className={cn('relative py-16 md:py-24', toneClasses[tone], className)}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasHeader && (
          <div className={cn('space-y-4', alignmentClasses)}>
            {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
            {title && <h2 className="text-display">{title}</h2>}
            {description && (
              <p className={cn('text-body-large text-muted-foreground', descriptionAlignment)}>
                {description}
              </p>
            )}
            {actions && (
              <div className={cn('mt-8 flex flex-wrap gap-4', actionsAlignment)}>
                {actions}
              </div>
            )}
          </div>
        )}

        {hasContent && (
          <div
            className={cn(
              hasHeader ? 'mt-12' : '',
              tone === 'surface' ? 'surface-panel p-8 md:p-12' : '',
              contentClassName
            )}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageSection;
