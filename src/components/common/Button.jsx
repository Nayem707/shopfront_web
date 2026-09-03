import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const VARIANTS = {
  primary: 'bg-ink text-paper hover:bg-ink-soft border border-ink',
  accent: 'bg-accent text-paper hover:bg-accent-dark border border-accent',
  outline: 'bg-transparent text-ink border border-ink/25 hover:border-ink',
  ghost: 'bg-transparent text-ink hover:bg-paper-dim border border-transparent',
  danger: 'bg-error text-paper hover:bg-error/90 border border-error',
  link: 'bg-transparent text-ink underline underline-offset-4 decoration-paper-line hover:decoration-ink border-0 p-0',
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-sm px-6 py-3.5 gap-2',
};

const Button = forwardRef(
  (
    {
      as: Component = 'button',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      icon: Icon,
      iconPosition = 'left',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-colors duration-150',
          'disabled:opacity-45 disabled:cursor-not-allowed select-none',
          VARIANTS[variant],
          variant !== 'link' && SIZES[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        {!isLoading && Icon && iconPosition === 'left' && <Icon className="h-4 w-4" />}
        {children}
        {!isLoading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4" />}
      </Component>
    );
  }
);

Button.displayName = 'Button';
export default Button;
