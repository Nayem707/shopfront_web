import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

const Textarea = forwardRef(({ label, error, className, id, rows = 4, ...props }, ref) => {
  const autoId = useId();
  const areaId = id || autoId;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={areaId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={areaId}
        rows={rows}
        className={cn(
          'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 resize-y',
          error ? 'border-error' : 'border-paper-line focus:border-accent',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
});
Textarea.displayName = 'Textarea';
export default Textarea;
