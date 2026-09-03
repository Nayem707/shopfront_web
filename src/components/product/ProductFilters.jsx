import { useSelector } from 'react-redux';
import { selectCategories } from '@/store/slices/categorySlice';
import { cn } from '@/utils/cn';

export default function ProductFilters({ filters, onChange, className }) {
  const categories = useSelector(selectCategories);

  const priceRanges = [
    { label: 'Any price', min: null, max: null },
    { label: 'Under $100', min: null, max: 100 },
    { label: '$100 – $250', min: 100, max: 250 },
    { label: '$250 – $400', min: 250, max: 400 },
    { label: '$400+', min: 400, max: null },
  ];

  return (
    <div className={cn('flex flex-col gap-7', className)}>
      <div>
        <h3 className="mb-3 font-display text-base text-ink">Category</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onChange({ categoryId: null })}
            className={cn(
              'rounded-md px-2.5 py-1.5 text-left text-sm transition-colors',
              !filters.categoryId ? 'bg-paper-dim font-medium text-ink' : 'text-ink/60 hover:bg-paper-dim/60'
            )}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange({ categoryId: cat.id })}
              className={cn(
                'rounded-md px-2.5 py-1.5 text-left text-sm transition-colors',
                filters.categoryId === cat.id ? 'bg-paper-dim font-medium text-ink' : 'text-ink/60 hover:bg-paper-dim/60'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="ticket-divider pt-6">
        <h3 className="mb-3 font-display text-base text-ink">Price</h3>
        <div className="flex flex-col gap-1">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => onChange({ minPrice: range.min, maxPrice: range.max })}
              className={cn(
                'rounded-md px-2.5 py-1.5 text-left text-sm transition-colors',
                filters.minPrice === range.min && filters.maxPrice === range.max
                  ? 'bg-paper-dim font-medium text-ink'
                  : 'text-ink/60 hover:bg-paper-dim/60'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
