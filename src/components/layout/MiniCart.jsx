import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { selectCartItems, selectCartSubtotal } from '@/store/slices/cartSlice';
import { Dropdown, Button, PriceDisplay } from '@/components/common';
import { ROUTES } from '@/constants/routes';
import { formatCurrency } from '@/utils/format';

export default function MiniCart({ count }) {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <Dropdown
      trigger={
        <button aria-label="Open cart preview" className="relative rounded-full p-2 hover:bg-paper-dim">
          <ShoppingBagIcon className="h-5.5 w-5.5 text-ink" />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-paper">
              {count}
            </span>
          )}
        </button>
      }
      className="w-80 p-4"
    >
      {items.length === 0 ? (
        <p className="px-2 py-6 text-center text-sm text-ink/50">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto px-1">
            {items.slice(0, 4).map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                <div className="h-14 w-12 flex-shrink-0 overflow-hidden rounded-md bg-paper-dim">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="line-clamp-1 text-xs font-medium text-ink">{item.name}</p>
                  <p className="text-xs text-ink/45">Qty {item.quantity}</p>
                </div>
                <span className="self-center font-mono text-xs text-ink">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="ticket-divider mt-3 flex items-center justify-between pt-3 px-1">
            <span className="text-sm text-ink/60">Subtotal</span>
            <PriceDisplay price={subtotal} size="sm" />
          </div>
          <div className="mt-3 flex gap-2 px-1">
            <Button as={Link} to={ROUTES.CART} variant="outline" size="sm" className="flex-1">
              View cart
            </Button>
            <Button as={Link} to={ROUTES.CHECKOUT} variant="primary" size="sm" className="flex-1">
              Checkout
            </Button>
          </div>
        </>
      )}
    </Dropdown>
  );
}
