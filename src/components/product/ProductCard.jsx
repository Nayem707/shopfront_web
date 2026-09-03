import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { toggleWishlist, selectIsWishlisted } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { useToast } from '@/hooks/useToast';
import { PriceDisplay, Rating, Badge } from '@/components/common';
import { buildRoute, ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const isWishlisted = useSelector(selectIsWishlisted(product.id));
  const outOfStock = product.stock === 0;

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(
      toggleWishlist({
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        discountPrice: product.discountPrice,
        stock: product.stock,
      })
    );
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (outOfStock) return;
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.discountPrice || product.price,
        quantity: 1,
        size: product.sizes?.[0],
        color: product.colors?.[0],
        stock: product.stock,
      })
    );
    toast.success('Added to cart');
  };

  return (
    <Link
      to={buildRoute(ROUTES.PRODUCT_DETAILS, { id: product.id })}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-card bg-paper-dim">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {product.isNew && <Badge tone="info">New</Badge>}
          {product.discountPrice && <Badge tone="error">Sale</Badge>}
        </div>
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-card backdrop-blur transition-transform hover:scale-105"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="h-4.5 w-4.5 text-error" />
          ) : (
            <HeartIcon className="h-4.5 w-4.5" />
          )}
        </button>

        {outOfStock ? (
          <div className="absolute inset-x-0 bottom-0 bg-ink/85 px-3 py-2 text-center text-xs font-medium text-paper">
            Out of stock
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className={cn(
              'absolute inset-x-2.5 bottom-2.5 translate-y-2 rounded-full bg-ink py-2.5 text-xs font-medium text-paper opacity-0 shadow-pop',
              'transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100'
            )}
          >
            Add to cart
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-wide text-ink/40">{product.categoryName}</span>
        <h3 className="line-clamp-1 text-sm font-medium text-ink">{product.name}</h3>
        <Rating value={Number(product.rating)} count={product.reviewCount} />
        <PriceDisplay price={product.price} discountPrice={product.discountPrice} />
      </div>
    </Link>
  );
}
