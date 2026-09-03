import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { selectCartItems, selectCartSubtotal } from '@/store/slices/cartSlice';
import CartLineItem from '@/components/cart/CartLineItem';
import CartSummary from '@/components/cart/CartSummary';
import { Breadcrumb, Button, EmptyState } from '@/components/common';
import { ROUTES } from '@/constants/routes';

export default function Cart() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 12;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'Cart' }]} />
      <h1 className="mt-2 font-display text-3xl text-ink">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={ShoppingBagIcon}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Start exploring the collection."
          />
          <div className="mt-6 flex justify-center">
            <Button as={Link} to={ROUTES.PRODUCTS} variant="primary">
              Continue shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="divide-y divide-paper-line rounded-card border border-paper-line bg-white px-5">
              {items.map((item) => (
                <CartLineItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
              ))}
            </div>
            <Link to={ROUTES.PRODUCTS} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink">
              <ArrowLeftIcon className="h-4 w-4" /> Continue shopping
            </Link>
          </div>

          <div>
            <CartSummary subtotal={subtotal} shipping={shipping}>
              <Button as={Link} to={ROUTES.CHECKOUT} variant="primary" size="lg" className="mt-5 w-full">
                Proceed to checkout
              </Button>
            </CartSummary>
          </div>
        </div>
      )}
    </div>
  );
}
