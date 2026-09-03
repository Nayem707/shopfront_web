import { formatCurrency, calcDiscountPercent } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function PriceDisplay({ price, discountPrice, size = 'md', className }) {
  const hasDiscount = discountPrice && discountPrice < price;
  const percent = hasDiscount ? calcDiscountPercent(price, discountPrice) : 0;

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('flex items-baseline gap-2 font-mono', className)}>
      <span className={cn('font-semibold text-ink', sizes[size])}>
        {formatCurrency(hasDiscount ? discountPrice : price)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-ink/40 line-through text-xs">{formatCurrency(price)}</span>
          <span className="text-[11px] font-semibold text-error">-{percent}%</span>
        </>
      )}
    </div>
  );
}
