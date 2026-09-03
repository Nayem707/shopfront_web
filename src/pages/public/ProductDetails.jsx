import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeartIcon, TruckIcon, ArrowPathIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { getProductById, getRelatedProducts } from '@/data/products';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsWishlisted } from '@/store/slices/wishlistSlice';
import { useToast } from '@/hooks/useToast';
import ProductGallery from '@/components/product/ProductGallery';
import ProductGrid from '@/components/product/ProductGrid';
import { Breadcrumb, Rating, PriceDisplay, Badge, QuantitySelector, Button, Tabs } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const product = getProductById(id);
  const isWishlisted = useSelector(selectIsWishlisted(id));

  const [size, setSize] = useState(product?.sizes?.[0]);
  const [color, setColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-ink">Product not found</h1>
        <Button as={Link} to={ROUTES.PRODUCTS} variant="primary" className="mt-6">
          Back to shop
        </Button>
      </div>
    );
  }

  const outOfStock = product.stock === 0;
  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    dispatch(
      addToCart({ productId: product.id, name: product.name, image: product.images[0], price: product.discountPrice || product.price, quantity, size, color, stock: product.stock })
    );
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: 'Products', to: ROUTES.PRODUCTS },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-accent-dark">{product.categoryName}</span>
          <h1 className="mt-1.5 font-display text-3xl text-ink">{product.name}</h1>
          <div className="mt-2.5 flex items-center gap-3">
            <Rating value={Number(product.rating)} count={product.reviewCount} size="md" />
            <span className="text-xs text-ink/40">SKU {product.sku}</span>
          </div>

          <div className="mt-5">
            <PriceDisplay price={product.price} discountPrice={product.discountPrice} size="lg" />
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/60">{product.description}</p>

          <div className="mt-3">
            {outOfStock ? (
              <Badge tone="error">Out of stock</Badge>
            ) : product.stock <= 5 ? (
              <Badge tone="warning">Only {product.stock} left in stock</Badge>
            ) : (
              <Badge tone="success">In stock</Badge>
            )}
          </div>

          {product.colors?.length > 0 && (
            <div className="mt-6">
              <span className="text-sm font-medium text-ink">Color: <span className="font-normal text-ink/55">{color}</span></span>
              <div className="mt-2 flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      'rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
                      color === c ? 'border-ink bg-ink text-paper' : 'border-paper-line text-ink/60 hover:border-ink/40'
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-5">
              <span className="text-sm font-medium text-ink">Size: <span className="font-normal text-ink/55">{size}</span></span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'h-10 w-12 rounded-lg border text-sm font-medium transition-colors',
                      size === s ? 'border-ink bg-ink text-paper' : 'border-paper-line text-ink/60 hover:border-ink/40'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex items-center gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock || 1} />
            <Button variant="primary" size="lg" className="flex-1" disabled={outOfStock} onClick={handleAddToCart}>
              Add to cart
            </Button>
            <button
              onClick={() => {
                dispatch(toggleWishlist({ productId: product.id, name: product.name, image: product.images[0], price: product.price, discountPrice: product.discountPrice, stock: product.stock }));
                toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
              }}
              aria-label="Toggle wishlist"
              className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border border-paper-line hover:border-ink"
            >
              {isWishlisted ? <HeartSolidIcon className="h-5 w-5 text-error" /> : <HeartIcon className="h-5 w-5" />}
            </button>
          </div>
          <Button variant="outline" size="lg" className="mt-3 w-full" disabled={outOfStock} onClick={handleBuyNow}>
            Buy now
          </Button>

          <div className="ticket-divider mt-8 grid grid-cols-1 gap-3 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-2.5 text-xs text-ink/55">
              <TruckIcon className="h-5 w-5 flex-shrink-0 text-accent-dark" /> Free shipping over $200
            </div>
            <div className="flex items-center gap-2.5 text-xs text-ink/55">
              <ArrowPathIcon className="h-5 w-5 flex-shrink-0 text-accent-dark" /> 30-day easy returns
            </div>
            <div className="flex items-center gap-2.5 text-xs text-ink/55">
              <ShieldCheckIcon className="h-5 w-5 flex-shrink-0 text-accent-dark" /> 2-year warranty
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs
          tabs={[
            { label: 'Description', value: 'description' },
            { label: 'Product information', value: 'info' },
            { label: 'Reviews', value: 'reviews', count: product.reviewCount },
          ]}
          active={tab}
          onChange={setTab}
        />
        <div className="py-8">
          {tab === 'description' && (
            <p className="max-w-2xl text-sm leading-relaxed text-ink/60">{product.description}</p>
          )}
          {tab === 'info' && (
            <dl className="grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between border-b border-paper-line py-2 text-sm">
                  <dt className="text-ink/50">{spec.label}</dt>
                  <dd className="font-medium text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === 'reviews' && (
            <div className="flex items-center gap-4">
              <Rating value={Number(product.rating)} size="md" />
              <p className="text-sm text-ink/55">Based on {product.reviewCount} reviews</p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="ticket-divider mt-8 pt-12">
          <h2 className="font-display text-2xl text-ink">You may also like</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </div>
  );
}
