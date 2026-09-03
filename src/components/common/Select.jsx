import { forwardRef, useId } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

const Select = forwardRef(({ label, error, options = [], className, id, ...props }, ref) => {
  const autoId = useId();
  const selectId = id || autoId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full appearance-none rounded-lg border bg-white px-3.5 py-2.5 pr-9 text-sm text-ink',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30',
            error ? 'border-error' : 'border-paper-line focus:border-accent',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
