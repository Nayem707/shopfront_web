import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

export default function SearchBar({ value, onChange, placeholder = 'Search products…', className, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={cn('relative w-full', className)}
      role="search"
    >
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/40" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full rounded-full border border-paper-line bg-white py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
