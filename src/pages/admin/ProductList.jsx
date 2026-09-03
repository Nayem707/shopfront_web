import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, CubeIcon } from '@heroicons/react/24/outline';
import { products as mockProducts } from '@/data/products';
import { Table, Button, Badge, SearchBar, Select, EmptyState, ConfirmDialog, Pagination } from '@/components/common';
import { ROUTES, buildRoute } from '@/constants/routes';
import { formatCurrency, formatDate } from '@/utils/format';
import { useToast } from '@/hooks/useToast';

const PAGE_SIZE = 8;

export default function AdminProductList() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const toast = useToast();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'ALL' || p.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [products, search, status]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const handleDelete = () => {
    setProducts((list) => list.filter((p) => p.id !== deleteId));
    toast.success('Product deleted');
    setDeleteId(null);
  };

  const columns = [
    {
      key: 'product', header: 'Product',
      render: (p) => (
        <div className="flex items-center gap-3">
          <img src={p.images[0]} alt="" className="h-11 w-10 flex-shrink-0 rounded-md object-cover" />
          <div className="min-w-0">
            <p className="line-clamp-1 text-sm font-medium text-ink">{p.name}</p>
            <p className="font-mono text-xs text-ink/40">{p.sku}</p>
          </div>
        </div>
      ),
    },
    { key: 'categoryName', header: 'Category' },
    { key: 'price', header: 'Price', render: (p) => <span className="font-mono">{formatCurrency(p.discountPrice || p.price)}</span> },
    { key: 'stock', header: 'Stock', render: (p) => <span className="font-mono">{p.stock}</span> },
    {
      key: 'status', header: 'Status',
      render: (p) => <Badge tone={p.status === 'ACTIVE' ? 'success' : 'error'}>{p.status === 'ACTIVE' ? 'Active' : 'Out of stock'}</Badge>,
    },
    { key: 'createdAt', header: 'Created', render: (p) => formatDate(p.createdAt) },
    {
      key: 'actions', header: '',
      render: (p) => (
        <div className="flex items-center justify-end gap-1">
          <Link to={buildRoute(ROUTES.ADMIN_PRODUCT_DETAILS, { id: p.id })} aria-label="View" className="rounded-full p-1.5 text-ink/50 hover:bg-paper-dim hover:text-ink">
            <EyeIcon className="h-4 w-4" />
          </Link>
          <Link to={buildRoute(ROUTES.ADMIN_PRODUCT_EDIT, { id: p.id })} aria-label="Edit" className="rounded-full p-1.5 text-ink/50 hover:bg-paper-dim hover:text-ink">
            <PencilIcon className="h-4 w-4" />
          </Link>
          <button onClick={() => setDeleteId(p.id)} aria-label="Delete" className="rounded-full p-1.5 text-ink/50 hover:bg-error-soft hover:text-error">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-ink">Products</h1>
          <p className="mt-1 text-sm text-ink/50">{filtered.length} products</p>
        </div>
        <Button as={Link} to={ROUTES.ADMIN_PRODUCT_CREATE} variant="primary" icon={PlusIcon}>
          Add product
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or SKU…" className="max-w-xs" />
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-44"
          options={[
            { value: 'ALL', label: 'All statuses' },
            { value: 'ACTIVE', label: 'Active' },
            { value: 'OUT_OF_STOCK', label: 'Out of stock' },
          ]}
        />
      </div>

      <Table
        columns={columns}
        data={paginated}
        emptyState={
          <EmptyState icon={CubeIcon} title="No products found" description="Try a different search or add a new product." />
        }
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete product?"
        description="This product will be permanently removed from the catalog."
        confirmLabel="Delete"
      />
    </div>
  );
}
