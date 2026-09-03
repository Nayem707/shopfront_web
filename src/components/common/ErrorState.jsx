import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from './Button';

export default function ErrorState({ title = 'Something went wrong', description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-error/20 bg-error-soft px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
        <ExclamationTriangleIcon className="h-6 w-6 text-error" />
      </div>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink/60">{description}</p>}
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  );
}
