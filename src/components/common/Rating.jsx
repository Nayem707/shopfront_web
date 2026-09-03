import { StarIcon } from '@heroicons/react/24/solid';
import { cn } from '@/utils/cn';

export default function Rating({ value = 0, count, size = 'sm', className }) {
  const sizeClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5';
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={cn(sizeClass, i < Math.round(value) ? 'text-accent' : 'text-paper-line')}
          />
        ))}
      </div>
      <span className="text-xs text-ink/50 font-mono">
        {value}{count != null && ` (${count})`}
      </span>
    </div>
  );
}
