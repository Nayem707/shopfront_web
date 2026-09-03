import { cn } from '@/utils/cn';

const TONES = {
  neutral: 'bg-paper-dim text-ink/70',
  success: 'bg-success-soft text-success',
  error: 'bg-error-soft text-error',
  warning: 'bg-warning-soft text-warning',
  info: 'bg-info-soft text-info',
  accent: 'bg-accent-soft text-accent-dark',
};

export default function Badge({ tone = 'neutral', className, children, dot = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        TONES[tone],
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', TONES[tone].split(' ')[1])} style={{ backgroundColor: 'currentColor' }} />}
      {children}
    </span>
  );
}
