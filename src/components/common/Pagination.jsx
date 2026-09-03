import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const withDots = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) withDots.push('dots-' + p);
    withDots.push(p);
  });

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="rounded-full p-2 text-ink/60 hover:bg-paper-dim disabled:opacity-30"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      {withDots.map((p) =>
        typeof p === 'string' ? (
          <span key={p} className="px-2 text-ink/30">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              'h-8 w-8 rounded-full text-sm font-mono transition-colors',
              p === page ? 'bg-ink text-paper' : 'text-ink/60 hover:bg-paper-dim'
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="rounded-full p-2 text-ink/60 hover:bg-paper-dim disabled:opacity-30"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
