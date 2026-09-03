import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProductById } from '@/data/products';
import ProductForm from '@/components/admin/ProductForm';
import { Breadcrumb, Button } from '@/components/common';
import { useToast } from '@/hooks/useToast';
import { ROUTES } from '@/constants/routes';

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const product = getProductById(id);

  const handleSubmit = () => {
    toast.success('Product updated');
    navigate(ROUTES.ADMIN_PRODUCTS);
  };

  if (!product) {
    return (
      <div className="rounded-card border border-paper-line bg-white p-10 text-center">
        <h2 className="font-display text-xl text-ink">Product not found</h2>
        <Button as={Link} to={ROUTES.ADMIN_PRODUCTS} variant="primary" className="mt-5">Back to products</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb items={[{ label: 'Products', to: ROUTES.ADMIN_PRODUCTS }, { label: 'Edit product' }]} />
      <h1 className="font-display text-2xl text-ink">Edit product</h1>
      <ProductForm
        initialValues={{
          name: product.name, description: product.description, categoryId: product.categoryId,
          price: product.price, discountPrice: product.discountPrice || '', stock: product.stock,
          sku: product.sku, status: product.status === 'OUT_OF_STOCK' ? 'ACTIVE' : product.status, images: product.images,
        }}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </div>
  );
}
