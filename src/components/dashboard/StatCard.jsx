import { cn } from '@/utils/cn';

export default function StatCard({ label, value, icon: Icon, trend, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-paper-dim text-ink',
    accent: 'bg-accent-soft text-accent-dark',
    success: 'bg-success-soft text-success',
    warning: 'bg-warning-soft text-warning',
  };

  return (
    <div className="rounded-card border border-paper-line bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink/45">{label}</p>
          <p className="mt-2 font-display text-2xl text-ink">{value}</p>
        </div>
        {Icon && (
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-full', tones[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {trend && (
        <p className={cn('mt-3 text-xs font-medium', trend.startsWith('-') ? 'text-error' : 'text-success')}>
          {trend} <span className="text-ink/40 font-normal">vs last month</span>
        </p>
      )}
    </div>
  );
}
