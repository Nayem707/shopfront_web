import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(
  ({ label, error, hint, icon: Icon, className, containerClassName, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id || autoId;

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/40" />
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35',
              'transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30',
              Icon && 'pl-10',
              error ? 'border-error focus:border-error' : 'border-paper-line focus:border-accent',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-error">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-ink/45">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
