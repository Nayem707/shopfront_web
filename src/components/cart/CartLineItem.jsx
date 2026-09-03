import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TrashIcon, HeartIcon } from '@heroicons/react/24/outline';
import { updateQuantity, removeFromCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { useToast } from '@/hooks/useToast';
import { QuantitySelector, PriceDisplay } from '@/components/common';
import { buildRoute, ROUTES } from '@/constants/routes';

export default function CartLineItem({ item }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const lineId = `${item.productId}-${item.size}-${item.color}`;

  return (
    <div className="flex gap-4 py-5">
      <Link to={buildRoute(ROUTES.PRODUCT_DETAILS, { id: item.productId })} className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-paper-dim">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <div>
            <Link to={buildRoute(ROUTES.PRODUCT_DETAILS, { id: item.productId })} className="text-sm font-medium text-ink hover:text-accent-dark">
              {item.name}
            </Link>
            <p className="mt-1 text-xs text-ink/45">
              {item.color && `${item.color}`}{item.color && item.size && ' · '}{item.size && `Size ${item.size}`}
            </p>
          </div>
          <PriceDisplay price={item.price} size="sm" />
        </div>
        <div className="flex items-center justify-between">
          <QuantitySelector
            size="sm"
            value={item.quantity}
            max={item.stock || 99}
            onChange={(q) => dispatch(updateQuantity({ lineId, quantity: q }))}
          />
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                dispatch(toggleWishlist({ productId: item.productId, name: item.name, image: item.image, price: item.price, stock: item.stock }));
                toast.success('Saved to wishlist');
              }}
              aria-label="Move to wishlist"
              className="rounded-full p-2 text-ink/45 hover:bg-paper-dim hover:text-ink"
            >
              <HeartIcon className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => {
                dispatch(removeFromCart(lineId));
                toast.info('Item removed');
              }}
              aria-label="Remove item"
              className="rounded-full p-2 text-ink/45 hover:bg-error-soft hover:text-error"
            >
              <TrashIcon className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
