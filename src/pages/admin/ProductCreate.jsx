import { useNavigate } from 'react-router-dom';
import ProductForm from '@/components/admin/ProductForm';
import { Breadcrumb } from '@/components/common';
import { useToast } from '@/hooks/useToast';
import { ROUTES } from '@/constants/routes';

export default function ProductCreate() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = () => {
    toast.success('Product created');
    navigate(ROUTES.ADMIN_PRODUCTS);
  };

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb items={[{ label: 'Products', to: ROUTES.ADMIN_PRODUCTS }, { label: 'Add product' }]} />
      <h1 className="font-display text-2xl text-ink">Add new product</h1>
      <ProductForm onSubmit={handleSubmit} submitLabel="Create product" />
    </div>
  );
}
