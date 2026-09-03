import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

export default function QuantitySelector({ value, onChange, min = 1, max = 99, size = 'md', className }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  const pad = size === 'sm' ? 'p-1.5' : 'p-2';

  return (
    <div className={cn('inline-flex items-center border border-paper-line rounded-full bg-white', className)}>
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(pad, 'rounded-full hover:bg-paper-dim disabled:opacity-30 disabled:cursor-not-allowed')}
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-mono select-none">{value}</span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(pad, 'rounded-full hover:bg-paper-dim disabled:opacity-30 disabled:cursor-not-allowed')}
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
