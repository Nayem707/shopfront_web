import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { selectWishlistItems, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { useToast } from '@/hooks/useToast';
import { Breadcrumb, Button, EmptyState, PriceDisplay, Badge } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';

export default function Wishlist({ embedded = false }) {
  const items = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const toast = useToast();

  const content = (
    <>
      {!embedded && <h1 className="mt-2 font-display text-3xl text-ink">Your wishlist</h1>}

      {items.length === 0 ? (
        <div className={embedded ? '' : 'mt-10'}>
          <EmptyState
            icon={HeartIcon}
            title="Your wishlist is empty"
            description="Save the pieces you love here so you never lose track of them."
          />
          <div className="mt-6 flex justify-center">
            <Button as={Link} to={ROUTES.PRODUCTS} variant="primary">
              Discover products
            </Button>
          </div>
        </div>
      ) : (
        <div className={embedded ? 'grid grid-cols-1 gap-4 sm:grid-cols-2' : 'mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 rounded-card border border-paper-line bg-white p-4">
              <Link to={buildRoute(ROUTES.PRODUCT_DETAILS, { id: item.productId })} className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-paper-dim">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link to={buildRoute(ROUTES.PRODUCT_DETAILS, { id: item.productId })} className="text-sm font-medium text-ink hover:text-accent-dark">
                    {item.name}
                  </Link>
                  <div className="mt-1">
                    <PriceDisplay price={item.price} discountPrice={item.discountPrice} size="sm" />
                  </div>
                  {item.stock === 0 ? (
                    <Badge tone="error" className="mt-1.5">Out of stock</Badge>
                  ) : (
                    <Badge tone="success" className="mt-1.5">In stock</Badge>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    disabled={item.stock === 0}
                    onClick={() => {
                      dispatch(addToCart({ productId: item.productId, name: item.name, image: item.image, price: item.discountPrice || item.price, quantity: 1, stock: item.stock }));
                      toast.success('Added to cart');
                    }}
                  >
                    Add to cart
                  </Button>
                  <button
                    onClick={() => {
                      dispatch(removeFromWishlist(item.productId));
                      toast.info('Removed from wishlist');
                    }}
                    aria-label="Remove from wishlist"
                    className="rounded-full p-2 text-ink/40 hover:bg-error-soft hover:text-error"
                  >
                    <TrashIcon className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  if (embedded) return content;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: ROUTES.HOME }, { label: 'Wishlist' }]} />
      {content}
    </div>
  );
}
