import { CheckIcon } from '@heroicons/react/24/solid';
import { ORDER_STATUS, ORDER_STATUS_FLOW } from '@/constants';
import { cn } from '@/utils/cn';

const LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
};

export default function OrderTimeline({ status }) {
  if (status === ORDER_STATUS.CANCELLED) {
    return (
      <div className="rounded-card border border-error/25 bg-error-soft px-4 py-3 text-sm font-medium text-error">
        This order was cancelled.
      </div>
    );
  }

  const currentIndex = ORDER_STATUS_FLOW.indexOf(status);

  return (
    <div className="flex items-start">
      {ORDER_STATUS_FLOW.map((step, i) => {
        const done = i <= currentIndex;
        const isLast = i === ORDER_STATUS_FLOW.length - 1;
        return (
          <div key={step} className={cn('flex items-center', !isLast && 'flex-1')}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold',
                  done ? 'border-accent bg-accent text-paper' : 'border-paper-line bg-white text-ink/30'
                )}
              >
                {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn('text-center text-[11px] font-medium', done ? 'text-ink' : 'text-ink/35')}>
                {LABELS[step]}
              </span>
            </div>
            {!isLast && (
              <div className={cn('mx-1.5 mb-5 h-0.5 flex-1 rounded-full', i < currentIndex ? 'bg-accent' : 'bg-paper-line')} />
            )}
          </div>
        );
      })}
    </div>
  );
}
