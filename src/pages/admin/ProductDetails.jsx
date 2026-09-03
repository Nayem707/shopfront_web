import { Link, useParams } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/outline';
import { getProductById } from '@/data/products';
import { Breadcrumb, Badge, Button, PriceDisplay, Rating } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';

export default function AdminProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="rounded-card border border-paper-line bg-white p-10 text-center">
        <h2 className="font-display text-xl text-ink">Product not found</h2>
        <Button as={Link} to={ROUTES.ADMIN_PRODUCTS} variant="primary" className="mt-5">Back to products</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb items={[{ label: 'Products', to: ROUTES.ADMIN_PRODUCTS }, { label: product.name }]} />
        <Button as={Link} to={buildRoute(ROUTES.ADMIN_PRODUCT_EDIT, { id: product.id })} variant="outline" icon={PencilIcon}>
          Edit product
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-card border border-paper-line bg-white p-6">
          <div className="grid grid-cols-2 gap-2">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt="" className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        </div>

        <div className="rounded-card border border-paper-line bg-white p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-medium uppercase text-accent-dark">{product.categoryName}</span>
              <h1 className="mt-1 font-display text-2xl text-ink">{product.name}</h1>
              <p className="mt-1 font-mono text-xs text-ink/40">SKU {product.sku}</p>
            </div>
            <Badge tone={product.status === 'ACTIVE' ? 'success' : 'error'}>
              {product.status === 'ACTIVE' ? 'Active' : 'Out of stock'}
            </Badge>
          </div>

          <div className="mt-4">
            <PriceDisplay price={product.price} discountPrice={product.discountPrice} size="lg" />
          </div>
          <Rating value={Number(product.rating)} count={product.reviewCount} className="mt-2" />

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60">{product.description}</p>

          <div className="ticket-divider mt-5 grid grid-cols-2 gap-4 pt-5 sm:grid-cols-4">
            <div>
              <p className="text-xs text-ink/45">Stock</p>
              <p className="font-mono text-sm font-medium text-ink">{product.stock}</p>
            </div>
            <div>
              <p className="text-xs text-ink/45">Reviews</p>
              <p className="font-mono text-sm font-medium text-ink">{product.reviewCount}</p>
            </div>
            <div>
              <p className="text-xs text-ink/45">Colors</p>
              <p className="text-sm font-medium text-ink">{product.colors?.join(', ') || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-ink/45">Sizes</p>
              <p className="text-sm font-medium text-ink">{product.sizes?.join(', ') || '—'}</p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between border-b border-paper-line py-2 text-sm">
                <dt className="text-ink/50">{spec.label}</dt>
                <dd className="font-medium text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
